import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditorPanel from './EditorPanel';
import ResultsContainer from './ExplainableResults/ResultsContainer';
import HistoryFeed from '../feed/HistoryFeed';

export default function AnalyzerPanel() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentResult, setCurrentResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [isWakingUp, setIsWakingUp] = useState(false);

    // Monitor loading time for Render's cold start
    useEffect(() => {
        let timeout;
        if (isAnalyzing) {
            timeout = setTimeout(() => {
                setIsWakingUp(true);
            }, 3000);
        } else {
            setIsWakingUp(false);
        }
        return () => clearTimeout(timeout);
    }, [isAnalyzing]);

    const handleAnalyze = async (text) => {
        if (!text.trim()) return;

        setIsAnalyzing(true);
        setCurrentResult(null); // Clear previous result

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000);

        try {
            // Use environment variable for API URL (fallback to localhost for dev)
            const API = import.meta.env.VITE_API_URL || 'http://localhost:10000';

            const response = await fetch(`${API}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error(data.error);
                alert(data.error);
            } else {
                // Enforce a minimum 1.5s delay for the UX "Thinking" animation
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Add unique ID for the history feed
                const resultWithId = { ...data, id: uuidv4() };

                setCurrentResult(resultWithId);
                // Add to the front of history, keeping max 8 items
                setHistory(prev => [resultWithId, ...prev].slice(0, 8));
            }
        } catch (error) {
            console.error("Failed to fetch sentiment:", error);
            if (error.name === 'AbortError') {
                alert("Request timed out after 25 seconds. The AI instance might be sleeping or unavailable.");
            } else {
                alert("Failed to connect to the backend API. Is it running?");
            }
        } finally {
            clearTimeout(timeoutId);
            setIsAnalyzing(false);
            setIsWakingUp(false);
        }
    };

    return (
        <section id="analyzer" className="py-20 relative max-w-7xl mx-auto px-4">

            {/* Cold Start Banner */}
            {isWakingUp && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--color-brand-amber)]/20 border border-[var(--color-brand-amber)]/50 text-[var(--color-brand-amber)] px-4 py-2 rounded-full text-sm font-medium animate-pulse flex items-center gap-2 z-50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Waking up the AI instance (this takes ~50s on the free tier)...
                </div>
            )}

            {/* 2-Column Grid Layout */}
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">

                {/* LEFT: Editor Panel */}
                <EditorPanel
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                />

                {/* RIGHT: Explainable AI Results */}
                <ResultsContainer
                    result={currentResult}
                    isAnalyzing={isAnalyzing}
                />

            </div>

            {/* BOTTOM: Activity Feed */}
            <HistoryFeed history={history} />

        </section>
    );
}
