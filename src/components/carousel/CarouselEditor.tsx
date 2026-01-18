'use client';
import React, { useState, useEffect } from 'react';
import { Slide, DesignSettings, DEFAULT_SLIDES, DEFAULT_DESIGN } from '@/lib/types';
import { SlideList } from './SlideList';
import { DesignControls } from './DesignControls';
import { EditorPreview } from './EditorPreview';
import { EditorSidebar } from './EditorSidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Layout, Palette, Settings2, Menu, Loader2, Download, FileType, Image as ImageIcon, Copy, Check, Share2, Home, ChevronRight, Cloud, Save, User, Bell, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CarouselPreview, CarouselPreviewRef } from './CarouselPreview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { toast } from 'sonner';
import { Undo2, Redo2, Command, Keyboard } from 'lucide-react';

export default function CarouselEditor() {
    const searchParams = useSearchParams();
    const topicParam = searchParams.get('topic');

    const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
    const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN);
    const [activeTab, setActiveTab] = useState('content');
    const [isGenerating, setIsGenerating] = useState(false);
    const [topicInput, setTopicInput] = useState('');

    // Pro State
    const [projectTitle, setProjectTitle] = useState('Untitled Carousel');
    const [aiTone, setAiTone] = useState('professional');
    const [aiLength, setAiLength] = useState('medium');
    const [commandOpen, setCommandOpen] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date>(new Date());

    // History Management (Undo/Redo)
    const [history, setHistory] = useState<{ slides: Slide[], settings: DesignSettings }[]>([{ slides: DEFAULT_SLIDES, settings: DEFAULT_DESIGN }]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Resizable Sidebar State
    const [sidebarWidth, setSidebarWidth] = useState(380);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        if (topicParam) {
            setTopicInput(topicParam);
            handleAiGenerate(topicParam);
        }
    }, [topicParam]);

    // Handle Resizing
    const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth > 300 && newWidth < 800) { // Min/Max constraints
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    // Save to History
    const saveToHistory = React.useCallback((newSlides: Slide[], newSettings: DesignSettings) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ slides: newSlides, settings: newSettings });
        // Keep only last 50 states
        if (newHistory.length > 50) newHistory.shift();
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    }, [history, historyIndex]);

    // Undo/Redo
    const undo = React.useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setSlides(history[newIndex].slides);
            setSettings(history[newIndex].settings);
            toast.success('Undone');
        }
    }, [historyIndex, history]);

    const redo = React.useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setSlides(history[newIndex].slides);
            setSettings(history[newIndex].settings);
            toast.success('Redone');
        }
    }, [historyIndex, history]);

    // Auto-save simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            setLastSaved(new Date());
        }, 2000);
        return () => clearTimeout(timer);
    }, [slides, settings]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Command Palette: Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandOpen(true);
            }
            // Undo: Cmd/Ctrl + Z
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undo();
            }
            // Redo: Cmd/Ctrl + Shift + Z
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
                e.preventDefault();
                redo();
            }
            // Save: Cmd/Ctrl + S
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                toast.success('Project saved!');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    const updateSettings = (key: keyof DesignSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveToHistory(slides, newSettings);
    };

    const updateSlides = (newSlides: Slide[]) => {
        setSlides(newSlides);
        saveToHistory(newSlides, settings);
    };

    const handleAiGenerate = async (topic: string) => {
        if (!topic) return;
        setIsGenerating(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'carousel',
                    topic,
                    tone: aiTone,
                    length: aiLength
                }),
            });

            if (!response.ok) throw new Error('Failed to generate slides');
            const data = await response.json();

            if (data.slides && Array.isArray(data.slides)) {
                setSlides(data.slides);
                setActiveTab('content');

                const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
                const cleanTopic = cap(topic);
                setProjectTitle(cleanTopic + (aiTone === 'viral' ? ' [Viral]' : ' Guide'));

                toast.success('Carousel generated successfully!');
            } else {
                throw new Error('Invalid data format received');
            }
        } catch (error: any) {
            console.error('AI Generation Error:', error);
            toast.error(error.message || 'Failed to generate carousel');
        } finally {
            setIsGenerating(false);
        }
    };


    const previewRef = React.useRef<CarouselPreviewRef>(null);

    // ... existing functions

    return (
        <div className="relative flex h-screen overflow-hidden select-none bg-background text-foreground">
            {/* Colorful Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-500/20 blur-[80px] animate-pulse delay-2000" />
            </div>

            {/* Glass Container Wrapper */}
            <div className="z-10 flex w-full h-full bg-white/10 dark:bg-black/10 backdrop-blur-[1px]">
                {/* Left Sidebar - Resizable & Glassmorphic */}
                <EditorSidebar
                    width={sidebarWidth}
                    startResizing={startResizing}
                    isResizing={isResizing}
                    slides={slides}
                    updateSlides={setSlides}
                    settings={settings}
                    updateSettings={updateSettings}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    projectTitle={projectTitle}
                    setProjectTitle={setProjectTitle}
                    undo={undo}
                    redo={redo}
                    canUndo={historyIndex > 0}
                    canRedo={historyIndex < history.length - 1}
                    aiTone={aiTone}
                    setAiTone={setAiTone}
                    aiLength={aiLength}
                    setAiLength={setAiLength}
                    onAiGenerate={handleAiGenerate}
                    isGenerating={isGenerating}
                    topicInput={topicInput}
                    setTopicInput={setTopicInput}
                    setCommandOpen={setCommandOpen}
                    previewRef={previewRef}
                />

                {/* Main Preview Area */}
                <EditorPreview
                    sidebarWidth={sidebarWidth}
                    setSidebarWidth={setSidebarWidth}
                    slides={slides}
                    settings={settings}
                    previewRef={previewRef}
                />

                {/* Command Palette */}
                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Actions">
                            <CommandItem onSelect={() => { handleAiGenerate(topicInput || 'Content Marketing'); setCommandOpen(false); }}>
                                <Sparkles className="mr-2 h-4 w-4" />
                                <span>Generate AI Carousel</span>
                            </CommandItem>
                            <CommandItem onSelect={() => { previewRef.current?.downloadPDF(); setCommandOpen(false); }}>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Export as PDF</span>
                            </CommandItem>
                            <CommandItem onSelect={() => { previewRef.current?.downloadPNGs(); setCommandOpen(false); }}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                <span>Export as PNG</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="Edit">
                            <CommandItem onSelect={() => { undo(); setCommandOpen(false); }} disabled={historyIndex === 0}>
                                <Undo2 className="mr-2 h-4 w-4" />
                                <span>Undo</span>
                                <span className="ml-auto text-xs text-muted-foreground">Ctrl+Z</span>
                            </CommandItem>
                            <CommandItem onSelect={() => { redo(); setCommandOpen(false); }} disabled={historyIndex === history.length - 1}>
                                <Redo2 className="mr-2 h-4 w-4" />
                                <span>Redo</span>
                                <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+Z</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="View">
                            <CommandItem onSelect={() => { setActiveTab('content'); setCommandOpen(false); }}>
                                <Menu className="mr-2 h-4 w-4" />
                                <span>Content Tab</span>
                            </CommandItem>
                            <CommandItem onSelect={() => { setActiveTab('design'); setCommandOpen(false); }}>
                                <Palette className="mr-2 h-4 w-4" />
                                <span>Design Tab</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>
        </div>
    );
}
