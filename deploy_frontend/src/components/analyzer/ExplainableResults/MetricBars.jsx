import { motion } from 'framer-motion';

export default function MetricBars({ breakdown }) {
    if (!breakdown) return null;

    const positive = breakdown.positive || 0;
    const neutral = breakdown.neutral || 0;
    const negative = breakdown.negative || 0;

    return (
        <div className="space-y-6">

            {/* Polarity Breakdown */}
            <div>
                <div className="flex justify-between items-end mb-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Polarity Conflict</h4>
                    <span className="text-xs text-slate-500 font-mono">100% distribution</span>
                </div>

                {/* Tri-color stacked bar */}
                <div className="w-full h-3 flex bg-slate-800 rounded-full overflow-hidden shadow-inner flex-row">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${positive}%` }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="h-full bg-[var(--color-brand-green)] border-r border-[#0b0f15]"
                        title={`Positive: ${positive.toFixed(1)}%`}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${neutral}%` }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="h-full bg-[var(--color-brand-amber)] border-r border-[#0b0f15]"
                        title={`Neutral: ${neutral.toFixed(1)}%`}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${negative}%` }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="h-full bg-[var(--color-brand-red)]"
                        title={`Negative: ${negative.toFixed(1)}%`}
                    />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold tracking-wider uppercase">
                    <span className="text-[var(--color-brand-green)]">{positive.toFixed(1)}%</span>
                    <span className="text-[var(--color-brand-amber)]">{neutral.toFixed(1)}%</span>
                    <span className="text-[var(--color-brand-red)]">{negative.toFixed(1)}%</span>
                </div>
            </div>

            {/* Tone Strength */}
            {breakdown.tone_strength !== undefined && (
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">Tone Strength</h4>
                        <span className="text-sm font-bold text-white font-mono">{breakdown.tone_strength.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-[#0b0f15] rounded-full h-2 shadow-inner overflow-hidden border border-slate-800">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${breakdown.tone_strength}%` }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r rounded-r-none
                  ${breakdown.positive > breakdown.negative ? 'from-green-900 via-[var(--color-brand-green)] to-green-400' : 'from-red-900 via-[var(--color-brand-red)] to-red-400'}
                `}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
