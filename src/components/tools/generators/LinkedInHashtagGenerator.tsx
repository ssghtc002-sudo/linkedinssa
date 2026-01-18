'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CopyButton } from '../shared/CopyButton';
import { Hash, Sparkles, RefreshCw, Plus, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LinkedInHashtagGenerator = () => {
    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());

    const generateHashtags = async () => {
        if (!content) return;
        setIsGenerating(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'hashtags',
                    topic: content,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate hashtags');
            const data = await response.json();

            // Expected format: "Tag1 Tag2 Tag3"
            const tags = data.result.trim().split(/\s+/).map((tag: string) =>
                tag.replace(/^#/, '') // Remove # if AI included it
            );

            setHashtags(tags);
            setSelectedHashtags(new Set());
        } catch (error: any) {
            console.error('AI Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };


    const toggleHashtag = (tag: string) => {
        const newSelected = new Set(selectedHashtags);
        if (newSelected.has(tag)) {
            newSelected.delete(tag);
        } else {
            newSelected.add(tag);
        }
        setSelectedHashtags(newSelected);
    };

    const copySelected = () => {
        return Array.from(selectedHashtags).map(t => `#${t}`).join(' ');
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Hash className="w-4 h-4 text-blue-600" />
                        </div>
                        <Label className="text-lg font-semibold">Post Content or Topic</Label>
                    </div>
                    <Textarea
                        placeholder="Paste your post content or a topic to generate relevant hashtags..."
                        className="min-h-[180px] text-base resize-none focus:ring-2 focus:ring-primary/20"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground italic">
                        The more context you provide, the better the hashtags will be.
                    </p>
                </div>

                <Button
                    onClick={generateHashtags}
                    disabled={!content || isGenerating}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg group"
                >
                    {isGenerating ? (
                        <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing Content...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Generate Hashtags
                        </>
                    )}
                </Button>
            </Card>

            {/* Output Section */}
            <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 min-h-[450px] flex flex-col relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="space-y-1">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                            Suggested Hashtags
                        </h3>
                        {hashtags.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                Click to select. {selectedHashtags.size} selected.
                            </p>
                        )}
                    </div>
                    {selectedHashtags.size > 0 && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                            <CopyButton text={copySelected()} />
                        </div>
                    )}
                </div>

                <div className="flex-1 relative z-10">
                    {hashtags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {hashtags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleHashtag(tag)}
                                    className={`
                                        inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all
                                        ${selectedHashtags.has(tag)
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                                            : 'bg-white dark:bg-slate-950 hover:border-blue-400 hover:text-blue-600'}
                                    `}
                                >
                                    {selectedHashtags.has(tag) ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4 opacity-50" />
                                    )}
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center mb-4">
                                <Hash className="w-10 h-10" />
                            </div>
                            <p className="text-lg font-medium">No hashtags generated yet</p>
                            <p className="text-sm max-w-[200px]">Enter your post content on the left to get started.</p>
                        </div>
                    )}
                </div>

                {selectedHashtags.size > 0 && (
                    <div className="mt-8 p-4 bg-white dark:bg-slate-950 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm relative z-10 animate-in slide-in-from-bottom-2">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block font-bold text-center">Preview Selected</Label>
                        <p className="text-sm leading-relaxed text-blue-600 dark:text-blue-400 font-medium break-words">
                            {copySelected()}
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};
