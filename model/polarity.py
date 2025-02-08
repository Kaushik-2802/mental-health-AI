import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download("vader_lexicon")

sia = SentimentIntensityAnalyzer()

def get_sentiment(text):
    scores = sia.polarity_scores(text)
    comp_score = scores["compound"]

    if comp_score >= 0.05:
        sentiment = "Positive"
    elif comp_score <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    words = text.split()
    keywords = [word for word in words if sia.polarity_scores(word)["compound"] != 0]

    return sentiment, keywords
