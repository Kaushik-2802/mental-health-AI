import spacy

MODEL_PATH = "mental_health_ner" 
nlp = spacy.load(MODEL_PATH)

MENTAL_HEALTH_CATEGORIES = {
    "Anxiety": {
        "keywords": [
            "anxious", "panic", "worried", "overthinking", "nervous", "uneasy", "tense", 
            "restless", "calm", "relaxed", "dread", "apprehensive", "jittery", "paranoid", 
            "on edge", "fearful", "hesitant"
        ],
        "intensity": {
            "suicide": 10, "panic": 9, "anxious": 8, "nervous": 7, "worried": 6, "overthinking": 7, 
            "uneasy": 6, "tense": 6, "restless": 6, "dread": 8, "apprehensive": 7, "jittery": 7, 
            "paranoid": 9, "on edge": 8, "fearful": 7, "hesitant": 6, "calm": 6, "relaxed": 6
        }
    },
    "Depression": {
        "keywords": [
            "sad", "hopeless", "worthless", "unmotivated", "empty", "down", "gloomy", 
            "lonely", "content", "hopeful", "miserable", "melancholy", "drained", 
            "isolated", "despair", "numb", "apathetic"
        ],
        "intensity": {
            "hopeless": 10, "depressed": 9, "worthless": 9, "sad": 7, "unmotivated": 7, 
            "empty": 8, "down": 6, "gloomy": 6, "lonely": 6, "miserable": 8, "melancholy": 7, 
            "drained": 7, "isolated": 9, "despair": 10, "numb": 9, "apathetic": 7, 
            "content": 6, "hopeful": 6, "happy": 6
        }
    },
    "Stress": {
        "keywords": [
            "stressed", "pressure", "overwhelmed", "burnout", "tension", "frustrated", 
            "exhausted", "agitated", "focused", "motivated", "irritable", "snappy", 
            "drained", "worked up", "short-tempered"
        ],
        "intensity": {
            "burnout": 10, "overwhelmed": 9, "stressed": 8, "pressure": 7, "tension": 6, 
            "frustrated": 6, "exhausted": 6, "agitated": 6, "irritable": 6, "snappy": 6, 
            "drained": 7, "worked up": 6, "short-tempered": 6, "focused": 6, "motivated": 6, 
            "sleepy": 6
        }
    },
    "Insomnia": {
        "keywords": [
            "can't sleep", "insomnia", "restless", "sleep-deprived", "awake", "nightmare", 
            "tossing", "turning", "well-rested", "refreshed", "wide awake", "sleepless", 
            "lethargic", "overtired", "exhausted", "night terrors"
        ],
        "intensity": {
            "insomnia": 10, "sleep-deprived": 9, "restless": 8, "can't sleep": 7, "awake": 6, 
            "nightmare": 6, "night terrors": 9, "tossing": 6, "turning": 6, "wide awake": 6, 
            "sleepless": 8, "lethargic": 6, "overtired": 7, "exhausted": 7, 
            "well-rested": 6, "refreshed": 6
        }
    },
    "Eating Disorder": {
        "keywords": [
            "not eating", "overeating", "binge eating", "starving", "food issue", 
            "skipping meals", "losing appetite", "craving food", "healthy eating", 
            "balanced diet", "purging", "underweight", "overweight", "dieting", "body image"
        ],
        "intensity": {
            "binge eating": 10, "starving": 9, "overeating": 8, "food issue": 7, 
            "not eating": 6, "skipping meals": 6, "losing appetite": 6, "purging": 9, 
            "underweight": 7, "overweight": 7, "dieting": 6, "body image": 6, 
            "craving food": 6, "healthy eating": 6, "balanced diet": 6
        }
    },
    "PTSD": {
        "keywords": [
            "flashback", "trauma", "nightmare", "panic attack", "startled", "hypervigilant", 
            "numb", "intrusive thoughts", "detached", "triggers", "shaking", "paranoia", 
            "dissociation", "fear", "jumpy"
        ],
        "intensity": {
            "flashback": 10, "trauma": 9, "nightmare": 8, "panic attack": 9, "startled": 7, 
            "hypervigilant": 8, "numb": 7, "intrusive thoughts": 9, "detached": 7, 
            "triggers": 9, "shaking": 7, "paranoia": 9, "dissociation": 10, "fear": 7, 
            "jumpy": 6
        }
    },
    "OCD": {
        "keywords": [
            "compulsive", "obsessive", "intrusive thoughts", "rituals", "checking", 
            "repeating", "cleaning", "contamination fear", "perfectionism", "fixation", 
            "uncontrollable urges"
        ],
        "intensity": {
            "compulsive": 9, "obsessive": 9, "intrusive thoughts": 10, "rituals": 8, 
            "checking": 7, "repeating": 7, "cleaning": 6, "contamination fear": 8, 
            "perfectionism": 6, "fixation": 7, "uncontrollable urges": 9
        }
    },
    "Social Anxiety": {
        "keywords": [
            "fear of judgment", "self-conscious", "social withdrawal", "nervous in crowds", 
            "avoidant", "blushing", "shaky voice", "afraid of talking", "overanalyzing", 
            "avoiding eye contact"
        ],
        "intensity": {
            "fear of judgment": 9, "self-conscious": 8, "social withdrawal": 9, 
            "nervous in crowds": 7, "avoidant": 8, "blushing": 7, "shaky voice": 6, 
            "afraid of talking": 7, "overanalyzing": 7, "avoiding eye contact": 6
        }
    },
    "Happiness": {
        "keywords": [
            "happy", "joyful", "content", "excited", "cheerful", "blissful", "ecstatic", 
            "euphoric", "grateful", "optimistic", "radiant", "enthusiastic", "delighted", 
            "thrilled", "carefree", "fulfilled"
        ],
        "intensity": {
            "ecstatic": 5, "euphoric": 5, "thrilled": 5, "joyful": 4, "happy": 4, 
            "cheerful": 4, "content": 3, "enthusiastic": 4, "excited": 4, "radiant": 5, 
            "blissful": 5, "grateful": 4, "optimistic": 3, "fulfilled": 5, "carefree": 3
        }
    },
    "Calmness": {
        "keywords": [
            "calm", "relaxed", "serene", "peaceful", "tranquil", "at ease", "restful", 
            "mindful", "unbothered", "balanced", "harmonious", "still", "soothing", 
            "content", "collected"
        ],
        "intensity": {
            "serene": 5, "tranquil": 5, "peaceful": 5, "calm": 4, "relaxed": 4, 
            "restful": 3, "mindful": 4, "unbothered": 3, "balanced": 4, "harmonious": 4, 
            "soothing": 3, "content": 3, "collected": 3, "at ease": 4
        }
    },
    "Love & Affection": {
        "keywords": [
            "loved", "affectionate", "caring", "cherished", "valued", "appreciated", 
            "compassionate", "warmhearted", "close", "bonded", "adored", "connected", 
            "trusting", "supportive", "nurturing", "intimate"
        ],
        "intensity": {
            "cherished": 5, "loved": 5, "affectionate": 4, "valued": 3, "appreciated": 3, 
            "compassionate": 4, "warmhearted": 3, "close": 4, "bonded": 4, "adored": 5, 
            "connected": 3, "trusting": 4, "supportive": 4, "nurturing": 3, "intimate": 5
        }
    },
    "Confidence": {
        "keywords": [
            "confident", "empowered", "bold", "self-assured", "strong", "fearless", 
            "capable", "determined", "independent", "secure", "assertive", "driven", 
            "resilient", "tenacious", "courageous", "unstoppable"
        ],
        "intensity": {
            "unstoppable": 5, "fearless": 5, "empowered": 4, "bold": 4, "confident": 4, 
            "self-assured": 3, "capable": 3, "determined": 4, "independent": 3, 
            "secure": 3, "assertive": 3, "driven": 4, "resilient": 5, "tenacious": 4, 
            "courageous": 5
        }
    },
    "Hope & Inspiration": {
        "keywords": [
            "hopeful", "inspired", "motivated", "uplifted", "encouraged", "ambitious", 
            "visionary", "aspiring", "driven", "determined", "optimistic", "enthusiastic", 
            "positive", "bright", "goal-oriented"
        ],
        "intensity": {
            "inspired": 5, "hopeful": 5, "motivated": 4, "uplifted": 4, "encouraged": 3, 
            "ambitious": 4, "visionary": 4, "aspiring": 3, "driven": 4, "determined": 5, 
            "optimistic": 4, "enthusiastic": 3, "positive": 3, "bright": 3, "goal-oriented": 4
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
