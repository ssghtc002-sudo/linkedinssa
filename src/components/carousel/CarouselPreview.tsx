'use client';
import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Slide, DesignSettings, ASPECT_RATIOS, FONT_PAIRS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, ChevronLeft, ChevronRight, MoreHorizontal, Globe, ThumbsUp, MessageSquare, Repeat, Send, Heart } from 'lucide-react';
import { ExportEngine } from './ExportEngine';

interface CarouselPreviewProps {
    slides: Slide[];
    settings: DesignSettings;
    viewMode?: 'desktop' | 'mobile';
}

export interface CarouselPreviewRef {
    downloadPNGs: () => Promise<void>;
    downloadPDF: () => Promise<void>;
}

// Helper Component for rendering a single slide
const SlideRenderer: React.FC<{
    slide: Slide;
    index: number;
    totalSlides: number;
    settings: DesignSettings;
    isMobile: boolean;
    scale?: number;
    width: number;
    height: number;
}> = ({ slide, index, totalSlides, settings, isMobile, width, height }) => {

    // Inline Styles helper
    const getThemeStyles = (settings: DesignSettings) => {
        const fontPair = FONT_PAIRS[settings.fontPair];
        const styles: React.CSSProperties = {
            backgroundColor: settings.backgroundColor,
            color: settings.textColor,
            fontFamily: fontPair.body,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };

        if (settings.backgroundType === 'gradient' && settings.gradientSettings) {
            const { fromColor, toColor, angle } = settings.gradientSettings;
            styles.backgroundImage = `linear-gradient(${angle}deg, ${fromColor}, ${toColor})`;
        } else if (settings.backgroundType === 'image' && settings.backgroundImage) {
            styles.backgroundImage = `url(${settings.backgroundImage})`;
        } else {
            styles.backgroundImage = 'none';
        }

        return styles;
    };

    const getHeadingStyle = (settings: DesignSettings) => {
        const fontPair = FONT_PAIRS[settings.fontPair];
        return {
            fontFamily: fontPair.heading,
            color: settings.accentColor,
            fontSize: isMobile
                ? (settings.fontSize === 'small' ? '1.5em' : settings.fontSize === 'large' ? '2em' : '1.8em')
                : (settings.fontSize === 'small' ? '1.8em' : settings.fontSize === 'large' ? '3em' : '2.4em')
        };
    };

    return (
        <div
            className="relative flex-none h-full overflow-hidden bg-white dark:bg-slate-950"
            style={{
                width: '100%',
                ...getThemeStyles(settings)
            }}
        >
            {/* Bold Theme */}
            {settings.theme === 'bold' && (
                <>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-20 transform rotate-12 translate-x-10 -translate-y-10" style={{ backgroundColor: settings.accentColor }}></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-current opacity-10 transform -rotate-12 -translate-x-10 translate-y-10"></div>
                </>
            )}

            {/* Modern Theme */}
            {settings.theme === 'modern' && (
                <>
                    <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full opacity-10 blur-3xl" style={{ backgroundColor: settings.accentColor }}></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-2xl" style={{ backgroundColor: settings.textColor }}></div>
                </>
            )}

            {/* Luxe Theme */}
            {settings.theme === 'luxe' && (
                <div className="absolute inset-4 border border-[rgba(255,255,255,0.2)] rounded-none z-0">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[rgba(255,255,255,0.4)]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[rgba(255,255,255,0.4)]"></div>
                </div>
            )}

            {/* Minimal Theme */}
            {settings.theme === 'minimal' && (
                <div className="absolute top-0 left-8 right-8 h-1 opacity-20" style={{ backgroundColor: settings.accentColor }}></div>
            )}

            {/* Content Container */}
            <div className={`h-full flex flex-col relative z-10 ${slide.layout === 'center' ? 'items-center text-center' :
                slide.layout === 'quote' ? 'items-center text-center justify-center' :
                    'items-start text-left'
                }`} style={{ padding: `${settings.padding * (isMobile ? 2.5 : 3.5)}px` }}>

                <div className={`flex-1 flex flex-col w-full ${slide.layout === 'quote' ? 'justify-center' : 'justify-center'}`}>
                    {/* Tagline / Eyebrow */}
                    {slide.showTagline && slide.tagline && (
                        <div 
                            className="font-bold tracking-[0.2em] uppercase opacity-80" 
                            style={{
                                color: settings.accentColor,
                                fontSize: isMobile ? '0.65em' : '0.8em',
                                marginBottom: isMobile ? '0.5em' : '0.8em',
                                fontFamily: FONT_PAIRS[settings.fontPair].body
                            }}
                        >
                            {slide.tagline}
                        </div>
                    )}

                    {/* Title */}
                    {slide.layout !== 'quote' && slide.showTitle !== false && slide.title && (
                        <h2 className="font-bold leading-[1.1] drop-shadow-sm tracking-tight" style={{
                            ...getHeadingStyle(settings),
                            marginBottom: slide.showContent !== false ? (isMobile ? '0.4em' : '0.5em') : '0' 
                        }}>
                            {slide.title}
                        </h2>
                    )}

                    {/* Content */}
                    {slide.showContent !== false && slide.content && (
                        slide.layout === 'list' ? (
                            <ul className={`w-full ${isMobile ? 'space-y-[0.5em]' : 'space-y-[0.8em]'}`}>
                                {slide.content.split('\\n').filter(line => line.trim()).map((line, i) => (
                                    <li key={i} className="flex items-start gap-[0.5em]" style={{
                                        fontSize: isMobile
                                            ? (settings.fontSize === 'small' ? '0.9em' : settings.fontSize === 'large' ? '1.2em' : '1em')
                                            : (settings.fontSize === 'small' ? '1em' : settings.fontSize === 'large' ? '1.4em' : '1.2em'),
                                        color: settings.textColor
                                    }}>
                                        <div className="mt-[0.4em] w-[0.4em] h-[0.4em] rounded-full flex-shrink-0" style={{ backgroundColor: settings.accentColor }} />
                                        <span className="flex-1 opacity-90 font-medium">{line.trim().replace(/^[-*•]\s*/, '')}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="relative">
                                {slide.layout === 'quote' && (
                                    <span className="absolute -left-[0.2em] -top-[0.4em] opacity-20 font-serif leading-none select-none" style={{ color: settings.accentColor, fontSize: '4em' }}>"</span>
                                ) }
                            <p
                                className={`opacity-90 whitespace-pre-wrap ${slide.layout === 'quote'
                                    ? 'italic font-serif leading-relaxed'
                                    : 'line-clamp-[8]'
                                    }`}
                                style={{
                                    fontSize: slide.layout === 'quote'
                                        ? (isMobile ? '1.2em' : (settings.fontSize === 'small' ? '1.5em' : settings.fontSize === 'large' ? '2.5em' : '2.0em')) // Adjusted relative sizes
                                        : (isMobile ? '0.9em' : (settings.fontSize === 'small' ? '1em' : settings.fontSize === 'large' ? '1.5em' : '1.25em')),
                                    fontWeight: settings.fontWeight === 'normal' ? 400 : settings.fontWeight === 'medium' ? 500 : settings.fontWeight === 'bold' ? 700 : 800,
                                    lineHeight: settings.lineHeight || 1.4,
                                    letterSpacing: `${settings.letterSpacing}em`,
                                    color: settings.textColor
                                }}
                            >
                                {slide.content}
                            </p>
                            {slide.layout === 'quote' && slide.showTitle !== false && (
                                <div className="font-bold opacity-80 not-italic tracking-widest uppercase mt-[1em]" style={{ color: settings.accentColor, fontSize: '0.6em', fontFamily: FONT_PAIRS[settings.fontPair].body }}>
                                    {slide.title !== 'New Slide' ? slide.title : ''}
                                </div>
                            )}
                        </div>
                        )
                    )}
                </div>

                {/* Footer elements (Watermark, Swipe, Pagination) */}
                <div className="w-full flex justify-between items-end border-[rgba(0,0,0,0.1)] pt-[0.5em] mt-[1em] relative z-20">
                    {/* Watermark */}
                    <div className="flex items-center gap-[0.5em]">
                        {settings.showWatermark && (
                            <div className="flex items-center gap-[0.5em]">
                                {settings.authorImage && (
                                    <img src={settings.authorImage} alt="" className="rounded-full object-cover" style={{ width: '1.5em', height: '1.5em' }} />
                                )}
                                <div className="leading-tight opacity-90">
                                    <div className="font-bold tracking-wide" style={{ fontSize: '0.7em', fontFamily: FONT_PAIRS[settings.fontPair].body }}>{settings.authorName}</div>
                                    <div className="opacity-70" style={{ fontSize: '0.55em', fontFamily: FONT_PAIRS[settings.fontPair].body }}>{settings.authorHandle}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Center: Swipe Indicator */}
                    {(slide.showSwipeIndicator !== false && settings.showSwipeIndicator) && index < totalSlides - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-[0.3em] opacity-60 font-medium" style={{ fontSize: '0.7em', color: settings.textColor }}>
                            {(settings.swipeIndicatorType === 'text' || settings.swipeIndicatorType === 'both') && (
                                <span>{slide.swipeText || 'Swipe'}</span>
                            )}
                            {(settings.swipeIndicatorType === 'arrow' || settings.swipeIndicatorType === 'both') && (
                                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            )}
                        </div>
                    )}

                    {/* Right: Pagination */}
                    <div className="flex items-center gap-[0.2em] font-mono font-bold opacity-40 hover:opacity-100 transition-opacity" style={{ fontSize: '0.75em', color: settings.textColor }}>
                        <span>{index + 1}</span><span className="opacity-30">/</span><span>{totalSlides}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CarouselPreview = forwardRef<CarouselPreviewRef, CarouselPreviewProps>(({ slides, settings, viewMode = 'desktop' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const { width, height } = ASPECT_RATIOS[settings.aspectRatio];
    const isMobile = viewMode === 'mobile';
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (currentSlide >= slides.length) {
            setCurrentSlide(Math.max(0, slides.length - 1));
        }
    }, [slides.length, currentSlide]);

    const downloadPNGs = async () => {
        const engine = new ExportEngine(slides, settings);
        await engine.exportPNGs();
    };

    const downloadPDF = async () => {
        const engine = new ExportEngine(slides, settings);
        await engine.exportPDF();
    };

    useImperativeHandle(ref, () => ({
        downloadPNGs,
        downloadPDF
    }));

    return (
        <div className="flex flex-col h-full relative w-full">
            {/* Dynamic Font Loader */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Playfair+Display:wght@400;700&family=Oswald:wght@400;700&family=Montserrat:wght@400&family=Lato:wght@400&family=Open+Sans:wght@400&display=swap');
             `}} />

            {/* Preview Area */}
            <div className="flex-1 overflow-visible flex items-start justify-center" ref={scrollContainerRef}>
                {/* LinkedIn Post Wrapper - Fully Responsive */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm w-full overflow-hidden">
                    {/* Authentic Header */}
                    <div className={`${isMobile ? 'p-2 pl-2.5' : 'p-2.5 pl-3'} flex gap-2.5 items-start relative`}>
                        {/* Menu Icon */}
                        <div className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 cursor-pointer">
                            <MoreHorizontal className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                        </div>

                        <Avatar className={`${isMobile ? 'w-8 h-8' : 'w-9 h-9'} ring-2 ring-white dark:ring-slate-950 cursor-pointer`}>
                            <AvatarImage src={settings.authorImage} className="object-cover" />
                            <AvatarFallback>{settings.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-1">
                                <span className={`font-semibold ${isMobile ? 'text-[11px]' : 'text-xs'} text-foreground hover:text-[#2563eb] hover:underline cursor-pointer truncate`}>
                                    {settings.authorName}
                                </span>
                                <span className="text-muted-foreground text-[10px]">• 1st</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">{settings.authorHandle}</div>
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                <span>2h</span>
                                <span aria-hidden="true">•</span>
                                <Globe className={`${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'} opacity-70`} />
                            </div>
                        </div>

                        {!isMobile && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#2563eb] font-semibold text-xs hover:bg-[#eff6ff]/50 hover:text-[#1d4ed8] px-2 h-7 mr-5 hidden sm:flex"
                            >
                                + Follow
                            </Button>
                        )}
                    </div>

                    {/* Post Text */}
                    <div className={`px-3 ${isMobile ? 'pb-1.5 text-[11px]' : 'pb-2 text-[13px]'} text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap`}>
                        Check out this carousel I made with CarouselMaker! 🚀<br className={`${isMobile ? 'mb-0.5' : 'mb-1'}`} />
                        <span className="font-semibold text-[#2563eb] hover:underline cursor-pointer">#growth</span>{' '}
                        <span className="font-semibold text-[#2563eb] hover:underline cursor-pointer">#design</span>{' '}
                    </div>

                    {/* Carousel Container - Responsive & Snap Scroll */}
                    <div
                        className="relative group w-full bg-slate-100 overflow-hidden"
                        style={{
                            aspectRatio: `${width}/${height}`,
                        }}
                    >
                        {/* Navigation Buttons - Always Visible */}
                        {slides.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                    disabled={currentSlide === 0}
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white dark:bg-slate-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 text-slate-700 dark:text-slate-300 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 ${currentSlide === 0 ? 'opacity-30' : 'opacity-90 hover:opacity-100'}`}
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                    disabled={currentSlide === slides.length - 1}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white dark:bg-slate-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 text-slate-700 dark:text-slate-300 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 ${currentSlide === slides.length - 1 ? 'opacity-30' : 'opacity-90 hover:opacity-100'}`}
                                    aria-label="Next slide"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        <div
                            className="flex h-full transition-transform duration-300 ease-in-out"
                            ref={containerRef}
                            style={{
                                width: `${slides.length * 100}%`,
                                transform: `translateX(-${currentSlide * (100 / slides.length)}%)`
                            }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    style={{
                                        width: `${100 / slides.length}%`,
                                        height: '100%',
                                        borderRight: index < slides.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                    }}
                                >
                                    <SlideRenderer
                                        slide={slide}
                                        index={index}
                                        totalSlides={slides.length}
                                        settings={settings}
                                        isMobile={isMobile} // Pass current view mode for preview
                                        width={width}
                                        height={height}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Counts & Actions */}
                    <div>
                        {/* Reaction Counts */}
                        <div className={`flex items-center justify-between text-gray-500 border-t border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.2)] ${isMobile ? 'px-2 py-1 text-[9px]' : 'px-3 py-1.5 text-[10px]'}`}>
                            <div className="flex items-center gap-1.5">
                                <div className="flex -space-x-1.5">
                                    <div className="bg-[#3b82f6] rounded-full p-0.5 border-2 border-white dark:border-slate-900"><ThumbsUp className="w-2.5 h-2.5 text-white fill-white" /></div>
                                    <div className="bg-[#ef4444] rounded-full p-0.5 border-2 border-white dark:border-slate-900"><Heart className="w-2.5 h-2.5 text-white fill-white" /></div>
                                    <div className="bg-[#16a34a] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white dark:border-slate-900"><span className="text-[8px] text-white font-bold leading-none">👏</span></div>
                                </div>
                                <span className="hover:text-[#2563eb] hover:underline cursor-pointer ml-1 font-medium">1,245</span>
                            </div>
                            <div className="hover:text-[#2563eb] hover:underline cursor-pointer font-medium">
                                84 comments
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex items-center justify-between border-t border-[rgba(0,0,0,0.1)] bg-white dark:bg-slate-900 ${isMobile ? 'px-1 py-0.5' : 'px-1 py-1'}`}>
                            <Button variant="ghost" className={`flex-1 gap-1.5 text-gray-500 hover:text-gray-900 rounded-md transition-colors hover:bg-slate-100 ${isMobile ? 'h-7' : 'h-8'}`}>
                                <ThumbsUp className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> <span className={`font-semibold ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>Like</span>
                            </Button>
                            <Button variant="ghost" className={`flex-1 gap-1.5 text-gray-500 hover:text-gray-900 rounded-md transition-colors hover:bg-slate-100 ${isMobile ? 'h-7' : 'h-8'}`}>
                                <MessageSquare className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> <span className={`font-semibold ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>Comment</span>
                            </Button>
                            <Button variant="ghost" className={`flex-1 gap-1.5 text-gray-500 hover:text-gray-900 rounded-md transition-colors hover:bg-slate-100 ${isMobile ? 'h-7' : 'h-8'}`}>
                                <Repeat className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> <span className={`font-semibold ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>Repost</span>
                            </Button>
                            <Button variant="ghost" className={`flex-1 gap-1.5 text-gray-500 hover:text-gray-900 rounded-md transition-colors hover:bg-slate-100 ${isMobile ? 'h-7' : 'h-8'}`}>
                                <Send className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> <span className={`font-semibold ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

CarouselPreview.displayName = 'CarouselPreview';
