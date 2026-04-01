'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { User, AtSign, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BrandPanel() {
    const { settings, updateSettings } = useEditor();

    return (
        <div className="space-y-6">
            
            {/* Visibility Toggle */}
            <div className="p-5 rounded-[2.2rem] bg-amber-500/5 border border-amber-500/10 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl transition-all", settings.showWatermark ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400")}>
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-600/80">Author Branding</span>
                </div>
                <button 
                    onClick={() => updateSettings('showWatermark', !settings.showWatermark)}
                    className={cn(
                        "w-11 h-6 rounded-full transition-all relative overflow-hidden",
                        settings.showWatermark ? "bg-amber-500" : "bg-slate-200 dark:bg-white/10"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 bottom-1 w-4 bg-white rounded-full transition-all shadow-sm",
                        settings.showWatermark ? "right-1" : "left-1"
                    )} />
                </button>
            </div>

            {/* Profile Card Integration */}
            <div className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center gap-4 pb-2">
                    <div 
                        className="relative group/avatar cursor-pointer"
                        onClick={() => document.getElementById('author-image-upload')?.click()}
                    >
                        <div className="w-24 h-24 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center border-2 border-dashed border-amber-500/20 group-hover/avatar:border-amber-500/50 transition-all overflow-hidden shadow-inner group-hover/avatar:shadow-xl group-hover/avatar:scale-105 duration-500">
                            {settings.authorImage ? (
                                <img src={settings.authorImage} alt="" className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500" />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-amber-500/20 group-hover/avatar:text-amber-500/40" />
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-amber-500/0 group-hover/avatar:bg-amber-500/10 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all">
                                <span className="text-[8px] font-black uppercase text-amber-600 bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-full shadow-lg border border-amber-500/20">Change</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-950 group-hover/avatar:scale-110 transition-transform">
                            <ImageIcon className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    
                    <input 
                        id="author-image-upload"
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    updateSettings('authorImage', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <div className="w-full space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-amber-600/60 px-1 block text-center">Or Paste Photo URL</label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-transparent focus:border-amber-500/30 rounded-2xl py-3 px-4 text-[10px] font-bold text-center focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-400"
                            value={settings.authorImage || ''}
                            onChange={(e) => updateSettings('authorImage', e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-amber-600/60 px-1">Display Name</label>
                        <div className="flex items-center bg-slate-50 dark:bg-white/5 border border-transparent focus-within:border-amber-500/30 rounded-[1.2rem] px-4 focus-within:ring-4 focus-within:ring-amber-500/5 transition-all">
                            <User className="w-4 h-4 text-amber-500/40" />
                            <input 
                                type="text" 
                                className="w-full bg-transparent border-none py-3.5 px-3 text-xs font-black tracking-tight focus:ring-0 text-slate-800 dark:text-white"
                                value={settings.authorName}
                                onChange={(e) => updateSettings('authorName', e.target.value)}
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    {/* Handle Input */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-amber-600/60 px-1">Social Handle</label>
                        <div className="flex items-center bg-slate-50 dark:bg-white/5 border border-transparent focus-within:border-amber-500/30 rounded-[1.2rem] px-4 focus-within:ring-4 focus-within:ring-amber-500/5 transition-all">
                            <AtSign className="w-4 h-4 text-amber-500/40" />
                            <input 
                                type="text" 
                                className="w-full bg-transparent border-none py-3.5 px-3 text-xs font-black tracking-tight focus:ring-0 text-slate-800 dark:text-white"
                                value={settings.authorHandle}
                                onChange={(e) => updateSettings('authorHandle', e.target.value)}
                                placeholder="@handle"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Branding Tip */}
            <div className="p-5 rounded-[1.8rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
                <p className="text-[9px] font-bold text-amber-700/60 dark:text-amber-400/60 uppercase tracking-widest leading-relaxed text-center w-full italic">
                    Branding appears on every slide. Keep it professional.
                </p>
            </div>

        </div>
    );
}
