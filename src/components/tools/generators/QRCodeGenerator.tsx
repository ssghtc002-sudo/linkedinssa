'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FOUNDER } from '@/lib/founder-profile';
import { DownloadButton } from '../shared/DownloadButton';
import {
    QrCode, Link as LinkIcon, Palette, Maximize, Zap,
    Download, RefreshCw, CheckCircle2, Copy, Check,
    UserCircle, Building2, FileText, Briefcase,
} from 'lucide-react';
import QRCode from 'qrcode';

// ─── Quick URL Presets ────────────────────────────────────────────────────────
const QUICK_PRESETS = [
    { label: 'My Profile', icon: UserCircle,  value: 'https://linkedin.com/in/shyamsundergoyal' },
    { label: 'Company Page', icon: Building2,  value: 'https://linkedin.com/company/' },
    { label: 'Post/Article', icon: FileText,   value: 'https://linkedin.com/posts/' },
    { label: 'Job Posting',  icon: Briefcase,  value: 'https://linkedin.com/jobs/view/' },
];

// ─── Preset QR colors ─────────────────────────────────────────────────────────
const COLOR_PRESETS = [
    { label: 'LinkedIn Blue', fg: '#0A66C2', bg: '#FFFFFF' },
    { label: 'Midnight',      fg: '#0F172A', bg: '#FFFFFF' },
    { label: 'Forest',        fg: '#166534', bg: '#F0FDF4' },
    { label: 'Royal Purple',  fg: '#5B21B6', bg: '#F5F3FF' },
    { label: 'Crimson',       fg: '#9F1239', bg: '#FFF1F2' },
    { label: 'Gold on Black', fg: '#F59E0B', bg: '#000000' },
];

const SIZE_OPTIONS = [
    { label: 'Small',  value: 200 },
    { label: 'Medium', value: 300 },
    { label: 'Large',  value: 500 },
    { label: 'XL',     value: 800 },
];

