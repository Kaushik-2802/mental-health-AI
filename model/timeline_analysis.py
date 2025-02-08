import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime, timedelta

class TimelineSentimentAnalyzer:
    def __init__(self):
        self.inputs = []  # Stores user inputs with timestamp

    def add_input(self, user_id, text, concerns, categories, intensities):
        """
        Store user input along with timestamp, extracted concerns, and intensity scores.
        """
        self.inputs.append({
            "timestamp": datetime.now(),  # Store the exact time of input
            "text": text,
            "concerns": concerns,
            "categories": categories,
            "intensities": intensities
        })

    def get_last_sentiment(self, user_id):
        """
        Retrieve the most recent sentiment analysis result.
        Returns the last recorded sentiment category (Positive, Neutral, Negative).
        """
        if not self.inputs:
            return None  # No previous data available

        last_entry = self.inputs[-1]  # Get the most recent input
        return max(last_entry["intensities"], key=last_entry["intensities"].get, default="Neutral")

    def filter_by_timeframe(self, timeframe):
        """
        Filter and aggregate data based on the timeframe (hourly, daily, weekly).
        """
        now = datetime.now()
        filtered_data = []

        if timeframe == "hourly":
            start_time = now - timedelta(hours=1)
        elif timeframe == "daily":
            start_time = now - timedelta(days=1)
        elif timeframe == "weekly":
            start_time = now - timedelta(weeks=1)
        else:
            return []

        for entry in self.inputs:
            if entry["timestamp"] >= start_time:
                filtered_data.append(entry)

        return filtered_data

    def generate_graph(self, timeframe):
        """
        Generate a line chart of concern intensities based on selected timeframe.
        """
        data = self.filter_by_timeframe(timeframe)
        if not data:
            return None  

        # Aggregate concern intensities over time (for the line plot)
        concern_totals = {}
        timestamps = []

        for entry in data:
            for concern, intensity in entry["intensities"].items():
                concern_totals[concern] = concern_totals.get(concern, 0) + intensity
                timestamps.append(entry["timestamp"])

        if not concern_totals:
            return None  

        # Sort by timestamp (for plotting purposes)
        timestamps = sorted(list(set(timestamps)))

        # Plot the line chart
        plt.figure(figsize=(8, 6))
        for concern, total in concern_totals.items():
            plt.plot(timestamps, [total] * len(timestamps), label=concern)

        plt.xlabel('Timestamp')
        plt.ylabel('Intensity')
        plt.title(f'Mental Health Intensity Over Time ({timeframe.capitalize()})')
        plt.legend()

        # Save the figure to a BytesIO object to be sent as base64
        img_io = io.BytesIO()
        plt.savefig(img_io, format='png')
        img_io.seek(0)
        img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
        plt.close()

        return img_base64
