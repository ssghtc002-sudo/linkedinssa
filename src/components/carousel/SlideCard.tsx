'use client';
import React from 'react';
import { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowUp, ArrowDown, Copy, AlignLeft, AlignCenter, MessageSquareQuote, List } from 'lucide-react';
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
            {/* Slide Number Badge */}
            <div className="absolute -left-2.5 top-3 flex items-center justify-center w-5 h-5 rounded-r-md bg-gradient-to-r from-blue-500 to-purple-600 text-[9px] font-mono font-bold text-white shadow-md z-20 group-hover:scale-110 transition-transform">
                {index + 1}
            </div>

            <CardContent className="pl-4 pr-2 py-2 space-y-2">
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
                    {/* Layout Selectors */}
                    <div className="flex bg-muted/30 p-0.5 rounded-md border border-border/10 gap-0.5">
                        {[
                            { id: 'left', icon: AlignLeft, label: 'Left', color: 'blue' },
                            { id: 'center', icon: AlignCenter, label: 'Center', color: 'purple' },
                            { id: 'quote', icon: MessageSquareQuote, label: 'Quote', color: 'pink' },
                            { id: 'list', icon: List, label: 'List', color: 'green' }
                        ].map((l) => (
                            <button
                                key={l.id}
                                onClick={() => onUpdate('layout', l.id as any)}
                                className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-sm transition-all duration-150",
                                    slide.layout === l.id
                                        ? `bg-${l.color}-500/10 text-${l.color}-600 dark:text-${l.color}-400 ring-1 ring-${l.color}-500/20`
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-slate-800/40"
                                )}
                                title={l.label}
                            >
                                <l.icon className="w-3 h-3" />
                            </button>
                        ))}
                    </div>

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
