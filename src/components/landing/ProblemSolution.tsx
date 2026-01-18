import { X, Check } from 'lucide-react';

export const ProblemSolution = () => {
    return (
        <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/20 relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-[1.1]">
                        Stop Designing, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                            Start Growing.
                        </span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
                        Resizing pixel by pixel is for 1999. Let AI handle the heavy lifting while you focus on the story.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {/* The Old Way */}
                    <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 transition-all duration-500 group">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-xl uppercase tracking-widest text-slate-400">The Hard Way</h3>
                            <span className="text-[10px] font-black uppercase text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">Slow</span>
                        </div>
                        <ul className="space-y-5">
                            {[
                                "2+ hours per carousel",
                                "Struggling with Canva",
                                "Manual resizing hell",
                                "Inconsistent branding",
                                "Writer's block"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-400 transition-colors group-hover:text-slate-500">
                                    <X className="w-5 h-5 shrink-0 text-red-400/50" />
                                    <span className="text-sm md:text-base font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* The New Way */}
                    <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500">
                        {/* Interactive Glow */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-blue-500/20 blur-[40px] group-hover:bg-blue-500/30 transition-all duration-500"></div>

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-xl uppercase tracking-widest text-blue-600">The Smart Way</h3>
                            <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-2 py-1 rounded-full animate-pulse">Save 90% Time</span>
                        </div>
                        <ul className="space-y-5">
                            {[
                                "Generated in 30 seconds",
                                "Zero design skills needed",
                                "Perfect LinkedIn sizing",
                                "Auto-Brand Kit matching",
                                "AI-Powered Hooks"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-900/40">
                                        <Check className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
