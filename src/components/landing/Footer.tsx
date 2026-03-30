import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="relative bg-slate-50 dark:bg-slate-950 pt-20 pb-10 overflow-hidden border-t border-slate-200 dark:border-slate-900">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] max-w-4xl opacity-30 dark:opacity-20 blur-[100px] pointer-events-none bg-gradient-to-b from-blue-100 to-transparent dark:from-blue-900/40"></div>
            
            <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="flex items-center gap-3 group transition-all mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="font-black text-2xl tracking-tighter uppercase italic text-slate-900 dark:text-white">
                                Carousel<span className="text-blue-600">Gem</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 max-w-xs">
                            The definitive toolkit for creators. Transform ideas into viral LinkedIn content in seconds.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            All Systems Operational
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col sm:flex-row gap-12 sm:gap-24 justify-center md:justify-end">
                        <div className="flex flex-col gap-4 text-center sm:text-left">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white italic mb-2">Product</h4>
                            <Link href="/create" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">Carousel Maker</Link>
                            <Link href="/tools" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">Free Tools Suite</Link>
                            <Link href="/tools/linkedin-post-generator" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">AI Post Writer</Link>
                        </div>
                        
                        <div className="flex flex-col gap-4 text-center sm:text-left">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white italic mb-2">Company</h4>
                            <Link href="/about" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">About Us</Link>
                            <Link href="/contact" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">Contact</Link>
                            <a href="#" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} CarouselGem. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/company/carouselgem/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all shadow-sm">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
