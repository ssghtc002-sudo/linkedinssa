'use client';
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DownloadButton } from '../shared/DownloadButton';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';

import html2canvas from 'html2canvas';

const templates = [
    { id: 'minimal', name: 'Minimal', bg: 'bg-white', text: 'text-slate-900', accent: 'bg-blue-600' },
    { id: 'dark', name: 'Dark', bg: 'bg-slate-900', text: 'text-white', accent: 'bg-purple-500' },
    { id: 'gradient', name: 'Gradient', bg: 'bg-gradient-to-br from-blue-500 to-purple-600', text: 'text-white', accent: 'bg-white' },
    { id: 'warm', name: 'Warm', bg: 'bg-gradient-to-br from-orange-400 to-pink-500', text: 'text-white', accent: 'bg-yellow-300' },
    { id: 'nature', name: 'Nature', bg: 'bg-gradient-to-br from-green-400 to-teal-500', text: 'text-white', accent: 'bg-emerald-300' },
];

export const QuoteCardGenerator = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiTopic, setAiTopic] = useState('');
    const cardRef = useRef<HTMLDivElement>(null);

    const handleAiGenerate = async () => {
        if (!aiTopic) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'quote',
                    topic: aiTopic,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate quote');
            const data = await response.json();

            setQuote(data.quote);
            setAuthor(data.author);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };


    const downloadCard = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                width: 1080,
                height: 1080,
                scale: 2,
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = 'linkedin-quote-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download error:', err);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-6 space-y-6 h-fit">
                {/* AI Generator Section */}
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">AI Quote Maker</span>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Quote topic (e.g. Resilience)"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="bg-white dark:bg-slate-950"
                        />
                        <Button
                            onClick={handleAiGenerate}
                            disabled={!aiTopic || isGenerating}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isGenerating ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">

                    <Label>Quote Text</Label>
                    <Textarea
                        placeholder="Enter your inspiring quote..."
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="min-h-[120px] text-base resize-none"
                    />
                </div>

                <div className="space-y-3">
                    <Label>Author</Label>
                    <Input
                        placeholder="Author name (optional)"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="text-base"
                    />
                </div>

                <div className="space-y-3">
                    <Label>Template</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template)}
                                className={`p-3 rounded-lg border-2 transition-all ${selectedTemplate.id === template.id
                                    ? 'border-primary shadow-md'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                    }`}
                            >
                                <div className={`w-full h-12 rounded ${template.bg} mb-2`}></div>
                                <div className="text-xs font-medium">{template.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <DownloadButton
                    onClick={downloadCard}
                    label="Download Card"
                    disabled={!quote}
                    className="w-full h-12 text-lg font-semibold"
                />
            </Card>

            {/* Output Section */}
            <Card className="p-6 flex flex-col bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Preview (1080×1080)</h3>
                </div>

                <div className="flex-1 flex items-center justify-center bg-slate-200 dark:bg-slate-800 rounded-lg p-4">
                    {quote ? (
                        <div className="w-full max-w-md aspect-square">
                            <div
                                ref={cardRef}
                                className={`w-full h-full ${selectedTemplate.bg} ${selectedTemplate.text} rounded-2xl p-12 flex flex-col justify-center items-center relative overflow-hidden shadow-2xl`}
                                style={{ width: '1080px', height: '1080px', transform: 'scale(0.3)', transformOrigin: 'center', margin: '-360px' }}
                            >
                                {/* Decorative Quote Icon */}
                                <div className={`absolute top-12 left-12 ${selectedTemplate.accent} opacity-20 rounded-full p-8`}>
                                    <Quote className="w-24 h-24" />
                                </div>

                                {/* Quote Text */}
                                <div className="relative z-10 text-center">
                                    <p className="text-6xl font-bold leading-tight mb-12">
                                        "{quote}"
                                    </p>
                                    {author && (
                                        <p className="text-4xl font-medium opacity-80">
                                            — {author}
                                        </p>
                                    )}
                                </div>

                                {/* Decorative Accent */}
                                <div className={`absolute bottom-12 right-12 w-32 h-2 ${selectedTemplate.accent}`}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground opacity-50">
                            <Quote className="w-24 h-24 mx-auto mb-4" />
                            <p>Enter a quote to see preview</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
