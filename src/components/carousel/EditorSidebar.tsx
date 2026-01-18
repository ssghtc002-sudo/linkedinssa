import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sparkles, Menu, Palette, Download, Home, ChevronRight,
    Undo2, Redo2, Keyboard, Cloud, Bell, Check, FileType,
    Image as ImageIcon, Loader2, Briefcase, Zap, Coffee,
    AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SlideList } from './SlideList';
import { DesignControls } from './DesignControls';
import { Slide, DesignSettings } from '@/lib/types';
import { CarouselPreviewRef } from './CarouselPreview';

interface EditorSidebarProps {
    width: number;
    startResizing: (e: React.MouseEvent) => void;
    isResizing: boolean;

    // State
    slides: Slide[];
    updateSlides: (slides: Slide[]) => void;
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;

    // Tab State
    activeTab: string;
    setActiveTab: (tab: string) => void;

    // Project Metadata
    projectTitle: string;
    setProjectTitle: (title: string) => void;

    // History
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;

    // AI
    aiTone: string;
    setAiTone: (tone: string) => void;
    aiLength: string;
    setAiLength: (length: string) => void;
    onAiGenerate: (topic: string) => void;
    isGenerating: boolean;
    topicInput: string;
    setTopicInput: (val: string) => void;

    // Misc
    setCommandOpen: (open: boolean) => void;
    previewRef: React.RefObject<CarouselPreviewRef | null>;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    width, startResizing, isResizing,
    slides, updateSlides,
    settings, updateSettings,
    activeTab, setActiveTab,
    projectTitle, setProjectTitle,
    undo, redo, canUndo, canRedo,
    aiTone, setAiTone, aiLength, setAiLength, onAiGenerate, isGenerating, topicInput, setTopicInput,
    setCommandOpen, previewRef
}) => {
    return (
        <div
            className="relative border-r border-white/20 dark:border-white/10 flex flex-col bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl shadow-2xl z-20 shrink-0 transition-all duration-300"
            style={{ width }}
        >
            {/* Header - Compact & Elegant */}
            <div className="h-9 border-b border-border/10 flex items-center justify-between px-2.5 bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-900/30 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                        title="Go to Homepage"
                    >
                        <Home className="w-3.5 h-3.5 text-white" />
                    </Link>
                    <Input
                        type="text"
                        placeholder="Untitled Carousel"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="h-6 border-transparent hover:border-border/50 focus:border-primary/50 bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 font-semibold text-[11px] w-full max-w-[160px] px-2 truncate transition-all shadow-none"
                    />
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-md transition-all"
                        onClick={undo}
                        disabled={!canUndo}
                    >
                        <Undo2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-md transition-all"
                        onClick={redo}
                        disabled={!canRedo}
                    >
                        <Redo2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* AI Generation Section - Premium Design */}
            <div className="p-2.5 border-b border-border/10 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="relative overflow-hidden rounded-xl border border-blue-200/50 dark:border-blue-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-lg">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

                    <div className="relative p-2.5 space-y-2">
                        {/* AI Header */}
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[11px] font-bold text-foreground">AI Carousel Generator</h3>
                                <p className="text-[9px] text-muted-foreground">Create slides instantly</p>
                            </div>
                        </div>

                        {/* Topic Input */}
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Enter your topic... (e.g., '5 tips for productivity')"
                                value={topicInput}
                                onChange={(e) => setTopicInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onAiGenerate(topicInput)}
                                className="h-8 pl-3 pr-3 text-[11px] bg-white/80 dark:bg-slate-900/80 border-border/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-lg shadow-sm placeholder:text-muted-foreground/60"
                            />
                        </div>

                        {/* Tone & Length Controls */}
                        <div className="flex items-center gap-2">
                            {/* Tone Toggle */}
                            <div className="flex-1">
                                <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Tone</label>
                                <div className="flex items-center gap-0.5 p-0.5 bg-muted/40 rounded-lg border border-border/20">
                                    {[
                                        { id: 'professional', icon: Briefcase, label: 'Pro' },
                                        { id: 'viral', icon: Zap, label: 'Viral' },
                                        { id: 'casual', icon: Coffee, label: 'Fun' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setAiTone(t.id)}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-1 py-1.5 text-[9px] font-semibold rounded-md transition-all",
                                                aiTone === t.id
                                                    ? "bg-white dark:bg-slate-800 text-primary shadow-md"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
                                            )}
                                            title={t.label}
                                        >
                                            <t.icon className="w-3 h-3" />
                                            <span className="hidden sm:inline">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Length Toggle */}
                            <div className="w-[90px] shrink-0">
                                <label className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Length</label>
                                <div className="flex items-center gap-0.5 p-0.5 bg-muted/40 rounded-lg border border-border/20">
                                    {[
                                        { id: 'short', icon: AlignLeft, label: 'S' },
                                        { id: 'medium', icon: AlignCenter, label: 'M' },
                                        { id: 'long', icon: AlignRight, label: 'L' }
                                    ].map((l) => (
                                        <button
                                            key={l.id}
                                            onClick={() => setAiLength(l.id)}
                                            className={cn(
                                                "flex-1 flex items-center justify-center py-1.5 text-[9px] font-bold rounded-md transition-all",
                                                aiLength === l.id
                                                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
                                            )}
                                            title={l.id.charAt(0).toUpperCase() + l.id.slice(1)}
                                        >
                                            <l.icon className="w-3 h-3" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={() => onAiGenerate(topicInput)}
                            disabled={!topicInput.trim() || isGenerating}
                            className="w-full h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all text-[11px] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                                    Generate Carousel
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs (Compact) */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 border-t border-border/10">
                <div className="px-3 py-2 bg-gradient-to-r from-white/30 to-white/10 dark:from-slate-900/30 dark:to-slate-900/10 backdrop-blur-sm border-b border-border/10">
                    <TabsList className="w-full grid grid-cols-2 p-0.5 h-9 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm rounded-lg">
                        <TabsTrigger
                            value="content"
                            className="rounded-md text-[11px] font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 text-muted-foreground/80 hover:text-foreground h-8"
                        >
                            <Menu className="w-3.5 h-3.5 mr-1.5" />
                            Content
                        </TabsTrigger>
                        <TabsTrigger
                            value="design"
                            className="rounded-md text-[11px] font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-purple-600 data-[state=active]:shadow-sm transition-all duration-200 text-muted-foreground/80 hover:text-foreground h-8"
                        >
                            <Palette className="w-3.5 h-3.5 mr-1.5" />
                            Design
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Content Tab */}
                <TabsContent value="content" className="flex-1 m-0 border-0 min-h-0 data-[state=inactive]:hidden text-foreground animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ScrollArea className="h-full w-full">
                        <SlideList slides={slides} setSlides={updateSlides} />
                    </ScrollArea>
                </TabsContent>

                {/* Design Tab */}
                <TabsContent value="design" className="flex-1 m-0 border-0 min-h-0 data-[state=inactive]:hidden text-foreground animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ScrollArea className="h-full w-full">
                        <DesignControls settings={settings} updateSettings={updateSettings} />
                    </ScrollArea>
                </TabsContent>
            </Tabs>

            {/* Drag Handle */}
            <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors z-50 translate-x-[50%] group ${isResizing ? 'bg-primary' : 'bg-transparent'}`}
                onMouseDown={startResizing}
            >
                <div className="absolute top-1/2 left-0 -translate-x-1/2 w-1.5 h-8 bg-border/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
            </div>
        </div>
    );
};
