'use client';

import React from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { Slide } from '@/lib/types';
import { CanvasSlideCard } from './CanvasSlideCard';
import { SlideActionBar } from './SlideActionBar';
import { cn } from '@/lib/utils';
import { ArrowRight, Settings, Image as ImageIcon } from 'lucide-react';

interface SlideContainerProps {
    slide: Slide;
    index: number;
    isLast: boolean;
}

export const SlideContainer = React.memo(function SlideContainer({ slide, index, isLast }: SlideContainerProps) {
    const { activeSlideId, setActiveSlideId, settings } = useEditor();
    const isSelected = activeSlideId === slide.id;

    const INTERNAL_WIDTH = 1080;
    
    // CSS Aspect Ratio Mapping
    const ratioMap = {
        '1:1': '1 / 1',
        '4:5': '4 / 5',
        '16:9': '16 / 9',
        '9:16': '9 / 16'
    };

    return (
        <div 
            className="relative group shrink-0 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) overflow-visible ring-1 ring-slate-950/5 dark:ring-white/5 rounded-3xl snap-center"
            style={{ 
                width: `calc(${INTERNAL_WIDTH}px * var(--slide-scale))`,
                aspectRatio: ratioMap[settings.aspectRatio],
                backgroundColor: slide.backgroundColor || settings.backgroundColor,
                borderRadius: `calc(5rem * var(--slide-scale))`,
                boxShadow: isSelected ? '0 40px 100px -20px rgba(0,0,0,0.4), 0 0 0 4px rgba(79, 70, 229, 0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
            }}
        >
            
            {/* Perfectly Aligned Slide Action Bar */}
            <div 
                className="absolute bottom-[100%] left-1/2 pb-4 z-[100] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform origin-bottom"
                style={{ 
                    transform: `translateX(-50%) scale(calc(0.75 + var(--slide-scale) * 0.25))` 
                }}
            >
                <SlideActionBar 
                    slideId={slide.id} 
                    index={index} 
                    isFirst={index === 0} 
                    isLast={isLast} 
                />
            </div>

            {/* The Actual Slide Card */}
            <div 
                onClick={() => setActiveSlideId(slide.id)}
                className={cn(
                    "absolute inset-0 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer z-50 origin-top-left overflow-hidden",
                    isSelected ? "shadow-2xl" : "hover:shadow-xl"
                )}
                style={{ 
                    transform: `scale(var(--slide-scale))`,
                    width: INTERNAL_WIDTH,
                    height: settings.aspectRatio === '4:5' ? 1350 : 
                            settings.aspectRatio === '9:16' ? 1920 :
                            settings.aspectRatio === '16:9' ? 608 : 1080,
                    borderRadius: `calc(5rem * var(--slide-scale))`
                }}
            >
                <CanvasSlideCard slide={slide} index={index} />
            </div>

            {/* Visual Connecting Arrow (Refined) */}
            {!isLast && (
                <div 
                    className="absolute top-1/2 left-full -translate-y-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none opacity-10 group-hover:opacity-40 transition-all duration-500 transform scale-[var(--slide-scale)]"
                    style={{ marginLeft: `calc(8px * var(--slide-scale))` }}
                >
                    <div className="w-[60px] h-[3px] bg-gradient-to-r from-indigo-400/30 to-purple-500/30 rounded-full" />
                    <ArrowRight className="w-8 h-8 text-indigo-400 opacity-50" strokeWidth={2} />
                </div>
            )}

            {/* Slide Status Label (Bottom-Left) */}
            <div 
                className="absolute left-0 top-[100%] mt-3 flex items-center gap-3 transition-opacity duration-500 transform scale-[var(--slide-scale)] origin-top-left pointer-events-none"
            >
                <div className="px-3 py-1 bg-slate-900/10 dark:bg-white/10 rounded-full backdrop-blur-md border border-black/5 dark:border-white/5">
                    <span className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Slide {index + 1}</span>
                </div>
                <span className="text-[14px] font-bold text-slate-400/80 truncate max-w-[150px]">{slide.title || 'Untitled'}</span>
            </div>

        </div>
    );
});
