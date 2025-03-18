from flask import Flask, request, jsonify
from flask_cors import CORS
from polarity import get_sentiment
from ner_model import extract_mental_health_concerns, classify_concern, score_intensity
from timeline_analysis import TimelineSentimentAnalyzer
from pymongo import MongoClient
import datetime
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Configure Google Gemini AI
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("API_KEY is missing from environment variables")
genai.configure(api_key=API_KEY)

# Initialize MongoDB Connection
ATLAS_URI = os.getenv("MONGODB_URI")
if not ATLAS_URI:
    raise ValueError("MONGODB_URI is missing from environment variables")

client = MongoClient(ATLAS_URI)
db = client["mental_health_db"]
collection = db["user_inputs"]

# Initialize sentiment analyzer
timeline_analyzer = TimelineSentimentAnalyzer()
chat_sessions = {}

INITIAL_QUESTION = "Hi! Let's begin. How are you feeling today?"

def generate_response_based_on_sentiment(user_input, sentiment):
    """Generate a response using Gemini AI based on user sentiment."""
    model = genai.GenerativeModel("gemini-1.5-pro")

    prompt = f"""
    The user said: "{user_input}"
    The detected sentiment is: {sentiment}

    Please respond in three parts:
    1. Acknowledge their feelings warmly.
    2. Offer practical steps for emotional well-being.
    3. Provide a final encouraging statement.

    If sentiment is positive, encourage good habits.
    If sentiment is negative, provide support and coping strategies.
    Keep it under 200 words and make it actionable.
    """

    try:
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text.strip()
    except Exception as e:
        print(f"Error generating response: {e}")

    # Default fallback responses
    return {
        "negative": "I'm here for you. Take deep breaths, journal your thoughts, or talk to someone you trust. You're not alone.",
        "positive": "That's great! Keep practicing gratitude, doing what brings you joy, and staying connected with supportive people.",
    }.get(sentiment.lower(), "Take time for yourself today—listen to music, reflect, or engage in self-care.")

@app.route('/api/process_input', methods=['POST'])
def process_input():
    """Process user input, analyze sentiment, and store in MongoDB."""
    data = request.get_json()
    user_input = data.get('sentence', '').strip()

    if user_input.lower() == 'exit':
        return jsonify({"message": "Exiting..."})
    if user_input.lower() == 'report':
        return jsonify({"report": timeline_analyzer.generate_graph("daily")})

    sentiment, keywords = get_sentiment(user_input)
    concerns = extract_mental_health_concerns(user_input)
    concern_categories = {concern: classify_concern(concern) for concern in concerns}
    concern_intensities = {concern: score_intensity(concern) for concern in concerns}
    response_message = generate_response_based_on_sentiment(user_input, sentiment)

    # Store input data in MongoDB
    entry = {
        "text": user_input,
        "sentiment": sentiment,
        "keywords": keywords or [],
        "concerns": concerns or [],
        "concern_categories": concern_categories or {},
        "intensity_scores": concern_intensities or {},
        "timestamp": datetime.datetime.utcnow(),
    }
    collection.insert_one(entry)

    timeline_analyzer.add_input(1, user_input, concerns, concern_categories, concern_intensities)

    return jsonify({
        "sentiment": sentiment,
        "response_message": response_message,
        "keywords": keywords or "None",
        "concerns": concerns or "None",
        "concern_categories": concern_categories or "None",
        "intensity_scores": concern_intensities or "None"
    })

@app.route('/api/get_graph', methods=['POST'])
def get_graph():
    """Generate a sentiment graph for a given timeframe."""
    data = request.get_json()
    timeframe = data.get("timeframe", "daily")

    graph = timeline_analyzer.generate_graph(timeframe)

    return jsonify({"graph": graph}) if graph else jsonify({"error": "No data available for this timeframe."})

@app.route('/api/intensity-history', methods=['GET'])
def get_history():
    """Fetch historical intensity scores for trend analysis."""
    history = list(collection.find({}, {"_id": 0, "timestamp": 1, "intensity_scores": 1}))

    formatted_history = [
        {
            "timestamp": entry["timestamp"].strftime("%Y-%m-%d %H:%M:%S"),
            "intensity_scores": [{"concern": k, "score": v} for k, v in entry.get("intensity_scores", {}).items()]
        }
        for entry in history
    ]

    return jsonify({"history": formatted_history}) if formatted_history else jsonify({"error": "No historical data available."})

# ---------------------------- Deployment ----------------------------

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if no PORT is assigned

    if os.getenv("RENDER"):  # Running on Render
        from gunicorn.app.base import BaseApplication

        class GunicornApp(BaseApplication):
            def __init__(self, app, options=None):
                self.options = options or {}
                self.application = app
                super().__init__()

            def load_config(self):
                for key, value in self.options.items():
                    self.cfg.set(key, value)

            def load(self):
                return self.application

        options = {"bind": f"0.0.0.0:{port}", "workers": 4}
        GunicornApp(app, options).run()
    
    else:  # Local Windows Deployment using Waitress
        from waitress import serve
        print(f"Running on http://localhost:{port}")
        serve(app, host="0.0.0.0", port=port)
