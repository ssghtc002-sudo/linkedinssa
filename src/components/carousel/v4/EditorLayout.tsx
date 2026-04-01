'use client';

import React from 'react';
import { EditorProvider } from '../v2/context/EditorContext';
import { EditorTopBar } from '../v2/topbar/EditorTopBar';
import { CanvasStage } from './CanvasStage';
import { BottomDock } from './BottomDock';

export function EditorLayoutV4() {
    return (
        <EditorProvider>
            <div className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-[#e5e5e5] dark:bg-[#0c0c0c] text-foreground font-sans selection:bg-indigo-500/30">
                {/* Global Top Nav */}
                <EditorTopBar />

                {/* Main Content Area - Split Vertically */}
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden relative">
                    
                    {/* Top: The Stage (Carousel Preview) */}
                    <CanvasStage />

                    {/* Bottom: The Control Dock */}
                    <BottomDock />
                    
                </div>
            </div>
        </EditorProvider>
    );
}
