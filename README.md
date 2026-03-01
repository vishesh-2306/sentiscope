# 🧠 Sentiscope - Real-Time Explainable AI Sentiment Analyzer
![Sentiscope Banner](frontend/public/vite.svg)

**Sentiscope** is a production-grade, full-stack Machine Learning application that performs real-time sentiment analysis on text input. It features a lightweight FastAPI backend for ML inference and a stunning, glassmorphism-inspired React frontend for visualization. 

Live Demo: [https://sentiscope-tau.vercel.app](https://sentiscope-tau.vercel.app)  
Backend API: [https://sentiment-api-glxn.onrender.com/health](https://sentiment-api-glxn.onrender.com/health)

---

## ⚡ Key Features

*   **Real-Time Inference:** Blazing fast sentiment prediction (Positive / Negative / Neutral).
*   **Explainable AI (XAI):** Highlights specific words mathematically contributing to the sentiment score.
*   **Polarity Distribution:** Visualizes the exact breakdown and conflict between positive and negative linguistic tones.
*   **Production-Ready:** Optimized Scikit-Learn ML pipeline fitting comfortably within Render's 512MB free tier limit.
*   **Modern UI/UX:** React + Vite frontend styled with Tailwind CSS, featuring advanced micro-animations and framer-motion transitions.

---

## 🧠 Model Behavior & Known Limitations

Sentiscope uses a classical NLP pipeline (TF-IDF + Logistic Regression).
While this enables extremely fast inference (<50ms) and low memory usage, it comes with known linguistic limitations.

### 1. Sarcasm & Irony

The model evaluates lexical polarity rather than contextual intent.
As a result, sarcastic sentences may be classified incorrectly.

Example:
"Amazing how this app deletes all my files in seconds."

The presence of strongly positive words like "amazing" biases the prediction toward Positive despite negative real meaning.

Reason:
Traditional bag-of-words models cannot understand pragmatic contrast between tone and outcome.

### 2. Mixed Sentiment (Polarity Conflict)

Sentences containing both praise and criticism can produce unstable predictions.

Example:
"The visuals are beautiful but the story is painfully boring."

The classifier weighs individual words instead of human emphasis.

### 3. Domain Dependence

The model is trained primarily on movie review data (IMDB dataset).
Performance may degrade on domains such as finance, technical feedback, or slang-heavy social media text.

### Why this is intentional

Sentiscope exposes word-level contributions and polarity distribution to make model reasoning transparent instead of hiding prediction weaknesses.

This highlights the difference between lexical sentiment detection and contextual language understanding.

### Future Improvements

* Transformer-based contextual embeddings (BERT / DistilBERT)
* Sarcasm detection module
* Domain adaptation datasets
* Conversation-level sentiment tracking

---

## 🏗️ Architecture

The project is split into two distinct layers to separate the heavy ML development from the lightweight production deployment:

### 1. Development Environment (`/backend` & `/frontend`)
The original sandbox where the ML models were trained, evaluated, and tested.
*   **ML Pipeline:** Scikit-Learn TF-IDF Vectorizer + Logistic Regression.
*   **Training Script:** `train_baseline.py` automatically cleans datasets and exports `.pkl` models.

### 2. Production Deployment (`/deploy_backend` & `/deploy_frontend`)
A highly optimized extraction of only the essential files needed for live servers.
*   **Backend (Render):** A minimal FastAPI instance that loads the pre-trained `.pkl` models into memory on startup, ensuring < 50ms inference times.
*   **Frontend (Vercel):** A compiled React bundle configured to communicate dynamically with the API.

---

## 🚀 Local Setup & Installation

### Prerequisites
*   Python 3.10+
*   Node.js 18+

### 1. Run the ML Backend
```bash
# Navigate to the backend deployment folder
cd deploy_backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app:app --reload --port 10000
```
*The API will be available at `http://localhost:10000`*

### 2. Run the React Frontend
```bash
# Navigate to the frontend deployment folder
cd deploy_frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The UI will be available at `http://localhost:5173`*

---

## 🛠️ Tech Stack

**Machine Learning:**
*   Scikit-Learn (TF-IDF, Logistic Regression)
*   Pandas & NumPy (Data Processing)
*   Joblib (Model Serialization)

**Backend:**
*   FastAPI (RESTful routing)
*   Uvicorn (ASGI server)
*   Pydantic (Data validation)

**Frontend:**
*   React 18 + Vite
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   Lucide React (Iconography)

---

## 📜 License
This project is open-source and available under the MIT License.
