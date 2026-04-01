'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { FONT_PAIRS, ThemeId } from '@/lib/types';
import { Palette, Baseline } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DesignTab() {
    const { settings, updateSettings } = useEditor();

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Global Colors */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border/10 pb-2">
                    <Palette className="w-4 h-4 text-purple-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Brand Colors</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Background Color */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#111] border border-border/10 flex items-center justify-between shadow-sm">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#888] mb-1">Background</div>
                            <div className="text-sm font-mono opacity-80 uppercase">{settings.backgroundColor}</div>
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-inner border border-black/10">
                            <input 
                                type="color" 
                                value={settings.backgroundColor}
                                onChange={e => updateSettings('backgroundColor', e.target.value)}
                                className="absolute -inset-4 w-20 h-20 cursor-pointer opacity-0"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.backgroundColor }} />
                        </div>
                    </div>

                    {/* Text Color */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#111] border border-border/10 flex items-center justify-between shadow-sm">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#888] mb-1">Text Fill</div>
                            <div className="text-sm font-mono opacity-80 uppercase">{settings.textColor}</div>
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-inner border border-black/10">
                            <input 
                                type="color" 
                                value={settings.textColor}
                                onChange={e => updateSettings('textColor', e.target.value)}
                                className="absolute -inset-4 w-20 h-20 cursor-pointer opacity-0"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.textColor }} />
                        </div>
                    </div>

                    {/* Accent Color */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#111] border border-border/10 flex items-center justify-between shadow-sm">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#888] mb-1">Accent</div>
                            <div className="text-sm font-mono opacity-80 uppercase">{settings.accentColor}</div>
                        </div>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-inner border border-black/10">
                            <input 
                                type="color" 
                                value={settings.accentColor}
                                onChange={e => updateSettings('accentColor', e.target.value)}
                                className="absolute -inset-4 w-20 h-20 cursor-pointer opacity-0"
                            />
                            <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings.accentColor }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Typography */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 border-b border-border/10 pb-2">
                    <Baseline className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Typography</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(FONT_PAIRS).map(([key, pair]) => (
                        <button
                            key={key}
                            onClick={() => updateSettings('fontPair', key as any)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all",
                                settings.fontPair === key 
                                    ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500/50 dark:bg-indigo-500/10 dark:border-indigo-500/30" 
                                    : "bg-white dark:bg-[#111] border-border/10 hover:border-indigo-300"
                            )}
                        >
                            <div className="text-xs font-bold uppercase tracking-widest text-[#888] mb-2">{key}</div>
                            <div className="text-xl leading-none font-bold truncate" style={{ fontFamily: pair.heading }}>Ag</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Formatting Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Alignment</label>
                    <div className="flex bg-muted/40 p-1 rounded-xl">
                        {['left', 'center', 'right'].map((a) => (
                            <button
                                key={a}
                                onClick={() => updateSettings('alignment', a as any)}
                                className={cn(
                                    "flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors",
                                    settings.alignment === a ? "bg-white dark:bg-[#222] shadow-sm text-foreground" : "text-muted-foreground hover:bg-white/50"
                                )}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Element Density (Padding)</label>
                    <input 
                        type="range" 
                        min="5" max="12" step="1"
                        value={settings.padding}
                        onChange={(e) => updateSettings('padding', parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-2 bg-muted rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>Compact</span>
                        <span>Spacious</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
