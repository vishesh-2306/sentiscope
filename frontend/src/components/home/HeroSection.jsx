import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-24 pb-32 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-accent)]/10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="z-10 flex flex-col items-center"
            >


                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl">
                    Instantly understand the <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-accent)] to-purple-500">
                        emotion behind text.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                    The developer-first sentiment analysis engine. Paste text or connect our API to decode nuanced emotion and intent in real-time.
                </p>

                <div className="flex items-center gap-4">
                    <a
                        href="#analyzer"
                        className="inline-flex items-center gap-2 bg-white text-[var(--color-brand-navy)] px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Try the Demo
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="#docs"
                        className="inline-flex items-center gap-2 bg-[var(--color-brand-border)] text-white border border-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                    >
                        View Documentation
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
