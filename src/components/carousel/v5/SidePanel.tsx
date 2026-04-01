'use client';

import React from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { cn } from '@/lib/utils';
import { X, Sparkles, Layout, Palette, Type, Briefcase, Settings } from 'lucide-react';
import { AiPanel } from './panels/AiPanel';
import { ColorPanel } from './panels/ColorPanel';
import { TextPanel } from './panels/TextPanel';
import { BrandPanel } from './panels/BrandPanel';
import { TemplatesPanel } from './panels/TemplatesPanel';
import { SlideSettingsPanel } from './panels/SlideSettingsPanel';

const panelMeta: Record<string, { title: string; icon: any; color: string; bg: string }> = {
    ai: { title: 'AI Magic Writer', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    templates: { title: 'Design Templates', icon: Layout, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    brand: { title: 'Brand Identity', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    colors: { title: 'Color System', icon: Palette, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    text: { title: 'Typography', icon: Type, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    settings: { title: 'Slide Settings', icon: Settings, color: 'text-slate-500', bg: 'bg-slate-500/10' },
};

export function SidePanel() {
    const { activePanel, setActivePanel } = useEditor();

    if (!activePanel) return null;
    const meta = panelMeta[activePanel] || panelMeta.settings;

    return (
        <div 
            className={cn(
                "fixed z-[500] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                "bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
                // Mobile Styles (Bottom Drawer)
                "bottom-0 left-0 right-0 w-full h-[88vh] rounded-t-[3.5rem] border-t",
                // Desktop Styles (Floating Sidebar - Perfectly Aligned After Nav)
                "md:top-6 md:left-[104px] md:bottom-6 md:w-[380px] md:h-auto md:rounded-[3.5rem] md:border",
                activePanel 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:-translate-x-10"
            )}
        >
            {/* Header Area */}
            <div className="relative overflow-hidden shrink-0">
                {/* Subtle Header Gradient */}
                <div className={cn("absolute inset-0 opacity-10 blur-2xl -translate-y-1/2", meta.bg.replace('/10', ''))} />
                
                <div className="relative flex items-center justify-between px-8 py-7">
                    <div className="flex items-center gap-4">
                        <div className={cn("p-2.5 rounded-2xl transition-colors duration-500", meta.bg)}>
                            <meta.icon className={cn("w-6 h-6", meta.color)} />
                        </div>
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Toolbox</h2>
                            <p className="text-lg font-black tracking-tight text-slate-800 dark:text-white leading-none mt-0.5">{meta.title}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setActivePanel(null)}
                        className="group p-2 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                    >
                        <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </button>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
            </div>

            {/* Panel Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    {activePanel === 'ai' && <AiPanel />}
                    {activePanel === 'colors' && <ColorPanel />}
                    {activePanel === 'text' && <TextPanel />}
                    {activePanel === 'brand' && <BrandPanel />}
                    {activePanel === 'templates' && <TemplatesPanel />}
                    {activePanel === 'settings' && <SlideSettingsPanel />}
                </div>
            </div>

            {/* Footer Detail */}
            <div className="px-8 py-4 opacity-30 pointer-events-none text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-400">
                    CarouselGem Studio V5
                </span>
            </div>
        </div>
    );
}
