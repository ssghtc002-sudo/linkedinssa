'use client';
import React, { useState } from 'react';
import {
    Monitor, Smartphone, ZoomIn, ZoomOut,
    RotateCcw, ChevronLeft, ChevronRight,
    Download, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarouselPreview, CarouselPreviewRef } from '../CarouselPreview';
import { Slide, DesignSettings } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SlideThumbnailStrip } from '../slides/SlideThumbnailStrip';
import { SlideEditorPopover } from './SlideEditorPopover';
import { PenLine } from 'lucide-react';

interface EditorCanvasProps {
    slides: Slide[];
    settings: DesignSettings;
    previewRef: React.RefObject<CarouselPreviewRef | null>;
    onExport: (format: 'pdf' | 'png', ratio: '1:1' | '4:5') => void;
    onUpdateSlide: (id: string, field: keyof Slide, value: any) => void;
}

export function EditorCanvas({ slides, settings, previewRef, onExport, onUpdateSlide }: EditorCanvasProps) {
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [zoom, setZoom] = useState(85);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isEditingSlide, setIsEditingSlide] = useState(false);

    const clampZoom = (z: number) => Math.min(150, Math.max(40, z));

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gradient-to-br from-slate-100/60 via-blue-50/20 to-purple-50/20 dark:from-slate-900/60 dark:via-blue-950/20 dark:to-purple-950/20 relative">

            {/* Canvas Toolbar */}
            <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-sm z-10">

                {/* View Mode */}
                <div className="flex items-center gap-1 bg-muted/50 border border-border/20 rounded-xl p-0.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('desktop')}
                        className={cn(
                            "h-7 px-2.5 gap-1.5 text-xs font-semibold rounded-lg transition-all",
                            viewMode === 'desktop'
                                ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Monitor className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Desktop</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('mobile')}
                        className={cn(
                            "h-7 px-2.5 gap-1.5 text-xs font-semibold rounded-lg transition-all",
                            viewMode === 'mobile'
                                ? "bg-white dark:bg-slate-800 text-purple-600 shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mobile</span>
                    </Button>
                </div>

                <div className="flex-1" />

                {/* Slide Navigation */}
                <div className="flex items-center gap-1 bg-muted/50 border border-border/20 rounded-xl px-2 py-1">
                    <button
                        onClick={() => setActiveSlide((s) => Math.max(0, s - 1))}
                        disabled={activeSlide === 0}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/70 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-semibold min-w-[44px] text-center">
                        {activeSlide + 1} / {slides.length}
                    </span>
                    <button
                        onClick={() => setActiveSlide((s) => Math.min(slides.length - 1, s + 1))}
                        disabled={activeSlide === slides.length - 1}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/70 dark:hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Zoom */}
                <div className="hidden lg:flex items-center gap-1 bg-muted/50 border border-border/20 rounded-xl px-2 py-1">
                    <button
                        onClick={() => setZoom((z) => clampZoom(z - 10))}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/70 dark:hover:bg-slate-800 transition-all text-muted-foreground hover:text-foreground"
                    >
                        <ZoomOut className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-bold font-mono min-w-[32px] text-center text-muted-foreground">{zoom}%</span>
                    <button
                        onClick={() => setZoom((z) => clampZoom(z + 10))}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/70 dark:hover:bg-slate-800 transition-all text-muted-foreground hover:text-foreground"
                    >
                        <ZoomIn className="w-3 h-3" />
                    </button>
                    <button
                        onClick={() => setZoom(85)}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/70 dark:hover:bg-slate-800 transition-all text-muted-foreground hover:text-foreground"
                        title="Reset zoom"
                    >
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Dot grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.25) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col items-center justify-center overflow-hidden p-4 relative z-10">
                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out flex-shrink-0",
                        viewMode === 'mobile'
                            ? "ring-[8px] ring-slate-800 dark:ring-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden bg-white dark:bg-black"
                            : "shadow-2xl rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10"
                    )}
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center center',
                        width: viewMode === 'mobile' ? 340 : 460,
                    }}
                >
                    {/* Mobile notch */}
                    {viewMode === 'mobile' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 dark:bg-slate-700 rounded-b-2xl z-50 flex items-center justify-center">
                            <div className="w-10 h-1 bg-slate-600 rounded-full" />
                        </div>
                    )}
                    <CarouselPreview
                        ref={previewRef}
                        slides={slides}
                        settings={settings}
                        viewMode={viewMode}
                    />
                </div>

                {/* Floating Edit Button (if popover closed) */}
                {!isEditingSlide && (
                    <Button
                        onClick={() => setIsEditingSlide(true)}
                        className="absolute bottom-6 right-6 z-40 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
                    >
                        <PenLine className="w-4 h-4" />
                        <span className="font-semibold text-xs">Edit Slide Elements</span>
                    </Button>
                )}

                {/* Floating Contextual Editor */}
                {isEditingSlide && slides[activeSlide] && (
                    <div className="absolute top-4 lg:right-4 md:right-4 left-4 lg:left-auto md:left-auto z-50">
                        <SlideEditorPopover
                            slide={slides[activeSlide]}
                            onUpdate={(field, value) => onUpdateSlide(slides[activeSlide].id, field, value)}
                            onClose={() => setIsEditingSlide(false)}
                        />
                    </div>
                )}

                {/* AI Copilot Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-40 hidden sm:block">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-full p-1.5 flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Ask AI what to change, e.g., 'rewrite it to sound more controversial'" 
                            className="flex-1 bg-transparent border-none focus:ring-0 text-xs px-3 text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
                        />
                        <Button size="sm" variant="secondary" className="h-8 rounded-full text-[11px] px-3 font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                            Edit Slide
                        </Button>
                        <Button size="sm" className="h-8 rounded-full text-[11px] px-3 font-semibold bg-purple-600 hover:bg-purple-700 text-white gap-1.5">
                            <Sparkles className="w-3 h-3"/>
                            Edit Carousel
                        </Button>
                    </div>
                </div>
            </div>

            {/* Slide Thumbnail Strip */}
            <div className="shrink-0 border-t border-white/20 dark:border-white/5 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl z-10">
                <SlideThumbnailStrip
                    slides={slides}
                    settings={settings}
                    activeSlide={activeSlide}
                    onSelect={setActiveSlide}
                />
            </div>
        </div>
    );
}
