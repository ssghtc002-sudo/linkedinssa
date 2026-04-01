'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { FONT_PAIRS } from '@/lib/types';
import { Type, AlignLeft, AlignCenter, AlignRight, Maximize2, MoveVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TextPanel() {
    const { settings, updateSettings } = useEditor();

    const fontPicks = Object.entries(FONT_PAIRS).map(([id, pair]) => ({ id, ...pair }));

    return (
        <div className="space-y-8">
            
            {/* Font Pair Picker */}
            <div className="space-y-4">
                <label className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.2em] block px-1">Typeface Pairings</label>
                <div className="grid grid-cols-1 gap-3">
                    {fontPicks.map((pair) => (
                        <button
                            key={pair.id}
                            onClick={() => updateSettings('fontPair', pair.id as any)}
                            className={cn(
                                "p-5 rounded-[2.5rem] border text-left transition-all duration-300 group relative overflow-hidden flex flex-col",
                                settings.fontPair === pair.id 
                                    ? "bg-cyan-500/5 border-cyan-400 dark:bg-cyan-900/10 shadow-lg ring-1 ring-cyan-500/20" 
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-500/30"
                            )}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest",
                                    settings.fontPair === pair.id ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400"
                                )}>
                                    {pair.id}
                                </span>
                                {settings.fontPair === pair.id && <Type className="w-4 h-4 text-cyan-500" />}
                            </div>
                            <div 
                                className="text-xl font-black mb-1 tracking-tight text-slate-800 dark:text-white" 
                                style={{ fontFamily: pair.heading }}
                            >
                                Bold Heading
                            </div>
                            <div 
                                className="text-[10px] font-bold opacity-50 text-slate-500 dark:text-slate-400" 
                                style={{ fontFamily: pair.body }}
                            >
                                Body content looks exactly like this.
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Global Alignment */}
            <div className="space-y-4 pt-2">
                <label className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.2em] block px-1 text-center">Canvas Alignment</label>
                <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-[1.8rem] border border-slate-100 dark:border-white/5">
                    {[
                        { id: 'left', icon: AlignLeft },
                        { id: 'center', icon: AlignCenter },
                        { id: 'right', icon: AlignRight }
                    ].map((align) => (
                        <button
                            key={align.id}
                            onClick={() => updateSettings('alignment', align.id as any)}
                            className={cn(
                                "flex-1 flex items-center justify-center py-2.5 rounded-2xl transition-all",
                                settings.alignment === align.id 
                                    ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md ring-1 ring-black/5" 
                                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500"
                            )}
                        >
                            <align.icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Spacing & Sizing */}
            <div className="space-y-4 pt-2">
                <div className="space-y-3 p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.2em] block">Margin Density</label>
                        <span className="text-[9px] font-black text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">{settings.padding} rem</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MoveVertical className="w-4 h-4 text-cyan-500/40" />
                        <input 
                            type="range" 
                            min="4" max="15" step="1"
                            value={settings.padding}
                            onChange={(e) => updateSettings('padding', parseInt(e.target.value))}
                            className="flex-1 accent-cyan-500 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer"
                        />
                        <Maximize2 className="w-4 h-4 text-cyan-500/40" />
                    </div>
                </div>
            </div>

        </div>
    );
}
