'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { CanvasSlideCard } from '../v2/canvas/CanvasSlideCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CanvasStage() {
    const { slides, activeSlideId, setActiveSlideId } = useEditor();
    
    // Track active index
    const activeIndex = useMemo(() => {
        if (!activeSlideId) return 0; // Default to first if none
        const i = slides.findIndex(s => s.id === activeSlideId);
        return i === -1 ? 0 : i;
    }, [slides, activeSlideId]);

    const activeSlide = slides[activeIndex];

    // Responsive Scaling Logic
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const BASE_SIZE = 600; // The fixed dimensions of CanvasSlideCard

    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            // Provide some padding around the slide (e.g. 32px padding on all sides)
            const availableWidth = width - 64; 
            const availableHeight = height - 64; 
            
            // Assuming 1:1 aspect ratio currently
            const scaleRequired = Math.min(availableWidth / BASE_SIZE, availableHeight / BASE_SIZE);
            setScale(Math.max(0.1, Math.min(scaleRequired, 1.2))); // Clamp scale between 0.1x and 1.2x
        });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex > 0) setActiveSlideId(slides[activeIndex - 1].id);
    };

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeIndex < slides.length - 1) setActiveSlideId(slides[activeIndex + 1].id);
    };

    return (
        <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden" ref={containerRef}>
            
            {/* The Scaled Slide */}
            <div 
                className="relative origin-center transition-transform duration-200"
                style={{
                    width: BASE_SIZE,
                    height: BASE_SIZE,
                    transform: `scale(${scale})`,
                }}
            >
                {activeSlide && (
                    <CanvasSlideCard slide={activeSlide} index={activeIndex} />
                )}
            </div>

            {/* Carousel Navigation Overlays */}
            <div className="absolute inset-y-0 left-2 sm:left-6 flex items-center pointer-events-none z-20">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg bg-white/90 dark:bg-black/90 backdrop-blur-sm pointer-events-auto border-border/20 transition-all ${activeIndex <= 0 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:scale-105 hover:bg-white'}`}
                    onClick={goPrev}
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
                </Button>
            </div>
            
            <div className="absolute inset-y-0 right-2 sm:right-6 flex items-center pointer-events-none z-20">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg bg-white/90 dark:bg-black/90 backdrop-blur-sm pointer-events-auto border-border/20 transition-all ${activeIndex >= slides.length - 1 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 hover:scale-105 hover:bg-white'}`}
                    onClick={goNext}
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
                </Button>
            </div>

        </div>
    );
}
