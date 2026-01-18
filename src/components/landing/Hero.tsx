'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Star, User } from 'lucide-react';
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
            // If empty, just go to the editor without triggering generation
            router.push('/create');
        } else {
            // If user typed something, go to editor and trigger generation
            router.push(`/create?topic=${encodeURIComponent(topic)}`);
        }
    };

    return (
        <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 overflow-hidden flex flex-col items-center text-center">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-40 blur-[120px] pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen animate-blob"></div>
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 mx-auto max-w-5xl relative">

                {/* Badge */}
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 px-3 py-1 text-xs md:text-sm font-medium text-blue-600 dark:text-blue-300 mb-4 md:mb-6 shadow-sm hover:scale-105 transition-transform cursor-default">
                    <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 mr-2 fill-blue-600 dark:fill-blue-300" />
                    <span className="tracking-wide">#1 AI Carousel Generator</span>
                </div>

                {/* Headline - Punchier & High Impact */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-8 leading-[1]">
                    Viral Carousels <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                        in Seconds.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-tight font-medium px-4">
                    The secret weapon for <span className="text-slate-900 dark:text-white border-b-2 border-blue-500/30">LinkedIn Growth</span>.
                    <span className="block mt-2 text-muted-foreground font-normal text-base md:text-xl">Zero design skills. Zero friction. Pure impact.</span>
                </p>

                {/* Interactive Input - Ultra Sleek Design */}
                <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-20 px-4 md:px-0">
                    <form onSubmit={handleStart} className="relative group">
                        {/* Animated Gradient Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-gradient-x"></div>

                        {/* Main Input Container */}
                        <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3 p-2 sm:p-2 bg-white dark:bg-slate-950 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-800 sm:border-slate-300/50 sm:dark:border-slate-700/50 rounded-2xl sm:rounded-full shadow-xl transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-2xl focus-within:shadow-blue-500/20 hover:border-slate-400 dark:hover:border-slate-600 overflow-hidden">

                            {/* Sparkles Icon - Desktop Only */}
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                                <div className="relative">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    <div className="absolute inset-0 blur-sm">
                                        <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Input Field */}
                            <div className="flex-1 relative">
                                <Input
                                    placeholder={placeholder}
                                    className="border-0 shadow-none focus-visible:ring-0 text-sm sm:text-base md:text-lg h-12 sm:h-14 bg-transparent placeholder:text-muted-foreground/60 w-full sm:pl-14 pl-4 pr-4 font-medium transition-all"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                                {/* Mobile Sparkles - Inline */}
                                {!topic && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none sm:hidden">
                                        <Sparkles className="w-4 h-4 text-blue-400 opacity-30" />
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <Button
                                size="lg"
                                type="submit"
                                className="relative overflow-hidden rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shrink-0 w-full sm:w-auto transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] border-0 group/btn"
                            >
                                {/* Button Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>

                                {/* Dynamic Icon Animation */}
                                <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                                <span className="relative z-10">Generate Free</span>

                                {/* Pulse Effect on Button */}
                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active/btn:opacity-20 transition-opacity"></div>
                            </Button>
                        </div>
                    </form>

                    {/* Quick Suggestions - Sleeker Design */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Popular:</span>
                        {[
                            { text: "Marketing Psychology", icon: "🧠" },
                            { text: "AI Productivity", icon: "⚡" },
                            { text: "LinkedIn Growth", icon: "📈" }
                        ].map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => setTopic(suggestion.text)}
                                className="group/chip relative text-xs px-4 py-2 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 font-semibold shadow-sm hover:shadow-md"
                            >
                                <span className="mr-1.5">{suggestion.icon}</span>
                                {suggestion.text}
                                {/* Chip Glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-pink-400/0 opacity-0 group-hover/chip:opacity-100 transition-opacity blur-sm -z-10"></div>
                            </button>
                        ))}
                    </div>

                    {/* Value Proposition - More Prominent */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <span className="relative inline-flex">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg uppercase tracking-wide">100% Free</span>
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="hidden sm:inline">•</span>
                            <span className="font-medium">No credit card</span>
                            <span>•</span>
                            <span className="font-medium">Unlimited carousels</span>
                        </div>
                    </div>
                </div>

                {/* Social Proof - Compact on Mobile */}
                <div className="flex flex-col items-center gap-3 mb-12 md:mb-16 animate-fade-in-up delay-200">
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                        {[
                            'https://randomuser.me/api/portraits/women/44.jpg',
                            'https://randomuser.me/api/portraits/men/32.jpg',
                            'https://randomuser.me/api/portraits/women/68.jpg',
                            'https://randomuser.me/api/portraits/men/86.jpg',
                            'https://randomuser.me/api/portraits/women/90.jpg'
                        ].map((photo, i) => (
                            <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background overflow-hidden shadow-md relative bg-gray-200">
                                <Image
                                    src={photo}
                                    alt={`Creator ${i + 1}`}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        ))}
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white shadow-md">
                            +10k
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />)}
                        </div>
                        <span className="text-muted-foreground ml-2">Loved by creators worldwide</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
