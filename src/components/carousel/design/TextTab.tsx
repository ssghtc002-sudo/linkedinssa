'use client';
import React from 'react';
import { DesignSettings, FONT_PAIRS } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { Type, AlignLeft, AlignCenter, AlignRight, Bold, Minus, Plus } from 'lucide-react';

interface TextTabProps {
    settings: DesignSettings;
    updateSettings: (key: keyof DesignSettings, value: any) => void;
}

export const TextTab: React.FC<TextTabProps> = ({ settings, updateSettings }) => {
    return (
        <div className="space-y-4 mt-0">
            {/* Section Header */}
            <div className="flex items-center gap-2 pb-2 border-b border-border/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center">
                    <Type className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                    <Label className="text-xs font-bold text-foreground">Typography</Label>
                    <p className="text-[9px] text-muted-foreground">Customize text appearance</p>
                </div>
            </div>

            <div className="space-y-3">
                {/* Font Pairing - Enhanced */}
                <div className="space-y-1.5 p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <Label className="text-[10px] font-bold flex items-center gap-1.5">
                        <Type className="w-3 h-3" />
                        Font Pairing
                    </Label>
                    <Select
                        value={settings.fontPair}
                        onValueChange={(val) => updateSettings('fontPair', val)}
                    >
                        <SelectTrigger className="h-8 text-[11px] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(FONT_PAIRS).map(([key, { label }]) => (
                                <SelectItem key={key} value={key} className="text-[11px]">{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Text Color */}
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <ColorPicker
                        label="Text Color"
                        color={settings.textColor}
                        onChange={(val) => updateSettings('textColor', val)}
                    />
                </div>

                {/* Font Weight - Visual Preview */}
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold flex items-center gap-1.5">
                        <Bold className="w-3 h-3" />
                        Font Weight
                    </Label>
                    <div className="grid grid-cols-2 gap-1.5">
                        {[
                            { value: 'normal', label: 'Normal', weight: '400' },
                            { value: 'medium', label: 'Medium', weight: '500' },
                            { value: 'bold', label: 'Bold', weight: '700' },
                            { value: 'extrabold', label: 'Extra', weight: '800' }
                        ].map((w) => (
                            <button
                                key={w.value}
                                onClick={() => updateSettings('fontWeight', w.value)}
                                className={`text-[10px] py-2 px-2 rounded-md transition-all duration-200 border ${settings.fontWeight === w.value
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md border-transparent'
                                        : 'bg-white dark:bg-slate-900 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                                    }`}
                                style={{ fontWeight: w.weight }}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Alignment - Icon Buttons */}
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold">Text Alignment</Label>
                    <div className="grid grid-cols-3 gap-1.5">
                        {[
                            { value: 'left', icon: AlignLeft, label: 'Left' },
                            { value: 'center', icon: AlignCenter, label: 'Center' },
                            { value: 'right', icon: AlignRight, label: 'Right' }
                        ].map((a) => (
                            <button
                                key={a.value}
                                onClick={() => updateSettings('alignment', a.value)}
                                className={`flex flex-col items-center gap-1 py-2 px-2 rounded-md transition-all duration-200 border ${settings.alignment === a.value
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md border-transparent'
                                        : 'bg-white dark:bg-slate-900 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                                    }`}
                                title={a.label}
                            >
                                <a.icon className="w-4 h-4" />
                                <span className="text-[9px] font-medium">{a.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Line Height - Enhanced Slider */}
                <div className="space-y-2 p-2.5 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5">
                            <Minus className="w-3 h-3" />
                            Line Height
                        </Label>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                                {settings.lineHeight.toFixed(1)}x
                            </span>
                        </div>
                    </div>
                    <Slider
                        min={1.0} max={2.0} step={0.1}
                        value={[settings.lineHeight]}
                        onValueChange={(vals) => updateSettings('lineHeight', vals[0])}
                        className="h-5"
                    />
                    <div className="flex justify-between text-[8px] text-muted-foreground font-mono">
                        <span>Tight</span>
                        <span>Normal</span>
                        <span>Loose</span>
                    </div>
                </div>

                {/* Font Size - Visual Scale */}
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold flex items-center gap-1.5">
                        <Plus className="w-3 h-3" />
                        Font Size
                    </Label>
                    <div className="grid grid-cols-3 gap-1.5">
                        {[
                            { value: 'small', label: 'Small', size: '12px' },
                            { value: 'medium', label: 'Medium', size: '14px' },
                            { value: 'large', label: 'Large', size: '16px' }
                        ].map((s) => (
                            <button
                                key={s.value}
                                onClick={() => updateSettings('fontSize', s.value)}
                                className={`py-2.5 px-2 rounded-md transition-all duration-200 border ${settings.fontSize === s.value
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md border-transparent'
                                        : 'bg-white dark:bg-slate-900 text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
                                    }`}
                            >
                                <div className="text-[9px] font-medium mb-0.5">{s.label}</div>
                                <div style={{ fontSize: s.size }} className="font-bold">Aa</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
