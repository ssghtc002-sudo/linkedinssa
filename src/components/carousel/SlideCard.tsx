'use client';
import React from 'react';
import { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowUp, ArrowDown, Copy, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideCardProps {
    slide: Slide;
    index: number;
    totalSlides: number;
    onUpdate: (field: keyof Slide, value: string) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
}

export const SlideCard: React.FC<SlideCardProps> = ({
    slide,
    index,
    totalSlides,
    onUpdate,
    onMoveUp,
    onMoveDown,
    onDuplicate,
    onDelete,
    canMoveUp,
    canMoveDown
}) => {
    return (
        <Card className="group relative border border-border/40 hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 backdrop-blur-sm overflow-visible">
            {/* Drag Handle / Type Badge */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-border/5 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-lg">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <GripVertical className="w-3 h-3 cursor-grab opacity-50 hover:opacity-100 transition-opacity" />
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                        {slide.slideType || 'Standard'}
                    </span>
                </div>
                <div className="flex items-center justify-center w-4 h-4 rounded-sm bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-blue-600 dark:text-blue-400 text-[9px] font-mono font-bold">
                    {index + 1}
                </div>
            </div>

            <CardContent className="px-3 py-2 space-y-2">
                <div className="space-y-1.5">
                    {/* Title Input */}
                    <Input
                        value={slide.title}
                        onChange={(e) => onUpdate('title', e.target.value)}
                        className="h-6 text-[11px] font-bold bg-transparent border-transparent hover:border-border/40 focus:bg-background focus:border-primary/30 px-1.5 rounded-md transition-all placeholder:text-muted-foreground/50"
                        placeholder="Slide Title"
                    />

                    {/* Content Input */}
                    <Textarea
                        value={slide.content}
                        onChange={(e) => onUpdate('content', e.target.value)}
                        rows={2}
                        className="text-[10px] leading-relaxed resize-none bg-transparent border-transparent hover:border-border/40 focus:bg-background focus:border-primary/30 p-1.5 rounded-md transition-all placeholder:text-muted-foreground/40 shadow-none"
                        placeholder="Slide content..."
                    />
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between pt-1.5 border-t border-border/10">
                    {/* Spacer to push actions to right */}
                    <div className="flex-1" />

                    {/* Slide Actions */}
                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center bg-muted/30 rounded-md border border-border/10 overflow-hidden">
                            <button
                                className="h-6 w-6 flex items-center justify-center hover:bg-white/50 dark:hover:bg-slate-800/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                                onClick={onMoveUp}
                                disabled={!canMoveUp}
                                title="Move Up"
                            >
                                <ArrowUp className="w-3 h-3" />
                            </button>
                            <div className="w-px h-3 bg-border/20" />
                            <button
                                className="h-6 w-6 flex items-center justify-center hover:bg-white/50 dark:hover:bg-slate-800/50 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                                onClick={onMoveDown}
                                disabled={!canMoveDown}
                                title="Move Down"
                            >
                                <ArrowDown className="w-3 h-3" />
                            </button>
                        </div>

                        <button
                            className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-blue-500/10 text-muted-foreground hover:text-blue-500 transition-colors"
                            onClick={onDuplicate}
                            title="Duplicate"
                        >
                            <Copy className="w-3 h-3" />
                        </button>
                        <button
                            className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                            onClick={onDelete}
                            title="Delete"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
