'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { Palette, Baseline, Chrome, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ColorPanel() {
    const { settings, updateSettings } = useEditor();

    const colorPicks = [
        { id: 'backgroundColor', label: 'Background', icon: Palette },
        { id: 'textColor', label: 'Primary Text', icon: Baseline },
        { id: 'accentColor', label: 'Magic Accent', icon: Droplets },
    ];

    const presets = ['#ffffff', '#000000', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#fb7185', '#6366f1', '#14b8a6', '#f472b6'];

    return (
        <div className="space-y-6">
            
            {/* Pickers Grid */}
            <div className="space-y-4">
                {colorPicks.map((pick) => (
                    <div key={pick.id} className="p-5 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="flex items-center justify-between mb-4 px-1">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-rose-500/5 text-rose-500">
                                    <pick.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600/80">{pick.label}</span>
                            </div>
                            <code className="text-[9px] font-mono font-black text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-0.5 rounded-lg border border-slate-100 dark:border-white/5 uppercase">
                                {settings[pick.id as keyof typeof settings] as string}
                            </code>
                        </div>

                        <div className="flex items-center gap-5">
                            {/* Pro Color Input */}
                            <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-inner ring-4 ring-black/5 active:scale-95 transition-transform cursor-pointer">
                                <input 
                                    type="color" 
                                    className="absolute -inset-4 w-24 h-24 opacity-0 cursor-pointer"
                                    value={settings[pick.id as keyof typeof settings] as string}
                                    onChange={(e) => updateSettings(pick.id as any, e.target.value)}
                                />
                                <div className="w-full h-full pointer-events-none" style={{ backgroundColor: settings[pick.id as keyof typeof settings] as string }} />
                            </div>

                            {/* Presets Grid */}
                            <div className="flex-1 grid grid-cols-5 gap-1.5">
                                {presets.map((c) => (
                                    <button 
                                        key={c}
                                        onClick={() => updateSettings(pick.id as any, c)}
                                        className={cn(
                                            "w-full aspect-square rounded-lg border border-black/5 hover:scale-110 active:scale-90 transition-all",
                                            settings[pick.id as keyof typeof settings] === c ? "ring-2 ring-rose-500/50 scale-110" : ""
                                        )}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contrast Intel */}
            <div className="p-5 rounded-[1.8rem] bg-rose-500/5 border border-rose-500/10 flex items-center gap-4 shadow-sm animate-pulse">
                <Chrome className="w-8 h-8 text-rose-500/40 shrink-0" />
                <p className="text-[9px] font-bold text-rose-700/60 dark:text-rose-400/60 uppercase tracking-widest leading-relaxed">
                    Check contrast scores! High readability ensures your LinkedIn slides stand out.
                </p>
            </div>

        </div>
    );
}
