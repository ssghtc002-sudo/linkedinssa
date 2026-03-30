'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
    Quote, Sparkles, RefreshCw, Download, Type,
    AlignCenter, AlignLeft, ZoomIn, ZoomOut,
    Palette, User,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { FOUNDER } from '@/lib/founder-profile';

// ─── Templates ─────────────────────────────────────────────────────────────────
const THEMES = [
    { id: 'linkedin',  name: 'LinkedIn',  bg: 'linear-gradient(135deg,#0077b5,#00a0dc)', text: '#ffffff' },
    { id: 'dark',      name: 'Midnight',  bg: 'linear-gradient(135deg,#0f0f0f,#1a1a2e)', text: '#ffffff' },
    { id: 'sapphire',  name: 'Sapphire',  bg: 'linear-gradient(135deg,#1e3a8a,#3730a3)', text: '#ffffff' },
    { id: 'sunset',    name: 'Sunset',    bg: 'linear-gradient(135deg,#f97316,#ec4899)',   text: '#ffffff' },
    { id: 'emerald',   name: 'Emerald',   bg: 'linear-gradient(135deg,#059669,#0d9488)',   text: '#ffffff' },
    { id: 'purple',    name: 'Cosmic',    bg: 'linear-gradient(135deg,#7c3aed,#be185d)',   text: '#ffffff' },
    { id: 'minimal',   name: 'Minimal',   bg: '#ffffff',                                   text: '#0f172a' },
    { id: 'slate',     name: 'Steel',     bg: 'linear-gradient(135deg,#334155,#0f172a)',   text: '#f1f5f9' },
];

const FONTS = [
    { id: 'serif',   label: 'Serif',      style: 'Georgia, serif' },
    { id: 'sans',    label: 'Sans',       style: 'Inter, sans-serif' },
    { id: 'display', label: 'Display',    style: '"Playfair Display", Georgia, serif' },
    { id: 'mono',    label: 'Mono',       style: '"JetBrains Mono", monospace' },
];

const EXAMPLE_QUOTES = [
    'The best time to plant a tree was 20 years ago. The second best time is now.',
    'Your network is your net worth. Invest in people, not just connections.',
    'Done is better than perfect. Ship it, learn from it, iterate.',
    'Success is not final, failure is not fatal — it is the courage to continue that counts.',
];

const CARD_SIZE = 1080;
const SCALE = 0.43; // ≈ 464px preview

