'use client';

import React from 'react';
import { useEditor } from '../context/EditorContext';
import { Sparkles, Layers, Paintbrush, Image as ImageIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function ToolStrip() {
    const { activePanel, setActivePanel } = useEditor();

    const TOOLS = [
        { id: 'ai' as const, icon: Sparkles, label: 'AI Generator' },
        { id: 'outline' as const, icon: Layers, label: 'Slide Outline' },
        { id: 'templates' as const, icon: Paintbrush, label: 'Templates' },
        { id: 'settings' as const, icon: ImageIcon, label: 'Backgrounds' },
    ];

    return (
        <div className="w-16 h-full flex flex-col items-center py-4 bg-white dark:bg-black border-r border-[#e5e5e5] dark:border-[#333] shrink-0 z-50 shadow-sm relative transition-colors duration-200">
            {/* Top Logo / Home */}
            <div className="w-10 h-10 mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex shadow-md items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <div className="w-4 h-4 bg-white rounded-sm drop-shadow rotate-12" />
            </div>

            {/* Tools Area */}
            <div className="flex-1 flex flex-col gap-3 w-full items-center">
                {TOOLS.map(t => {
                    const active = activePanel === t.id;
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActivePanel(activePanel === t.id ? null : t.id)}
                            className={cn(
                                "w-11 h-11 flex flex-col items-center justify-center rounded-[10px] transition-all duration-200 relative group",
                                active 
                                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400" 
                                    : "text-[#888] hover:text-foreground hover:bg-[#f5f5f5] dark:hover:bg-[#222]"
                            )}
                            title={t.label}
                        >
                            {/* Selected Indicator Bar */}
                            {active && (
                                <div className="absolute left-[-11px] top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
                            )}
                            <Icon className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={active ? 2.5 : 2} />
                        </button>
                    );
                })}
            </div>

            {/* Bottom Tools (Help, Search) */}
            <div className="flex flex-col gap-3 w-full items-center mt-auto">
                <button className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-foreground rounded-[10px] hover:bg-[#f5f5f5] dark:hover:bg-[#222]">
                    <Search className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 overflow-hidden cursor-pointer" />
            </div>
        </div>
    );
}
