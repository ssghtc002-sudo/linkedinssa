'use client';

import React from 'react';
import { Slide, DesignSettings, FONT_PAIRS } from '@/lib/types';
import { useEditor } from '../context/EditorContext';
import { cn } from '@/lib/utils';
import { Type, Image as ImageIcon } from 'lucide-react';

interface CanvasSlideCardProps {
    slide: Slide;
    index: number;
}

export function CanvasSlideCard({ slide, index }: CanvasSlideCardProps) {
    const { settings, activeSlideId, setActiveSlideId, activeElementId, setActiveElementId } = useEditor();
    
    // Fixed base dimensions for a high-res 1:1 format (1080x1080)
    // We render everything relative to this base size using generic EM/REM scaling,
    // but the actual box is fixed to e.g. 500x500 for the preview scale.
    const PREVIEW_SIZE = 600; 

    const isSelected = activeSlideId === slide.id;

    // Helper functions for styles
    const getHeadingStyle = () => {
        const pair = FONT_PAIRS[settings.fontPair];
        let style: React.CSSProperties = {
            fontFamily: pair.heading,
            color: slide.colorOverrides?.[`${slide.id}-title`] || settings.textColor,
        };
        // Very large default sizes scaled to the preview box
        if (settings.fontSize === 'small') style.fontSize = '36px';
        else if (settings.fontSize === 'large') style.fontSize = '64px';
        else style.fontSize = '48px';

        if (settings.fontWeight === 'normal') style.fontWeight = 400;
        else if (settings.fontWeight === 'medium') style.fontWeight = 500;
        else if (settings.fontWeight === 'bold') style.fontWeight = 700;
        else style.fontWeight = 800;

        return style;
    };

    const handleSelectSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSlideId(slide.id);
        setActiveElementId(null);
    };

    const handleSelectTitle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSlideId(slide.id);
        setActiveElementId(`${slide.id}-title`);
    };

    const handleSelectContent = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSlideId(slide.id);
        setActiveElementId(`${slide.id}-content`);
    };

    return (
        <div 
            className={cn(
                "relative flex-shrink-0 bg-white transition-shadow duration-200 cursor-default",
                isSelected ? "ring-4 ring-blue-500 shadow-2xl" : "shadow-md hover:shadow-lg ring-1 ring-border/10",
            )}
            style={{ 
                width: PREVIEW_SIZE, 
                height: PREVIEW_SIZE,
                // Apply global theme color
                backgroundColor: settings.backgroundColor,
                color: settings.textColor,
                fontFamily: FONT_PAIRS[settings.fontPair].body,
                aspectRatio: '1/1' // Will parameterize for 4:5 later
            }}
            onClick={handleSelectSlide}
        >
            {/* Background elements (Gradient, Image, etc) go here */}
            {settings.backgroundType === 'gradient' && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-black/5" />
            )}
            
            <div className={cn(
                    "h-full flex flex-col relative z-10 antialiased",
                    slide.layout === 'center' ? 'items-center text-center' : 
                    slide.layout === 'quote' ? 'items-center text-center justify-center' : 
                    settings.alignment === 'center' ? 'items-center text-center' :
                    settings.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
                 )}
                 style={{ padding: `${settings.padding * 8}px` }}>

                <div className={`flex-1 flex flex-col w-full ${slide.layout === 'quote' ? 'justify-center' : 'justify-center'}`}>
                    
                    {/* Tagline / Eyebrow */}
                    {slide.showTagline !== false && slide.tagline && (
                        <div className="font-bold tracking-[0.2em] uppercase opacity-90" 
                             style={{ color: settings.accentColor, fontSize: '16px', marginBottom: '20px' }}>
                            {slide.tagline}
                        </div>
                    )}

                    {/* Title */}
                    {slide.layout !== 'quote' && slide.showTitle !== false && slide.title && (
                        <div 
                            className={cn(
                                "leading-[1.15] drop-shadow-sm tracking-tight transition-colors duration-150 p-1 -ml-1 rounded",
                                activeElementId === `${slide.id}-title` && "ring-2 ring-blue-500 bg-blue-500/10"
                            )}
                            onClick={handleSelectTitle}
                            style={{ ...getHeadingStyle(), marginBottom: slide.showContent !== false ? '28px' : '0' }}
                        >
                            {slide.title}
                        </div>
                    )}

                    {/* Content */}
                    {slide.showContent !== false && slide.content && (
                        slide.layout === 'list' ? (
                            <ul className="w-full space-y-5">
                                {slide.content.split('\\n').filter(line => line.trim()).map((line, i) => (
                                    <li key={i} className="flex items-start gap-4" style={{ fontSize: '22px' }}>
                                        <div className="mt-2.5 w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: slide.colorOverrides?.[`${slide.id}-content`] || settings.accentColor }} />
                                        <span className="flex-1 opacity-90 font-medium leading-relaxed" style={{ color: slide.colorOverrides?.[`${slide.id}-content`] || settings.textColor }}>{line.trim().replace(/^[-*•]\s*/, '')}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={cn(
                                    "relative p-1 -ml-1 rounded transition-colors duration-150",
                                    activeElementId === `${slide.id}-content` && "ring-2 ring-blue-500 bg-blue-500/10"
                                )}
                                onClick={handleSelectContent}
                            >
                                {slide.layout === 'quote' && (
                                    <span className="absolute -left-6 -top-10 opacity-20 font-serif leading-none select-none" style={{ color: settings.accentColor, fontSize: '120px' }}>"</span>
                                )}
                                <p className={`opacity-80 whitespace-pre-wrap ${slide.layout === 'quote' ? 'italic font-serif text-center' : ''}`}
                                   style={{ 
                                       fontSize: slide.layout === 'quote' ? '36px' : '22px', 
                                       lineHeight: 1.6,
                                       fontWeight: 400,
                                       color: slide.colorOverrides?.[`${slide.id}-content`] || settings.textColor
                                   }}>
                                    {slide.content}
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* Footer elements */}
                <div className="w-full flex justify-between items-end border-[rgba(0,0,0,0.1)] pt-5 mt-8 relative z-20" style={{ borderTopWidth: '1px', borderColor: settings.textColor + '22' }}>
                    {/* Watermark */}
                    <div className="flex items-center gap-3">
                        {settings.showWatermark && (
                            <div className="flex items-center gap-3">
                                {settings.authorImage && (
                                    <img src={settings.authorImage} alt="" className="rounded-full object-cover w-10 h-10" />
                                )}
                                <div className="leading-tight opacity-90">
                                    <div className="font-bold tracking-wide text-sm">{settings.authorName}</div>
                                    <div className="opacity-70 text-xs">{settings.authorHandle}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination and Swipe */}
                    <div className="flex items-center gap-4">
                        {(slide.showSwipeIndicator !== false && settings.showSwipeIndicator) && index < useEditor().slides.length - 1 && (
                            <div className="flex items-center gap-2 font-bold tracking-wider text-xs uppercase opacity-60">
                                {settings.swipeIndicatorType !== 'arrow' && <span>{slide.swipeText || 'Swipe'}</span>}
                                {settings.swipeIndicatorType !== 'text' && (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </div>
                        )}
                        <div className="flex items-center gap-1 font-mono font-bold opacity-30 text-sm">
                            <span>{index + 1}</span><span className="opacity-40">/</span><span>{useEditor().slides.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
