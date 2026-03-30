'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Sparkles, RefreshCw, BarChart3, MessageSquare, Zap, BookOpen } from 'lucide-react';

export const ReadabilityOptimizer = () => {
    const [text, setText] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = async () => {
        if (!text.trim()) return;
        setIsOptimizing(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'rewrite',
                    topic: text,
                }),
            });

            if (!response.ok) throw new Error('Failed to optimize text');
            const data = await response.json();
            setText(data.result);
        } catch (error: any) {
            console.error('AI Optimization Error:', error);
        } finally {
            setIsOptimizing(false);
        }
    };

    const countSyllables = (word: string) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 1;
    };

    const analyzeText = () => {
        if (!text.trim()) return null;

        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const totalWords = words.length;
        const totalSentences = sentences.length || 1;
        const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

        const score = 206.835 -
            (1.015 * (totalWords / totalSentences)) -
            (84.6 * (totalSyllables / totalWords));

        return {
            score: Math.min(100, Math.max(0, Math.round(score))),
            words: totalWords,
            sentences: totalSentences,
            syllables: totalSyllables,
            avgSentenceLength: (totalWords / totalSentences).toFixed(1),
        };
    };

    const stats = analyzeText();

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-500';
        if (score >= 60) return 'bg-blue-500';
        if (score >= 40) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return 'Ultra Readable';
        if (score >= 80) return 'Highly Accessible';
        if (score >= 70) return 'Easy Reading';
        if (score >= 60) return 'LinkedIn Optimal';
        if (score >= 50) return 'Slightly Complex';
        if (score >= 30) return 'Academic Level';
        return 'Advanced Corporate';
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 h-full">
            {/* Input Configurator (Left Column) */}
            <div className="lg:col-span-5 space-y-6">
                <div className="p-6 md:p-8 rounded-[2rem] bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white dark:border-slate-800/60 shadow-[inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-none transition-all relative overflow-hidden flex flex-col h-full lg:max-h-[85vh]">
                    {/* Subtle Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full space-y-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2">
                                <MessageSquare className="w-5 h-5 text-emerald-500" />
                                Post Content
                            </Label>
                        </div>

                        <div className="flex-1 min-h-[300px]">
                            <Textarea
                                placeholder="Paste your draft post here to see its readability score and get AI improvements..."
                                className="w-full h-full text-base lg:text-lg resize-none bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-emerald-500/50 leading-relaxed p-6"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={handleOptimize}
                                disabled={!text.trim() || isOptimizing}
                                className={`w-full h-14 rounded-2xl text-lg font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xl hover:-translate-y-1 relative overflow-hidden border-0 text-white ${!text.trim() ? 'opacity-50 grayscale cursor-not-allowed shadow-none' : 'hover:shadow-2xl hover:shadow-emerald-500/20'}`}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-[200%] -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></div>
                                {isOptimizing ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                                        Optimizing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-all duration-300" />
                                        AI Clarity Boost
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Stats (Right Column) */}
            <div className="lg:col-span-7 h-full flex flex-col min-h-full">
                <div className="p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-xl flex-1 flex flex-col relative h-full transition-all duration-500 overflow-hidden">
                    
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-white/5 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center font-black text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 lg:w-14 lg:h-14 shrink-0 shadow-inner">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Clarity Dashboard</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-1 flex items-center gap-1">
                                    <Zap className="w-3 h-3 fill-emerald-500" /> Flesch-Kincaid Metric
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar pb-6 relative z-10">
                        {stats ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="text-center mb-10">
                                    <div className={`text-8xl font-black mb-4 tracking-tighter ${stats.score >= 60 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {stats.score}
                                    </div>
                                    <Badge variant="outline" className="text-xs uppercase tracking-widest px-6 py-2 rounded-full font-black border-2 bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                                        {getScoreLabel(stats.score)}
                                    </Badge>
                                </div>

                                <div className="space-y-4 mb-10 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Reading Simplicity</span>
                                        <span>{stats.score}%</span>
                                    </div>
                                    <Progress value={stats.score} className="h-4 bg-slate-200 dark:bg-slate-800" />
                                    <div className="flex justify-between text-[9px] font-bold text-slate-400 px-1 pt-1 opacity-60">
                                        <span>Professional / Dense</span>
                                        <span>Conversational / Viral</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pb-10">
                                    <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Global Reach</div>
                                        <div className="font-black text-2xl text-slate-800 dark:text-slate-200">{stats.words} Words</div>
                                    </div>
                                    <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Structure Flow</div>
                                        <div className="font-black text-2xl text-slate-800 dark:text-slate-200">{stats.avgSentenceLength} / Sntnc</div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-100 dark:border-emerald-800/40 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <BookOpen className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Optimization Roadmap
                                    </h3>
                                    <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {stats.score < 60 ? (
                                            <>
                                                <li className="flex gap-3">
                                                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">1</span>
                                                    <span>Shorten sentences to under 15 words for maximum retention.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">2</span>
                                                    <span>Replace multi-syllable jargon with common "coffee-shop" vocabulary.</span>
                                                </li>
                                            </>
                                        ) : (
                                            <li className="flex gap-3 text-emerald-600 dark:text-emerald-400 font-bold">
                                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                                <span>Legendary readability! Your post is primed for viral engagement.</span>
                                            </li>
                                        )}
                                        {parseFloat(stats.avgSentenceLength) > 20 && (
                                            <li className="flex gap-3">
                                                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-[8px] font-black shrink-0 mt-0.5">!</span>
                                                <span>Large text blocks detected. Add more line breaks for mobile scrollers.</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40">
                                <div className="text-center animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-white/5">
                                        <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">Algorithm Ready?</p>
                                    <p className="text-sm max-w-xs mx-auto">Paste message on the left to measure the likelihood of audience engagement.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            LinkedIn Authority Score • CarouselGem AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
