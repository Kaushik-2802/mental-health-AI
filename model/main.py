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
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
API_KEY = os.getenv("API_KEY")

app = Flask(__name__)

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "https://kalravhealth.netlify.app"
]

CORS(app, origins=ALLOWED_ORIGINS,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True)

genai.configure(api_key=API_KEY)
chat_sessions = {}
ATLAS_URI = "mongodb+srv://administrator:administrator@kalravcluster1.h3fsh.mongodb.net/?retryWrites=true&w=majority&appName=KalRavCluster1"
client = MongoClient(ATLAS_URI)
db = client["mental_health_db"]
collection = db["user_inputs"]
timeline_analyzer = TimelineSentimentAnalyzer()
INITIAL_QUESTION = "Hi! Let's begin. How are you feeling today?"

def generate_response_based_on_sentiment(user_input, sentiment):
    model = genai.GenerativeModel("gemini-1.5-pro")
    prompt = f"""
    The user said: "{user_input}"
    The detected sentiment is: {sentiment}
    Please respond in three parts:
    1. Provide a brief but warm acknowledgment of their feelings.
    2. Offer specific, practical steps they can take to improve or maintain their emotional well-being.
    3. Include a final encouraging statement that reassures them.
    If the sentiment is positive, acknowledge and encourage maintaining it with good habits.
    If the sentiment is negative, offer supportive guidance and coping strategies.
    Keep the response under 200 words, and make it clear, actionable, and conversational.
    """
    try:
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text.strip()
    except Exception as e:
        logger.error("Error generating response: %s", str(e))
    if sentiment.lower() == "negative":
        return "I'm here for you. It sounds tough. Try deep breaths or journaling. You’re not alone."
    elif sentiment.lower() == "positive":
        return "Great to hear! Keep it up with gratitude and joyful activities."
    else:
        return "I hear you. Take a break or reflect—self-care matters."

@app.route('/api/process_input', methods=['OPTIONS'])
def process_input_options():
    """Handle preflight OPTIONS request manually."""
    response = jsonify({})
    response.status_code = 204
    response.headers['Access-Control-Allow-Origin'] = 'https://kalravhealth.netlify.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route('/api/process_input', methods=['POST'])
def process_input():
    logger.info("Received POST request: %s", request.get_json())
    data = request.get_json()
    user_input = data.get('sentence', '').strip()

    if user_input.lower() == 'exit':
        logger.info("User requested exit")
        return jsonify({"message": "Exiting..."})
    if user_input.lower() == 'report':
        logger.info("Generating report")
        return jsonify({"report": timeline_analyzer.generate_graph("daily")})

    try:
        sentiment, keywords = get_sentiment(user_input)
        concerns = extract_mental_health_concerns(user_input)
        concern_categories = {concern: classify_concern(concern) for concern in concerns}
        concern_intensities = {concern: score_intensity(concern) for concern in concerns}
        response_message = generate_response_based_on_sentiment(user_input, sentiment)
        logger.info("Processed input: sentiment=%s, concerns=%s", sentiment, concerns)
    except Exception as e:
        logger.error("Error processing input: %s", str(e))
        raise

    entry = {
        "text": user_input,
        "sentiment": sentiment,
        "keywords": keywords if keywords else [],
        "concerns": concerns if concerns else [],
        "concern_categories": concern_categories if concern_categories else {},
        "intensity_scores": concern_intensities if concern_intensities else {},
        "timestamp": datetime.datetime.utcnow()
    }
    collection.insert_one(entry)
    timeline_analyzer.add_input(1, user_input, concerns, concern_categories, concern_intensities)

    response = {
        "sentiment": sentiment,
        "response_message": response_message,
        "keywords": keywords if keywords else "None",
        "concerns": concerns if concerns else "None",
        "concern_categories": concern_categories if concern_categories else "None",
        "intensity_scores": concern_intensities if concern_intensities else "None"
    }
    return jsonify(response)

@app.route('/api/get_graph', methods=['POST'])
def get_graph():
    data = request.get_json()
    timeframe = data.get("timeframe", "daily")
    graph = timeline_analyzer.generate_graph(timeframe)
    return jsonify({"graph": graph}) if graph else jsonify({"error": "No data available."})

@app.route('/api/intensity-history', methods=['GET'])
def get_history():
    history = list(collection.find({}, {"_id": 0, "timestamp": 1, "intensity_scores": 1}))
    formatted_history = [
        {
            "timestamp": entry["timestamp"].strftime("%Y-%m-%d %H:%M:%S"),
            "intensity_scores": [{"concern": c, "score": s} for c, s in entry.get("intensity_scores", {}).items()]
        } for entry in history
    ]
    return jsonify({"history": formatted_history}) if formatted_history else jsonify({"error": "No data."})

@app.route('/api/test', methods=['GET'])
def test_cors():
    return jsonify({"message": "CORS is working"})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    try:
        port = int(os.environ.get("PORT", 5000))
        logger.info(f"Starting server on port {port}")
        if os.getenv("RENDER"):
            from gunicorn.app.wsgiapp import run
            os.environ["GUNICORN_CMD_ARGS"] = f"-b 0.0.0.0:{port} -w 4"
            run()
        else:
            app.run(host="0.0.0.0", port=port, debug=True, ssl_context=None)
    except Exception as e:
        logger.error("Error starting server: %s", str(e))