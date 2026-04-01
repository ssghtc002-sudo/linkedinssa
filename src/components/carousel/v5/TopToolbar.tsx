'use client';

import React from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { Download, Layout, LayoutPanelLeft, ChevronDown, Share2, Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TopToolbar() {
    const { undo, redo, canUndo, canRedo } = useEditor();

    return (
        <div className="h-16 w-full flex items-center justify-between px-6 bg-transparent pointer-events-none z-[100] relative">
            
            {/* Left: Project Controls */}
            <div className="flex items-center gap-2 pointer-events-auto">
                <div className="flex items-center bg-white dark:bg-[#111] border border-border/10 rounded-xl px-1 py-1 shadow-sm transition-all duration-200">
                    <button 
                        onClick={undo}
                        disabled={!canUndo}
                        className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 text-slate-600 dark:text-slate-400 transition-colors"
                    >
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={redo}
                        disabled={!canRedo}
                        className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 text-slate-600 dark:text-slate-400 transition-colors"
                    >
                        <Redo2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Right Side Empty / Space for future floating tools */}
            <div className="flex items-center gap-3 pointer-events-none opacity-0">
                {/* Export actions removed as per request */}
            </div>

        </div>
    );
}
