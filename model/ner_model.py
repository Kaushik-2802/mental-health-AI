import spacy

MODEL_PATH = "mental_health_ner" 
nlp = spacy.load(MODEL_PATH)

MENTAL_HEALTH_CATEGORIES = {
    "Anxiety": {
        "keywords": ["anxious", "panic", "worried", "overthinking", "nervous"],
        "intensity": {"panic": 10, "anxious": 8, "nervous": 6, "worried": 5, "overthinking": 7}
    },
    "Depression": {
        "keywords": ["sad", "hopeless", "worthless", "unmotivated", "empty"],
        "intensity": {"hopeless": 10, "worthless": 9, "sad": 6, "unmotivated": 5, "empty": 7}
    },
    "Stress": {
        "keywords": ["stressed", "pressure", "overwhelmed", "burnout", "tension"],
        "intensity": {"burnout": 10, "overwhelmed": 9, "stressed": 8, "pressure": 7, "tension": 6}
    },
    "Insomnia": {
        "keywords": ["can't sleep", "insomnia", "restless", "sleep-deprived", "awake"],
        "intensity": {"insomnia": 10, "sleep-deprived": 9, "restless": 7, "can't sleep": 8, "awake": 6}
    },
    "Eating Disorder": {
        "keywords": ["not eating", "overeating", "binge eating", "starving", "food issue"],
        "intensity": {"binge eating": 10, "starving": 9, "overeating": 8, "food issue": 6, "not eating": 7}
    }
}

def extract_mental_health_concerns(text):
    doc = nlp(text)
    concerns = [ent.text for ent in doc.ents if ent.label_ == "MENTAL_HEALTH_CONCERN"]
    return concerns

def classify_concern(concern_text):
    for category, data in MENTAL_HEALTH_CATEGORIES.items():
        if any(keyword in concern_text.lower() for keyword in data["keywords"]):
            return category
    return "Other"  

def score_intensity(concern_text):
    intensity_score = 0
    for category, data in MENTAL_HEALTH_CATEGORIES.items():
        for keyword, score in data["intensity"].items():
            if keyword in concern_text.lower():
                intensity_score = max(intensity_score, score)
    return intensity_score if intensity_score > 0 else 1  
