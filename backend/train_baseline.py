import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Optional: Using our custom preprocessor. 
# For speed in this huge dataset, we might rely on TfidfVectorizer's built-in basic cleaning first, 
# but let's import it to show the full pipeline concept.
from preprocessing import clean_text

def train_baseline_model(data_path):
    print("1. Loading dataset...")
    df = pd.read_csv(data_path)
    
    # To save time during learning, let's use a 10,000 sample subset (balanced)
    # 50k takes a bit long for a quick tutorial run
    df_pos = df[df['sentiment'] == 'positive'].sample(5000, random_state=42)
    df_neg = df[df['sentiment'] == 'negative'].sample(5000, random_state=42)
    df_subset = pd.concat([df_pos, df_neg]).sample(frac=1, random_state=42).reset_index(drop=True)
    
    print(f"Using a subset of {len(df_subset)} reviews for faster training.")
    
    # 2. Split Data (80% training, 20% testing)
    print("2. Splitting data into Train and Test sets...")
    X = df_subset['review']
    
    # Convert sentiment labels to numbers (positive=1, negative=0)
    y = df_subset['sentiment'].map({'positive': 1, 'negative': 0})
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 3. Text Vectorization (TF-IDF)
    print("3. Vectorizing text using TF-IDF...")
    # TF-IDF turns text into numbers based on word frequency and importance
    # We use max_features to keep only the top 5000 most important words
    vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
    
    # 'fit_transform' learns the vocabulary from training data AND transforms it
    X_train_vec = vectorizer.fit_transform(X_train)
    # 'transform' ONLY transforms testing data based on what it already learned
    X_test_vec = vectorizer.transform(X_test)
    
    # 4. Model Training
    print("4. Training Logistic Regression model...")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_vec, y_train)
    
    # 5. Evaluation
    print("5. Evaluating the model...")
    y_pred = model.predict(X_test_vec)
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nAccuracy: {accuracy * 100:.2f}%\n")
    print("Detailed Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['Negative', 'Positive']))
    
    # 6. Save the model and vectorizer for our API (Phase 5)
    print("6. Saving model and vectorizer to disk...")
    joblib.dump(model, 'sentiment_model.pkl')
    joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
    print("Done! Model saved as sentiment_model.pkl")

if __name__ == "__main__":
    train_baseline_model('IMDB_Dataset.csv')
