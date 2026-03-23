import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="py-8 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
                    <Link href="/" className="flex items-center gap-2 group transition-all">
                        <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black transition-transform group-hover:rotate-12">
                            <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase italic">
                            Carousel<span className="text-blue-600">Gem</span>
                        </span>
                    </Link>

                    <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>

                    <p className="text-sm text-slate-400 font-medium tracking-tight">
                        The secret weapon for <span className="text-slate-900 dark:text-white">LinkedIn Growth</span>.
                    </p>

                    <div className="flex items-center gap-6 mt-4 md:mt-0 md:ml-auto">
                        <Link href="/about" className="text-xs font-black uppercase italic tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-xs font-black uppercase italic tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                        <Link href="/tools" className="text-xs font-black uppercase italic tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                            Tools
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-700">
                        © 2025 CarouselGem. Built by <span className="text-slate-400 dark:text-slate-500">Shyam Sunder Goyal</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
