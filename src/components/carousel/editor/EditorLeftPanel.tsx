'use client';
import React, { useState } from 'react';
import {
    Sparkles, Loader2, Briefcase, Zap, Coffee,
    ChevronDown, ChevronUp, Layers, Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slide } from '@/lib/types';
import { SlideCard } from '../SlideCard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EditorLeftPanelProps {
    // AI
    topicInput: string;
    setTopicInput: (v: string) => void;
    aiTone: string;
    setAiTone: (t: string) => void;
    aiLength: string;
    setAiLength: (l: string) => void;
    onAiGenerate: (topic: string) => void;
    isGenerating: boolean;
    // Slides
    slides: Slide[];
    setSlides: (slides: Slide[]) => void;
    hideSlides?: boolean;
}

const TONES = [
    { id: 'professional', label: 'Pro', icon: Briefcase, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { id: 'viral', label: 'Viral', icon: Zap, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { id: 'casual', label: 'Fun', icon: Coffee, color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
];

const LENGTHS = [
    { id: 'short', label: 'Short', hint: '3 slides' },
    { id: 'medium', label: 'Medium', hint: '5–8' },
    { id: 'long', label: 'Long', hint: '8+' },
];

export function EditorLeftPanel({
    topicInput, setTopicInput,
    aiTone, setAiTone,
    aiLength, setAiLength,
    onAiGenerate, isGenerating,
    slides, setSlides,
    hideSlides = false,
}: EditorLeftPanelProps) {
    const [aiOpen, setAiOpen] = useState(true);

    const addSlide = () => {
        const newSlide: Slide = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Slide',
            content: 'Add your content here.',
            layout: 'left',
        };
        setSlides([...slides, newSlide]);
    };

    const removeSlide = (id: string) => {
        if (slides.length <= 1) return;
        setSlides(slides.filter((s) => s.id !== id));
    };

    const updateSlide = (id: string, field: keyof Slide, value: string) => {
        setSlides(slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    };

    const moveSlide = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === slides.length - 1) return;
        const arr = [...slides];
        const target = direction === 'up' ? index - 1 : index + 1;
        [arr[index], arr[target]] = [arr[target], arr[index]];
        setSlides(arr);
    };

    const duplicateSlide = (index: number) => {
        const copy = { ...slides[index], id: Math.random().toString(36).substr(2, 9), title: slides[index].title + ' (Copy)' };
        const arr = [...slides];
        arr.splice(index + 1, 0, copy);
        setSlides(arr);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* ── AI Generator ─────────────────────────────────────── */}
            <div className="shrink-0 border-b border-border/10">
                {/* Header */}
                <button
                    onClick={() => setAiOpen(!aiOpen)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors"
                >
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-[11px] font-bold leading-tight">AI Generator</p>
                        <p className="text-[9px] text-muted-foreground">Create slides in seconds</p>
                    </div>
                    <div className="text-muted-foreground shrink-0">
                        {aiOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                </button>

                {/* Body */}
                {aiOpen && (
                    <div className="px-3 pb-3 space-y-2.5 animate-in slide-in-from-top-2 duration-200 bg-gradient-to-b from-violet-50/50 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/10">
                        {/* Topic */}
                        <Input
                            placeholder="e.g. '5 productivity tips for founders'"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onAiGenerate(topicInput)}
                            className="h-9 text-xs bg-white dark:bg-slate-900 border-violet-200/60 dark:border-violet-800/40 focus-visible:ring-violet-500/30 rounded-xl placeholder:text-muted-foreground/50"
                        />

                        {/* Tone */}
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Tone</p>
                            <div className="grid grid-cols-3 gap-1.5">
                                {TONES.map((t) => {
                                    const active = aiTone === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setAiTone(t.id)}
                                            className={cn(
                                                "flex flex-col items-center gap-1 py-2 rounded-xl text-[9px] font-bold transition-all border",
                                                active
                                                    ? `bg-gradient-to-b ${t.color} text-white shadow-md border-transparent`
                                                    : `${t.bg} border-current/10 hover:brightness-105`
                                            )}
                                        >
                                            <t.icon className="w-3.5 h-3.5" />
                                            {t.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Length */}
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Length</p>
                            <div className="grid grid-cols-3 gap-1.5">
                                {LENGTHS.map((l) => {
                                    const active = aiLength === l.id;
                                    return (
                                        <button
                                            key={l.id}
                                            onClick={() => setAiLength(l.id)}
                                            className={cn(
                                                "flex flex-col items-center gap-0.5 py-1.5 rounded-xl border text-[9px] font-bold transition-all",
                                                active
                                                    ? "bg-white dark:bg-slate-800 text-primary border-primary/30 shadow-sm"
                                                    : "text-muted-foreground border-border/20 hover:bg-white/60 dark:hover:bg-slate-800/60"
                                            )}
                                        >
                                            <span className="font-black text-[11px]">{l.label.charAt(0)}</span>
                                            <span className="opacity-60">{l.hint}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={() => onAiGenerate(topicInput)}
                            disabled={!topicInput.trim() || isGenerating}
                            className="w-full h-9 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />Generating magic...</>
                            ) : (
                                <><Sparkles className="w-3.5 h-3.5 mr-2" />Generate Slides</>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {/* ── Slides List ───────────────────────────────────────── */}
            {!hideSlides && (
                <>
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border/10 shrink-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-[11px] font-bold">Slides</span>
                            <Badge variant="secondary" className="h-4 min-w-[18px] px-1 text-[9px] font-bold">{slides.length}</Badge>
                        </div>
                        <Button
                            size="icon"
                            onClick={addSlide}
                            className="h-6 w-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="space-y-1.5 px-2.5 py-2 pb-6">
                            {slides.map((slide, index) => (
                                <SlideCard
                                    key={slide.id}
                                    slide={slide}
                                    index={index}
                                    totalSlides={slides.length}
                                    onUpdate={(field, value) => updateSlide(slide.id, field as keyof Slide, value)}
                                    onMoveUp={() => moveSlide(index, 'up')}
                                    onMoveDown={() => moveSlide(index, 'down')}
                                    onDuplicate={() => duplicateSlide(index)}
                                    onDelete={() => removeSlide(slide.id)}
                                    canMoveUp={index > 0}
                                    canMoveDown={index < slides.length - 1}
                                />
                            ))}

                            {/* Add slide footer */}
                            <button
                                onClick={addSlide}
                                className="w-full h-8 border border-dashed border-border/40 hover:border-blue-500/40 hover:bg-blue-500/5 rounded-xl text-[10px] text-muted-foreground hover:text-blue-500 flex items-center justify-center gap-1.5 transition-all"
                            >
                                <Plus className="w-3 h-3" /> Add Slide
                            </button>
                        </div>
                    </ScrollArea>
                </>
            )}
        </div>
    );
}
