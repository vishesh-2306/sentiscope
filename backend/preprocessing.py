import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import ssl

# Fix for macOS SSL Certificate Verification Error
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Best practice: Download required NLTK data on startup
def download_nltk_data():
    for resource in ['stopwords', 'wordnet', 'omw-1.4']:
        nltk.download(resource, quiet=True)

download_nltk_data()

def clean_text(text):
    """
    Cleans input text/tweets by removing noise, stopwords, and applying lemmatization.
    """
    # 1. Lowercase
    text = text.lower()
    
    # 2. Remove URLs
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    
    # 3. Remove user @ references and '#'
    text = re.sub(r'\@\w+|\#','', text)
    
    # 4. Remove punctuations and numbers (keep only letters and spaces)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # 5. Tokenization, Stopwords Removal & Lemmatization
    tokens = text.split()
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    
    # Keep word if not a stopword, and lemmatize it
    clean_tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    
    return " ".join(clean_tokens)

if __name__ == "__main__":
    # Test the pipeline
    sample_tweet = "I absolutely LOVED the new movie!!! @director #amazing https://example.com"
    print("Original:", sample_tweet)
    print("Cleaned :", clean_text(sample_tweet))
