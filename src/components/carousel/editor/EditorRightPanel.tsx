'use client';
import React from 'react';
import { Palette } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DesignSettings } from '@/lib/types';
import { StyleTab } from '../design/StyleTab';
import { TextTab } from '../design/TextTab';
import { BrandTab } from '../design/BrandTab';
import { Type, User } from 'lucide-react';

interface EditorRightPanelProps {
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
}

export function EditorRightPanel({ settings, updateSettings }: EditorRightPanelProps) {
    return (
        <div className="flex flex-col h-full overflow-hidden bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-l border-white/10 dark:border-white/5">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/10 shrink-0">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Palette className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[11px] font-bold">Design</span>
            </div>

            {/* Design Tabs */}
            <Tabs defaultValue="style" className="flex flex-col flex-1 min-h-0">
                <div className="px-2.5 pt-2 pb-1.5 shrink-0">
                    <TabsList className="w-full grid grid-cols-3 h-8 p-0.5 bg-muted/40 border border-border/20 rounded-xl">
                        <TabsTrigger
                            value="style"
                            className="rounded-lg text-[10px] font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-pink-600 data-[state=active]:shadow-sm transition-all flex items-center gap-1"
                        >
                            <Palette className="w-3 h-3" /> Style
                        </TabsTrigger>
                        <TabsTrigger
                            value="text"
                            className="rounded-lg text-[10px] font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all flex items-center gap-1"
                        >
                            <Type className="w-3 h-3" /> Text
                        </TabsTrigger>
                        <TabsTrigger
                            value="brand"
                            className="rounded-lg text-[10px] font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-600 data-[state=active]:shadow-sm transition-all flex items-center gap-1"
                        >
                            <User className="w-3 h-3" /> Brand
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="style" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden animate-in fade-in duration-200">
                    <ScrollArea className="h-full">
                        <div className="p-2.5">
                            <StyleTab settings={settings} updateSettings={updateSettings} />
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="text" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden animate-in fade-in duration-200">
                    <ScrollArea className="h-full">
                        <div className="p-2.5">
                            <TextTab settings={settings} updateSettings={updateSettings} />
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="brand" className="flex-1 m-0 min-h-0 data-[state=inactive]:hidden animate-in fade-in duration-200">
                    <ScrollArea className="h-full">
                        <div className="p-2.5">
                            <BrandTab settings={settings} updateSettings={updateSettings} />
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    );
}
