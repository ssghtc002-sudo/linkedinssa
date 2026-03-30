'use client';

import { useState, useRef } from 'react';
import { FOUNDER } from '@/lib/founder-profile';
import {
    ImageIcon, Upload, Sparkles, RefreshCw, Zap,
    Palette, Type, Layout, Download, Info, CheckCircle2,
} from 'lucide-react';
import html2canvas from 'html2canvas';

// ─── Data ──────────────────────────────────────────────────────────────────────
const GRADIENTS = [
    { id: 'linkedin',  name: 'LinkedIn Blue',    class: 'bg-gradient-to-r from-blue-600 to-cyan-500' },
    { id: 'royal',     name: 'Royal Purple',     class: 'bg-gradient-to-r from-purple-700 to-pink-500' },
    { id: 'sunset',    name: 'Sunset',           class: 'bg-gradient-to-r from-orange-500 to-rose-600' },
    { id: 'ocean',     name: 'Deep Ocean',       class: 'bg-gradient-to-r from-blue-700 to-indigo-950' },
    { id: 'midnight',  name: 'Midnight',         class: 'bg-gradient-to-br from-slate-800 to-slate-950' },
    { id: 'nebula',    name: 'Cosmic',           class: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500' },
    { id: 'forest',    name: 'Forest',           class: 'bg-gradient-to-r from-green-700 to-teal-600' },
    { id: 'gold',      name: 'Gold Rush',        class: 'bg-gradient-to-r from-amber-500 to-orange-600' },
];

const FONT_SIZES = [
    { id: 'sm', label: 'Small',  class: 'text-[3.5rem]' },
    { id: 'md', label: 'Medium', class: 'text-[5rem]' },
    { id: 'lg', label: 'Large',  class: 'text-[7rem]' },
];

const TEXT_POSITIONS = [
    { id: 'left',   label: 'Left',   class: 'justify-start pl-48 text-left' },
    { id: 'center', label: 'Center', class: 'justify-center text-center px-20' },
    { id: 'right',  label: 'Right',  class: 'justify-end pr-48 text-right' },
];

const EXAMPLE_HEADLINES = [
    'Building the Future of LinkedIn Content 🚀',
    'Helping B2B Founders Grow to 50K+ Followers',
    'Top Voice | Speaker | Mentor | Creator',
    'Turning Ideas into Impact Since 2018',
];

// ─── Component ─────────────────────────────────────────────────────────────────
export const BannerMaker = () => {
    const [text, setText]                   = useState('');
    const [subText, setSubText]             = useState('');
    const [bgType, setBgType]               = useState<'gradient' | 'image'>('gradient');
    const [selectedGradient, setGradient]   = useState(GRADIENTS[0]);
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const [textColor, setTextColor]         = useState('#ffffff');
    const [fontSize, setFontSize]           = useState(FONT_SIZES[1]);
    const [textPos, setTextPos]             = useState(TEXT_POSITIONS[1]);
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const [aiTopic, setAiTopic]             = useState('');
    const [isGenerating, setIsGenerating]   = useState(false);

    const bannerRef = useRef<HTMLDivElement>(null);
    const BANNER_W  = 1584;
    const BANNER_H  = 396;

    const generateSlogan = async () => {
        if (!aiTopic.trim()) return;
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'banner', topic: aiTopic }),
            });
            if (!res.ok) throw new Error('fail');
            const data = await res.json();
            setText(data.slogan || data.result || '');
        } catch { /* silent */ }
        finally { setIsGenerating(false); }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            setUploadedImage(ev.target?.result as string);
            setBgType('image');
        };
        reader.readAsDataURL(file);
    };

    const download = async () => {
        if (!bannerRef.current) return;
        const canvas = await html2canvas(bannerRef.current, {
            width: BANNER_W, height: BANNER_H, scale: 2, backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `linkedin-banner-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Preview scale: make the 1584×396 banner fit in the preview container (~620px wide)
    const scaleRatio = 0.39;
    const previewH   = Math.round(BANNER_H * scaleRatio); // ~154px

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                            <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Banner Maker</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">1584 × 396 px LinkedIn Export</p>
                        </div>
                    </div>

                    {/* AI copywriter */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-cyan-500" /> AI Copywriter
                        </p>
                        <div className="flex gap-2">
                            <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && generateSlogan()}
                                placeholder="e.g. Cloud Security Consultant"
                                className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-cyan-500/30" />
                            <button onClick={generateSlogan} disabled={!aiTopic.trim() || isGenerating}
                                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-all disabled:opacity-40 flex items-center gap-1.5">
                                {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                                Generate
                            </button>
                        </div>
                    </div>

                    {/* Text inputs */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Type className="w-3 h-3" /> Headline & Sub-text
                        </p>
                        <textarea rows={2} value={text} onChange={e => setText(e.target.value)}
                            placeholder="Your main headline..."
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none" />
                        <input type="text" value={subText} onChange={e => setSubText(e.target.value)}
                            placeholder="Optional sub-text or tagline"
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-cyan-500/30" />

                        {/* Example pills */}
                        <div className="flex flex-wrap gap-1.5">
                            {EXAMPLE_HEADLINES.map(ex => (
                                <button key={ex} onClick={() => setText(ex)}
                                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-500 hover:bg-cyan-100 hover:text-cyan-700 transition-all">
                                    {ex.substring(0, 30)}…
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Background */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Palette className="w-3 h-3" /> Background
                        </p>

                        {/* Type toggle */}
                        <div className="flex gap-2">
                            <button onClick={() => setBgType('gradient')}
                                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${bgType === 'gradient' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                Gradient
                            </button>
                            <label className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer text-center ${bgType === 'image' ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                {uploadedImage ? '✓ Image' : '↑ Upload'}
                            </label>
                        </div>

                        {/* Gradient swatches */}
                        {bgType === 'gradient' && (
                            <div className="grid grid-cols-4 gap-2">
                                {GRADIENTS.map(g => (
                                    <button key={g.id} onClick={() => setGradient(g)}
                                        className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${selectedGradient.id === g.id ? 'border-cyan-500 scale-105' : 'border-transparent'}`}>
                                        <div className={`h-10 ${g.class}`} />
                                        <p className="text-[7px] font-black uppercase tracking-widest text-slate-500 py-1 text-center">{g.name}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Typography controls */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Layout className="w-3 h-3" /> Typography
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-[9px] text-slate-400 mb-1 font-bold uppercase">Text Color</p>
                                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                                    className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 cursor-pointer" />
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-400 mb-1 font-bold uppercase">Dark overlay</p>
                                <input type="range" min={0} max={70} value={overlayOpacity} onChange={e => setOverlayOpacity(+e.target.value)}
                                    className="w-full mt-2 accent-cyan-600" />
                            </div>
                        </div>

                        {/* Size + Alignment */}
                        <div className="flex gap-2">
                            {FONT_SIZES.map(f => (
                                <button key={f.id} onClick={() => setFontSize(f)}
                                    className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${fontSize.id === f.id ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {TEXT_POSITIONS.map(p => (
                                <button key={p.id} onClick={() => setTextPos(p)}
                                    className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${textPos.id === p.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Download */}
                    <div className="px-4 py-4">
                        <button onClick={download}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Export 1584×396 PNG
                        </button>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/30 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-cyan-700 dark:text-cyan-300 font-medium leading-relaxed">Keep important text away from the bottom-left where your profile picture overlaps on LinkedIn.</p>
                </div>
            </div>

            {/* ═══ RIGHT: PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-cyan-500" /> Live Banner Preview
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400">1584 × 396</span>
                    </div>

                    {/* Scaled preview container */}
                    <div className="p-5">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10"
                            style={{ height: previewH + 'px' }}>
                            {/* Render target (actual 1584×396 scaled down) */}
                            <div
                                ref={bannerRef}
                                className={`absolute top-0 left-0 flex items-center ${textPos.class} ${bgType === 'gradient' ? selectedGradient.class : ''}`}
                                style={{
                                    width: BANNER_W + 'px',
                                    height: BANNER_H + 'px',
                                    transform: `scale(${scaleRatio})`,
                                    transformOrigin: 'top left',
                                    backgroundImage: bgType === 'image' && uploadedImage ? `url(${uploadedImage})` : undefined,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>
                                {/* Dark overlay */}
                                {overlayOpacity > 0 && (
                                    <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity / 100})` }} />
                                )}

                                {/* Profile picture safe zone */}
                                <div className="absolute bottom-6 left-14 w-56 h-56 border-4 border-dashed border-white/15 rounded-full flex items-center justify-center">
                                    <span className="text-white/15 text-sm font-black uppercase tracking-widest rotate-12">Photo</span>
                                </div>

                                {/* Text */}
                                {(text || subText) && (
                                    <div className="relative z-10 max-w-[900px]">
                                        {text && (
                                            <h1 className={`${fontSize.class} font-black leading-none tracking-tighter drop-shadow-xl`} style={{ color: textColor }}>
                                                {text}
                                            </h1>
                                        )}
                                        {subText && (
                                            <p className="text-[2rem] font-semibold mt-4 opacity-80 leading-tight" style={{ color: textColor }}>
                                                {subText}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Dot texture */}
                                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
                            </div>
                        </div>

                        {/* LinkedIn profile mockup */}
                        <div className="mt-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                            {/* Tiny banner strip */}
                            <div className={`h-16 w-full ${bgType === 'gradient' ? selectedGradient.class : ''} relative`}
                                style={bgType === 'image' && uploadedImage ? { backgroundImage: `url(${uploadedImage})`, backgroundSize: 'cover' } : undefined}>
                                {overlayOpacity > 0 && <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity / 100})` }} />}
                                {text && <p className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase tracking-widest truncate px-16" style={{ color: textColor }}>{text}</p>}
                            </div>
                            {/* Profile badge */}
                            <div className="relative px-4 pb-3">
                                <div className="absolute -top-7 left-4 w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-slate-900">
                                    <img src={FOUNDER.avatar} alt={FOUNDER.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="pt-9 pl-1">
                                    <p className="text-xs font-bold text-slate-800 dark:text-white">{FOUNDER.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{FOUNDER.headline}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2 font-medium">↑ Preview of how your banner looks on your LinkedIn profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
