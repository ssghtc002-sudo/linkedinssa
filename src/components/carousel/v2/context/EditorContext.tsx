'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Slide, DesignSettings, PanelType, DEFAULT_SLIDES, DEFAULT_DESIGN } from '@/lib/types';
import { toast } from 'sonner';

interface EditorState {
    slides: Slide[];
    settings: DesignSettings;
}

interface EditorContextType {
    // Data
    slides: Slide[];
    settings: DesignSettings;
    
    // UI Selection State
    activeSlideId: string | null;
    setActiveSlideId: (id: string | null) => void;
    activeElementId: string | null;
    setActiveElementId: (id: string | null) => void;
    activePanel: PanelType;
    setActivePanel: (panel: PanelType) => void;
    isExporting: boolean;
    setIsExporting: (exporting: boolean) => void;

    // Actions
    updateSlides: (newSlides: Slide[]) => void;
    updateSlide: (id: string, field: keyof Slide, value: any) => void;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
    setSettings: (newSettings: DesignSettings) => void;
    
    // History
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
    const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
    const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN);
    
    // History state
    const [history, setHistory] = useState<EditorState[]>([{ slides: DEFAULT_SLIDES, settings: DEFAULT_DESIGN }]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // UI State
    const [activeSlideId, setActiveSlideId] = useState<string | null>(slides[0]?.id || null);
    const [activeElementId, setActiveElementId] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<PanelType>(null);

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
            setActiveElementId(null);
        }
    }, [historyIndex, history]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const idx = historyIndex + 1;
            setHistoryIndex(idx);
            setSlides(history[idx].slides);
            setSettings(history[idx].settings);
            setActiveElementId(null);
        }
    }, [historyIndex, history]);

    const [isExporting, setIsExporting] = useState(false);
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    // ── Keyboard Shortcuts ───────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;
            if (mod && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo(); }
            if (mod && e.shiftKey && e.key === 'z') { e.preventDefault(); redo(); }
            if (mod && e.key === 's') { e.preventDefault(); toast.success('Saved!'); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [undo, redo]);

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

    const updateAllSettings = (newSettings: DesignSettings) => {
        setSettings(newSettings);
        pushHistory(slides, newSettings);
    };

    return (
        <EditorContext.Provider
            value={{
                slides,
                settings,
                activeSlideId,
                setActiveSlideId,
                activeElementId,
                setActiveElementId,
                activePanel,
                setActivePanel,
                updateSlides,
                updateSlide,
                updateSettings,
                setSettings: updateAllSettings,
                undo,
                redo,
                canUndo,
                canRedo,
                isExporting,
                setIsExporting,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
}

export function useEditor() {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
}
