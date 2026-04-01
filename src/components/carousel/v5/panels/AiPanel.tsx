'use client';

import React, { useState } from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { Sparkles, Loader2, Wand2, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AiPanel() {
    const { updateSlides, setActiveSlideId } = useEditor();
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState<'pro' | 'viral' | 'fun'>('pro');
    const [length, setLength] = useState<'S' | 'M' | 'L'>('M');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error('Please enter a topic');
            return;
        }
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'carousel', topic, tone, length }),
            });
            if (!res.ok) throw new Error('Generation failed');
            const data = await res.json();
            if (data.slides) {
                updateSlides(data.slides);
                setActiveSlideId(data.slides[0].id);
                toast.success('Generated successfully!');
            }
        } catch (err: any) {
            toast.error('AI error. Try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            
            {/* Topic Input */}
            <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500/60 transition-all">Topic / Prompt</label>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/5 border border-purple-500/10">
                        <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase text-purple-500/80">Gem AI v5</span>
                    </div>
                </div>
                <div className="relative group">
                    {/* Glowing Border Background */}
                    <div className="absolute -inset-[1px] rounded-[1.8rem] bg-gradient-to-br from-purple-600/30 to-blue-600/30 opacity-0 group-focus-within:opacity-100 blur-[2px] transition-all duration-500" />
                    <textarea 
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        placeholder="What's on your mind? (e.g. 5 steps to build a personal brand...)"
                        className="relative w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[1.7rem] p-5 focus:ring-0 focus:outline-none transition-all resize-none shadow-sm h-32 leading-relaxed"
                    />
                </div>
            </div>

            {/* Controls Bar */}
            <div className="grid grid-cols-2 gap-3">
                {/* Tone */}
                <div className="space-y-2.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Vibe</label>
                    <div className="flex p-1 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        {['pro', 'viral', 'fun'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTone(t as any)}
                                className={cn(
                                    "flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all",
                                    tone === t 
                                        ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm" 
                                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Length */}
                <div className="space-y-2.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Length</label>
                    <div className="flex p-1 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        {['S', 'M', 'L'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLength(l as any)}
                                className={cn(
                                    "flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all",
                                    length === l 
                                        ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm" 
                                        : "text-slate-400 hover:text-slate-600 dark:text-slate-500"
                                )}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Build Button */}
            <div className="pt-2">
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full py-4.5 h-16 rounded-[2rem] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" strokeWidth={3} />}
                    {isGenerating ? 'Gem Engine Working...' : 'Write Post-Magic'}
                </button>
            </div>
            
            {/* Tip Card */}
            <div className="p-5 rounded-[1.8rem] bg-purple-500/5 border border-purple-500/10 flex gap-3 animate-pulse">
                <RefreshCcw className="w-5 h-5 text-purple-500 shrink-0" />
                <p className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest leading-relaxed">
                    AI will overwrite all slides. Make snapshots before generating!
                </p>
            </div>
        </div>
    );
}
