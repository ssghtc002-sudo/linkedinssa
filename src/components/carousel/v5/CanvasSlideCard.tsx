'use client';

import React from 'react';
import { Slide, DesignSettings, FONT_PAIRS } from '@/lib/types';
import { useEditor } from '../v2/context/EditorContext';
import { cn } from '@/lib/utils';
import { EditableText } from './EditableText';

interface CanvasSlideCardProps {
    slide: Slide;
    index: number;
}

export const CanvasSlideCard = React.memo(function CanvasSlideCard({ slide, index }: CanvasSlideCardProps) {
    const { settings, updateSlide, slides } = useEditor();
    
    // Fixed Internal High Resolution - Scaled visually by parent
    const INTERNAL_WIDTH = 1080; 
    const calculateHeight = () => {
        if (settings.aspectRatio === '4:5') return INTERNAL_WIDTH * 1.25;
        if (settings.aspectRatio === '9:16') return INTERNAL_WIDTH * 1.777;
        if (settings.aspectRatio === '16:9') return INTERNAL_WIDTH * 0.5625;
        return INTERNAL_WIDTH; // 1:1
    };
    const INTERNAL_HEIGHT = calculateHeight();

    // Helper functions for styles - scaled perfectly for 1080px
    const getHeadingStyle = () => {
        const pair = FONT_PAIRS[settings.fontPair];
        let style: React.CSSProperties = {
            fontFamily: pair.heading,
            color: slide.colorOverrides?.[`${slide.id}-title`] || settings.textColor,
        };
        
        // Base sizes at 1080px are ~1.8x larger than the 600px preview
        if (settings.fontSize === 'small') style.fontSize = '64px';
        else if (settings.fontSize === 'large') style.fontSize = '120px';
        else style.fontSize = '90px';

        // Force Funky Bold (Black/ExtraBold)
        style.fontWeight = 900;
        style.letterSpacing = '-0.04em';
        style.lineHeight = 1;

        return style;
    };

    const getBodyStyle = () => {
        const pair = FONT_PAIRS[settings.fontPair];
        const contentLength = slide.content.length;
        
        // Auto-scale font size based on content length
        let fontSize = slide.layout === 'quote' ? 64 : 36;
        if (contentLength > 150) fontSize = slide.layout === 'quote' ? 48 : 30;
        if (contentLength > 300) fontSize = slide.layout === 'quote' ? 36 : 24;
        if (contentLength > 500) fontSize = slide.layout === 'quote' ? 28 : 20;

        let style: React.CSSProperties = {
            fontFamily: pair.body,
            color: slide.colorOverrides?.[`${slide.id}-content`] || settings.textColor,
            fontSize: `${fontSize}px`,
            lineHeight: 1.5,
            fontWeight: 500,
            opacity: 0.95
        };
        return style;
    }

    const alignmentClass = cn(
        slide.layout === 'center' ? 'items-center text-center' : 
        slide.layout === 'quote' ? 'items-center text-center justify-center' : 
        settings.alignment === 'center' ? 'items-center text-center' :
        settings.alignment === 'right' ? 'items-end text-right' : 'items-start text-left'
    );

    return (
        <div 
            id={`slide-canvas-${index}`}
            className="relative flex-shrink-0 shadow-2xl overflow-hidden select-text border border-white/5 rounded-[5rem] transition-[height] duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ 
                width: INTERNAL_WIDTH, 
                height: INTERNAL_HEIGHT,
                backgroundColor: slide.backgroundColor || settings.backgroundColor,
                color: slide.color || settings.textColor,
                fontFamily: FONT_PAIRS[settings.fontPair].body,
            }}
        >
            {/* Advanced Background Engine */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Base Layer */}
                <div className="absolute inset-0" style={{ backgroundColor: slide.backgroundColor || settings.backgroundColor }} />

                {/* STYLE: Mesh / Liquid */}
                {settings.visualStyle === 'mesh' && (
                    <>
                        <div 
                            className="absolute -top-[20%] -left-[10%] w-full h-full rounded-full opacity-60 mix-blend-screen blur-[240px] animate-pulse" 
                            style={{ background: `radial-gradient(circle, ${settings.accentColor} 0%, transparent 100%)` }} 
                        />
                        <div 
                            className="absolute -bottom-[20%] -right-[10%] w-[120%] h-[120%] rounded-full opacity-40 mix-blend-overlay blur-[220px]" 
                            style={{ background: `radial-gradient(circle, ${settings.gradientSettings?.fromColor || settings.accentColor} 0%, transparent 100%)` }} 
                        />
                         <div 
                            className="absolute top-[20%] left-[30%] w-[80%] h-[80%] rounded-full opacity-30 mix-blend-color-dodge blur-[280px]" 
                            style={{ background: `radial-gradient(circle, ${settings.gradientSettings?.toColor || settings.accentColor} 0%, transparent 100%)` }} 
                        />
                    </>
                )}

                {/* STYLE: Neon Tech Lines */}
                {settings.visualStyle === 'neon' && (
                    <>
                        <div 
                            className="absolute inset-0 opacity-[0.15]" 
                            style={{ 
                                backgroundImage: `repeating-linear-gradient(90deg, ${settings.accentColor} 0, ${settings.accentColor} 1px, transparent 0, transparent 40px)`,
                                maskImage: 'linear-gradient(to right, black, transparent)'
                            }} 
                        />
                        <div 
                            className="absolute inset-0 opacity-[0.08]" 
                            style={{ 
                                backgroundImage: `repeating-linear-gradient(0deg, ${settings.accentColor} 0, ${settings.accentColor} 1px, transparent 0, transparent 40px)`,
                                maskImage: 'linear-gradient(to bottom, black, transparent)'
                            }} 
                        />
                        <div 
                            className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full opacity-40 mix-blend-screen blur-[280px]" 
                            style={{ background: `radial-gradient(circle, ${settings.accentColor} 0%, transparent 100%)` }} 
                        />
                    </>
                )}

                {/* STYLE: Organic Blobs */}
                {settings.visualStyle === 'organic' && (
                    <>
                        <div 
                            className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 mix-blend-screen blur-[120px] animate-pulse" 
                            style={{ backgroundColor: settings.accentColor }} 
                        />
                        <div 
                            className="absolute top-[40%] -left-[20%] w-[80%] h-[80%] rounded-[60%_40%_30%_70%/50%_30%_70%_50%] opacity-30 mix-blend-overlay blur-[180px]" 
                            style={{ backgroundColor: settings.gradientSettings?.toColor || settings.accentColor }} 
                        />
                    </>
                )}

                {/* STYLE: Geometric Accents */}
                {settings.visualStyle === 'geometric' && (
                    <>
                        <div 
                            className="absolute top-0 right-0 w-[60%] h-full opacity-10 mix-blend-overlay"
                            style={{ 
                                background: `linear-gradient(225deg, ${settings.accentColor} 0%, transparent 70%)`,
                                clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                            }}
                        />
                        <div 
                            className="absolute bottom-0 left-0 w-[40%] h-[40%] opacity-20 mix-blend-overlay"
                            style={{ 
                                background: `linear-gradient(45deg, ${settings.accentColor} 0%, transparent 100%)`,
                                clipPath: 'circle(50% at 0 100%)'
                            }}
                        />
                    </>
                )}

                {/* TYPE: Image Background (High Priority Overlay) */}
                {settings.backgroundType === 'image' && settings.backgroundImage && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={settings.backgroundImage} 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        {/* Progressive Overlay for Text Legibility */}
                        <div className={cn(
                            "absolute inset-0",
                            settings.textColor === '#ffffff' ? "bg-black/40" : "bg-white/10"
                        )} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    </div>
                )}
                
                {/* Global Technical Overlays */}
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(${slide.color || settings.textColor} 1.5px, transparent 1.5px)`, backgroundSize: '70px 70px' }} />
                
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Top Glow Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-3 z-30 overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out"
                    style={{ 
                        backgroundColor: settings.accentColor, 
                        width: `${((index + 1) / slides.length) * 100}%` 
                    }}
                />
            </div>
            
            <div className={cn("h-full flex flex-col relative z-20 antialiased", alignmentClass)}
                 style={{ padding: `${settings.padding * 14}px` }}>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col w-full justify-center relative min-h-0 pt-16">
                    
                    {/* Content Backdrop (Subtle Glass) */}
                    <div className="absolute -inset-12 bg-white/[0.02] dark:bg-black/[0.04] backdrop-blur-[2px] rounded-[6rem] border border-white/5 pointer-events-none -z-10 shadow-inner" />

                    {/* Tagline / Eyebrow */}
                    {slide.showTagline !== false && (
                        <div className="mb-6 w-full shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-[4px]" style={{ backgroundColor: settings.accentColor }} />
                                <EditableText 
                                    value={slide.tagline || ''} 
                                    onChange={(val) => updateSlide(slide.id, 'tagline', val)}
                                    placeholder="TAGLINE..."
                                    className="font-black tracking-[0.5em] uppercase italic"
                                    style={{ color: settings.accentColor, fontSize: '20px' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    {(slide.layout !== 'quote' && slide.showTitle !== false) && (
                        <div className="mb-12 w-full shrink-0">
                            <EditableText 
                                value={slide.title} 
                                onChange={(val) => updateSlide(slide.id, 'title', val)}
                                placeholder="Enter title..."
                                className="leading-[1] antialiased drop-shadow-2xl"
                                style={getHeadingStyle()}
                            />
                        </div>
                    )}

                    {/* Content Body */}
                    {slide.showContent !== false && (
                        <div className="w-full relative overflow-hidden flex-1 flex flex-col justify-center max-h-[55%]">
                            {slide.layout === 'quote' && (
                                <span className="absolute -left-20 -top-32 opacity-10 font-serif leading-none select-none text-[400px]" style={{ color: settings.accentColor }}>"</span>
                            )}
                            <div className="overflow-hidden">
                                <EditableText 
                                    value={slide.content} 
                                    onChange={(val) => updateSlide(slide.id, 'content', val)}
                                    placeholder="Enter content..."
                                    multiline={true}
                                    className={cn(
                                        "whitespace-pre-wrap antialiased drop-shadow-sm font-semibold tracking-tight",
                                        slide.layout === 'quote' ? 'italic font-serif leading-relaxed' : ''
                                    )}
                                    style={getBodyStyle()}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Funky Professional Footer Layout - High Res Scaling */}
                <div className="w-full mt-auto pt-10 flex items-end justify-between gap-8 h-40 shrink-0">
                    
                    {/* Floating Glass Pill Profile (Bottom-Left) */}
                    <div className="flex items-center gap-8 bg-white/10 dark:bg-black/20 backdrop-blur-2xl px-10 py-6 rounded-[4rem] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-2 ring-white/5 shrink-0 max-w-[70%]">
                        {settings.showWatermark && (
                            <>
                                <div className="relative shrink-0">
                                    {settings.authorImage && (
                                        <div className="w-24 h-24 rounded-full border-4 border-white/30 p-1 shadow-2xl overflow-hidden ring-8 ring-black/5">
                                            <div className="w-full h-full rounded-full overflow-hidden">
                                              <img src={settings.authorImage} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#0f172a] flex items-center justify-center shadow-lg">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="leading-tight flex flex-col justify-center min-w-0">
                                    <div className="font-black tracking-tight text-[24px] uppercase italic text-white drop-shadow-sm truncate">{settings.authorName}</div>
                                    <div className="opacity-50 text-[16px] font-black uppercase tracking-[0.2em] truncate italic text-indigo-100">{settings.authorHandle}</div>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Floating Navigation Pill (Bottom-Right) */}
                    <div className="flex items-center gap-10 bg-black/40 backdrop-blur-2xl px-12 py-8 rounded-[3.5rem] border border-white/10 shadow-2xl shrink-0 truncate">
                         {(slide.showSwipeIndicator !== false && settings.showSwipeIndicator) && index < slides.length - 1 && (
                            <div className="flex items-center gap-6 font-black tracking-[0.4em] text-[16px] uppercase text-white/60">
                                <span className="truncate max-w-[200px]">{slide.swipeText || 'NEXT'}</span>
                                <div className="w-16 h-[3px] bg-white/20 relative overflow-hidden shrink-0">
                                    <div className="absolute left-0 top-0 h-full bg-emerald-400 animate-pulse" style={{ width: '60%' }} />
                                </div>
                            </div>
                        )}
                        <div className="font-mono font-black italic text-6xl leading-none tracking-tighter text-white/90 shrink-0">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
