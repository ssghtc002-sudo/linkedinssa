'use client';

import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Cloud, Download, Share, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function EditorTopBar() {
    const { undo, redo, canUndo, canRedo } = useEditor();
    const [title, setTitle] = useState('Untitled Carousel');

    return (
        <div className="h-14 w-full bg-white dark:bg-[#111] border-b border-[#e5e5e5] dark:border-[#333] shrink-0 flex items-center justify-between px-4 sticky top-0 z-50 transition-colors duration-200">
            
            {/* Left Section: File info */}
            <div className="flex items-center gap-4 flex-1">
                <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-8 max-w-[200px] bg-transparent border-transparent hover:border-border/30 focus-visible:bg-[#f5f5f5] dark:focus-visible:bg-[#222] font-semibold text-sm px-2 transition-all placeholder:text-muted-foreground/50 shadow-none"
                    placeholder="Project Name"
                />
                
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded">
                    <Cloud className="w-3.5 h-3.5" />
                    Saved
                </div>
            </div>

            {/* Center Section: History (Figma style) */}
            <div className="flex items-center gap-1 flex-1 justify-center">
                <div className="flex bg-[#f5f5f5] dark:bg-[#222] p-1 rounded-lg border border-[#e5e5e5] dark:border-[#333]">
                    <button 
                        onClick={undo}
                        disabled={!canUndo}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-[#888] hover:text-foreground hover:bg-white dark:hover:bg-[#333] transition-all disabled:opacity-30 shadow-sm"
                        title="Undo"
                    >
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={redo}
                        disabled={!canRedo}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-[#888] hover:text-foreground hover:bg-white dark:hover:bg-[#333] transition-all disabled:opacity-30 shadow-sm"
                        title="Redo"
                    >
                        <Redo2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="hidden md:flex items-center -space-x-2 mr-4">
                    <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white dark:border-[#111] z-10 text-[9px] font-bold text-white flex items-center justify-center">SG</div>
                    <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white dark:border-[#111] z-0 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white"/></div>
                </div>

                <Button variant="outline" size="sm" className="h-8 rounded-[8px] border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-[#111] text-xs font-semibold shadow-sm hover:bg-[#f5f5f5] dark:hover:bg-[#222]">
                    <Share className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                    Share
                </Button>

                <div className="flex relative">
                    <Button size="sm" className="h-8 rounded-[8px] rounded-r-none bg-blue-600 hover:bg-blue-700 text-white shadow-md text-xs font-bold px-3">
                        <Download className="w-3.5 h-3.5 mr-1.5 opacity-90" />
                        Export
                    </Button>
                    <Button size="sm" className="h-8 rounded-[8px] rounded-l-none bg-blue-700 hover:bg-blue-800 text-white shadow-md text-xs px-1 border-l border-white/20">
                        <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>
            
        </div>
    );
}
