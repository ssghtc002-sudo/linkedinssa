'use client';

import { useState, useRef } from 'react';
import { FOUNDER } from '@/lib/founder-profile';
import { DownloadButton } from '../shared/DownloadButton';
import {
    User, Upload, Zap, Palette, Type, Camera, Download,
    CheckCircle2, Layers, Info,
} from 'lucide-react';
import html2canvas from 'html2canvas';

const FRAMES = [
    { id: 'ring',     name: 'Clean Ring',    defaultColor: '#0A66C2' },
    { id: 'double',   name: 'Double Ring',   defaultColor: '#8b5cf6' },
    { id: 'glow',     name: 'Glow Border',   defaultColor: '#10b981' },
    { id: 'rainbow',  name: 'Rainbow',       defaultColor: '' },
    { id: 'hiring',   name: 'Hiring Glow',   defaultColor: '#f59e0b' },
    { id: 'topvoice', name: 'Top Voice Gold', defaultColor: '#F59E0B' },
];

const BADGE_PRESETS = [
    '🚀 #OPEN TO WORK', '💼 #HIRING', '🏆 Top Voice', '🤝 Let\'s Connect',
    '💡 Founder', '🌟 Speaker', '📚 Mentor', '🔥 Building in Public',
];

const COLOR_SWATCHES = [
    '#0A66C2', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899',
    '#06b6d4', '#000000', '#ffffff', '#1e293b',
];

export const ProfileFrameGenerator = () => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
    const [frameText, setFrameText]         = useState('');
    const [frameColor, setFrameColor]       = useState('#0A66C2');
    const [frameBgColor, setFrameBgColor]   = useState('#ffffff');
    const [frameWidth, setFrameWidth]       = useState(12);
    const canvasRef = useRef<HTMLDivElement>(null);

    const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setProfileImage(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const download = async () => {
        if (!canvasRef.current || !profileImage) return;
        const canvas = await html2canvas(canvasRef.current, { width: 800, height: 800, scale: 2, backgroundColor: null });
        const link = document.createElement('a');
        link.download = `linkedin-profile-frame-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const getRainbowStyle = (pos: 'inner' | 'outer') => {
        if (selectedFrame.id !== 'rainbow') return {};
        return { background: pos === 'outer' ? 'conic-gradient(#ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #ef4444)' : undefined };
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <Camera className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Profile Frame</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">800×800px LinkedIn Export</p>
                        </div>
                    </div>

                    {/* Upload */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                            <Upload className="w-3 h-3" /> Profile Photo
                        </p>
                        <label className="flex items-center justify-center w-full h-24 rounded-2xl cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/20 transition-all">
                            <input type="file" accept="image/*" onChange={loadImage} className="hidden" />
                            {profileImage ? (
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Photo loaded — click to swap</span>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="w-6 h-6 text-slate-300 mx-auto mb-1" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Click to upload</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Frame presets */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                            <Layers className="w-3 h-3" /> Frame Style
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {FRAMES.map(f => (
                                <button key={f.id} onClick={() => { setSelectedFrame(f); if (f.defaultColor) setFrameColor(f.defaultColor); }}
                                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${selectedFrame.id === f.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
                                    {f.id === 'rainbow' ? (
                                        <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: 'conic-gradient(#ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #ef4444)' }} />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full mx-auto mb-1 border-4" style={{ borderColor: f.defaultColor, boxShadow: f.id === 'glow' ? `0 0 10px ${f.defaultColor}60` : undefined }} />
                                    )}
                                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{f.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color + Width */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                            <Palette className="w-3 h-3" /> Frame Color
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {COLOR_SWATCHES.map(c => (
                                <button key={c} onClick={() => setFrameColor(c)}
                                    className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${frameColor === c ? 'border-blue-500 scale-110' : 'border-white dark:border-slate-700'}`}
                                    style={{ background: c }} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <p className="text-[9px] text-slate-400 mb-1 font-bold uppercase tracking-widest">Custom</p>
                                <input type="color" value={frameColor} onChange={e => setFrameColor(e.target.value)}
                                    className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 cursor-pointer" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[9px] text-slate-400 mb-1 font-bold uppercase tracking-widest">Width: {frameWidth}px</p>
                                <input type="range" min={4} max={24} value={frameWidth} onChange={e => setFrameWidth(+e.target.value)}
                                    className="w-full mt-2 accent-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Badge text */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                            <Type className="w-3 h-3" /> Badge Label
                        </p>
                        <input type="text" value={frameText} onChange={e => setFrameText(e.target.value)}
                            placeholder="e.g. #OPEN TO WORK"
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30" />
                        <div className="flex flex-wrap gap-1.5">
                            {BADGE_PRESETS.map(b => (
                                <button key={b} onClick={() => setFrameText(b)}
                                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[9px] font-bold hover:bg-blue-100 hover:text-blue-600 transition-all text-slate-500">
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Download */}
                    <div className="px-4 py-4">
                        <button onClick={download} disabled={!profileImage}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Export 800×800 PNG
                        </button>
                    </div>
                </div>

                {/* Tip */}
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium leading-relaxed">#OpenToWork green ring increases profile views by up to 40% according to LinkedIn data.</p>
                </div>
            </div>

            {/* ═══ RIGHT: PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Preview</p>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
                            {selectedFrame.name}
                        </span>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Glow */}
                            {profileImage && selectedFrame.id !== 'rainbow' && (
                                <div className="absolute inset-0 rounded-full blur-2xl opacity-30" style={{ background: frameColor }} />
                            )}

                            {/* Render target */}
                            <div ref={canvasRef} className="relative rounded-full" style={{ width: 280, height: 280 }}>
                                {/* Base image */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                            <User className="w-16 h-16 text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Rainbow ring */}
                                {selectedFrame.id === 'rainbow' && (
                                    <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #ef4444)', padding: frameWidth }}>
                                        <div className="w-full h-full rounded-full overflow-hidden">
                                            {profileImage && <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />}
                                        </div>
                                    </div>
                                )}

                                {/* Standard ring */}
                                {selectedFrame.id !== 'rainbow' && (
                                    <div className={`absolute inset-0 rounded-full`} style={{
                                        border: `${frameWidth}px solid ${frameColor}`,
                                        boxShadow: selectedFrame.id === 'glow' ? `0 0 30px ${frameColor}80, inset 0 0 10px ${frameColor}20` : undefined,
                                    }} />
                                )}

                                {/* Double ring */}
                                {selectedFrame.id === 'double' && (
                                    <div className="absolute rounded-full" style={{
                                        inset: frameWidth + 6,
                                        border: `3px solid ${frameColor}60`
                                    }} />
                                )}

                                {/* Badge */}
                                {frameText && (
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white text-xs font-black shadow-xl whitespace-nowrap border-2 border-white"
                                        style={{ background: frameColor }}>
                                        {frameText}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* LinkedIn post mock */}
                    <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: selectedFrame.id === 'rainbow' ? '#3b82f6' : frameColor }}>
                                    {profileImage
                                        ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        : <img src={FOUNDER.avatar} alt={FOUNDER.name} className="w-full h-full object-cover" />
                                    }
                                </div>
                                {frameText && (
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-white text-[6px] font-black whitespace-nowrap"
                                        style={{ background: frameColor, fontSize: '6px' }}>
                                        {frameText.substring(0, 15)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-white">{FOUNDER.name}</p>
                                <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-1">{FOUNDER.headline}</p>
                                <p className="text-[9px] text-slate-400 mt-0.5">{FOUNDER.connections} connections</p>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">↑ Preview of how your avatar looks in the LinkedIn feed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
