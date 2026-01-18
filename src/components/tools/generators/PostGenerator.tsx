'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CopyButton } from '../shared/CopyButton';

interface PostGeneratorProps {
    type: 'post' | 'headline' | 'summary';
}

export const PostGenerator = ({ type }: PostGeneratorProps) => {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('professional');
    const [result, setResult] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    topic,
                    tone,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate content');
            const data = await response.json();
            setResult(data.result);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
            setResult('Error: Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };


    const labels = {
        post: { label: 'What is your post about?', placeholder: 'e.g. The importance of mental health for founders...' },
        headline: { label: 'What is your role/expertise?', placeholder: 'e.g. Marketing Manager at TechCorp...' },
        summary: { label: 'Describe your professional background', placeholder: 'e.g. I am a software engineer specializing in React...' }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                <div className="space-y-3">
                    <Label>{labels[type].label}</Label>
                    <Textarea
                        placeholder={labels[type].placeholder}
                        className="min-h-[120px] text-base resize-none"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="viral">Viral / Hook-heavy</SelectItem>
                                <SelectItem value="casual">Casual / Personal</SelectItem>
                                <SelectItem value="funny">Humorous</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="english">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English (US)</SelectItem>
                                <SelectItem value="uk">English (UK)</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!topic || isGenerating}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                    {isGenerating ? (
                        <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Generating Magic...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate {type === 'post' ? 'Post' : type === 'headline' ? 'Headline' : 'Summary'}
                        </>
                    )}
                </Button>
            </Card>

            {/* Output Section */}
            <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 min-h-[400px] flex flex-col relative group">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        AI Result
                    </h3>
                    <div className="flex gap-2 items-center">
                        {result && (
                            <div className="text-xs text-muted-foreground mr-2">
                                {result.length} chars
                            </div>
                        )}
                        <CopyButton text={result} disabled={!result} />
                    </div>
                </div>

                <div className="flex-1">
                    {isGenerating ? (
                        <div className="space-y-4 animate-pulse p-4">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                        </div>
                    ) : (
                        <Textarea
                            readOnly
                            value={result || ''}
                            placeholder="Your generated content will appear here..."
                            className="w-full h-full min-h-[300px] bg-transparent border-0 resize-none focus-visible:ring-0 p-4 text-base leading-relaxed"
                        />
                    )}
                </div>

                {!result && !isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-muted-foreground opacity-30">
                            <Sparkles className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg font-medium">Ready to create</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};
