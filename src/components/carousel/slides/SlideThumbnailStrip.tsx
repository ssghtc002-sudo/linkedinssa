'use client';
import React from 'react';
import { Slide, DesignSettings, FONT_PAIRS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SlideThumbnailStripProps {
    slides: Slide[];
    settings: DesignSettings;
    activeSlide: number;
    onSelect: (index: number) => void;
}

export function SlideThumbnailStrip({ slides, settings, activeSlide, onSelect }: SlideThumbnailStripProps) {
    const fontPair = FONT_PAIRS[settings.fontPair];

    const getBackground = () => {
        if (settings.backgroundType === 'gradient' && settings.gradientSettings) {
            const { fromColor, toColor, angle } = settings.gradientSettings;
            return `linear-gradient(${angle}deg, ${fromColor}, ${toColor})`;
        }
        if (settings.backgroundType === 'image' && settings.backgroundImage) {
            return `url(${settings.backgroundImage})`;
        }
        return settings.backgroundColor;
    };

    return (
        <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border/30">
            {slides.map((slide, i) => (
                <button
                    key={slide.id}
                    onClick={() => onSelect(i)}
                    className={cn(
                        "flex-none w-12 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 hover:shadow-md relative",
                        i === activeSlide
                            ? "border-blue-500 shadow-md shadow-blue-500/25 scale-105"
                            : "border-transparent hover:border-blue-300/50"
                    )}
                    title={`Slide ${i + 1}: ${slide.title}`}
                >
                    {/* Mini slide content */}
                    <div
                        className="w-full h-full flex flex-col justify-center p-1 relative overflow-hidden"
                        style={{
                            background: getBackground(),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Theme decorations mini */}
                        {settings.theme === 'modern' && (
                            <div className="absolute top-0 left-0 w-4 h-4 rounded-full opacity-20" style={{ backgroundColor: settings.accentColor, transform: 'translate(-30%, -30%)', filter: 'blur(4px)' }} />
                        )}
                        {settings.backgroundType === 'image' && (
                            <div className="absolute inset-0 opacity-40" style={{ backgroundColor: settings.backgroundColor }} />
                        )}

                        <div className="relative z-10">
                            <div
                                className="text-[5px] font-bold leading-tight mb-0.5 line-clamp-2 overflow-hidden"
                                style={{ color: settings.accentColor, fontFamily: fontPair.heading }}
                            >
                                {slide.title}
                            </div>
                            <div
                                className="text-[3.5px] opacity-80 leading-tight line-clamp-2 overflow-hidden"
                                style={{ color: settings.textColor }}
                            >
                                {slide.content}
                            </div>
                        </div>
                    </div>

                    {/* Slide number badge */}
                    <div className={cn(
                        "absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full flex items-center justify-center text-[5px] font-bold",
                        i === activeSlide
                            ? "bg-blue-500 text-white"
                            : "bg-black/40 text-white/80"
                    )}>
                        {i + 1}
                    </div>
                </button>
            ))}

            {/* Empty space at end */}
            <div className="flex-none w-1" />
        </div>
    );
}
