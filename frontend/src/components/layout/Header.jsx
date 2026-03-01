import { BrainCircuit, Github } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[var(--color-brand-border)] bg-[var(--color-brand-navy)]/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="w-6 h-6 text-[var(--color-brand-accent)]" />
                    <span className="font-bold text-lg tracking-tight text-white">SentimentAI</span>
                </div>

                <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
                    <a href="#analyzer" className="hover:text-white transition-colors">Analyzer</a>
                    <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>

                </nav>
            </div>
        </header>
    );
}