export const QuoteCardGenerator = () => {
    const [quote, setQuote]         = useState('');
    const [author, setAuthor]       = useState('');
    const [theme, setTheme]         = useState(THEMES[0]);
    const [font, setFont]           = useState(FONTS[0]);
    const [fontSize, setFontSize]   = useState(72);
    const [showBrand, setShowBrand] = useState(true);
    const [align, setAlign]         = useState<'center' | 'left'>('center');
    const [aiTopic, setAiTopic]     = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const generate = async () => {
        if (!aiTopic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'quote', topic: aiTopic }),
            });
            if (!res.ok) throw new Error('fail');
            const data = await res.json();
            setQuote(data.quote || data.result || '');
            setAuthor(data.author || FOUNDER.name);
        } catch { /* silent */ }
        finally { setIsGenerating(false); }
    };

    const download = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
            width: CARD_SIZE, height: CARD_SIZE, scale: 2, backgroundColor: null,
        });
        const a = document.createElement('a');
        a.download = `quote-card-${Date.now()}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
    };

    const textAlign = align === 'center' ? 'center' : 'left';
    const justify   = align === 'center' ? 'center' : 'flex-start';

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                            <Quote className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Quote Card Generator</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">1080 × 1080 LinkedIn Visual</p>
                        </div>
                    </div>

                    {/* AI */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Sparkles className="w-3 h-3 text-purple-500" /> AI Quote Writer</p>
                        <div className="flex gap-2">
                            <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && generate()}
                                placeholder="e.g. Leadership, Resilience, Growth"
                                className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-purple-500/30" />
                            <button onClick={generate} disabled={!aiTopic.trim() || isGenerating}
                                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-all disabled:opacity-40 flex items-center gap-1.5">
                                {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                Generate
                            </button>
                        </div>
                        {/* quick examples */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {EXAMPLE_QUOTES.map(q => (
                                <button key={q} onClick={() => setQuote(q)}
                                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 hover:bg-purple-100 hover:text-purple-700 transition-all text-left">
                                    {q.substring(0, 35)}…
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Text inputs */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400"><Quote className="inline w-3 h-3 mr-1" />Quote Text</p>
                        <textarea rows={3} value={quote} onChange={e => setQuote(e.target.value)}
                            placeholder="Type or generate an inspiring quote..."
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-purple-500/30 resize-none leading-relaxed" />
                        <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
                            placeholder={`Attribution — e.g. ${FOUNDER.name}`}
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-purple-500/30" />
                    </div>

                    {/* Theme */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Palette className="w-3 h-3" />Theme</p>
                        <div className="grid grid-cols-4 gap-2">
                            {THEMES.map(t => (
                                <button key={t.id} onClick={() => setTheme(t)}
                                    className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${theme.id === t.id ? 'border-purple-500 scale-105' : 'border-transparent'}`}>
                                    <div className="h-9 w-full" style={{ background: t.bg }} />
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 text-center py-1">{t.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Type className="w-3 h-3" /> Typography</p>
                        <div className="flex gap-1.5">
                            {FONTS.map(f => (
                                <button key={f.id} onClick={() => setFont(f)}
                                    className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${font.id === f.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setFontSize(s => Math.max(40, s - 8))} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"><ZoomOut className="w-3 h-3" /></button>
                            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${((fontSize - 40) / 80) * 100}%` }} />
                            </div>
                            <button onClick={() => setFontSize(s => Math.min(120, s + 8))} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"><ZoomIn className="w-3 h-3" /></button>
                            <span className="text-[10px] font-black text-slate-400 w-8">{fontSize}px</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setAlign('center')} className={`flex-1 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 transition-all ${align === 'center' ? 'bg-purple-600 text-white border-purple-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <AlignCenter className="w-3 h-3" /> Center
                            </button>
                            <button onClick={() => setAlign('left')} className={`flex-1 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 transition-all ${align === 'left' ? 'bg-purple-600 text-white border-purple-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <AlignLeft className="w-3 h-3" /> Left
                            </button>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div onClick={() => setShowBrand(v => !v)} className={`w-8 h-4 rounded-full relative transition-colors ${showBrand ? 'bg-purple-600' : 'bg-slate-300'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showBrand ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">Show CarouselGem branding</span>
                        </label>
                    </div>

                    {/* Download */}
                    <div className="px-4 py-4">
                        <button onClick={download} disabled={!quote}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download 1080×1080 PNG
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview */}
            <div className="lg:col-span-7">
                <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</p>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500">1080 × 1080</span>
                    </div>
                    <div className="p-5 flex items-center justify-center">
                        {/* Scaled preview wrapper */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10"
                            style={{ width: Math.round(CARD_SIZE * SCALE), height: Math.round(CARD_SIZE * SCALE) }}>
                            {/* Render target */}
                            <div ref={cardRef}
                                className="absolute top-0 left-0 flex flex-col items-center justify-center p-28 overflow-hidden"
                                style={{
                                    width: CARD_SIZE, height: CARD_SIZE,
                                    transform: `scale(${SCALE})`, transformOrigin: 'top left',
                                    background: theme.bg, color: theme.text,
                                    textAlign, alignItems: justify,
                                }}>
                                {/* dot pattern */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                                {/* big quote mark */}
                                <div className="absolute top-16 left-16 opacity-10 pointer-events-none">
                                    <Quote className="w-48 h-48" style={{ color: theme.text }} />
                                </div>

                                <div className="relative z-10 w-full max-w-[860px]" style={{ textAlign }}>
                                    {quote ? (
                                        <>
                                            <p className="font-bold leading-[1.25] tracking-tight mb-12"
                                                style={{ fontFamily: font.style, fontSize: fontSize + 'px', color: theme.text }}>
                                                "{quote}"
                                            </p>
                                            {author && (
                                                <div className={`flex items-center gap-6 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
                                                    <div className="w-16 h-1 opacity-40" style={{ background: theme.text }} />
                                                    <p className="text-[2.4rem] font-semibold opacity-80 tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif', color: theme.text }}>
                                                        {author}
                                                    </p>
                                                    <div className="w-16 h-1 opacity-40" style={{ background: theme.text }} />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-[3.5rem] opacity-20 italic" style={{ fontFamily: font.style }}>Your quote will appear here…</p>
                                    )}
                                </div>

                                {/* Branding */}
                                {showBrand && (
                                    <div className="absolute bottom-10 right-14 flex items-center gap-4 opacity-50">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                        </div>
                                        <div style={{ color: theme.text }}>
                                            <p className="text-[1.4rem] font-black leading-none">{FOUNDER.name}</p>
                                            <p className="text-[1.1rem] opacity-70">CarouselGem</p>
                                        </div>
                                    </div>
                                )}
                                {/* bottom accent */}
                                <div className="absolute bottom-0 left-0 w-full h-2 opacity-20" style={{ background: theme.text }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
