'use client';

import React, { useRef } from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { SlideContainer } from './SlideContainer';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HorizontalCanvas() {
    const { slides, updateSlides, setActiveSlideId, settings, activePanel } = useEditor();
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(0.4);
    const [isReady, setIsReady] = React.useState(false);

    // Internal Resolution Constants (matches CanvasSlideCard)
    const INTERNAL_WIDTH = 1080;
    const INTERNAL_HEIGHT = React.useMemo(() => {
        if (settings.aspectRatio === '4:5') return INTERNAL_WIDTH * 1.25;
        if (settings.aspectRatio === '9:16') return INTERNAL_WIDTH * 1.777;
        if (settings.aspectRatio === '16:9') return INTERNAL_WIDTH * 0.5625;
        return INTERNAL_WIDTH;
    }, [settings.aspectRatio]);

    const prevAspectRatio = React.useRef(settings.aspectRatio);

    // Dynamic Scaling Logic - Optimized for Instant Responsiveness
    React.useLayoutEffect(() => {
        let rafId: number;
        
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerHeight = containerRef.current.clientHeight;
            const containerWidth = containerRef.current.clientWidth;
            
            if (containerHeight === 0 || containerWidth === 0) return;

            // Responsive Deduction: Account for Sidebar (88px) and SidePanel (420px) if open
            const sidebarBuffer = 100;
            const panelBuffer = activePanel ? 440 : 0;
            
            const targetHeight = containerHeight - 120; 
            const targetWidth = containerWidth - (sidebarBuffer + panelBuffer + 80);

            const scaleHeight = targetHeight / INTERNAL_HEIGHT;
            const scaleWidth = targetWidth / INTERNAL_WIDTH;
            
            let newScale = Math.min(scaleHeight, scaleWidth, 1.1); 
            if (containerWidth < 768) {
                newScale = Math.min(scaleHeight, scaleWidth, 0.9);
            }
            newScale = Math.max(newScale, 0.15);

            setScale(newScale);
            // Persistent Visibility: Once ready, stay ready to prevent flickers
            if (!isReady) setIsReady(true);
        };

        // If aspect ratio changed, update INSTANTLY (Faster)
        if (prevAspectRatio.current !== settings.aspectRatio) {
            updateScale();
            prevAspectRatio.current = settings.aspectRatio;
        }

        const handleResize = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateScale);
        };

        const observer = new ResizeObserver(handleResize);
        if (containerRef.current) observer.observe(containerRef.current);
        
        updateScale(); // Initial sync

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, [INTERNAL_HEIGHT, INTERNAL_WIDTH, settings.aspectRatio, isReady, activePanel]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // One Slide at a Time Logic: Full Slide + Gap
            const step = (INTERNAL_WIDTH + 192) * scale;
            const newPos = direction === 'left' 
                ? scrollRef.current.scrollLeft - step 
                : scrollRef.current.scrollLeft + step;
            
            scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
        }
    };

    const addSlideAtEnd = () => {
        const newSlide = {
            id: Date.now().toString(),
            title: 'New Slide Title',
            content: 'Your slide content goes here...',
            slideType: 'standard' as const,
            layout: 'center' as const,
        };
        const newSlides = [...slides, newSlide];
        updateSlides(newSlides);
        setActiveSlideId(newSlide.id);
        
        // Scroll to end after a small delay
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div 
            ref={containerRef} 
            className={cn(
                "flex-1 w-full relative group/canvas overflow-hidden flex flex-col transition-opacity duration-1000",
                isReady ? "opacity-100" : "opacity-0"
            )} 
            style={{ '--slide-scale': scale } as React.CSSProperties}
        >
            
            {/* Optimized Scroll Container with Snap-To-Slide Performance */}
            <div 
                ref={scrollRef}
                className="flex-1 w-full overflow-x-auto overflow-y-hidden scrollbar-hide bg-[#fcfcfd] dark:bg-[#02040a] relative select-none scroll-smooth snap-x snap-mandatory md:snap-none"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 2px 2px, #00000008 1.2px, transparent 0),
                        radial-gradient(circle at 20px 20px, #00000004 1px, transparent 0)
                    `,
                    backgroundSize: '40px 40px, 20px 20px'
                }}
            >
                <div 
                    className="h-full flex items-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                    style={{ 
                        gap: `${192 * scale}px`,
                        paddingLeft: `${Math.max(32, (containerRef.current?.clientWidth || 0) / 2 - (INTERNAL_WIDTH * scale) / 2)}px`,
                        paddingRight: `${Math.max(32, (containerRef.current?.clientWidth || 0) / 2 - (INTERNAL_WIDTH * scale) / 2)}px`
                    }}
                >
                    {slides.map((slide, index) => (
                        <SlideContainer 
                            key={slide.id} 
                            slide={slide} 
                            index={index} 
                            isLast={index === slides.length - 1}
                        />
                    ))}
                    {/* Big Plus Button at the End */}
                    <button 
                        onClick={addSlideAtEnd}
                        className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 hover:border-indigo-400 hover:text-indigo-500 hover:bg-white dark:hover:bg-[#111] transition-all duration-300 group shrink-0 snap-center"
                        style={{ 
                            width: `${120 * scale}px`, 
                            height: `${120 * scale}px`,
                            borderRadius: `${24 * scale}px`
                        }}
                    >
                        <Plus className="transition-transform" style={{ width: `${40 * scale}px`, height: `${40 * scale}px` }} strokeWidth={1} />
                    </button>
                </div>
            </div>

            {/* Responsive Navigation Buttons - Elevated on Mobile */}
            <div className="absolute inset-y-0 left-0 w-20 pointer-events-none flex items-center justify-start pl-4 md:pl-6 z-[100]">
                <button 
                    onClick={() => scroll('left')}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center pointer-events-auto hover:bg-white dark:hover:bg-black hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300 group -translate-y-12 md:translate-y-0"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
                </button>
            </div>

            <div className="absolute inset-y-0 right-0 w-20 pointer-events-none flex items-center justify-end pr-4 md:pr-6 z-[100]">
                <button 
                    onClick={() => scroll('right')}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center pointer-events-auto hover:bg-white dark:hover:bg-black hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300 group -translate-y-12 md:translate-y-0"
                >
                    <ChevronRight className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
                </button>
            </div>

        </div>
    );
}
