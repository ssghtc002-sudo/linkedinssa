import React, { useState, useEffect } from 'react';
import { EditorProvider } from '../v2/context/EditorContext';
import { SidebarNav } from './SidebarNav';
import { TopToolbar } from './TopToolbar';
import { HorizontalCanvas } from './HorizontalCanvas';
import { SidePanel } from './SidePanel';
import { StudioLoader } from './StudioLoader';
import { cn } from '@/lib/utils';

export function EditorLayoutV5() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1800); // Premium 1.8s load time to appreciate the animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <EditorProvider>
            {loading && <StudioLoader />}
            <div className={cn(
                "flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#f3f4f6] dark:bg-[#0b0c10] text-foreground font-sans selection:bg-indigo-500/30 transition-all duration-1000",
                loading ? "opacity-0 scale-[0.98] blur-xl" : "opacity-100 scale-100 blur-0"
            )}>
                {/* Left Fixed Sidebar Nav (Bottom on mobile) */}
                <SidebarNav />

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 min-w-0 relative pb-16 md:pb-0">
                    {/* Top Floating Command Bar */}
                    <TopToolbar />

                    {/* The Horizontal Scroller Canvas */}
                    <HorizontalCanvas />

                    {/* Contextual Side Panel (Slide-up Drawer on mobile) */}
                    <SidePanel />
                </div>
            </div>
        </EditorProvider>
    );
}
