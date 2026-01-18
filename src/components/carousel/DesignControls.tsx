'use client';
import React from 'react';
import { DesignSettings } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Type, User } from 'lucide-react';
import { StyleTab } from './design/StyleTab';
import { TextTab } from './design/TextTab';
import { BrandTab } from './design/BrandTab';

interface DesignControlsProps {
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
}

export const DesignControls: React.FC<DesignControlsProps> = ({ settings, updateSettings }) => {
    return (
        <div className="flex flex-col h-full">
            <Tabs defaultValue="style" className="flex-1">
                {/* Tab Header */}
                <div className="px-3 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-border/10 sticky top-0 z-10 shadow-sm">
                    <TabsList className="grid w-full grid-cols-3 h-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm rounded-md p-0.5">
                        <TabsTrigger
                            value="style"
                            className="text-[10px] font-semibold h-7 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-pink-600 data-[state=active]:shadow-sm rounded-sm transition-all"
                        >
                            <Palette className="w-3 h-3 mr-1.5" />
                            Style
                        </TabsTrigger>
                        <TabsTrigger
                            value="font"
                            className="text-[10px] font-semibold h-7 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-orange-600 data-[state=active]:shadow-sm rounded-sm transition-all"
                        >
                            <Type className="w-3 h-3 mr-1.5" />
                            Text
                        </TabsTrigger>
                        <TabsTrigger
                            value="brand"
                            className="text-[10px] font-semibold h-7 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-600 data-[state=active]:shadow-sm rounded-sm transition-all"
                        >
                            <User className="w-3 h-3 mr-1.5" />
                            Brand
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Tab Content */}
                <div className="p-3 space-y-4">
                    <TabsContent value="style">
                        <StyleTab settings={settings} updateSettings={updateSettings} />
                    </TabsContent>

                    <TabsContent value="font">
                        <TextTab settings={settings} updateSettings={updateSettings} />
                    </TabsContent>

                    <TabsContent value="brand">
                        <BrandTab settings={settings} updateSettings={updateSettings} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};
