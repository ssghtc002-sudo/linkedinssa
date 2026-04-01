'use client';

import React, { useState, useMemo } from 'react';
import { useEditor } from '../v2/context/EditorContext';
import { Sparkles, Download, Palette, Type, Layout, Briefcase, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PanelType } from '@/lib/types';
import * as Popover from '@radix-ui/react-popover';
import { ExportService, ExportResolution } from '@/lib/export-service';

export const SidebarNav = React.memo(function SidebarNav() {
    const { activePanel, setActivePanel } = useEditor();

    const navItems: { id: PanelType; icon: any; label: string; color: string; bg: string }[] = useMemo(() => [
        { id: 'ai', icon: Sparkles, label: 'AI Magic', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { id: 'templates', icon: Layout, label: 'Templates', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'brand', icon: Briefcase, label: 'Brand', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'colors', icon: Palette, label: 'Colors', color: 'text-rose-500', bg: 'bg-rose-500/10' },
        { id: 'text', icon: Type, label: 'Typography', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    ], []);

    const togglePanel = (panel: PanelType) => {
        setActivePanel(activePanel === panel ? null : panel);
    };

    return (
        <div className={cn(
            "z-[400] shrink-0 transition-all duration-700 ease-[cubic-bezier(0.1,1,0.2,1)]",
            // Mobile (Bottom Bar) - Floating App Pill with Rounded Corners
            "fixed bottom-4 left-4 right-4 h-16 md:h-fit rounded-[2.5rem] md:rounded-[2rem] p-[1px] isolate",
            // Desktop (Sidebar) - Dark & Slim
            "md:relative md:w-16 md:my-auto md:ml-5"
        )}>
            {/* Soft Dark Glass Premium Vessel */}
            <div className="absolute inset-0 bg-slate-900/90 dark:bg-slate-900/95 rounded-[inherit] ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl" />
            
            {/* Internal Vessel - Perfectly Centered for App Feel */}
            <div className="relative z-10 w-full h-full flex flex-row md:flex-col items-center justify-between md:justify-start pt-1 md:pt-5 pb-1 md:pb-8 md:gap-4 px-6 md:px-0">
                
                {/* Logo Mark (Hidden on Mobile Nav) */}
                <div className="hidden md:flex relative group cursor-pointer mb-1" onClick={() => (window.location.href = '/')}>
                    <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center text-white ring-1 ring-white/20 shadow-lg">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                </div>
 
                {/* Compact Tools - Distribute Evenly on Mobile */}
                <div className="flex flex-row md:flex-col items-center justify-between md:justify-evenly md:gap-3 flex-1 md:w-full px-2 md:px-0">
                    {[
                        { id: 'ai', icon: Sparkles, label: 'AI', grad: 'from-purple-500 to-indigo-600', color: 'purple' },
                        { id: 'templates', icon: Layout, label: 'Design', grad: 'from-blue-500 to-cyan-500', color: 'blue' },
                        { id: 'brand', icon: Briefcase, label: 'Brand', grad: 'from-amber-400 to-orange-600', color: 'amber' },
                        { id: 'colors', icon: Palette, label: 'Colors', grad: 'from-rose-500 to-pink-600', color: 'rose' },
                        { id: 'text', icon: Type, label: 'Fonts', grad: 'from-cyan-400 to-teal-500', color: 'cyan' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => togglePanel(item.id as PanelType)}
                            className={cn(
                                "group flex flex-col items-center justify-center gap-1 md:w-full transition-all duration-300 relative",
                                activePanel === item.id ? "scale-105" : "hover:scale-110"
                            )}
                        >
                            {/* Colorful Icon Base - Shorter */}
                            <div className={cn(
                                "w-10 h-10 md:w-11 md:h-11 rounded-[0.9rem] flex items-center justify-center transition-all duration-500 relative shadow-sm",
                                activePanel === item.id 
                                    ? `bg-gradient-to-br ${item.grad} text-white shadow-xl shadow-indigo-500/20` 
                                    : "bg-slate-950/60 dark:bg-black/40 border border-white/5 shadow-inner"
                            )}>
                                <item.icon 
                                    className={cn(
                                        "w-[18px] h-[18px] transition-all duration-500",
                                        activePanel === item.id 
                                            ? "text-white" 
                                            : item.color === 'purple' ? 'text-purple-400' :
                                              item.color === 'blue' ? 'text-blue-400' :
                                              item.color === 'amber' ? 'text-amber-400' :
                                              item.color === 'rose' ? 'text-rose-400' : 'text-cyan-400'
                                    )} 
                                    strokeWidth={activePanel === item.id ? 2.5 : 2} 
                                />

                                {activePanel === item.id && (
                                    <div className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full",
                                            item.color === 'purple' ? 'bg-purple-500' :
                                            item.color === 'blue' ? 'bg-blue-500' :
                                            item.color === 'amber' ? 'bg-amber-500' :
                                            item.color === 'rose' ? 'bg-rose-500' : 'bg-cyan-500'
                                        )} />
                                    </div>
                                )}
                            </div>

                            {/* Ultra-Compact Labels */}
                            <span className={cn(
                                "text-[7.5px] font-black uppercase tracking-[0.1em] transition-all duration-300 hidden md:block",
                                activePanel === item.id 
                                    ? "text-white opacity-100 shadow-sm"
                                    : "text-white/60 group-hover:text-white"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                    
                    {/* Integrated Export Tool */}
                    <div className="md:mt-auto flex flex-col items-center">
                        <ExportPopover />
                    </div>
                </div>
            </div>
        </div>
    );
});

const ExportPopover = React.memo(function ExportPopover() {
    const { slides, isExporting, setIsExporting, settings, updateSettings } = useEditor();
    const [resolution, setResolution] = useState<ExportResolution>(2);
    const [format, setFormat] = useState<'zip' | 'pdf'>('pdf');
    const [open, setOpen] = useState(false);

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        const toastId = toast.loading(`Preparing ${slides.length} slides at ${resolution}x...`);
        
        try {
            if (format === 'zip') {
                await ExportService.downloadAsZip(slides.length, resolution, (curr, total) => {
                    toast.loading(`Capturing slide ${curr}/${total}...`, { id: toastId });
                });
            } else {
                await ExportService.downloadAsPdf(slides.length, resolution, (curr, total) => {
                    toast.loading(`Processing slide ${curr}/${total}...`, { id: toastId });
                });
            }
            toast.success("Export Successful!", { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error("Export Failed!", { id: toastId });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button className="group flex flex-col items-center gap-1.5 outline-none">
                    <div className={cn(
                        "relative w-11 h-11 md:w-12 md:h-12 rounded-full p-[1px] overflow-hidden transition-all duration-300 shadow-xl",
                        open ? "scale-105" : "hover:scale-110",
                        isExporting ? "animate-pulse scale-90" : ""
                    )}>
                        {/* Brand Gradient Spinning Border (Logo Colors) */}
                        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#a855f7_50%,#f43f5e_100%)]" />
                        
                        <div className={cn(
                            "relative z-10 w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border border-white/5 shadow-inner transition-all duration-500",
                            open 
                                ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 text-white shadow-xl shadow-indigo-500/30" 
                                : "bg-slate-950/80 dark:bg-black/80"
                        )}>
                            {isExporting ? (
                                <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
                            ) : (
                                <Download 
                                    className={cn(
                                        "w-5 h-5 transition-transform duration-500",
                                        open ? "text-white" : "text-indigo-400 group-hover:-translate-y-0.5"
                                    )} 
                                />
                            )}

                            {/* Active Pulse Indicator */}
                            {open && (
                                <div className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 bg-slate-950 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content 
                    className="z-[300] w-72 p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-white/10 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300"
                    side="right" 
                    sideOffset={25}
                >
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-800 dark:text-slate-100">Export Studio</h3>
                                <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-tighter">Pro Quality Output</p>
                            </div>
                        </div>

                        {/* LinkedIn Format Presets */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 opacity-60">
                                <Layout className="w-3.5 h-3.5 text-blue-500" />
                                <label className="text-[9.5px] font-black text-slate-500 uppercase tracking-[0.1em]">LinkedIn Formats</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { id: '4:5', label: 'Portrait', size: '1080×1350', active: settings.aspectRatio === '4:5' },
                                    { id: '1:1', label: 'Square', size: '1080×1080', active: settings.aspectRatio === '1:1' },
                                    { id: '16:9', label: 'Landscape', size: '1920×1080', active: settings.aspectRatio === '16:9' },
                                    { id: '9:16', label: 'Stories', size: '1080×1920', active: settings.aspectRatio === '9:16' }
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => updateSettings('aspectRatio', f.id as any)}
                                        className={cn(
                                            "flex flex-col items-center justify-center py-3 rounded-2xl border transition-all text-center gap-1",
                                            f.active
                                                ? "bg-blue-600/5 border-blue-500 text-blue-600" 
                                                : "border-slate-100 dark:border-white/5 text-slate-400 hover:border-slate-200"
                                        )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-tight">{f.label}</span>
                                        <span className="text-[7px] font-bold opacity-60">{f.size}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Export Quality */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 opacity-60">
                                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                                <label className="text-[9.5px] font-black text-slate-500 uppercase tracking-[0.1em]">Quality Resolution</label>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { v: 1, l: '1.0x', d: 'Base' },
                                    { v: 2, l: '2.0x', d: 'Retina' },
                                    { v: 4, l: '4.0x', d: 'Ultra' }
                                ].map((r) => (
                                    <button
                                        key={r.v}
                                        onClick={() => setResolution(r.v as ExportResolution)}
                                        className={cn(
                                            "flex flex-col items-center justify-center py-3 rounded-2xl border transition-all",
                                            resolution === r.v 
                                                ? "bg-purple-600/5 border-purple-500 text-purple-600 shadow-sm" 
                                                : "border-slate-100 dark:border-white/5 text-slate-400 hover:border-slate-200"
                                        )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-tighter">{r.l}</span>
                                        <span className="text-[6px] font-bold uppercase opacity-50">{r.d}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Select Format & Launch */}
                        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-2">
                                {[
                                    { v: 'pdf', l: 'PDF Document', i: Layout },
                                    { v: 'zip', l: 'Image ZIP', i: ImageIcon }
                                ].map((f) => (
                                    <button
                                        key={f.v}
                                        onClick={() => setFormat(f.v as any)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all",
                                            format === f.v 
                                                ? "bg-indigo-600/10 border-indigo-500 text-indigo-600" 
                                                : "border-slate-100 dark:border-white/5 text-slate-400"
                                        )}
                                    >
                                        <f.i className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase truncate tracking-tight">{f.l}</span>
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={handleExport}
                                disabled={isExporting}
                                className="w-full py-5 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-[0_15px_40px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isExporting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                Export All Slides
                            </button>
                        </div>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
});
