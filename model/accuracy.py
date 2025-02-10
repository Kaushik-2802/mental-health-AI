import pandas as pd
import spacy
from spacy.training import Example
from tqdm import tqdm
from sklearn.metrics import precision_score, recall_score, f1_score

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

    for i in range(50): 
        losses = {}
        nlp.update(examples, drop=0.3, losses=losses)
        print(f"Iteration {i + 1}, Loss: {losses}")

    nlp.to_disk(model_output_path)
    print(f"✅ Model training complete! Saved to '{model_output_path}'")

def evaluate_model(model_path, test_data):
    nlp = spacy.load(model_path)
    
    y_true = []  # Actual labels
    y_pred = []  # Predicted labels

    for text, annotations in test_data:
        doc = nlp(text)
        true_entities = { (start, end) for start, end, label in annotations["entities"] }
        predicted_entities = { (ent.start_char, ent.end_char) for ent in doc.ents }

        # Convert to binary format (1 = correct detection, 0 = missed/mistaken detection)
        for entity in true_entities:
            y_true.append(1)
            y_pred.append(1 if entity in predicted_entities else 0)

        for entity in predicted_entities:
            if entity not in true_entities:
                y_true.append(0)
                y_pred.append(1)

    # Compute Precision, Recall, and F1-score
    precision = precision_score(y_true, y_pred, zero_division=1)
    recall = recall_score(y_true, y_pred, zero_division=1)
    f1 = f1_score(y_true, y_pred, zero_division=1)

    print("\n📊 **Model Evaluation Metrics**")
    print(f"🎯 Precision: {precision:.4f}")
    print(f"📢 Recall: {recall:.4f}")
    print(f"🏆 F1-score: {f1:.4f}")

if __name__ == "__main__":
    dataset_path = "model/test.xlsx"  

    df = load_dataset(dataset_path)
    spacy_training_data = convert_to_spacy_format(df)

    # Split dataset: 80% for training, 20% for testing
    train_size = int(0.8 * len(spacy_training_data))
    train_data = spacy_training_data[:train_size]
    test_data = spacy_training_data[train_size:]

    train_ner(train_data, model_output_path="mental_health_ner")

    evaluate_model("mental_health_ner", test_data)
