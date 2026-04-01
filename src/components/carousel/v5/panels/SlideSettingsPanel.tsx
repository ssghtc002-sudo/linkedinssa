'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { cn } from '@/lib/utils';
import { 
    Layout as LayoutIcon, 
    Type, 
    AtSign, 
    User, 
    ArrowRightCircle, 
    LayoutTemplate,
    Quote,
    AlignLeft,
    AlignCenter,
    Image as ImageIcon
} from 'lucide-react';

export function SlideSettingsPanel() {
    const { activeSlideId, slides, updateSlide, settings } = useEditor();
    const slide = slides.find(s => s.id === activeSlideId);

    if (!slide) return (
        <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-center">
            <LayoutIcon className="w-10 h-10 mx-auto text-slate-300 mb-3 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select a slide to edit</p>
        </div>
    );

    const layouts = [
        { id: 'center', label: 'Center', icon: AlignCenter },
        { id: 'left', label: 'Left', icon: AlignLeft },
        { id: 'quote', label: 'Quote', icon: Quote },
        { id: 'image-left', label: 'Media', icon: ImageIcon },
    ];

    const toggles = [
        { key: 'showTagline', label: 'Tagline', icon: AtSign, color: 'text-blue-500' },
        { key: 'showTitle', label: 'Headline', icon: Type, color: 'text-purple-500' },
        { key: 'showContent', label: 'Body Text', icon: LayoutTemplate, color: 'text-indigo-500' },
        { key: 'showSwipeIndicator', label: 'Swipe Icon', icon: ArrowRightCircle, color: 'text-emerald-500' },
    ];

    return (
        <div className="space-y-6">
            
            {/* Layout Explorer */}
            <div className="space-y-4">
                <label className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] block px-1">Structure</label>
                <div className="grid grid-cols-2 gap-3">
                    {layouts.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => updateSlide(slide.id, 'layout', l.id as any)}
                            className={cn(
                                "p-4 rounded-[2rem] border text-left transition-all duration-300 group flex flex-col gap-3",
                                slide.layout === l.id 
                                    ? "bg-indigo-500/5 border-indigo-400 dark:bg-indigo-900/10 shadow-lg ring-1 ring-indigo-500/20" 
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 hover:border-indigo-300"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl w-fit transition-colors",
                                slide.layout === l.id ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                            )}>
                                <l.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest px-0.5">{l.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Visibility Toggles Grid */}
            <div className="space-y-4">
                <label className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] block px-1">Elements</label>
                <div className="grid grid-cols-2 gap-2">
                    {toggles.map((t) => (
                        <button 
                            key={t.key}
                            onClick={() => updateSlide(slide.id, t.key as any, (slide as any)[t.key] === false)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-[1.5rem] border transition-all text-left group",
                                (slide as any)[t.key] !== false 
                                    ? "bg-white dark:bg-slate-900 border-indigo-500/30 shadow-sm" 
                                    : "bg-slate-50 dark:bg-white/5 border-transparent opacity-60 grayscale"
                            )}
                        >
                            <div className={cn("p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 group-hover:scale-110 transition-transform", t.color)}>
                                <t.icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tight text-slate-600 dark:text-slate-300">{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Visual Overrides */}
            <div className="space-y-4">
                <label className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] block px-1">Theming</label>
                <div className="p-5 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl space-y-5">
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-rose-500">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Backdrop</span>
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-black/5 active:scale-95 transition-transform cursor-pointer">
                            <input 
                                type="color" 
                                value={slide.backgroundColor || settings.backgroundColor}
                                onChange={(e) => updateSlide(slide.id, 'backgroundColor', e.target.value)}
                                className="absolute -inset-4 w-20 h-20 opacity-0 cursor-pointer"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: slide.backgroundColor || settings.backgroundColor }} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-500">
                                <Type className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Typography</span>
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-black/5 active:scale-95 transition-transform cursor-pointer">
                            <input 
                                type="color" 
                                value={slide.color || settings.textColor}
                                onChange={(e) => updateSlide(slide.id, 'color', e.target.value)}
                                className="absolute -inset-4 w-20 h-20 opacity-0 cursor-pointer"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: slide.color || settings.textColor }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