const EC_LEVELS: Array<{ value: 'L' | 'M' | 'Q' | 'H'; label: string; desc: string }> = [
    { value: 'L', label: 'Low 7%',     desc: 'Smallest, best for clean environments' },
    { value: 'M', label: 'Medium 15%', desc: 'Good balance (recommended)' },
    { value: 'Q', label: 'High 25%',   desc: 'Better recovery' },
    { value: 'H', label: 'Max 30%',    desc: 'Best if QR may get partly damaged' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const QRCodeGenerator = () => {
    const [url, setUrl]           = useState('https://linkedin.com/in/shyamsundergoyal');
    const [fgColor, setFgColor]   = useState('#0A66C2');
    const [bgColor, setBgColor]   = useState('#FFFFFF');
    const [size, setSize]         = useState(300);
    const [ecLevel, setEcLevel]   = useState<'L' | 'M' | 'Q' | 'H'>('M');
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied]     = useState(false);
    const [generated, setGenerated] = useState(false);

    const generateQR = async () => {
        if (!url.trim()) return;
        setIsGenerating(true);
        try {
            const dataUrl = await QRCode.toDataURL(url, {
                width: size,
                color: { dark: fgColor, light: bgColor },
                margin: 2,
                errorCorrectionLevel: ecLevel,
            });
            setQrDataUrl(dataUrl);
            setGenerated(true);
        } catch (err) {
            console.error('QR error:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadQR = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.download = `linkedin-qr-${Date.now()}.png`;
        link.href = qrDataUrl;
        link.click();
    };

    const copyUrl = async () => {
        if (!url) return;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const applyColorPreset = (fg: string, bg: string) => {
        setFgColor(fg);
        setBgColor(bg);
        setGenerated(false);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <QrCode className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">QR Config</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">LinkedIn QR Builder</p>
                        </div>
                    </div>

                    {/* Quick presets */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-900/30">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Quick Presets</p>
                        <div className="grid grid-cols-2 gap-1.5">
                            {QUICK_PRESETS.map(p => (
                                <button key={p.label}
                                    onClick={() => { setUrl(p.value); setGenerated(false); }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all text-xs font-bold text-slate-600 dark:text-slate-300">
                                    <p.icon className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* URL Input */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <LinkIcon className="w-3 h-3" /> Destination URL
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={url}
                                onChange={e => { setUrl(e.target.value); setGenerated(false); }}
                                onKeyDown={e => e.key === 'Enter' && generateQR()}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="flex-1 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-800 dark:text-slate-100"
                            />
                            <button onClick={copyUrl}
                                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-slate-500">
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Color + Size + EC */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-4">

                        {/* Color presets */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Color Theme</p>
                            <div className="flex flex-wrap gap-1.5">
                                {COLOR_PRESETS.map(p => (
                                    <button key={p.label}
                                        onClick={() => applyColorPreset(p.fg, p.bg)}
                                        title={p.label}
                                        className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${fgColor === p.fg && bgColor === p.bg ? 'border-blue-500 scale-110' : 'border-white dark:border-slate-700'}`}
                                        style={{ background: `linear-gradient(135deg, ${p.fg} 50%, ${p.bg} 50%)` }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Manual color pickers */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                                    <Palette className="w-3 h-3 inline mr-1" /> QR Color
                                </p>
                                <div className="flex items-center gap-2">
                                    <input type="color" value={fgColor}
                                        onChange={e => { setFgColor(e.target.value); setGenerated(false); }}
                                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 cursor-pointer bg-white" />
                                    <span className="text-xs font-mono text-slate-500">{fgColor}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Background</p>
                                <div className="flex items-center gap-2">
                                    <input type="color" value={bgColor}
                                        onChange={e => { setBgColor(e.target.value); setGenerated(false); }}
                                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 cursor-pointer bg-white" />
                                    <span className="text-xs font-mono text-slate-500">{bgColor}</span>
                                </div>
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                                <Maximize className="w-3 h-3 inline mr-1" /> Resolution
                            </p>
                            <div className="flex gap-1.5">
                                {SIZE_OPTIONS.map(s => (
                                    <button key={s.value}
                                        onClick={() => { setSize(s.value); setGenerated(false); }}
                                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${size === s.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'}`}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Error Correction */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Error Correction</p>
                            <div className="grid grid-cols-4 gap-1.5">
                                {EC_LEVELS.map(ec => (
                                    <button key={ec.value}
                                        onClick={() => { setEcLevel(ec.value); setGenerated(false); }}
                                        title={ec.desc}
                                        className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${ecLevel === ec.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-400'}`}>
                                        {ec.value}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">{EC_LEVELS.find(e => e.value === ecLevel)?.desc}</p>
                        </div>
                    </div>

                    {/* Generate button */}
                    <div className="px-4 py-4">
                        <button
                            onClick={generateQR}
                            disabled={!url.trim() || isGenerating}
                            className="w-full h-12 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5">
                            {isGenerating
                                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
                                : <><Zap className="w-4 h-4" /> Generate QR Code</>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ RIGHT: PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest">QR Preview</p>
                        </div>
                        {qrDataUrl && (
                            <button onClick={downloadQR}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all shadow-md shadow-blue-500/20">
                                <Download className="w-3.5 h-3.5" /> Download PNG
                            </button>
                        )}
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center min-h-[400px] gap-6">

                        {qrDataUrl ? (
                            <>
                                {/* QR Card with branding */}
                                <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4 w-full max-w-[340px] ring-1 ring-slate-100">
                                    {/* Top branding */}
                                    <div className="flex items-center gap-2.5 w-full">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                                            <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800 leading-tight">{FOUNDER.name}</p>
                                            <p className="text-[9px] text-slate-500 leading-tight">Founder, {FOUNDER.company}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="text-blue-600 font-black text-xl leading-none">in</div>
                                        </div>
                                    </div>

                                    {/* QR */}
                                    <img
                                        src={qrDataUrl}
                                        alt="LinkedIn QR Code"
                                        className="w-full max-w-[240px] h-auto rounded-2xl"
                                    />

                                    {/* Bottom label */}
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan to Connect</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5 break-all font-mono">{url.length > 45 ? url.slice(0, 45) + '…' : url}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-center">
                                    {[
                                        { label: 'Resolution', value: `${size}×${size}px` },
                                        { label: 'Error Corr.', value: `Level ${ecLevel}` },
                                        { label: 'Format', value: 'PNG' },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                                            <p className="text-sm font-black text-slate-700 dark:text-white mt-0.5">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-black">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready to download and share
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-white/5">
                                    <QrCode className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                </div>
                                <p className="font-bold text-slate-400 mb-1">Your QR Code Appears Here</p>
                                <p className="text-xs text-slate-400/70 max-w-xs mx-auto">Configure your URL and settings on the left, then click Generate.</p>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <Zap className="w-3 h-3 inline text-blue-500 mr-1" /> CarouselGem Studio
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">QR v2.0</span>
                    </div>
                </div>

                {/* Use cases */}
                <div className="grid sm:grid-cols-3 gap-3">
                    {[
                        { emoji: '🤝', title: 'Networking Events', desc: 'Add to your badge or name card for instant LinkedIn connections.' },
                        { emoji: '📄', title: 'Resume & CV',        desc: 'Let recruiters scan directly to your LinkedIn profile.' },
                        { emoji: '🎤', title: 'Presentations',      desc: 'Show on last slide so the audience can connect in seconds.' },
                    ].map(({ emoji, title, desc }) => (
                        <div key={title} className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-blue-300 transition-all">
                            <div className="text-2xl mb-2">{emoji}</div>
                            <p className="text-xs font-black text-slate-700 dark:text-white mb-1">{title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
