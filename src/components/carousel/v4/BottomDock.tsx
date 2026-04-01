'use client';

import React, { useState } from 'react';
import { Type, Sparkles, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SlideEditorTab } from './tabs/SlideEditorTab';
import { DesignTab } from './tabs/DesignTab';
import { AiTab } from './tabs/AiTab';

type Tab = 'content' | 'ai' | 'design';

export function BottomDock() {
    const [activeTab, setActiveTab] = useState<Tab>('content');

    return (
        <div className="w-full h-1/2 min-h-[300px] max-h-[500px] bg-white dark:bg-[#111] border-t border-[#e5e5e5] dark:border-[#333] flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,0.02)] relative z-30 transition-colors duration-200">
            {/* Dock Navigation */}
            <div className="flex items-center justify-center p-2 bg-[#f9f9f9] dark:bg-[#151515] border-b border-border/10 shrink-0 gap-2 overflow-x-auto custom-scrollbar">
                
                <button
                    onClick={() => setActiveTab('content')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 uppercase tracking-widest text-[10px]",
                        activeTab === 'content' 
                            ? "bg-white dark:bg-[#222] text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-border/10" 
                            : "text-muted-foreground hover:bg-white/50 dark:hover:bg-[#222]/50 hover:text-foreground"
                    )}
                >
                    <Type className="w-4 h-4" /> Slide Content
                </button>
                
                <button
                    onClick={() => setActiveTab('ai')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 uppercase tracking-widest text-[10px]",
                        activeTab === 'ai' 
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-500/10" 
                            : "text-muted-foreground hover:bg-white/50 dark:hover:bg-[#222]/50 hover:text-foreground"
                    )}
                >
                    <Sparkles className="w-4 h-4" /> AI Generator
                </button>
                
                <button
                    onClick={() => setActiveTab('design')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 uppercase tracking-widest text-[10px]",
                        activeTab === 'design' 
                            ? "bg-white dark:bg-[#222] text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-border/10" 
                            : "text-muted-foreground hover:bg-white/50 dark:hover:bg-[#222]/50 hover:text-foreground"
                    )}
                >
                    <Palette className="w-4 h-4" /> Design Settings
                </button>

            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 relative">
                {activeTab === 'content' && <SlideEditorTab />}
                {activeTab === 'ai' && <AiTab />}
                {activeTab === 'design' && <DesignTab />}
            </div>
        </div>
    );
}
