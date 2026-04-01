'use client';
import React from 'react';
import { Layers, Palette, Sparkles, Monitor, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

type MobileTab = 'slides' | 'preview' | 'ai' | 'design' | 'export';

interface EditorBottomBarProps {
    activeTab: MobileTab;
    onTabChange: (tab: MobileTab) => void;
    isGenerating?: boolean;
}

const TABS: { id: MobileTab; icon: React.ElementType; label: string; special?: boolean }[] = [
    { id: 'slides', icon: Layers, label: 'Slides' },
    { id: 'preview', icon: Monitor, label: 'Preview' },
    { id: 'ai', icon: Sparkles, label: 'AI', special: true },
    { id: 'design', icon: Palette, label: 'Design' },
    { id: 'export', icon: Download, label: 'Export' },
];

export function EditorBottomBar({ activeTab, onTabChange, isGenerating }: EditorBottomBarProps) {
    return (
        <nav className="md:hidden shrink-0 flex items-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 shadow-2xl z-50 safe-area-bottom">
            {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                if (tab.special) {
                    // AI button — centered, elevated
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="flex-1 flex flex-col items-center justify-center pt-1 pb-2"
                        >
                            <div className={cn(
                                "w-12 h-8 -mt-4 flex items-center justify-center rounded-2xl shadow-lg transition-all",
                                isActive
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 scale-110 shadow-purple-500/40"
                                    : "bg-gradient-to-r from-violet-500 to-purple-500",
                                isGenerating && "animate-pulse"
                            )}>
                                <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className={cn(
                                "text-[9px] font-bold mt-0.5",
                                isActive ? "text-violet-600" : "text-violet-500"
                            )}>
                                AI
                            </span>
                        </button>
                    );
                }

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all",
                            isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-6 flex items-center justify-center rounded-full transition-all",
                            isActive ? "bg-blue-500/15" : ""
                        )}>
                            <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <span className="text-[9px] font-semibold">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
