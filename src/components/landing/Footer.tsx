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

                    <p className="text-sm text-slate-500 font-medium tracking-tight">
                        The secret weapon for <span className="text-slate-900 dark:text-white">LinkedIn Growth</span>. Create viral carousels in seconds.
                    </p>
                </div>
            </div>
        </footer>
    );
};
