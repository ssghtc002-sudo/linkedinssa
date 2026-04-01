'use client';

import React from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { Copy, Trash2, ArrowLeft, ArrowRight, Settings, Image as ImageIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideActionBarProps {
    slideId: string;
    index: number;
    isFirst: boolean;
    isLast: boolean;
}

export function SlideActionBar({ slideId, index, isFirst, isLast }: SlideActionBarProps) {
    const { slides, updateSlides, setActiveSlideId, setActivePanel } = useEditor();

    const deleteSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (slides.length <= 1) return;
        updateSlides(slides.filter(s => s.id !== slideId));
    };

    const duplicateSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        const slideToCopy = slides.find(s => s.id === slideId);
        if (!slideToCopy) return;
        const newSlide = { ...slideToCopy, id: Date.now().toString() };
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, newSlide);
        updateSlides(newSlides);
        setActiveSlideId(newSlide.id);
    };

    const moveSlide = (e: React.MouseEvent, direction: number) => {
        e.stopPropagation();
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= slides.length) return;
        const newSlides = [...slides];
        const temp = [...newSlides];
        const slideToMove = temp.splice(index, 1)[0];
        temp.splice(newIndex, 0, slideToMove);
        updateSlides(temp);
    };

    const addSlideAfter = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newSlide = {
            id: Date.now().toString(),
            title: 'New Slide Title',
            content: 'Your slide content goes here...',
            slideType: 'standard' as const,
            layout: 'center' as const,
        };
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, newSlide);
        updateSlides(newSlides);
        setActiveSlideId(newSlide.id);
    };

    return (
        <div className="flex items-center gap-1.5 bg-slate-950/95 dark:bg-black/95 backdrop-blur-3xl px-2 py-1 rounded-[1.25rem] border border-white/20 dark:border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-300 hover:scale-105 pointer-events-auto">
            {/* Design Controls */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-white/10">
                <button
                    onClick={(e) => { e.stopPropagation(); setActiveSlideId(slideId); setActivePanel('settings'); }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group/btn"
                    title="Slide Settings"
                >
                    <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all"
                    title="Media"
                >
                    <ImageIcon className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-0.5 px-0.5 border-r border-white/10">
                <button 
                    disabled={isFirst}
                    onClick={(e) => moveSlide(e, -1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                    title="Move Prev"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button 
                    disabled={isLast}
                    onClick={(e) => moveSlide(e, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                    title="Move Next"
                >
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Structure Controls */}
            <div className="flex items-center gap-0.5 px-0.5">
                <button 
                    onClick={duplicateSlide}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    title="Duplicate"
                >
                    <Copy className="w-3.5 h-3.5" />
                </button>
                <button 
                    onClick={deleteSlide}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                    title="Delete"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Primary Action Button */}
            <div className="pl-1">
                <button 
                    onClick={addSlideAfter}
                    className="h-7 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-[8px] font-black uppercase tracking-[0.1em] text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-3 h-3" strokeWidth={3} />
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
}
