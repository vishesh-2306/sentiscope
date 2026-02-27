import { motion } from 'framer-motion';

export default function HighlightedText({ highlights }) {
    if (!highlights || highlights.length === 0) return null;

    return (
        <div className="bg-[#0b0f15] border border-slate-800 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse" />
                    X-Ray Word Analysis
                </h4>
                <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider">
                    <span className="text-[var(--color-brand-green)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-green)]" /> Positive
                    </span>
                    <span className="text-[var(--color-brand-red)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-red)]" /> Negative
                    </span>
                </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-300 font-medium">
                {highlights.map((item, index) => {
                    let decoration = "pb-0.5 border-b-2 border-transparent transition-colors duration-300";

                    if (item.valence === 'positive') {
                        decoration = "text-white pb-0.5 border-b-2 border-[var(--color-brand-green)]/80 hover:bg-[var(--color-brand-green)]/10";
                    } else if (item.valence === 'negative') {
                        decoration = "text-white pb-0.5 border-b-2 border-[var(--color-brand-red)]/80 hover:bg-[var(--color-brand-red)]/10";
                    }

                    // If it's punctuation, don't add a leading space unless index is 0
                    const isPunctuation = /^[^\w\s]+$/.test(item.word);
                    const needsSpace = index > 0 && !isPunctuation;

                    return (
                        <span key={index}>
                            {needsSpace ? " " : ""}
                            <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 + 0.5, duration: 0.3 }}
                                className={`${decoration} cursor-default relative group`}
                            >
                                {item.word}
                            </motion.span>
                        </span>
                    );
                })}
            </p>
        </div>
    );
}
