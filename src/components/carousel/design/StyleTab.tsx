'use client';
import React from 'react';
import { DesignSettings, PRESET_TEMPLATES } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ColorPicker } from '@/components/ui/color-picker';
import { Sparkles, Palette, Image as ImageIcon, Droplet, RotateCw, Layers } from 'lucide-react';

interface StyleTabProps {
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
}

export const StyleTab: React.FC<StyleTabProps> = ({ settings, updateSettings }) => {
    return (
        <div className="space-y-4 mt-0">
            {/* Section Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-border/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1">
                    <Label className="text-xs font-bold text-foreground">Style & Colors</Label>
                    <p className="text-[9px] text-muted-foreground">Choose your visual theme</p>
                </div>
                <Button
                    size="sm"
                    className="h-7 text-[9px] gap-1.5 shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-lg border-0"
                    onClick={() => {
                        const randomTemplate = PRESET_TEMPLATES[Math.floor(Math.random() * PRESET_TEMPLATES.length)];
                        Object.entries(randomTemplate.settings).forEach(([key, value]) => {
                            updateSettings(key as keyof DesignSettings, value);
                        });
                    }}
                >
                    <Sparkles className="w-3 h-3" />
                    Shuffle
                </Button>
            </div>

            <div className="space-y-3">
                {/* Template Grid - Enhanced */}
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Quick Templates</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {PRESET_TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => {
                                    Object.entries(template.settings).forEach(([key, value]) => {
                                        updateSettings(key as keyof DesignSettings, value);
                                    });
                                }}
                                className="relative group overflow-hidden rounded-lg border border-border/50 bg-card text-left transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/50 hover:scale-[1.02]"
                            >
                                <div className={`h-20 w-full ${template.thumbnail} transition-transform duration-700 group-hover:scale-110`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute inset-x-0 bottom-0 p-2 text-white">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <div className="font-bold text-[10px] tracking-tight">{template.name}</div>
                                        {settings.theme === template.settings.theme && (
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 animate-pulse" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {settings.theme === template.settings.theme && (
                                    <div className="absolute inset-0 border-2 border-pink-500 rounded-lg pointer-events-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Background Type Selector - Enhanced */}
                <div className="space-y-2 p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <Label className="text-[10px] font-bold flex items-center gap-1.5">
                        <Layers className="w-3 h-3" />
                        Background Type
                    </Label>
                    <div className="grid grid-cols-3 gap-1.5">
                        {[
                            { id: 'solid', label: 'Solid', icon: Droplet, gradient: 'from-blue-500 to-cyan-500' },
                            { id: 'gradient', label: 'Gradient', icon: Palette, gradient: 'from-purple-500 to-pink-500' },
                            { id: 'image', label: 'Image', icon: ImageIcon, gradient: 'from-orange-500 to-red-500' }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => updateSettings('backgroundType', type.id)}
                                className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg transition-all duration-200 border ${settings.backgroundType === type.id
                                        ? `bg-gradient-to-r ${type.gradient} text-white shadow-md border-transparent`
                                        : 'bg-white dark:bg-slate-900 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                                    }`}
                            >
                                <type.icon className="w-4 h-4" />
                                <span className="text-[9px] font-bold">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conditional Background Controls */}
                {settings.backgroundType === 'solid' && (
                    <div className="pt-1 animate-in fade-in slide-in-from-top-1 p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-800/50">
                        <ColorPicker
                            label="Background Color"
                            color={settings.backgroundColor}
                            onChange={(val) => updateSettings('backgroundColor', val)}
                        />
                    </div>
                )}

                {settings.backgroundType === 'gradient' && (
                    <div className="space-y-2.5 pt-1 animate-in fade-in slide-in-from-top-1 p-2.5 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-800/50">
                        <ColorPicker
                            label="Start Color"
                            color={settings.gradientSettings?.fromColor || settings.backgroundColor}
                            onChange={(val) => updateSettings('gradientSettings', { ...settings.gradientSettings, fromColor: val })}
                        />
                        <ColorPicker
                            label="End Color"
                            color={settings.gradientSettings?.toColor || settings.accentColor}
                            onChange={(val) => updateSettings('gradientSettings', { ...settings.gradientSettings, toColor: val })}
                        />
                        <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between items-center">
                                <Label className="text-[10px] font-bold flex items-center gap-1.5">
                                    <RotateCw className="w-3 h-3" />
                                    Angle
                                </Label>
                                <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                                    {settings.gradientSettings?.angle || 135}°
                                </span>
                            </div>
                            <Slider
                                min={0} max={360} step={15}
                                value={[settings.gradientSettings?.angle || 135]}
                                onValueChange={(vals) => updateSettings('gradientSettings', { ...settings.gradientSettings, angle: vals[0] })}
                                className="h-5"
                            />
                            <div className="flex justify-between text-[8px] text-muted-foreground font-mono">
                                <span>0°</span>
                                <span>90°</span>
                                <span>180°</span>
                                <span>270°</span>
                                <span>360°</span>
                            </div>
                        </div>
                    </div>
                )}

                {settings.backgroundType === 'image' && (
                    <div className="space-y-2.5 pt-1 animate-in fade-in slide-in-from-top-1 p-2.5 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-800/50">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold flex items-center gap-1.5">
                                <ImageIcon className="w-3 h-3" />
                                Image URL
                            </Label>
                            <Input
                                value={settings.backgroundImage || ''}
                                onChange={(e) => updateSettings('backgroundImage', e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="h-8 text-[11px] bg-white dark:bg-slate-950 border-orange-300 dark:border-orange-700"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold">Overlay Tint</Label>
                            <ColorPicker
                                label="Overlay Color"
                                color={settings.backgroundColor}
                                onChange={(val) => updateSettings('backgroundColor', val)}
                            />
                        </div>
                        {settings.backgroundImage && (
                            <div className="relative h-20 rounded-md overflow-hidden border-2 border-orange-300 dark:border-orange-700">
                                <img
                                    src={settings.backgroundImage}
                                    alt="Background preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EError%3C/text%3E%3C/svg%3E'; }}
                                />
                                <div className="absolute inset-0" style={{ backgroundColor: settings.backgroundColor, opacity: 0.3 }}></div>
                            </div>
                        )}
                    </div>
                )}

                {/* Accent Color - Enhanced */}
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <ColorPicker
                        label="Accent Color"
                        color={settings.accentColor}
                        onChange={(val) => updateSettings('accentColor', val)}
                    />
                </div>
            </div>
        </div>
    );
};
