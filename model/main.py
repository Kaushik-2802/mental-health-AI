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

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app)

genai.configure(api_key=API_KEY)
chat_sessions = {}
# Initialize MongoDB Connection
ATLAS_URI = "mongodb+srv://administrator:administrator@kalravcluster1.h3fsh.mongodb.net/?retryWrites=true&w=majority&appName=KalRavCluster1"
client = MongoClient(ATLAS_URI)
db = client["mental_health_db"]
collection = db["user_inputs"]

timeline_analyzer = TimelineSentimentAnalyzer()
INITIAL_QUESTION = "Hi! Let's begin. How are you feeling today?"

# @app.route('/api/conversational_chat', methods=['POST'])
# def conversational_chat():
#     data = request.json
#     session_id = data.get("session_id")  # Unique session ID for the user
#     user_response = data.get("sentence")

#     # Initialize session if not exists
#     if session_id not in chat_sessions:
#         chat_sessions[session_id] = [{"role": "bot", "text": INITIAL_QUESTION}]

#     conversation = chat_sessions[session_id]

#     # Append user response
#     conversation.append({"role": "user", "text": user_response})

#     # Generate next chatbot response
#     model = genai.GenerativeModel("gemini-pro")
#     prompt = "\n".join([f"{m['role']}: {m['text']}" for m in conversation])
#     response = model.generate_content(prompt)
#     chatbot_reply = response.text.strip()

#     # Append chatbot response
#     conversation.append({"role": "bot", "text": chatbot_reply})

#     return jsonify({"response_message": chatbot_reply, "conversation": conversation})

@app.route('/api/process_input', methods=['POST'])
def process_input():
    """
    Process user input, analyze sentiment and mental health concerns, store the data.
    """
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

    # Store input data in MongoDB
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

    response_message = generate_response_based_on_sentiment(sentiment)

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
    """
    Generate a graph based on the selected timeframe (hourly, daily, weekly).
    """
    data = request.get_json()
    timeframe = data.get("timeframe", "daily")

    graph = timeline_analyzer.generate_graph(timeframe)

    return jsonify({"graph": graph}) if graph else jsonify({"error": "No data available for this timeframe."})

@app.route('/api/intensity-history', methods=['GET'])
def get_history():
    """
    Fetch historical intensity scores for plotting trend data.
    """
    history = list(collection.find({}, {"_id": 0, "timestamp": 1, "intensity_scores": 1}))

    formatted_history = []
    
    for entry in history:
        timestamp_str = entry["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        intensity_scores = entry.get("intensity_scores", {})

        # Convert intensity_scores dictionary into a list of { concern, score }
        formatted_scores = [{"concern": concern, "score": score} for concern, score in intensity_scores.items()]

        formatted_history.append({
            "timestamp": timestamp_str,
            "intensity_scores": formatted_scores
        })

    if formatted_history:
        return jsonify({"history": formatted_history})
    else:
        return jsonify({"error": "No historical data available."})

def generate_response_based_on_sentiment(sentiment):
    """
    Generate a chatbot response based on the sentiment.
    """
    responses = {
        "Positive": "I'm glad to hear that you're feeling positive!",
        "Neutral": "It seems like you're feeling neutral.",
        "Negative": "I'm sorry you're feeling this way. Let me know if I can help."
    }
    return responses.get(sentiment, "I'm here to help. Feel free to share more.")


if __name__ == '__main__':
    if os.getenv("RENDER"):  # Render sets this variable
        from gunicorn.app.wsgiapp import run
        run()
    else:
        from waitress import serve  # Use Waitress for local Windows testing
        serve(app, host="0.0.0.0", port=5000)

