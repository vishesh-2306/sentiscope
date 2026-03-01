import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ThinkingProcess from './ThinkingProcess';
import HighlightedText from './HighlightedText';
import MetricBars from './MetricBars';

export default function ResultsContainer({ result, isAnalyzing }) {
    const getStyleForCategory = (category) => {
        switch (category) {
            case 'Positive': return { color: 'var(--color-brand-green)', icon: '🤩' };
            case 'Negative': return { color: 'var(--color-brand-red)', icon: '😞' };
            default: return { color: 'var(--color-brand-amber)', icon: '😐' };
        }
    };

    return (
        <div className="bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[450px]">

            {/* Idle State */}
            {!result && !isAnalyzing && (
                <div className="text-center text-slate-500">
                    <div className="w-20 h-20 rounded-full bg-[var(--color-brand-border)]/30 flex items-center justify-center mx-auto mb-6">
                        <ChevronRight className="w-10 h-10 opacity-40 text-[var(--color-brand-accent)]" />
                    </div>
                    <p className="text-lg">Awaiting text input for analysis...</p>
                    <p className="text-sm mt-2 opacity-60">Results will appear here with X-Ray vision.</p>
                </div>
            )}

            {/* Thinking State */}
            {isAnalyzing && <ThinkingProcess />}

            {/* Result State */}
            <AnimatePresence>
                {result && !isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex flex-col"
                    >
                        {/* Top Sentiment Badge */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--color-brand-border)]">
                            <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Final Verdict</div>
                                <h3
                                    className="text-4xl font-extrabold tracking-tight flex items-center gap-3"
                                    style={{ color: getStyleForCategory(result.sentiment).color }}
                                >
                                    <span className="text-3xl">{getStyleForCategory(result.sentiment).icon}</span>
                                    {result.sentiment}
                                </h3>
                            </div>

                        </div>

                        {/* X-Ray Highlighted Text View */}
                        <HighlightedText highlights={result.word_highlights} />

                        {/* Metric Bars (Tone Strength & Polarity) */}
                        <MetricBars breakdown={result.breakdown} />

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
