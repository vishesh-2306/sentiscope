import { motion, AnimatePresence } from 'framer-motion';
import { History } from 'lucide-react';

export default function HistoryFeed({ history }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="mt-16 border-t border-[var(--color-brand-border)] pt-12">
            <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                    {history.map((item, index) => {
                        const isPos = item.sentiment_category === 'Positive';
                        const isNeg = item.sentiment_category === 'Negative';
                        const color = isPos ? 'var(--color-brand-green)' : isNeg ? 'var(--color-brand-red)' : 'var(--color-brand-amber)';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] p-4 rounded-xl flex flex-col gap-3 group hover:border-slate-600 transition-colors"
                                title={item.text}
                            >
                                <div className="flex justify-between items-start">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                                        style={{ color: color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
                                    >
                                        {item.sentiment}
                                    </span>

                                </div>
                                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                                    "{item.text}"
                                </p>
                                <div className="mt-auto pt-3 flex justify-between items-center text-xs border-t border-slate-800">
                                    <span className="text-slate-500">ID: {item.id.slice(0, 6)}</span>
                                    <span className="font-mono text-slate-400">{Number(item.confidence).toFixed(1)}%</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
