import pandas as pd
import spacy
from spacy.training import Example
from tqdm import tqdm

def load_dataset(file_path):
    df = pd.read_excel(file_path)
    df = df[['User Input', 'Extracted Concern']].dropna()
    return df

def convert_to_spacy_format(df):
    training_data = []
    
    for _, row in tqdm(df.iterrows(), total=len(df)):
        text = row["User Input"]
        concern = row["Extracted Concern"].strip()

        start_idx = text.find(concern)
        if start_idx == -1:
            continue  
        end_idx = start_idx + len(concern)
        training_data.append((text, {"entities": [(start_idx, end_idx, "MENTAL_HEALTH_CONCERN")]}))
    
    return training_data

def train_ner(training_data, model_output_path="mental_health_ner"):
    nlp = spacy.blank("en") 
    ner = nlp.add_pipe("ner", last=True) 
    ner.add_label("MENTAL_HEALTH_CONCERN")

    examples = [Example.from_dict(nlp.make_doc(text), annotations) for text, annotations in training_data]

    nlp.initialize()
    optimizer = nlp.create_optimizer()

    for i in range(30): 
        losses = {}
        nlp.update(examples, drop=0.3, losses=losses)
        print(f"Iteration {i + 1}, Loss: {losses}")

    nlp.to_disk(model_output_path)
    print(f"✅ Model training complete! Saved to '{model_output_path}'")

def test_model(model_path, test_text):
    nlp = spacy.load(model_path)
    doc = nlp(test_text)

    print("\n🔍 Detected Mental Health Concerns:")
    for ent in doc.ents:
        print(f"Concern: {ent.text} (Label: {ent.label_})")

if __name__ == "__main__":
    dataset_path = "mental_health.xlsx" 

    df = load_dataset(dataset_path)
    spacy_training_data = convert_to_spacy_format(df)

    train_ner(spacy_training_data, model_output_path="mental_health_ner")

    sample_text = "Lately, I've been feeling very stressed and anxious."
    test_model("mental_health_ner", sample_text)
