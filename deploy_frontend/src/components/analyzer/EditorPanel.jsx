import { useState, useRef, useEffect } from 'react';
import { MessageSquareQuote, Zap } from 'lucide-react';
import { sampleTexts } from '../../utils/mockData';

export default function EditorPanel({ onAnalyze, isAnalyzing }) {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    return (
        <div className="bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden group">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-accent)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-2 mb-6">
                <MessageSquareQuote className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-medium text-white tracking-wide">Analysis Input</h2>
            </div>

            <div className="relative flex-1 flex flex-col min-h-[200px]">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste text to decode emotional sentiment..."
                    className="w-full flex-1 bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0 resize-none text-lg leading-relaxed"
                    style={{ minHeight: '150px' }}
                />
            </div>

            <div className="flex justify-between items-center text-xs font-medium text-slate-500 uppercase tracking-widest mt-4 pt-4 border-t border-slate-800/50 mb-6">
                <span>{wordCount} words &bull; {text.length} characters</span>
                <button
                    onClick={() => setText(sampleTexts[0])}
                    className="hover:text-[var(--color-brand-accent)] transition-colors flex items-center gap-1"
                >
                    Load Sample
                </button>
            </div>

            <button
                onClick={() => onAnalyze(text)}
                disabled={!text.trim() || isAnalyzing}
                className="mt-auto w-full bg-white text-[var(--color-brand-navy)] hover:bg-slate-200 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
                <Zap className="w-5 h-5" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
            </button>
        </div>
    );
}
