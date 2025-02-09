import spacy

MODEL_PATH = "mental_health_ner" 
nlp = spacy.load(MODEL_PATH)

MENTAL_HEALTH_CATEGORIES = {
    "Anxiety": {
        "keywords": ["anxious", "panic", "worried", "overthinking", "nervous", "uneasy", "fearful", "dread", "restless", "apprehensive"],
        "intensity": {
            "panic": 10, "anxious": 8, "nervous": 6, "worried": 5, "overthinking": 7,
            "uneasy": 5, "fearful": 9, "dread": 8, "restless": 7, "apprehensive": 6
        }
    },
    "Depression": {
        "keywords": ["sad", "hopeless", "worthless", "unmotivated", "empty", "lonely", "despair", "gloomy", "miserable", "fatigue", "drained"],
        "intensity": {
            "hopeless": 10, "worthless": 9, "sad": 6, "unmotivated": 5, "empty": 7,
            "lonely": 6, "despair": 9, "gloomy": 7, "miserable": 8, "fatigue": 6, "drained": 7
        }
    },
    "Stress": {
        "keywords": ["stressed", "pressure", "overwhelmed", "burnout", "tension", "frustrated", "exhausted", "drained", "irritated", "agitated"],
        "intensity": {
            "burnout": 10, "overwhelmed": 9, "stressed": 8, "pressure": 7, "tension": 6,
            "frustrated": 7, "exhausted": 8, "drained": 7, "irritated": 6, "agitated": 5
        }
    },
    "Insomnia": {
        "keywords": ["can't sleep", "insomnia", "restless", "sleep-deprived", "awake", "nightmares", "tossing and turning", "light sleeper", "frequent waking"],
        "intensity": {
            "insomnia": 10, "sleep-deprived": 9, "restless": 7, "can't sleep": 8, "awake": 6,
            "nightmares": 8, "tossing and turning": 7, "light sleeper": 5, "frequent waking": 6
        }
    },
    "Eating Disorder": {
        "keywords": ["not eating", "overeating", "binge eating", "starving", "food issue", "loss of appetite", "emotional eating", "purging", "diet obsession"],
        "intensity": {
            "binge eating": 10, "starving": 9, "overeating": 8, "food issue": 6, "not eating": 7,
            "loss of appetite": 7, "emotional eating": 8, "purging": 9, "diet obsession": 7
        }
    },
    "Positive Mental States": {
        "keywords": ["calm", "relaxed", "happy", "content", "hopeful", "peaceful", "motivated", "confident", "grateful", "focused", "joyful", "strong"],
        "intensity": {
            "calm": 3, "relaxed": 2, "happy": 3, "content": 2, "hopeful": 3,
            "peaceful": 3, "motivated": 3, "confident": 3, "grateful": 3, "focused": 2,
            "joyful": 3, "strong": 3
        }
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
