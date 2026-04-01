'use client';

import React from 'react';
import { EditorProvider } from './context/EditorContext';
import { ToolStrip } from './panels/ToolStrip';
import { SidePanelContainer } from './panels/SidePanelContainer';
import { PropertyInspector } from './panels/PropertyInspector';
import { InfiniteCanvas } from './canvas/InfiniteCanvas';
import { EditorTopBar } from './topbar/EditorTopBar';

export function EditorLayout() {
    return (
        <EditorProvider>
            <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-[#111] text-foreground transition-colors duration-200 font-sans selection:bg-indigo-500/30">
                {/* Global Top Nav */}
                <EditorTopBar />

                {/* Main Content Area */}
                <div className="flex flex-1 min-h-0 overflow-hidden relative">
                    {/* Left Icon Strip */}
                    <ToolStrip />

                    {/* Left Sliding Panel (Contextual to ToolStrip) */}
                    <SidePanelContainer />

                    {/* Center Infinite Canvas */}
                    <InfiniteCanvas />

                    {/* Right Property Inspector (Contextual to selection) */}
                    <PropertyInspector />
                </div>
            </div>
        </EditorProvider>
    );
}
