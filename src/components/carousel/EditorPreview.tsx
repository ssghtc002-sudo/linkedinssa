import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layout, Smartphone, Download, ChevronDown, FileType, Image as ImageIcon, Square, RectangleVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CarouselPreview, CarouselPreviewRef } from './CarouselPreview';
import { Slide, DesignSettings } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ExportEngine } from './ExportEngine';

interface EditorPreviewProps {
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
    slides: Slide[];
    settings: DesignSettings;
    previewRef: React.RefObject<CarouselPreviewRef | null>;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
    sidebarWidth,
    setSidebarWidth,
    slides,
    settings,
    previewRef
}) => {
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    const handleExport = async (format: 'pdf' | 'png', aspectRatio: '1:1' | '4:5') => {
        const exportSettings = { ...settings, aspectRatio };
        const engine = new ExportEngine(slides, exportSettings);

        if (format === 'pdf') {
            await engine.exportPDF();
        } else {
            await engine.exportPNGs();
        }
    };

    return (
        <div className="flex-1 bg-transparent relative overflow-hidden flex flex-col border-l border-white/20 dark:border-white/10 min-w-0">
            {/* Preview Toolbar with Glass Effect */}
            <div className="h-12 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl flex items-center justify-between px-4 z-10 shadow-lg shrink-0">
                <div className="flex items-center gap-2">
                    {/* View Toggle with Gradients */}
                    <div className="flex items-center gap-1 border border-white/40 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-0.5 rounded-lg shadow-sm">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-6 px-2 text-[10px] gap-1.5 font-medium transition-all",
                                viewMode === 'desktop'
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                            onClick={() => setViewMode('desktop')}
                        >
                            <Layout className="w-3 h-3" />
                            <span>Desktop</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-6 px-2 text-[10px] gap-1.5 font-medium transition-all",
                                viewMode === 'mobile'
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                            onClick={() => setViewMode('mobile')}
                        >
                            <Smartphone className="w-3 h-3" />
                            <span>Mobile</span>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" className="h-7 gap-1.5 text-[10px] font-medium shadow-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/30 hover:shadow-lg hover:shadow-green-500/40 transition-all hover:scale-105">
                                <Download className="w-3 h-3" />
                                Export
                                <ChevronDown className="w-2.5 h-2.5 opacity-70" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 border-border/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl">
                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Square (1:1) - 1080x1080</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleExport('pdf', '1:1')} className="cursor-pointer text-xs">
                                <FileType className="w-3.5 h-3.5 mr-2 text-red-500" />
                                <Square className="w-3 h-3 mr-1.5 text-muted-foreground" />
                                <span>Export Square as PDF</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('png', '1:1')} className="cursor-pointer text-xs">
                                <ImageIcon className="w-3.5 h-3.5 mr-2 text-blue-500" />
                                <Square className="w-3 h-3 mr-1.5 text-muted-foreground" />
                                <span>Export Square as PNGs</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Portrait (4:5) - 1080x1350</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleExport('pdf', '4:5')} className="cursor-pointer text-xs">
                                <FileType className="w-3.5 h-3.5 mr-2 text-red-500" />
                                <RectangleVertical className="w-3 h-3 mr-1.5 text-muted-foreground" />
                                <span>Export Portrait as PDF</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('png', '4:5')} className="cursor-pointer text-xs">
                                <ImageIcon className="w-3.5 h-3.5 mr-2 text-blue-500" />
                                <RectangleVertical className="w-3 h-3 mr-1.5 text-muted-foreground" />
                                <span>Export Portrait as PNGs</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Preview Container - Fixed Layout, Scaled to Fit */}
            <div className="flex-1 overflow-hidden bg-transparent relative flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center p-2 transition-all duration-300">
                    {/* Preview component scaling handled internally */}
                    <div
                        className={cn(
                            "relative z-10 transition-all duration-500 ease-in-out flex-shrink-0",
                            viewMode === 'mobile'
                                ? "w-[265px] ring-[6px] ring-slate-900 dark:ring-slate-800 rounded-[2rem] shadow-[0_0_0_8px_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(0,0,0,0.5)] bg-white dark:bg-black overflow-hidden scale-[0.80] origin-center"
                                : "w-full max-w-[320px] shadow-xl rounded-xl ring-1 ring-slate-900/5 dark:ring-white/10 scale-[0.80] origin-center"
                        )}
                        style={viewMode === 'mobile' ? { minWidth: '265px' } : undefined}
                    >
                        <CarouselPreview ref={previewRef} slides={slides} settings={settings} viewMode={viewMode} />
                    </div>
                </div>
            </div >
        </div >
    );
};
