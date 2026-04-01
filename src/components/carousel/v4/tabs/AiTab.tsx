import React, { useState } from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function AiTab() {
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
            if (data.slides && Array.isArray(data.slides)) {
                updateSlides(data.slides);
                setActiveSlideId(data.slides[0].id);
                toast.success(`Generated ${data.slides.length} slides successfully!`);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err: any) {
            console.error('AI Error:', err);
            toast.error(err.message || 'Failed to generate carousel. Check console.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
            <div className="text-center space-y-2 mb-8">
                <Sparkles className="w-12 h-12 mx-auto text-indigo-500 mb-4" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold tracking-tight">AI Generation</h2>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Type a topic and our AI will automatically research, write, and format an entire carousel for you.
                </p>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block ml-1">What is breaking news or your topic?</label>
                <textarea 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. 5 productivity tips that actually work for startup founders in 2024..."
                    className="w-full text-base bg-white dark:bg-[#111] border border-border/20 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/50 resize-none shadow-sm transition-shadow"
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block ml-1">Vibe / Tone</label>
                    <div className="flex flex-col gap-2">
                        {['pro', 'viral', 'fun'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTone(t as any)}
                                className={cn(
                                    "py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                                    tone === t 
                                        ? "bg-indigo-50 text-indigo-600 ring-2 ring-indigo-500/50 shadow-sm dark:bg-indigo-500/20 dark:text-indigo-400" 
                                        : "bg-white dark:bg-[#111] border border-border/10 text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block ml-1">Length</label>
                    <div className="flex flex-col gap-2">
                        {['S', 'M', 'L'].map((l) => (
                            <button
                                key={l}
                                onClick={() => setLength(l as any)}
                                className={cn(
                                    "py-3 rounded-xl text-xs font-bold transition-all",
                                    length === l 
                                        ? "bg-blue-50 text-blue-600 ring-2 ring-blue-500/50 shadow-sm dark:bg-blue-500/20 dark:text-blue-400" 
                                        : "bg-white dark:bg-[#111] border border-border/10 text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                {l === 'S' && 'Short (3-4 text slides)'}
                                {l === 'M' && 'Medium (5-7 slides)'}
                                {l === 'L' && 'Long (8+ deep dive)'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full py-4 mt-8 rounded-2xl bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? 'WRITING & DESIGNING...' : 'GENERATE MY CAROUSEL'}
            </button>
        </div>
    );
}
