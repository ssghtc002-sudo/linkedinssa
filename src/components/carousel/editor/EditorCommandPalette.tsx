'use client';
import React from 'react';
import {
    CommandDialog, CommandEmpty, CommandGroup,
    CommandInput, CommandItem, CommandList
} from '@/components/ui/command';
import {
    Sparkles, FileType, Image as ImageIcon,
    Undo2, Redo2, Layers, Palette, Download,
    Type, User, Keyboard
} from 'lucide-react';

interface EditorCommandPaletteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
    onAiGenerate: () => void;
    onExport: (format: 'pdf' | 'png', ratio: '1:1' | '4:5') => void;
    onTabChange: (tab: string) => void;
}

export function EditorCommandPalette({
    open, setOpen,
    canUndo, canRedo,
    onUndo, onRedo,
    onAiGenerate, onExport, onTabChange,
}: EditorCommandPaletteProps) {
    const run = (fn: () => void) => { fn(); setOpen(false); };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="AI">
                    <CommandItem onSelect={() => run(onAiGenerate)}>
                        <Sparkles className="mr-2 h-4 w-4 text-violet-500" />
                        <span>Generate AI Carousel</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Export">
                    <CommandItem onSelect={() => run(() => onExport('pdf', '1:1'))}>
                        <FileType className="mr-2 h-4 w-4 text-red-500" />
                        <span>Export Square PDF (1:1)</span>
                    </CommandItem>
                    <CommandItem onSelect={() => run(() => onExport('png', '1:1'))}>
                        <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Export Square PNGs (1:1)</span>
                    </CommandItem>
                    <CommandItem onSelect={() => run(() => onExport('pdf', '4:5'))}>
                        <FileType className="mr-2 h-4 w-4 text-red-500" />
                        <span>Export Portrait PDF (4:5)</span>
                    </CommandItem>
                    <CommandItem onSelect={() => run(() => onExport('png', '4:5'))}>
                        <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Export Portrait PNGs (4:5)</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Edit">
                    <CommandItem onSelect={() => run(onUndo)} disabled={!canUndo}>
                        <Undo2 className="mr-2 h-4 w-4" />
                        <span>Undo</span>
                        <span className="ml-auto text-xs text-muted-foreground font-mono">Ctrl+Z</span>
                    </CommandItem>
                    <CommandItem onSelect={() => run(onRedo)} disabled={!canRedo}>
                        <Redo2 className="mr-2 h-4 w-4" />
                        <span>Redo</span>
                        <span className="ml-auto text-xs text-muted-foreground font-mono">Ctrl+⇧+Z</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Panels">
                    <CommandItem onSelect={() => run(() => onTabChange('slides'))}>
                        <Layers className="mr-2 h-4 w-4" />
                        <span>Open Slides Panel</span>
                    </CommandItem>
                    <CommandItem onSelect={() => run(() => onTabChange('design'))}>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Open Design Panel</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Shortcuts">
                    <CommandItem disabled>
                        <Keyboard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ctrl+K — Command Palette</span>
                    </CommandItem>
                    <CommandItem disabled>
                        <Keyboard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ctrl+S — Save</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
