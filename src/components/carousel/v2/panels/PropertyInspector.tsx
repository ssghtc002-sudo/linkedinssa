'use client';

import React from 'react';
import { useEditor } from '../context/EditorContext';
import { Type, LayoutTemplate, Palette, Settings, X } from 'lucide-react';

export function PropertyInspector() {
    const { 
        activeSlideId, 
        activeElementId, 
        setActiveSlideId, 
        setActiveElementId,
        slides, 
        settings, 
        updateSettings,
        updateSlide 
    } = useEditor();

    // Determine what mode we are in
    let mode: 'global' | 'slide' | 'element' = 'global';
    if (activeElementId) mode = 'element';
    else if (activeSlideId) mode = 'slide';

    // Get current slide if applicable
    const slide = slides.find(s => s.id === activeSlideId);

    return (
        <div className="w-[320px] h-full bg-white dark:bg-[#111] border-l border-[#e5e5e5] dark:border-[#333] shrink-0 z-50 shadow-sm flex flex-col relative transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5] dark:border-[#333] shrink-0 sticky top-0 bg-white/95 dark:bg-[#111]/95 backdrop-blur-sm z-10">
                <div className="flex items-center gap-2">
                    {mode === 'global' && <Settings className="w-3.5 h-3.5 text-blue-500" />}
                    {mode === 'slide' && <LayoutTemplate className="w-3.5 h-3.5 text-purple-500" />}
                    {mode === 'element' && <Type className="w-3.5 h-3.5 text-green-500" />}
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#555] dark:text-[#aaa]">
                        {mode === 'global' ? 'Global Settings' : mode === 'slide' ? 'Slide Layout' : 'Text Elements'}
                    </h2>
                </div>
                
                {/* Deselect button if something is selected */}
                {mode !== 'global' && (
                    <button 
                        onClick={() => { setActiveSlideId(null); setActiveElementId(null); }}
                        className="p-1 -mr-1 rounded text-[#888] hover:bg-[#f5f5f5] dark:hover:bg-[#222]" title="Deselect"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
                
                {mode === 'global' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        {/* Global Colors */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider flex items-center gap-1.5"><Palette className="w-3 h-3"/> Global Theme Colors</label>
                            
                            <div className="space-y-2">
                                {/* Background */}
                                <div className="flex items-center justify-between h-8 rounded-lg border border-[#e5e5e5] dark:border-[#333] px-2 bg-[#f5f5f5] dark:bg-[#222]">
                                    <span className="text-[10px] text-muted-foreground font-medium">Background</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono opacity-60 uppercase">{settings.backgroundColor}</span>
                                        <div className="relative w-5 h-5 rounded overflow-hidden shadow-sm border border-border/20 cursor-pointer hover:scale-105 transition-transform">
                                            <input 
                                                type="color" 
                                                value={settings.backgroundColor}
                                                onChange={e => updateSettings('backgroundColor', e.target.value)}
                                                className="absolute -inset-2 w-10 h-10 cursor-pointer opacity-0"
                                            />
                                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.backgroundColor }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Text Color */}
                                <div className="flex items-center justify-between h-8 rounded-lg border border-[#e5e5e5] dark:border-[#333] px-2 bg-[#f5f5f5] dark:bg-[#222]">
                                    <span className="text-[10px] text-muted-foreground font-medium">Text</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono opacity-60 uppercase">{settings.textColor}</span>
                                        <div className="relative w-5 h-5 rounded overflow-hidden shadow-sm border border-border/20 cursor-pointer hover:scale-105 transition-transform">
                                            <input 
                                                type="color" 
                                                value={settings.textColor}
                                                onChange={e => updateSettings('textColor', e.target.value)}
                                                className="absolute -inset-2 w-10 h-10 cursor-pointer opacity-0"
                                            />
                                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.textColor }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Accent */}
                                <div className="flex items-center justify-between h-8 rounded-lg border border-[#e5e5e5] dark:border-[#333] px-2 bg-[#f5f5f5] dark:bg-[#222]">
                                    <span className="text-[10px] text-muted-foreground font-medium">Accent</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono opacity-60 uppercase">{settings.accentColor}</span>
                                        <div className="relative w-5 h-5 rounded overflow-hidden shadow-sm border border-border/20 cursor-pointer hover:scale-105 transition-transform">
                                            <input 
                                                type="color" 
                                                value={settings.accentColor}
                                                onChange={e => updateSettings('accentColor', e.target.value)}
                                                className="absolute -inset-2 w-10 h-10 cursor-pointer opacity-0"
                                            />
                                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.accentColor }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination Settings */}
                        <div className="space-y-3 pt-4 border-t border-border/10">
                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider">Swipe Indicators</label>
                            <select 
                                className="w-full text-xs h-8 bg-[#f5f5f5] dark:bg-[#222] border-none rounded-lg focus:ring-1 focus:ring-blue-500"
                                value={settings.swipeIndicatorType}
                                onChange={e => updateSettings('swipeIndicatorType', e.target.value)}
                            >
                                <option value="arrow">Arrow Only</option>
                                <option value="text">Text Only</option>
                                <option value="both">Both</option>
                                <option value="none">Hidden</option>
                            </select>
                        </div>
                    </div>
                )}

                {mode === 'slide' && slide && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-medium">
                            Editing Slide ID: {slide.id}
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Slide Layout</label>
                            <select 
                                className="w-full text-xs h-8 bg-[#f5f5f5] dark:bg-[#222] border-none rounded-lg px-2"
                                value={slide.slideType || 'standard'}
                                onChange={e => updateSlide(slide.id, 'slideType', e.target.value)}
                            >
                                <option value="intro">Intro (Hook)</option>
                                <option value="standard">Standard Content</option>
                                <option value="quote">Quote Focus</option>
                                <option value="outro">Outro (CTA)</option>
                            </select>
                        </div>
                    </div>
                )}

                {mode === 'element' && slide && activeElementId && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium break-all">
                            Editing Target: {activeElementId}
                        </div>

                        {/* Dummy Typography Controls */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Typography Override</label>
                            <div className="grid grid-cols-2 gap-2">
                                <select className="text-xs h-8 bg-[#f5f5f5] dark:bg-[#222] border-none rounded-lg px-2 text-muted-foreground"><option>Font Family</option></select>
                                <select className="text-xs h-8 bg-[#f5f5f5] dark:bg-[#222] border-none rounded-lg px-2 text-muted-foreground"><option>Weight</option></select>
                            </div>
                        </div>
                        {/* Dynamic Color Controls */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Element Color Override</label>
                            <div className="flex gap-2 items-center">
                                {/* Preset Palettes */}
                                {['#ffffff', '#000000', '#3b82f6', '#ef4444', '#10b981'].map(c => (
                                    <div 
                                        key={c} 
                                        className="w-6 h-6 rounded border shadow-sm cursor-pointer hover:scale-110 transition-transform" 
                                        style={{ backgroundColor: c }} 
                                        onClick={() => {
                                            const newOverrides = { ...slide.colorOverrides, [activeElementId]: c };
                                            updateSlide(slide.id, 'colorOverrides', newOverrides);
                                        }}
                                    />
                                ))}

                                {/* Custom Color Input */}
                                <div className="ml-2 relative w-6 h-6 rounded border shadow-sm cursor-pointer hover:scale-110 transition-transform overflow-hidden group">
                                    <input 
                                        type="color" 
                                        className="absolute -inset-2 w-10 h-10 cursor-pointer opacity-0"
                                        value={slide.colorOverrides?.[activeElementId] || settings.textColor}
                                        onChange={(e) => {
                                            const newOverrides = { ...slide.colorOverrides, [activeElementId]: e.target.value };
                                            updateSlide(slide.id, 'colorOverrides', newOverrides);
                                        }}
                                    />
                                    <div 
                                        className="w-full h-full pointer-events-none flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900"
                                    >
                                        <span className="text-[10px] opacity-60 font-bold">+</span>
                                    </div>
                                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: slide.colorOverrides?.[activeElementId] }} />
                                </div>
                                
                                {/* Clear Override */}
                                {slide.colorOverrides?.[activeElementId] && (
                                    <button 
                                        onClick={() => {
                                            const newOverrides = { ...slide.colorOverrides };
                                            delete newOverrides[activeElementId];
                                            updateSlide(slide.id, 'colorOverrides', newOverrides);
                                        }}
                                        className="text-[9px] uppercase tracking-wider font-bold text-red-500 hover:text-red-600 px-2 py-1 bg-red-500/10 rounded"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
