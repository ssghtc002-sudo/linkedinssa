'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Star, User, Zap, Layout } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const Hero = () => {
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const suggestions = [
        "How to scale a SaaS to $10k MRR",
        "10 Productivity hacks for founders",
        "Why personal branding is the new Resume",
        "The future of AI in Marketing",
        "Storytelling tips for LinkedIn posts"
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentFullText = suggestions[placeholderIndex];

            if (!isDeleting) {
                setPlaceholder(currentFullText.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);

                if (charIndex + 1 === currentFullText.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setPlaceholder(currentFullText.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);

                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
                }
            }
        }, isDeleting ? 30 : 70);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, placeholderIndex, suggestions]);

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();

        if (!topic.trim()) {
            router.push('/create');
        } else {
            router.push(`/create?topic=${encodeURIComponent(topic)}`);
        }
    };

    return (
        <section className="relative pt-20 pb-10 md:pt-24 md:pb-16 overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500/20 opacity-20 blur-[100px]"></div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-40 blur-[120px] pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen animate-blob"></div>
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 mx-auto max-w-5xl relative">

                {/* Badge */}
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 px-3 py-1 text-[10px] md:text-sm font-bold text-blue-600 dark:text-blue-300 mb-6 md:mb-8 shadow-sm hover:scale-105 transition-transform cursor-default uppercase tracking-widest italic">
                    <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 mr-2 fill-blue-600 dark:fill-blue-300" />
                    <span>#1 Free AI Carousel Maker 2026</span>
                </div>

                {/* Headline */}
                <h1 className="text-[2.25rem] md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 md:mb-6 leading-[1.05] italic uppercase shrink-0">
                    AI Carousel Maker <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                        & Generator 2026
                    </span>
                </h1>

                <p className="text-base md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium px-4 italic uppercase tracking-tight">
                    The Ultimate <span className="text-slate-900 dark:text-white border-b-2 border-blue-500/30">LinkedIn Content Engine</span>.
                    <span className="block mt-1 text-muted-foreground/60 font-bold text-[10px] md:text-sm uppercase tracking-widest">Free AI Carousel Generator • No Design Skills • High DPI PDF</span>
                </p>

                {/* Interactive Input */}
                <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-20 px-4 md:px-0">
                    <form onSubmit={handleStart} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-gradient-x"></div>

                        <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 p-1.5 sm:p-2 bg-white dark:bg-slate-950 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-800 sm:border-slate-300/50 sm:dark:border-slate-700/50 rounded-2xl sm:rounded-full shadow-xl transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-2xl focus-within:shadow-blue-500/20 hover:border-slate-400 dark:hover:border-slate-600 overflow-hidden">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                                <Zap className="w-5 h-5 text-blue-500" />
                            </div>

                            <div className="flex-1 relative">
                                <Input
                                    placeholder={placeholder}
                                    className="border-0 shadow-none focus-visible:ring-0 text-sm sm:text-base md:text-lg h-11 sm:h-14 bg-transparent placeholder:text-muted-foreground/60 w-full sm:pl-14 pl-4 pr-4 font-medium transition-all"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </div>

                            <Button
                                size="lg"
                                type="submit"
                                className="relative overflow-hidden rounded-xl sm:rounded-full px-6 sm:px-8 h-11 sm:h-14 text-xs sm:text-base font-bold shadow-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shrink-0 w-full sm:w-auto transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] border-0 group/btn"
                            >
                                <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                                <span className="relative z-10 uppercase italic font-black tracking-widest text-[10px] md:text-sm">Launch Generator</span>
                            </Button>
                        </div>
                    </form>

                    {/* Meta Value Props */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Layout className="w-3.5 h-3.5 text-blue-500" />
                            <span>Carousel Maker</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>AI Generator</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span>100% Free 2026</span>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col items-center gap-3 mb-12 md:mb-16">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden shadow-md bg-slate-200">
                                <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={40} height={40} unoptimized />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 italic">#1 Rated Carousel Tool</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
