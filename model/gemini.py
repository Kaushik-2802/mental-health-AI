import google.generativeai as genai

# Configure the API key
API_KEY = "AIzaSyDtGmDCcWiNHm5NBk4KWrWFr8-xUNYlIPE"  # Replace with your actual API key
genai.configure(api_key=API_KEY)

def test_gemini_api():
    try:
        # Load the generative model
        model = genai.GenerativeModel("gemini-pro")

        # Generate a test response
        response = model.generate_content("Hello")

        # Print the response
        print("Gemini API Response:")
        print(response.text)

    except Exception as e:
        print("Error with Gemini API:", e)

# Run the test
if __name__ == "__main__":
    test_gemini_api()
