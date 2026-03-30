'use client';

import { useState } from 'react';
import {
    Plus, Trash2, FileText, Sparkles, RefreshCw,
    Download, GripVertical, Zap, Hash, List,
} from 'lucide-react';
import jsPDF from 'jspdf';

interface Item { id: string; title: string; content: string; }

const ACCENT_COLORS = [
    { id: 'blue',   label: 'Royal',   hex: '#2563eb', light: '#eff6ff' },
    { id: 'violet', label: 'Violet',  hex: '#7c3aed', light: '#f5f3ff' },
    { id: 'teal',   label: 'Teal',    hex: '#0d9488', light: '#f0fdfa' },
    { id: 'rose',   label: 'Crimson', hex: '#e11d48', light: '#fff1f2' },
];

const DEFAULT_ITEMS: Item[] = [
    { id: '1', title: 'Core Concept #1', content: 'Write a concise, actionable description here.' },
    { id: '2', title: 'Core Concept #2', content: 'Explain the key idea simply and memorably.' },
    { id: '3', title: 'Core Concept #3', content: 'Add a tip, shortcut, or code snippet.' },
    { id: '4', title: 'Core Concept #4', content: 'Provide an example or quick formula.' },
];

export const CheatSheetGenerator = () => {
    const [title, setTitle]     = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [items, setItems]     = useState<Item[]>(DEFAULT_ITEMS);
    const [accent, setAccent]   = useState(ACCENT_COLORS[0]);
    const [twoCol, setTwoCol]   = useState(false);
    const [prefix, setPrefix]   = useState<'number' | 'bullet' | 'none'>('number');
    const [aiTopic, setAiTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generate = async () => {
        if (!aiTopic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'cheatsheet', topic: aiTopic }),
            });
            if (!res.ok) throw new Error('fail');
            const data = await res.json();
            if (data.title)    setTitle(data.title);
            if (data.subtitle) setSubtitle(data.subtitle);
            if (data.items)    setItems(data.items);
        } catch { /* silent */ }
        finally { setIsGenerating(false); }
    };

    const addItem = () => setItems(prev => [...prev, { id: Date.now().toString(), title: `Tip #${prev.length + 1}`, content: '' }]);
    const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
    const updateItem = (id: string, field: keyof Item, val: string) =>
        setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));

    const getPfx = (idx: number) => {
        if (prefix === 'number') return `${idx + 1}.`;
        if (prefix === 'bullet') return '•';
        return '';
    };

    const downloadPDF = () => {
        const doc  = new jsPDF({ unit: 'mm', format: 'a4' });
        const W    = doc.internal.pageSize.width;
        const [r, g, b] = [
            parseInt(accent.hex.slice(1, 3), 16),
            parseInt(accent.hex.slice(3, 5), 16),
            parseInt(accent.hex.slice(5, 7), 16),
        ];

        // Header
        doc.setFillColor(r, g, b);
        doc.rect(0, 0, W, 36, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22); doc.setFont('helvetica', 'bold');
        doc.text(title || 'Cheat Sheet', 15, 16);
        doc.setFontSize(11); doc.setFont('helvetica', 'normal');
        doc.text(subtitle || 'Essential Reference', 15, 26);

        // Content
        doc.setTextColor(15, 23, 42);
        let y = 46;
        items.forEach((item, idx) => {
            if (y > 260) { doc.addPage(); y = 15; }
            doc.setFontSize(13); doc.setFont('helvetica', 'bold');
            doc.text(`${getPfx(idx)} ${item.title}`, 15, y); y += 7;
            doc.setFontSize(10); doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(item.content, W - 30);
            doc.text(lines, 15, y);
            y += lines.length * 5 + 8;
        });

        // Footer
        const PH = doc.internal.pageSize.height;
        doc.setFontSize(8); doc.setTextColor(150);
        doc.text('Generated with CarouselGem Free Tools — carouselgem.com', W / 2, PH - 8, { align: 'center' });
        doc.save(`${(title || 'cheatsheet').toLowerCase().replace(/\s+/g, '-')}.pdf`);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: accent.hex }}>
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Cheat Sheet Builder</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">PDF + Visual Export</p>
                            </div>
                        </div>
                        <button onClick={addItem}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all" style={{ background: accent.hex }}>
                            <Plus className="w-3 h-3" /> Add Row
                        </button>
                    </div>

                    {/* AI */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" style={{ color: accent.hex }} /> AI Auto-Generate
                        </p>
                        <div className="flex gap-2">
                            <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && generate()}
                                placeholder="e.g. React Hooks, SEO basics, Python tips"
                                className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30" />
                            <button onClick={generate} disabled={!aiTopic.trim() || isGenerating}
                                className="px-4 py-2.5 rounded-xl text-white text-xs font-black transition-all disabled:opacity-40 flex items-center gap-1.5" style={{ background: accent.hex }}>
                                {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                                Generate
                            </button>
                        </div>
                    </div>

                    {/* Title + Subtitle */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                            placeholder="Cheat Sheet Title…"
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/30" />
                        <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)}
                            placeholder="Subtitle or category…"
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>

                    {/* Design controls */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Design Options</p>
                        <div className="flex gap-2">
                            {ACCENT_COLORS.map(c => (
                                <button key={c.id} onClick={() => setAccent(c)} title={c.label}
                                    className={`w-8 h-8 rounded-xl border-2 transition-transform hover:scale-110 ${accent.id === c.id ? 'border-slate-400 scale-110' : 'border-transparent'}`}
                                    style={{ background: c.hex }} />
                            ))}
                            <div className="flex-1" />
                            {/* 2-col toggle */}
                            <button onClick={() => setTwoCol(v => !v)}
                                className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${twoCol ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                2-col
                            </button>
                        </div>
                        <div className="flex gap-1.5">
                            {([['number', '1.'], ['bullet', '•'], ['none', 'A']] as const).map(([val, lbl]) => (
                                <button key={val} onClick={() => setPrefix(val)}
                                    className={`flex-1 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${prefix === val ? 'text-white border-transparent' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
                                    style={prefix === val ? { background: accent.hex, borderColor: accent.hex } : {}}>
                                    {val === 'number' ? <Hash className="w-3 h-3 mx-auto" /> : val === 'bullet' ? <List className="w-3 h-3 mx-auto" /> : 'No prefix'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Items editor */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 max-h-[320px] overflow-y-auto space-y-2">
                        {items.map((item, idx) => (
                            <div key={item.id} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 space-y-2 hover:border-blue-200 transition-colors">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-3.5 h-3.5 text-slate-300 cursor-move shrink-0" />
                                    <span className="text-[10px] font-black text-slate-400 w-5 shrink-0">{getPfx(idx)}</span>
                                    <input value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)}
                                        className="flex-1 font-semibold text-xs bg-transparent outline-none placeholder:text-slate-300" placeholder="Item title" />
                                    <button onClick={() => removeItem(item.id)} className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <textarea value={item.content} onChange={e => updateItem(item.id, 'content', e.target.value)}
                                    rows={2} placeholder="Description or tip…"
                                    className="w-full resize-none text-xs bg-slate-50 dark:bg-slate-900 rounded-lg px-2.5 py-2 outline-none border border-slate-100 dark:border-slate-800 leading-relaxed" />
                            </div>
                        ))}
                    </div>

                    <div className="px-4 py-4">
                        <button onClick={downloadPDF}
                            className="w-full h-11 rounded-2xl text-sm font-black text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${accent.hex}, ${accent.hex}cc)` }}>
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: A4 Preview */}
            <div className="lg:col-span-7">
                <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">A4 Preview</p>
                        <span className="text-[9px] font-black px-2 py-1 rounded-lg text-white" style={{ background: accent.hex }}>{items.length} Items</span>
                    </div>
                    <div className="p-5 flex justify-center">
                        <div className="w-full max-w-[420px] bg-white shadow-2xl" style={{ aspectRatio: '1 / 1.414', borderRadius: 4 }}>
                            {/* Header */}
                            <div className="p-5 text-white" style={{ background: accent.hex, borderRadius: '4px 4px 0 0' }}>
                                <h1 className="text-base font-black truncate">{title || 'Cheat Sheet Title'}</h1>
                                <p className="text-xs opacity-80 mt-0.5 truncate">{subtitle || 'Essential Reference Guide'}</p>
                            </div>
                            {/* Items */}
                            <div className={`p-4 overflow-hidden ${twoCol ? 'grid grid-cols-2 gap-x-3 gap-y-2' : 'space-y-3'}`}>
                                {items.slice(0, twoCol ? 8 : 6).map((item, idx) => (
                                    <div key={item.id} className="pb-2 border-b border-slate-100 last:border-0">
                                        <div className="flex items-center gap-1.5">
                                            {prefix !== 'none' && (
                                                <span className="text-[9px] font-black shrink-0" style={{ color: accent.hex }}>{getPfx(idx)}</span>
                                            )}
                                            <p className="text-[10px] font-black text-slate-800 truncate">{item.title}</p>
                                        </div>
                                        <p className="text-[9px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{item.content}</p>
                                    </div>
                                ))}
                                {items.length > (twoCol ? 8 : 6) && (
                                    <p className="text-[9px] font-black text-center col-span-2 pt-1" style={{ color: accent.hex }}>
                                        + {items.length - (twoCol ? 8 : 6)} more items in PDF
                                    </p>
                                )}
                                {items.length === 0 && (
                                    <p className="text-[10px] text-slate-300 text-center py-4">Add items on the left</p>
                                )}
                            </div>
                            {/* Footer */}
                            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 border-t border-slate-100 text-[8px] text-center text-slate-300">
                                CarouselGem Free Tools • carouselgem.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
