'use client';
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DownloadButton } from '../shared/DownloadButton';
import { Image as ImageIcon, Upload, Sparkles, RefreshCw } from 'lucide-react';

import html2canvas from 'html2canvas';

const gradients = [
    { id: 'blue', name: 'Blue', class: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'purple', name: 'Purple', class: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'orange', name: 'Orange', class: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'green', name: 'Green', class: 'bg-gradient-to-r from-green-500 to-teal-500' },
    { id: 'dark', name: 'Dark', class: 'bg-gradient-to-r from-slate-800 to-slate-900' },
];

export const BannerMaker = () => {
    const [text, setText] = useState('');
    const [backgroundType, setBackgroundType] = useState<'gradient' | 'image'>('gradient');
    const [selectedGradient, setSelectedGradient] = useState(gradients[0]);
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const [textColor, setTextColor] = useState('#ffffff');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiTopic, setAiTopic] = useState('');
    const bannerRef = useRef<HTMLDivElement>(null);

    const handleAiGenerate = async () => {
        if (!aiTopic) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'banner',
                    topic: aiTopic,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate slogan');
            const data = await response.json();

            setText(data.slogan);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setBackgroundType('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadBanner = async () => {
        if (!bannerRef.current) return;

        try {
            const canvas = await html2canvas(bannerRef.current, {
                width: 1584,
                height: 396,
                scale: 2,
                backgroundColor: null,
            });

            const link = document.createElement('a');
            link.download = 'linkedin-banner.png';
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
                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">AI Banner Slogan</span>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Slogan topic (e.g. B2B Sales)"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="bg-white dark:bg-slate-950"
                        />
                        <Button
                            onClick={handleAiGenerate}
                            disabled={!aiTopic || isGenerating}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
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

                    <Label>Background</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setBackgroundType('gradient')}
                            className={`p-3 rounded-lg border-2 transition-all ${backgroundType === 'gradient'
                                ? 'border-primary shadow-md'
                                : 'border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            Gradient
                        </button>
                        <label className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${backgroundType === 'image'
                            ? 'border-primary shadow-md'
                            : 'border-slate-200 dark:border-slate-700'
                            }`}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload Image
                            </div>
                        </label>
                    </div>
                </div>

                {backgroundType === 'gradient' && (
                    <div className="space-y-3">
                        <Label>Gradient Style</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {gradients.map((gradient) => (
                                <button
                                    key={gradient.id}
                                    onClick={() => setSelectedGradient(gradient)}
                                    className={`p-2 rounded-lg border-2 transition-all ${selectedGradient.id === gradient.id
                                        ? 'border-primary shadow-md'
                                        : 'border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    <div className={`w-full h-8 rounded ${gradient.class}`}></div>
                                    <div className="text-xs font-medium mt-1">{gradient.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <Label>Text Overlay (Optional)</Label>
                    <Textarea
                        placeholder="Add your headline or tagline..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[80px] text-base resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Text Color</Label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full h-10 rounded border cursor-pointer"
                    />
                </div>

                <DownloadButton
                    onClick={downloadBanner}
                    label="Download Banner"
                    className="w-full h-12 text-lg font-semibold"
                />
            </Card>

            {/* Output Section */}
            <Card className="p-6 flex flex-col bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Preview (1584×396)</h3>
                </div>

                <div className="flex-1 flex items-center justify-center bg-slate-200 dark:bg-slate-800 rounded-lg p-4">
                    <div className="w-full max-w-2xl">
                        <div
                            ref={bannerRef}
                            className={`w-full relative overflow-hidden rounded-lg shadow-2xl ${backgroundType === 'gradient' ? selectedGradient.class : ''
                                }`}
                            style={{
                                width: '1584px',
                                height: '396px',
                                transform: 'scale(0.35)',
                                transformOrigin: 'center',
                                margin: '-128px 0',
                                backgroundImage: backgroundType === 'image' && uploadedImage ? `url(${uploadedImage})` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Profile Photo Safe Zone Indicator */}
                            <div className="absolute bottom-0 left-0 w-48 h-48 border-2 border-dashed border-white/30 rounded-full"></div>

                            {/* Text Overlay */}
                            {text && (
                                <div className="absolute inset-0 flex items-center justify-center px-16">
                                    <h1
                                        className="text-7xl font-bold text-center leading-tight"
                                        style={{ color: textColor }}
                                    >
                                        {text}
                                    </h1>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Dashed circle shows profile photo area (avoid placing text there)
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
