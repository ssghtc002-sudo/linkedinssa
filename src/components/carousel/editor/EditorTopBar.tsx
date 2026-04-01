'use client';
import React from 'react';
import Link from 'next/link';
import {
    Home, Undo2, Redo2, Cloud, CloudOff,
    Download, FileType, Image as ImageIcon,
    ChevronDown, Keyboard, Command as CommandIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EditorTopBarProps {
    projectTitle: string;
    setProjectTitle: (t: string) => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    lastSaved: Date | null;
    onExport: (format: 'pdf' | 'png', ratio: '1:1' | '4:5') => void;
    onCommandOpen: () => void;
    isSaving?: boolean;
}

export function EditorTopBar({
    projectTitle,
    setProjectTitle,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    lastSaved,
    onExport,
    onCommandOpen,
    isSaving,
}: EditorTopBarProps) {
    const savedLabel = lastSaved
        ? `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : 'Not saved';

    return (
        <header className="h-12 shrink-0 flex items-center gap-2 px-3 border-b border-white/10 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl z-30 shadow-sm">
            {/* Logo / Home */}
            <Link
                href="/"
                className="flex items-center gap-2 shrink-0 group"
                title="Back to Home"
            >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Home className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CarouselGem
                </span>
            </Link>

            <div className="w-px h-6 bg-border/30 mx-1 hidden sm:block" />

            {/* Project Title */}
            <Input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="h-8 w-40 md:w-56 text-sm font-semibold bg-transparent border-transparent hover:border-border/40 focus:border-primary/50 focus:bg-white dark:focus:bg-slate-900 px-2 shadow-none transition-all truncate"
                placeholder="Untitled Carousel"
            />

            {/* Save Status */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium shrink-0">
                {isSaving ? (
                    <span className="text-amber-500 flex items-center gap-1">
                        <CloudOff className="w-3 h-3 animate-pulse" /> Saving...
                    </span>
                ) : (
                    <span className="text-emerald-500 flex items-center gap-1">
                        <Cloud className="w-3 h-3" />
                        <span className="hidden md:block">{savedLabel}</span>
                        <span className="md:hidden">Saved</span>
                    </span>
                )}
            </div>

            <div className="flex-1" />

            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5 bg-muted/50 rounded-lg p-0.5 border border-border/20">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md disabled:opacity-30 hover:bg-white dark:hover:bg-slate-800"
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Undo (Ctrl+Z)"
                >
                    <Undo2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md disabled:opacity-30 hover:bg-white dark:hover:bg-slate-800"
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Redo (Ctrl+Shift+Z)"
                >
                    <Redo2 className="w-3.5 h-3.5" />
                </Button>
            </div>

            {/* Command Palette */}
            <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-7 gap-1.5 text-xs text-muted-foreground border-border/40 hover:bg-white dark:hover:bg-slate-800 px-2"
                onClick={onCommandOpen}
                title="Command Palette (Ctrl+K)"
            >
                <CommandIcon className="w-3 h-3" />
                <Keyboard className="w-3 h-3" />
                <span className="text-[10px] font-mono">K</span>
            </Button>

            {/* Export */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        className="h-8 gap-1.5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 transition-all rounded-xl"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export</span>
                        <ChevronDown className="w-3 h-3 opacity-70" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-xl border-border/40">
                    <DropdownMenuLabel className="text-xs font-bold text-muted-foreground">
                        Square (1:1) — 1080×1080
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onExport('pdf', '1:1')} className="cursor-pointer text-xs rounded-lg mx-1">
                        <FileType className="w-4 h-4 mr-2 text-red-500" /> Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport('png', '1:1')} className="cursor-pointer text-xs rounded-lg mx-1">
                        <ImageIcon className="w-4 h-4 mr-2 text-blue-500" /> Export as PNGs
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-bold text-muted-foreground">
                        Portrait (4:5) — 1080×1350
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onExport('pdf', '4:5')} className="cursor-pointer text-xs rounded-lg mx-1">
                        <FileType className="w-4 h-4 mr-2 text-red-500" /> Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport('png', '4:5')} className="cursor-pointer text-xs rounded-lg mx-1">
                        <ImageIcon className="w-4 h-4 mr-2 text-blue-500" /> Export as PNGs
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
