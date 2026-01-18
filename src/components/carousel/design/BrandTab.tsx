'use client';
import React from 'react';
import { DesignSettings, ASPECT_RATIOS } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { User, Image as ImageIcon, AtSign, Maximize2, Layers } from 'lucide-react';

interface BrandTabProps {
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
}

export const BrandTab: React.FC<BrandTabProps> = ({ settings, updateSettings }) => {
    return (
        <div className="space-y-4 mt-0">
            {/* Section Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-border/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                    <Label className="text-xs font-bold text-foreground">Brand Identity</Label>
                    <p className="text-[9px] text-muted-foreground">Personalize your carousels</p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Aspect Ratio - Enhanced */}
                <div className="space-y-1.5 p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <Label className="text-[10px] font-bold flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3" />
                        Aspect Ratio
                    </Label>
                    <Select
                        value={settings.aspectRatio}
                        onValueChange={(val) => updateSettings('aspectRatio', val)}
                    >
                        <SelectTrigger className="h-8 text-[11px] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(ASPECT_RATIOS).map(([key, { label, width, height }]) => (
                                <SelectItem key={key} value={key} className="text-[11px]">
                                    {label} ({width}×{height})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Watermark Toggle - Premium Card */}
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border border-cyan-200/50 dark:border-cyan-800/50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <Layers className="w-3.5 h-3.5 text-white" />
                            </div>
                            <Label className="text-[11px] font-bold text-foreground">Watermark</Label>
                        </div>
                        <Switch
                            checked={settings.showWatermark}
                            onCheckedChange={(val) => updateSettings('showWatermark', val)}
                            className="scale-90"
                        />
                    </div>

                    {settings.showWatermark && (
                        <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 pt-2 border-t border-cyan-200/30 dark:border-cyan-800/30">
                            {/* Author Name */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-medium flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
                                    <User className="w-3 h-3" />
                                    Name
                                </Label>
                                <Input
                                    value={settings.authorName}
                                    onChange={(e) => updateSettings('authorName', e.target.value)}
                                    placeholder="Your Name"
                                    className="h-8 text-[11px] bg-white dark:bg-slate-950 border-cyan-300 dark:border-cyan-700"
                                />
                            </div>

                            {/* Author Handle */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-medium flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
                                    <AtSign className="w-3 h-3" />
                                    Handle
                                </Label>
                                <Input
                                    value={settings.authorHandle}
                                    onChange={(e) => updateSettings('authorHandle', e.target.value)}
                                    placeholder="@yourhandle"
                                    className="h-8 text-[11px] bg-white dark:bg-slate-950 border-cyan-300 dark:border-cyan-700"
                                />
                            </div>

                            {/* Avatar URL */}
                            <div className="space-y-1">
                                <Label className="text-[10px] font-medium flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
                                    <ImageIcon className="w-3 h-3" />
                                    Avatar URL
                                </Label>
                                <Input
                                    value={settings.authorImage || ''}
                                    onChange={(e) => updateSettings('authorImage', e.target.value)}
                                    placeholder="https://..."
                                    className="h-8 text-[11px] bg-white dark:bg-slate-950 border-cyan-300 dark:border-cyan-700"
                                />
                            </div>

                            {/* Preview */}
                            {settings.authorImage && (
                                <div className="flex items-center gap-2 p-2 rounded-md bg-white/50 dark:bg-slate-950/50 border border-cyan-200/50 dark:border-cyan-800/50">
                                    <img
                                        src={settings.authorImage}
                                        alt="Avatar preview"
                                        className="w-8 h-8 rounded-full object-cover border-2 border-cyan-300 dark:border-cyan-700"
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                    <div>
                                        <div className="text-[10px] font-bold text-foreground">{settings.authorName}</div>
                                        <div className="text-[9px] text-muted-foreground">{settings.authorHandle}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Padding Control - Enhanced */}
                <div className="space-y-2 p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5">
                            <Layers className="w-3 h-3" />
                            Content Padding
                        </Label>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                                {settings.padding}px
                            </span>
                        </div>
                    </div>
                    <Slider
                        min={8} max={24} step={2}
                        value={[settings.padding]}
                        onValueChange={(vals) => updateSettings('padding', vals[0])}
                        className="h-5"
                    />
                    <div className="flex justify-between text-[8px] text-muted-foreground font-mono">
                        <span>Tight</span>
                        <span>Normal</span>
                        <span>Spacious</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
