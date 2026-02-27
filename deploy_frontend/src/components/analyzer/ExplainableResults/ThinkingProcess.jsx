import { motion } from 'framer-motion';
import { Search, Brain, Activity, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const STEPS = [
    { icon: Search, label: "Parsing syntax and structures..." },
    { icon: Brain, label: "Detecting emotional cues..." },
    { icon: Activity, label: "Evaluating phrase polarity..." },
    { icon: CheckCircle2, label: "Finalizing sentiment matrix..." }
];

export default function ThinkingProcess() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Progress through steps every 600ms to simulate deep thought
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 bg-[var(--color-brand-card)]/90 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-sm space-y-6">

                {/* Main pulsing brain icon */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-full bg-[var(--color-brand-accent)]/10 flex items-center justify-center border border-[var(--color-brand-accent)]/30"
                    >
                        <Brain className="w-10 h-10 text-[var(--color-brand-accent)]" />
                    </motion.div>
                </div>

                {/* Timeline of steps */}
                <div className="space-y-4">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isPast = index < currentStep;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                    opacity: isActive || isPast ? 1 : 0.3,
                                    x: isActive || isPast ? 0 : -10
                                }}
                                className="flex items-center gap-4"
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500
                  ${isActive ? 'bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/50' :
                                        isPast ? 'bg-slate-800 text-slate-400' : 'bg-transparent text-slate-600 border border-slate-800'}`
                                }>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-500
                  ${isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-600'}`
                                }>
                                    {step.label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)] ml-auto"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
