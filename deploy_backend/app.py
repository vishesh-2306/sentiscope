import os
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Sentiment Analyzer API - Production Edition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models at startup
print("Loading models...")
try:
    vectorizer = joblib.load("model/tfidf_vectorizer.pkl")
    model = joblib.load("model/sentiment_model.pkl")
    print("Models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")
    vectorizer = None
    model = None

class TextRequest(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/predict")
def predict_sentiment(request: TextRequest):
    if model is None or vectorizer is None:
        return {"error": "Model failed to load."}
    
    # Vectorize
    vec_text = vectorizer.transform([request.text])
    
    # Predict Probability
    probabilities = model.predict_proba(vec_text)[0]
    
    # Assuming Binary Classification: 0 = Negative, 1 = Positive
    negative_prob = probabilities[0]
    positive_prob = probabilities[1]
    
    # Calculate star rating based on positive probability
    if positive_prob > 0.8:
        stars = 5
        sentiment = "Positive"
        confidence = positive_prob * 100
    elif positive_prob > 0.6:
        stars = 4
        sentiment = "Positive"
        confidence = positive_prob * 100
    elif positive_prob > 0.4:
        stars = 3
        sentiment = "Neutral"
        confidence = (1 - abs(positive_prob - 0.5) * 2) * 100
    elif positive_prob > 0.2:
        stars = 2
        sentiment = "Negative"
        confidence = negative_prob * 100
    else:
        stars = 1
        sentiment = "Negative"
        confidence = negative_prob * 100
        
    return {
        "text": request.text,
        "rating": stars,
        "sentiment": sentiment,
        "confidence": confidence,
        "breakdown": {
            "positive": positive_prob * 100,
            "negative": negative_prob * 100
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("app:app", host="0.0.0.0", port=port)
