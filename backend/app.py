import os
import ssl
import re
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

os.environ["USE_TF"] = "0"
os.environ["USE_TORCH"] = "1"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

# Fix for macOS SSL Certificate Verification Error
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download NLTK data for word highlighting
nltk.download('vader_lexicon', quiet=True)
vader_analyzer = SentimentIntensityAnalyzer()

# 1. Initialize the FastAPI application
app = FastAPI(title="Real-Time 5-Star Sentiment Analyzer API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the expected input data format
class TextRequest(BaseModel):
    text: str

# 3. Load the pre-trained Hugging Face Transformer
print("Loading advanced Transformer model... this may take a moment to download the first time!")
try:
    sentiment_analyzer = pipeline(
        "sentiment-analysis", 
        model="nlptown/bert-base-multilingual-uncased-sentiment",
        return_all_scores=True # To get the 1-5 star distribution
    )
    print("Transformer model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    sentiment_analyzer = None

@app.get("/")
def home():
    return {"status": "running"}

# 4. Define the inference endpoint
@app.post("/predict")
def predict_sentiment(request: TextRequest):
    if sentiment_analyzer is None:
        return {"error": "Transformer model failed to load."}
    
    # Run the text through the transformer (returns list of scores for all classes)
    results = sentiment_analyzer(request.text)[0]
    
    # Sort by score descending to find the top class
    sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)
    top_label = sorted_results[0]['label']
    top_score = sorted_results[0]['score']
    
    stars = int(top_label.split()[0])
    if stars >= 4:
        sentiment = "Positive"
    elif stars == 3:
        sentiment = "Neutral"
    else:
        sentiment = "Negative"

    # Explainable AI: Calculate Polarity Breakdown
    scores = {res['label']: res['score'] for res in results}
    positive_prob = scores.get('5 stars', 0) + scores.get('4 stars', 0)
    neutral_prob = scores.get('3 stars', 0)
    negative_prob = scores.get('2 stars', 0) + scores.get('1 star', 0)

    # Tone strength is how strongly it leans either positive or negative
    tone_strength = max(positive_prob, negative_prob)
    
    # Explainable AI: Word-level Highlights using VADER
    words = re.findall(r'\b\w+\b|[^\w\s]', request.text) # Keep words and punctuation
    word_highlights = []
    
    for word in words:
        if re.match(r'^\w+$', word): # Only analyze words, not punctuation
            vs = vader_analyzer.polarity_scores(word)
            compound = vs['compound']
            if compound > 0.1:
                valence = 'positive'
            elif compound < -0.1:
                valence = 'negative'
            else:
                valence = 'neutral'
        else:
            valence = 'neutral'
            
        word_highlights.append({
            "word": word,
            "valence": valence
        })
    
    return {
        "text": request.text,
        "rating": stars,
        "sentiment": sentiment,
        "confidence": top_score * 100, 
        "breakdown": {
            "positive": positive_prob * 100,
            "neutral": neutral_prob * 100,
            "negative": negative_prob * 100,
            "tone_strength": tone_strength * 100
        },
        "word_highlights": word_highlights
    }

if __name__ == "__main__":
    import uvicorn
    # Render requires binding to 0.0.0.0 and dynamically respects PORT env variable, defaulting to 10000
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
