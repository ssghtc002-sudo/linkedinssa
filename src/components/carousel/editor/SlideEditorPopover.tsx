import React from 'react';
import { Slide } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, LayoutTemplate, Heading, Type, Hand, Layout } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SlideEditorPopoverProps {
    slide: Slide;
    onUpdate: (field: keyof Slide, value: any) => void;
    onClose: () => void;
}

export function SlideEditorPopover({ slide, onUpdate, onClose }: SlideEditorPopoverProps) {
    return (
        <Card className="w-[320px] bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/10 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-blue-500" />
                    <span className="text-[11px] font-bold tracking-wide uppercase">Edit Slide</span>
                </div>
                <button
                    onClick={onClose}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Content Area */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                
                {/* Layout / Type */}
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5"><Layout className="w-3 h-3"/> Slide Layout</Label>
                    <Select
                        value={slide.slideType || 'standard'}
                        onValueChange={(val) => onUpdate('slideType', val)}
                    >
                        <SelectTrigger className="h-8 text-[11px] bg-white dark:bg-slate-900">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="intro" className="text-[11px]">Intro (Hook)</SelectItem>
                            <SelectItem value="standard" className="text-[11px]">Standard Flow</SelectItem>
                            <SelectItem value="list" className="text-[11px]">List / Bullets</SelectItem>
                            <SelectItem value="quote" className="text-[11px]">Quote Focus</SelectItem>
                            <SelectItem value="outro" className="text-[11px]">Outro (CTA)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-px w-full bg-border/50" />

                {/* Tagline / Eyebrow */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5"><Heading className="w-3 h-3 text-emerald-500"/> Tagline</Label>
                        <Switch
                            checked={slide.showTagline !== false}
                            onCheckedChange={(c) => onUpdate('showTagline', c)}
                            className="scale-75 origin-right"
                        />
                    </div>
                    {slide.showTagline !== false && (
                        <Input
                            className="h-8 text-[11px] bg-white dark:bg-slate-900"
                            placeholder="e.g. STEP 1"
                            value={slide.tagline || ''}
                            onChange={(e) => onUpdate('tagline', e.target.value)}
                        />
                    )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5"><Heading className="w-3 h-3 text-blue-500"/> Title</Label>
                        <Switch
                            checked={slide.showTitle !== false}
                            onCheckedChange={(c) => onUpdate('showTitle', c)}
                            className="scale-75 origin-right"
                        />
                    </div>
                    {slide.showTitle !== false && (
                        <Textarea
                            className="min-h-[40px] text-[11px] leading-relaxed resize-none bg-white dark:bg-slate-900"
                            placeholder="Main headline..."
                            value={slide.title}
                            onChange={(e) => onUpdate('title', e.target.value)}
                        />
                    )}
                </div>

                {/* Content / Paragraph */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5"><Type className="w-3 h-3 text-purple-500"/> Paragraph</Label>
                        <Switch
                            checked={slide.showContent !== false}
                            onCheckedChange={(c) => onUpdate('showContent', c)}
                            className="scale-75 origin-right"
                        />
                    </div>
                    {slide.showContent !== false && (
                        <Textarea
                            className="min-h-[80px] text-[11px] leading-relaxed resize-none bg-white dark:bg-slate-900"
                            placeholder="Body text..."
                            value={slide.content}
                            onChange={(e) => onUpdate('content', e.target.value)}
                        />
                    )}
                </div>

                <div className="h-px w-full bg-border/50" />

                {/* Swipe Indicator */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] font-bold flex items-center gap-1.5"><Hand className="w-3 h-3 text-orange-500"/> Swipe Indicator</Label>
                        <Switch
                            checked={slide.showSwipeIndicator !== false}
                            onCheckedChange={(c) => onUpdate('showSwipeIndicator', c)}
                            className="scale-75 origin-right"
                        />
                    </div>
                    {slide.showSwipeIndicator !== false && (
                        <Input
                            className="h-8 text-[11px] bg-white dark:bg-slate-900"
                            placeholder="Swipe text..."
                            value={slide.swipeText || ''}
                            onChange={(e) => onUpdate('swipeText', e.target.value)}
                        />
                    )}
                </div>

            </div>
        </Card>
    );
}
