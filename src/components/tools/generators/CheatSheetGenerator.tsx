'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DownloadButton } from '../shared/DownloadButton';
import { Plus, Trash2, FileText, GripVertical, Sparkles, RefreshCw } from 'lucide-react';

import jsPDF from 'jspdf';

interface CheatSheetItem {
    id: string;
    title: string;
    content: string;
}

export const CheatSheetGenerator = () => {
    const [title, setTitle] = useState('My Cheat Sheet');
    const [subtitle, setSubtitle] = useState('Essential Tips & Tricks');
    const [items, setItems] = useState<CheatSheetItem[]>([
        { id: '1', title: 'Tip #1', content: 'Write a concise, actionable tip here.' },
        { id: '2', title: 'Tip #2', content: 'Explain a key concept simply.' },
        { id: '3', title: 'Tip #3', content: 'Provide a code snippet or shortcut.' },
    ]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiTopic, setAiTopic] = useState('');

    const handleAiGenerate = async () => {
        if (!aiTopic) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'cheatsheet',
                    topic: aiTopic,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate cheat sheet');
            const data = await response.json();

            setTitle(data.title);
            setSubtitle(data.subtitle);
            setItems(data.items);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };


    const addItem = () => {
        setItems([
            ...items,
            { id: Date.now().toString(), title: `Tip #${items.length + 1}`, content: '' }
        ]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof CheatSheetItem, value: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;

        // Header
        doc.setFillColor(59, 130, 246); // Blue header
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, 20);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, 20, 30);

        // Content
        doc.setTextColor(30, 41, 59); // Slate 900
        let yPos = 55;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);

        items.forEach((item, index) => {
            // Check for page break
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // Item Title
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`${item.title}`, margin, yPos);
            yPos += 7;

            // Item Content
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(item.content, contentWidth);
            doc.text(lines, margin, yPos);

            // Calculate height of text block
            const lineHeight = 5;
            yPos += (lines.length * lineHeight) + 10;
        });

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text('Generated with LinkedIn Tools', pageWidth / 2, pageHeight - 10, { align: 'center' });

        doc.save('cheatsheet.pdf');
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            <Card className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">Content Editor</h3>
                    </div>
                    <Button onClick={addItem} size="sm" variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Item
                    </Button>
                </div>

                {/* AI Generator Section */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 space-y-3">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">AI Magic</span>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter topic (e.g. Next.js Best Practices)"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="bg-white dark:bg-slate-950"
                        />
                        <Button
                            onClick={handleAiGenerate}
                            disabled={!aiTopic || isGenerating}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isGenerating ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                "Generate"
                            )}
                        </Button>
                    </div>
                </div>


                <div className="space-y-4 border-b pb-6">
                    <div className="space-y-2">
                        <Label>Document Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="font-bold text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {items.map((item, index) => (
                        <div key={item.id} className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-900/50 space-y-3 group">
                            <div className="flex items-center gap-2">
                                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                                <Input
                                    value={item.title}
                                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                                    className="font-semibold h-8"
                                    placeholder="Item Title"
                                />
                                <Button
                                    onClick={() => removeItem(item.id)}
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <Textarea
                                value={item.content}
                                onChange={(e) => updateItem(item.id, 'content', e.target.value)}
                                placeholder="Enter content description..."
                                className="resize-none min-h-[60px]"
                            />
                        </div>
                    ))}
                </div>

                <DownloadButton
                    onClick={generatePDF}
                    label="Download PDF Cheatsheet"
                    className="w-full h-12 text-lg font-semibold"
                />
            </Card>

            {/* Live Preview Section */}
            <Card className="p-0 h-fit overflow-hidden border-2 shadow-xl bg-white text-slate-900">
                {/* Header Preview */}
                <div className="bg-blue-600 p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">{title || 'Title'}</h1>
                    <p className="text-blue-100 text-lg">{subtitle || 'Subtitle'}</p>
                </div>

                {/* Content Preview */}
                <div className="p-8 space-y-6 min-h-[600px] bg-white">
                    {items.map((item) => (
                        <div key={item.id} className="space-y-1">
                            <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center text-slate-400 py-12">
                            <p>Add items to see preview</p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t text-center text-xs text-slate-400">
                    Generated with LinkedIn Tools
                </div>
            </Card>
        </div>
    );
};
