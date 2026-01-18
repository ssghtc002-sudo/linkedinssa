'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send, Globe, Smartphone, Monitor } from 'lucide-react';

export const PostPreview = () => {
    const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');
    const [content, setContent] = useState('');

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 space-y-6 h-fit">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Edit Content</h3>
                </div>
                <Textarea
                    placeholder="Type your post content here..."
                    className="min-h-[300px] text-base resize-none p-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <p className="text-sm text-muted-foreground text-right border-t pt-2">
                    {content.length} characters
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-semibold mb-1">Preview Tips:</p>
                    <ul className="list-disc list-inside space-y-1 opacity-80">
                        <li>Check where the "See more" truncation happens (usually around 3 lines on mobile)</li>
                        <li>Ensure your hook (first 2 lines) is catchy</li>
                        <li>Test readability with line breaks</li>
                    </ul>
                </div>
            </Card>

            <div className="flex flex-col items-center">
                <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full mb-6 flex gap-1 shadow-sm border">
                    <Button
                        variant={mode === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setMode('desktop')}
                        className="rounded-full px-6"
                    >
                        <Monitor className="w-4 h-4 mr-2" /> Desktop
                    </Button>
                    <Button
                        variant={mode === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setMode('mobile')}
                        className="rounded-full px-6"
                    >
                        <Smartphone className="w-4 h-4 mr-2" /> Mobile
                    </Button>
                </div>

                {/* The Simulator */}
                <div className={`
                    bg-white dark:bg-zinc-950 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl relative
                    ${mode === 'desktop'
                        ? 'w-full max-w-[550px] rounded-lg border border-slate-200 dark:border-slate-800'
                        : 'w-[375px] rounded-[40px] border-[12px] border-slate-900 h-[700px] overflow-y-auto custom-scrollbar-hide'
                    }
                 `}>
                    {/* Mobile Notch Simulation */}
                    {mode === 'mobile' && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
                    )}

                    {/* LinkedIn Header imitation */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-10">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 border-2 border-white dark:border-slate-800 shadow-sm"></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="truncate">
                                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Your Name</span>
                                        <span className="font-normal text-muted-foreground text-xs ml-1">• 1st</span>
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                </div>
                                <div className="text-xs text-muted-foreground truncate">Software Engineer @ TechCorp | Helping developers scale applications</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    1h • <Globe className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* Content */}
                        <div className={`text-sm text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed mb-4 min-h-[100px] ${!content && 'opacity-50 italic'}`}>
                            {content || "Start typing your post content to see how it looks on LinkedIn...\n\nIdeally, your hook should be visible before the truncation point."}
                        </div>

                        {/* Reactions Count */}
                        <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-1.5 hover:text-blue-600 hover:underline cursor-pointer">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-white dark:border-zinc-950 ring-1 ring-blue-500/10 text-[10px]">👍</div>
                                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-white dark:border-zinc-950 ring-1 ring-red-500/10 text-[10px]">❤️</div>
                                    <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-white dark:border-zinc-950 ring-1 ring-green-500/10 text-[10px]">👏</div>
                                </div>
                                <span>84</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="hover:text-blue-600 hover:underline cursor-pointer">12 comments</span>
                                <span className="hover:text-blue-600 hover:underline cursor-pointer">2 reposts</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" size="sm" className="flex-1 flex-col h-auto py-2 gap-1 text-gray-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gray-900 rounded-md">
                                <ThumbsUp className="w-5 h-5" />
                                <span className="text-xs font-medium">Like</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1 flex-col h-auto py-2 gap-1 text-gray-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gray-900 rounded-md">
                                <MessageSquare className="w-5 h-5" />
                                <span className="text-xs font-medium">Comment</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1 flex-col h-auto py-2 gap-1 text-gray-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gray-900 rounded-md">
                                <Share2 className="w-5 h-5" />
                                <span className="text-xs font-medium">Repost</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1 flex-col h-auto py-2 gap-1 text-gray-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gray-900 rounded-md">
                                <Send className="w-5 h-5" />
                                <span className="text-xs font-medium">Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
