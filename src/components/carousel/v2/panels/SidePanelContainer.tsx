'use client';

import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { cn } from '@/lib/utils';
import { X, ChevronUp, ChevronDown, Trash2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { Slide } from '@/lib/types';
import { toast } from 'sonner';

export function SidePanelContainer() {
    const { activePanel, setActivePanel } = useEditor();

    if (!activePanel) return null;

    return (
        <div className={cn(
            "w-[300px] h-full bg-white dark:bg-[#0c0c0c] border-r border-[#e5e5e5] dark:border-[#333] shadow-lg relative z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "flex flex-col"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5] dark:border-[#333] shrink-0">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#555] dark:text-[#aaa]">
                    {activePanel === 'ai' && 'AI Generator'}
                    {activePanel === 'outline' && 'Slide Outline'}
                    {activePanel === 'templates' && 'Templates & Brand'}
                    {activePanel === 'settings' && 'Backgrounds'}
                </h2>
                <button 
                    onClick={() => setActivePanel(null)}
                    className="p-1.5 -mr-1.5 rounded-md hover:bg-[#f5f5f5] dark:hover:bg-[#222] text-[#888] hover:text-foreground transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                {activePanel === 'outline' && <OutlineContent />}
                {activePanel === 'ai' && <AiGeneratorContent />}
                {activePanel === 'templates' && <PlaceholderContent title="Templates coming soon..." />}
                {activePanel === 'settings' && <PlaceholderContent title="Background controls coming soon..." />}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Content Components
// ─────────────────────────────────────────────────────────────────────────────

function OutlineContent() {
    const { slides, updateSlides, updateSlide, setActiveSlideId } = useEditor();
    
    const moveSlide = (index: number, direction: -1 | 1) => {
        if (index + direction < 0 || index + direction >= slides.length) return;
        const newSlides = [...slides];
        const temp = newSlides[index];
        newSlides[index] = newSlides[index + direction];
        newSlides[index + direction] = temp;
        updateSlides(newSlides);
    };

    const deleteSlide = (id: string) => {
        if (slides.length <= 1) return;
        updateSlides(slides.filter(s => s.id !== id));
    };

    const addSlide = () => {
        const newSlide: Slide = {
            id: Date.now().toString(),
            title: 'New Slide',
            content: 'Write something amazing here...',
            slideType: 'standard',
            layout: 'left'
        };
        updateSlides([...slides, newSlide]);
        setActiveSlideId(newSlide.id);
    };

    return (
        <div className="p-3 space-y-3 pb-24">
            {slides.map((s, i) => (
                <div 
                    key={s.id} 
                    className="p-3 rounded-xl border border-border/10 hover:border-border/30 bg-muted/10 hover:bg-muted/30 transition-colors group relative"
                    onClick={() => setActiveSlideId(s.id)}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Slide {i + 1}</div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); moveSlide(i, -1); }} disabled={i === 0} className="p-1 hover:bg-white dark:hover:bg-[#333] rounded text-muted-foreground disabled:opacity-30"><ChevronUp className="w-3.5 h-3.5" /></button>
                            <button onClick={(e) => { e.stopPropagation(); moveSlide(i, 1); }} disabled={i === slides.length - 1} className="p-1 hover:bg-white dark:hover:bg-[#333] rounded text-muted-foreground disabled:opacity-30"><ChevronDown className="w-3.5 h-3.5" /></button>
                            <button onClick={(e) => { e.stopPropagation(); deleteSlide(s.id); }} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-red-500 ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {s.showTagline !== false && (
                            <input 
                                className="w-full text-[10px] font-bold uppercase tracking-widest text-[#888] bg-transparent border-none p-0 focus:ring-0 placeholder:text-muted-foreground/30"
                                value={s.tagline || ''}
                                onChange={e => { updateSlide(s.id, 'tagline', e.target.value); }}
                                placeholder="TAGLINE (OPTIONAL)"
                                onClick={e => e.stopPropagation()}
                            />
                        )}
                        {s.slideType !== 'quote' && (
                            <input 
                                className="w-full text-xs font-bold leading-tight bg-transparent border-none p-0 focus:ring-0 placeholder:text-muted-foreground/50"
                                value={s.title}
                                onChange={e => { updateSlide(s.id, 'title', e.target.value); }}
                                placeholder="Title missing..."
                                onClick={e => e.stopPropagation()}
                            />
                        )}
                        <textarea 
                            className="w-full text-xs text-muted-foreground bg-transparent border-none p-0 focus:ring-0 resize-none placeholder:text-muted-foreground/40"
                            value={s.content}
                            onChange={e => { updateSlide(s.id, 'content', e.target.value); }}
                            placeholder="Write your content..."
                            rows={3}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                </div>
            ))}
            
            <button 
                onClick={addSlide}
                className="w-full py-3 border border-dashed border-border/40 rounded-xl text-xs font-semibold text-muted-foreground hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" /> Add Slide
            </button>
        </div>
    );
}

function AiGeneratorContent() {
    const { updateSlides } = useEditor();
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
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Topic / Prompt</label>
                <textarea 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. 5 productivity tips for startup founders"
                    className="w-full text-sm bg-[#f5f5f5] dark:bg-[#222] border border-border/10 rounded-xl p-3 focus:ring-1 focus:ring-blue-500 resize-none"
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Tone of Voice</label>
                <div className="grid grid-cols-3 gap-2">
                    {['pro', 'viral', 'fun'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTone(t as any)}
                            className={cn(
                                "py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors border",
                                tone === t 
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-300" 
                                    : "bg-transparent border-border/10 text-muted-foreground hover:bg-muted/50"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Length</label>
                <div className="grid grid-cols-3 gap-2">
                    {['S', 'M', 'L'].map((l) => (
                        <button
                            key={l}
                            onClick={() => setLength(l as any)}
                            className={cn(
                                "py-2 rounded-lg text-xs font-bold transition-colors border",
                                length === l 
                                    ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/30 dark:text-blue-300" 
                                    : "bg-transparent border-border/10 text-muted-foreground hover:bg-muted/50"
                            )}
                        >
                            {l === 'S' && 'Short (3-4)'}
                            {l === 'M' && 'Med (5-7)'}
                            {l === 'L' && 'Long (8+)'}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isGenerating ? 'Generating Magic...' : 'Generate Carousel'}
            </button>
        </div>
    );
}

function PlaceholderContent({ title }: { title: string }) {
    return (
        <div className="p-4 flex items-center justify-center h-full text-muted-foreground text-xs font-medium">
            {title}
        </div>
    );
}
