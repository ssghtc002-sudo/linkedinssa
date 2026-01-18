import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export const CTA = () => {
    return (
        <section className="py-20 md:py-24">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 px-6 py-10 md:py-12 text-center shadow-2xl isolate max-w-2xl mx-auto">
                    {/* Sexy Animated Gradient Background */}
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
                        <div className="relative left-[50%] aspect-[1155/678] w-[30rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-indigo-900 opacity-20"></div>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-bold text-blue-400 backdrop-blur-md uppercase tracking-[0.2em]">
                            <Sparkles className="mr-1.5 h-3 w-3" />
                            Ready to grow?
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                            Stop Waiting. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">Start Viral.</span>
                        </h2>

                        <p className="text-[11px] md:text-xs text-slate-400 max-w-xs mx-auto font-medium leading-relaxed opacity-80">
                            Create AI carousels in 30 seconds.
                            <span className="block text-white">Free forever. Zero friction.</span>
                        </p>

                        <div className="pt-2">
                            <Link href="/create">
                                <Button size="sm" className="h-10 px-8 text-[11px] font-black uppercase italic bg-white text-slate-900 hover:bg-white/90 shadow-lg hover:scale-105 transition-all duration-300 rounded-xl">
                                    Generate <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
