import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useEditor } from '../context/EditorContext';
import { CanvasSlideCard } from './CanvasSlideCard';
import { ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InfiniteCanvas() {
    const { slides, activeSlideId, setActiveSlideId } = useEditor();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    
    // Transform state
    const [zoom, setZoom] = useState(0.6); // Default slightly zoomed out
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const clampZoom = (z: number) => Math.min(2.0, Math.max(0.1, z));

    // Handle spacebar for pan tracking
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                setIsSpacePressed(true);
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') setIsSpacePressed(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Track active slide index
    const activeIndex = useMemo(() => {
        if (!activeSlideId) return -1;
        return slides.findIndex(s => s.id === activeSlideId);
    }, [slides, activeSlideId]);

    // Center active slide automatically
    useEffect(() => {
        if (activeIndex === -1 || isDragging) return;
        
        const slideWidth = 600;
        const gap = 64; // gap-16
        const padding = 128; // p-32
        
        const totalWidth = padding * 2 + slides.length * slideWidth + (slides.length - 1) * gap;
        const containerCenter = totalWidth / 2;
        const slideCenter = padding + activeIndex * (slideWidth + gap) + (slideWidth / 2);
        
        const targetX = containerCenter - slideCenter;
        
        setPan(p => ({ x: targetX, y: 0 })); // Reset Y to 0 for perfect centering
    }, [activeIndex, slides.length, isDragging]);

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            // Pinch-to-zoom
            e.preventDefault();
            const zoomDelta = e.deltaY * -0.01;
            setZoom(z => clampZoom(z + zoomDelta));
        } else {
            // Trackpad Pan
            setPan(p => ({
                x: p.x - e.deltaX,
                y: p.y - e.deltaY,
            }));
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        // If holding space, or middle click, pan
        if (isSpacePressed || e.button === 1 || e.target === containerRef.current) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            // Clicked background explicitly dismisses active slide
            if (e.target === containerRef.current) setActiveSlideId(null);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setPan(p => ({ x: p.x + dx, y: p.y + dy }));
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const resetView = () => {
        setZoom(0.6);
        setPan({ x: 0, y: 0 });
    };

    return (
        <div 
            ref={containerRef}
            className={`flex-1 relative overflow-hidden bg-[#e5e5e5] dark:bg-[#1a1a1a] outline-none ${isSpacePressed ? 'cursor-grab' : 'cursor-default'} ${isDragging ? 'cursor-grabbing' : ''}`}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {/* Dot grid background scaling with zoom */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-transform duration-75"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
                    backgroundPosition: `${pan.x}px ${pan.y}px`,
                }}
            />

            {/* Transform Canvas Layer */}
            <div 
                ref={canvasRef}
                className="absolute top-1/2 left-1/2 will-change-transform"
                style={{
                    transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                    transformOrigin: '0 0',
                    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {/* Horizontal row of slides */}
                <div className="flex items-center gap-16 p-32">
                    {slides.map((slide, i) => (
                        <CanvasSlideCard 
                            key={slide.id} 
                            slide={slide} 
                            index={i} 
                        />
                    ))}
                </div>
            </div>

            {/* Carousel Navigation Overlays */}
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className={`w-12 h-12 rounded-full shadow-2xl bg-white dark:bg-[#111] pointer-events-auto border-border/20 transition-all ${activeIndex <= 0 ? 'opacity-0 translate-x-[-20px] pointer-events-none' : 'opacity-100 hover:scale-105 hover:bg-[#f5f5f5]'}`}
                    onClick={(e) => { e.stopPropagation(); setActiveSlideId(slides[activeIndex - 1]?.id); }}
                >
                    <ChevronLeft className="w-6 h-6 text-foreground/80" />
                </Button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className={`w-12 h-12 rounded-full shadow-2xl bg-white dark:bg-[#111] pointer-events-auto border-border/20 transition-all ${activeIndex === -1 || activeIndex >= slides.length - 1 ? 'opacity-0 translate-x-[20px] pointer-events-none' : 'opacity-100 hover:scale-105 hover:bg-[#f5f5f5]'}`}
                    onClick={(e) => { e.stopPropagation(); setActiveSlideId(slides[activeIndex + 1]?.id); }}
                >
                    <ChevronRight className="w-6 h-6 text-foreground/80" />
                </Button>
            </div>

            {/* Viewport Toolbar Overlay */}
            <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-border/10 p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setZoom(z => clampZoom(z - 0.1))}>
                    <ZoomOut className="w-4 h-4" />
                </Button>
                <div className="w-12 text-center text-xs font-mono font-bold text-muted-foreground select-none">
                    {Math.round(zoom * 100)}%
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setZoom(z => clampZoom(z + 0.1))}>
                    <ZoomIn className="w-4 h-4" />
                </Button>
                <div className="w-px h-4 bg-border/20 mx-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={resetView} title="Reset View">
                    <Maximize className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
