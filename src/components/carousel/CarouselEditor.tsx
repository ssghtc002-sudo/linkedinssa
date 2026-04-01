'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slide, DesignSettings, DEFAULT_SLIDES, DEFAULT_DESIGN } from '@/lib/types';
import { ExportEngine } from './ExportEngine';
import { CarouselPreviewRef } from './CarouselPreview';
import { toast } from 'sonner';

// ── Editor sub-components ─────────────────────────────────────────────────────
import { EditorTopBar } from './editor/EditorTopBar';
import { EditorLeftPanel } from './editor/EditorLeftPanel';
import { EditorRightPanel } from './editor/EditorRightPanel';
import { EditorCanvas } from './editor/EditorCanvas';
import { EditorBottomBar } from './editor/EditorBottomBar';
import { EditorCommandPalette } from './editor/EditorCommandPalette';

// Mobile panel types
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type MobileTab = 'slides' | 'preview' | 'ai' | 'design' | 'export';

export default function CarouselEditor() {
    // ── Core State ──────────────────────────────────────────────────────────
    const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
    const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN);
    const [projectTitle, setProjectTitle] = useState('Untitled Carousel');

    // ── AI State ────────────────────────────────────────────────────────────
    const [topicInput, setTopicInput] = useState('');
    const [aiTone, setAiTone] = useState('professional');
    const [aiLength, setAiLength] = useState('medium');
    const [isGenerating, setIsGenerating] = useState(false);

    // ── History (Undo/Redo) ─────────────────────────────────────────────────
    const [history, setHistory] = useState<{ slides: Slide[]; settings: DesignSettings }[]>([
        { slides: DEFAULT_SLIDES, settings: DEFAULT_DESIGN },
    ]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // ── UI State ────────────────────────────────────────────────────────────
    const [commandOpen, setCommandOpen] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
    const [isSaving, setIsSaving] = useState(false);
    const [mobileTab, setMobileTab] = useState<MobileTab>('preview');

    // ── Sidebar Resize (Desktop) ────────────────────────────────────────────
    const [leftWidth, setLeftWidth] = useState(300);
    const [rightWidth, setRightWidth] = useState(264);
    const [isResizingLeft, setIsResizingLeft] = useState(false);

    const previewRef = useRef<CarouselPreviewRef>(null);

    // ── History Helpers ──────────────────────────────────────────────────────
    const pushHistory = useCallback(
        (newSlides: Slide[], newSettings: DesignSettings) => {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push({ slides: newSlides, settings: newSettings });
            if (newHistory.length > 50) newHistory.shift();
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        },
        [history, historyIndex]
    );

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const idx = historyIndex - 1;
            setHistoryIndex(idx);
            setSlides(history[idx].slides);
            setSettings(history[idx].settings);
            toast.success('Undone');
        }
    }, [historyIndex, history]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const idx = historyIndex + 1;
            setHistoryIndex(idx);
            setSlides(history[idx].slides);
            setSettings(history[idx].settings);
            toast.success('Redone');
        }
    }, [historyIndex, history]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    // ── Update Helpers ───────────────────────────────────────────────────────
    const updateSlides = (newSlides: Slide[]) => {
        setSlides(newSlides);
        pushHistory(newSlides, settings);
    };

    const updateSlide = (id: string, field: keyof Slide, value: any) => {
        const newSlides = slides.map(s => s.id === id ? { ...s, [field]: value } : s);
        updateSlides(newSlides);
    };

    const updateSettings = (key: keyof DesignSettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        pushHistory(slides, newSettings);
    };

    // ── Auto-save ────────────────────────────────────────────────────────────
    useEffect(() => {
        setIsSaving(true);
        const t = setTimeout(() => {
            setLastSaved(new Date());
            setIsSaving(false);
        }, 1500);
        return () => clearTimeout(t);
    }, [slides, settings]);

    // ── Keyboard Shortcuts ───────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;
            if (mod && e.key === 'k') { e.preventDefault(); setCommandOpen(true); }
            if (mod && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); }
            if (mod && e.shiftKey && e.key === 'z') { e.preventDefault(); redo(); }
            if (mod && e.key === 's') { e.preventDefault(); toast.success('Saved!'); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [undo, redo]);

    // ── Left Sidebar Resizing ────────────────────────────────────────────────
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isResizingLeft) return;
            const w = e.clientX;
            if (w > 240 && w < 500) setLeftWidth(w);
        };
        const onUp = () => setIsResizingLeft(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [isResizingLeft]);

    // ── AI Generation ────────────────────────────────────────────────────────
    const handleAiGenerate = async (topic: string) => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'carousel', topic, tone: aiTone, length: aiLength }),
            });
            if (!res.ok) throw new Error('Generation failed');
            const data = await res.json();
            if (data.slides && Array.isArray(data.slides)) {
                updateSlides(data.slides);
                const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
                setProjectTitle(cap(topic) + (aiTone === 'viral' ? ' [Viral]' : ' Guide'));
                toast.success(`Generated ${data.slides.length} slides!`);
                setMobileTab('preview');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err: any) {
            toast.error(err.message || 'Failed to generate');
        } finally {
            setIsGenerating(false);
        }
    };

    // ── Export ────────────────────────────────────────────────────────────────
    const handleExport = async (format: 'pdf' | 'png', ratio: '1:1' | '4:5') => {
        const exportSettings = { ...settings, aspectRatio: ratio };
        const engine = new ExportEngine(slides, exportSettings);
        const label = format === 'pdf' ? 'PDF' : 'PNGs';
        toast.loading(`Exporting ${label}...`);
        try {
            if (format === 'pdf') await engine.exportPDF();
            else await engine.exportPNGs();
            toast.dismiss();
            toast.success(`${label} exported!`);
        } catch {
            toast.dismiss();
            toast.error('Export failed');
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground select-none">

            {/* Ambient glows */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] rounded-full bg-blue-500/8 blur-[140px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full bg-purple-500/8 blur-[140px] animate-pulse [animation-delay:1.5s]" />
            </div>

            {/* Top bar */}
            <div className="relative z-20">
                <EditorTopBar
                    projectTitle={projectTitle}
                    setProjectTitle={setProjectTitle}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    onUndo={undo}
                    onRedo={redo}
                    lastSaved={lastSaved}
                    onExport={handleExport}
                    onCommandOpen={() => setCommandOpen(true)}
                    isSaving={isSaving}
                />
            </div>

            {/* ── Desktop 3-panel layout ───────────────────────────────── */}
            <main className="hidden md:flex flex-1 min-h-0 overflow-hidden relative z-10">

                {/* Left Panel */}
                <div
                    className="shrink-0 flex flex-col border-r border-white/10 dark:border-white/5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl shadow-xl z-20 relative"
                    style={{ width: leftWidth }}
                >
                    <EditorLeftPanel
                        topicInput={topicInput}
                        setTopicInput={setTopicInput}
                        aiTone={aiTone}
                        setAiTone={setAiTone}
                        aiLength={aiLength}
                        setAiLength={setAiLength}
                        onAiGenerate={handleAiGenerate}
                        isGenerating={isGenerating}
                        slides={slides}
                        setSlides={updateSlides}
                    />

                    {/* Resize handle */}
                    <div
                        className={`absolute right-0 top-0 w-1 h-full cursor-col-resize z-50 translate-x-[50%] group hover:bg-blue-500/40 transition-colors ${isResizingLeft ? 'bg-blue-500/50' : ''}`}
                        onMouseDown={() => setIsResizingLeft(true)}
                    >
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-1.5 h-10 bg-border/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Center Canvas */}
                <EditorCanvas
                    slides={slides}
                    settings={settings}
                    previewRef={previewRef}
                    onExport={handleExport}
                    onUpdateSlide={updateSlide}
                />

                {/* Right Panel */}
                <div
                    className="shrink-0 flex flex-col bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl shadow-xl z-20"
                    style={{ width: rightWidth }}
                >
                    <EditorRightPanel settings={settings} updateSettings={updateSettings} />
                </div>
            </main>

            {/* ── Mobile panel area ────────────────────────────────────── */}
            <main className="md:hidden flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">

                {/* Preview panel */}
                <div className={cn("flex-1 flex flex-col min-h-0", mobileTab !== 'preview' ? 'hidden' : '')}>
                    <EditorCanvas
                        slides={slides}
                        settings={settings}
                        previewRef={previewRef}
                        onExport={handleExport}
                        onUpdateSlide={updateSlide}
                    />
                </div>

                {/* Slides panel */}
                {mobileTab === 'slides' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl overflow-hidden">
                        <EditorLeftPanel
                            topicInput={topicInput}
                            setTopicInput={setTopicInput}
                            aiTone={aiTone}
                            setAiTone={setAiTone}
                            aiLength={aiLength}
                            setAiLength={setAiLength}
                            onAiGenerate={handleAiGenerate}
                            isGenerating={isGenerating}
                            slides={slides}
                            setSlides={updateSlides}
                        />
                    </div>
                )}

                {/* AI panel (mobile) */}
                {mobileTab === 'ai' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl overflow-hidden">
                        {/* Show AI panel from left panel but with AI open */}
                        <EditorLeftPanel
                            topicInput={topicInput}
                            setTopicInput={setTopicInput}
                            aiTone={aiTone}
                            setAiTone={setAiTone}
                            aiLength={aiLength}
                            setAiLength={setAiLength}
                            onAiGenerate={handleAiGenerate}
                            isGenerating={isGenerating}
                            slides={slides}
                            setSlides={updateSlides}
                            hideSlides={true}
                        />
                    </div>
                )}

                {/* Design panel */}
                {mobileTab === 'design' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl overflow-hidden">
                        <EditorRightPanel settings={settings} updateSettings={updateSettings} />
                    </div>
                )}

                {/* Export panel */}
                {mobileTab === 'export' && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">
                        <p className="text-sm font-bold">Export Carousel</p>
                        <div className="w-full max-w-xs space-y-2">
                            {[
                                { label: 'Square PDF (1:1)', f: 'pdf' as const, r: '1:1' as const },
                                { label: 'Square PNGs (1:1)', f: 'png' as const, r: '1:1' as const },
                                { label: 'Portrait PDF (4:5)', f: 'pdf' as const, r: '4:5' as const },
                                { label: 'Portrait PNGs (4:5)', f: 'png' as const, r: '4:5' as const },
                            ].map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => handleExport(opt.f, opt.r)}
                                    className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Bar */}
            <EditorBottomBar
                activeTab={mobileTab}
                onTabChange={setMobileTab}
                isGenerating={isGenerating}
            />

            {/* Command Palette */}
            <EditorCommandPalette
                open={commandOpen}
                setOpen={setCommandOpen}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={undo}
                onRedo={redo}
                onAiGenerate={() => handleAiGenerate(topicInput || 'Content Marketing')}
                onExport={handleExport}
                onTabChange={(tab) => setMobileTab(tab as MobileTab)}
            />
        </div>
    );
}
