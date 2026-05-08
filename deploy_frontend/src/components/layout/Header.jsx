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
                    <a href="https://github.com/vishesh-2306/sentiscope" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                        <Github className="w-5 h-5" />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
