'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
    Upload, Zap, Download, Eye, Settings,
    Palette, Type, Sun, Layers, RefreshCw,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { FOUNDER } from '@/lib/founder-profile';

const SCENES = [
    { id: 'city',    name: 'Times Square',  bg: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',  perspective: 'rotateY(-12deg) rotateX(3deg) scale(0.88)', pos: 'top-[14%] left-[20%] w-[56%]', frame: 'border-[10px] border-zinc-900', overlay: 'bg-blue-900/10 mix-blend-overlay' },
    { id: 'subway',  name: 'Metro Station', bg: 'https://images.unsplash.com/photo-1518606326460-64ecfcd81033?auto=format&fit=crop&w=1200&q=80',  perspective: 'rotateY(20deg) rotateX(2deg) scale(0.88)', pos: 'top-[20%] left-[10%] w-[48%]', frame: 'border-0 bg-white shadow-xl', overlay: 'bg-black/30 mix-blend-multiply' },
    { id: 'gallery', name: 'Art Gallery',   bg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',  perspective: 'scale(0.82)',                               pos: 'top-[14%] left-[20%] w-[60%]', frame: 'border-[14px] border-white shadow-2xl', overlay: 'bg-white/5' },
    { id: 'tokyo',   name: 'Cyber Tokyo',   bg: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80',    perspective: 'rotateX(8deg) scale(0.88)',                  pos: 'top-[18%] left-[18%] w-[64%]', frame: 'border-4 border-blue-500/60', overlay: 'bg-purple-900/20 mix-blend-color-dodge' },
    { id: 'office',  name: 'Office Lobby',  bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',  perspective: 'scale(0.9) rotateY(5deg)',                   pos: 'top-[10%] left-[30%] w-[40%]', frame: 'border-[8px] border-slate-100 shadow-2xl', overlay: '' },
    { id: 'street',  name: 'Street Corner', bg: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',  perspective: 'rotateY(-5deg) scale(0.85)',                 pos: 'top-[22%] left-[24%] w-[52%]', frame: 'border-[6px] border-zinc-800 rounded-sm', overlay: 'bg-amber-900/10 mix-blend-multiply' },
];

const GRADIENTS = [
    { id: 'blue',    g: 'linear-gradient(135deg,#1d4ed8,#0077b5)', label: 'LinkedIn Blue' },
    { id: 'dark',    g: 'linear-gradient(135deg,#0f172a,#1e293b)', label: 'Midnight' },
    { id: 'sunset',  g: 'linear-gradient(135deg,#f97316,#ec4899)',  label: 'Sunset' },
    { id: 'emerald', g: 'linear-gradient(135deg,#059669,#0d9488)', label: 'Emerald' },
    { id: 'royal',   g: 'linear-gradient(135deg,#7c3aed,#be185d)', label: 'Royal' },
    { id: 'white',   g: '#ffffff',                                  label: 'White' },
];

export const BillboardMockupGenerator = () => {
    const [scene, setScene]         = useState(SCENES[0]);
    const [mode, setMode]           = useState<'image' | 'text'>('text');
    const [uploadedImg, setUploaded] = useState('');
    const [headline, setHeadline]   = useState('LEGENDARY LINKEDIN CONTENT');
    const [subline, setSubline]     = useState('carouselgem.com');
    const [textColor, setTextColor] = useState('#ffffff');
    const [selectedGrad, setGrad]   = useState(GRADIENTS[0]);
    const [customBg, setCustomBg]   = useState('');
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast]   = useState(100);
    const [scanlines, setScanlines] = useState(true);
    const [showBrand, setShowBrand] = useState(true);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => { setUploaded(ev.target?.result as string); setMode('image'); };
        reader.readAsDataURL(file);
    };

    const download = async () => {
        if (!previewRef.current) return;
        try {
            const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: null, useCORS: true, allowTaint: true });
            const a = document.createElement('a');
            a.download = `billboard-${scene.id}-${Date.now()}.png`;
            a.href = canvas.toDataURL('image/png');
            a.click();
        } catch (err) { console.error(err); }
    };

    const billboardBg = mode === 'image' && uploadedImg ? 'none' : (customBg || selectedGrad.g);

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* LEFT */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <Layers className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Billboard Mockup</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">6 Scenes • LinkedIn Visual</p>
                        </div>
                    </div>

                    {/* Scenes */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> Scene</p>
                        <div className="grid grid-cols-3 gap-2">
                            {SCENES.map(s => (
                                <button key={s.id} onClick={() => setScene(s)}
                                    className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all group ${scene.id === s.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-blue-300'}`}>
                                    <img src={s.bg} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-1.5">
                                        <span className="text-white font-black text-[7px] uppercase tracking-widest drop-shadow">{s.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content mode */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <div className="flex gap-2">
                            <button onClick={() => setMode('text')} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${mode === 'text' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <Type className="w-3.5 h-3.5 inline mr-1" /> Text
                            </button>
                            <label className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer text-center ${mode === 'image' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <Upload className="w-3.5 h-3.5 inline mr-1" />{uploadedImg ? '✓ Image' : 'Upload'}
                            </label>
                        </div>

                        {mode === 'text' && (
                            <div className="space-y-2">
                                <textarea rows={2} value={headline} onChange={e => setHeadline(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black outline-none focus:ring-2 focus:ring-blue-500/30 resize-none uppercase tracking-wide" />
                                <input type="text" value={subline} onChange={e => setSubline(e.target.value)}
                                    placeholder="Sub-line or URL"
                                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30" />
                            </div>
                        )}
                    </div>

                    {/* Design */}
                    {mode === 'text' && (
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Palette className="w-3 h-3" /> Background</p>
                            <div className="grid grid-cols-3 gap-1.5">
                                {GRADIENTS.map(g => (
                                    <button key={g.id} onClick={() => { setGrad(g); setCustomBg(''); }}
                                        className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${selectedGrad.id === g.id && !customBg ? 'border-blue-500 scale-105' : 'border-transparent'}`}>
                                        <div className="h-8" style={{ background: g.g }} />
                                        <p className="text-[7px] font-black uppercase tracking-widest text-slate-500 text-center py-0.5">{g.label}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Text</p>
                                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                            </div>
                        </div>
                    )}

                    {/* Adjustments */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1"><Settings className="w-3 h-3" /> Adjustments</p>
                        {[{ label: 'Brightness', val: brightness, set: setBrightness }, { label: 'Contrast', val: contrast, set: setContrast }].map(({ label, val, set }) => (
                            <div key={label} className="space-y-1">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                    <span>{label}</span><span>{val}%</span>
                                </div>
                                <input type="range" min={50} max={150} value={val} onChange={e => set(+e.target.value)} className="w-full accent-blue-600" />
                            </div>
                        ))}
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-500">LED Scanlines</p>
                            <button onClick={() => setScanlines(v => !v)} className={`w-8 h-4 rounded-full relative transition-colors ${scanlines ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${scanlines ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-500">Founder Branding</p>
                            <button onClick={() => setShowBrand(v => !v)} className={`w-8 h-4 rounded-full relative transition-colors ${showBrand ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showBrand ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="px-4 py-4">
                        <button onClick={download}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Export Mockup PNG
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Render */}
            <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#0c0e10] border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Studio Viewport</p>
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                            <Zap className="w-3 h-3 fill-blue-500" /> Live Render
                        </div>
                    </div>
                    <div className="p-4">
                        <div ref={previewRef}
                            className="w-full aspect-[16/10] relative overflow-hidden rounded-xl bg-black ring-1 ring-white/5 group">
                            {/* Scene background */}
                            <img src={scene.bg} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />

                            {/* Billboard panel in perspective */}
                            <div className="absolute inset-0" style={{ perspective: '2000px' }}>
                                <div className={`absolute flex items-center justify-center ${scene.pos} ${scene.frame}`}
                                    style={{ transform: scene.perspective, transformOrigin: 'center center' }}>
                                    <div className="w-full h-full relative overflow-hidden flex items-center justify-center"
                                        style={mode === 'image' && uploadedImg ? {} : { background: billboardBg }}>
                                        <div className="w-full h-full flex items-center justify-center">
                                            {mode === 'image' && uploadedImg
                                                ? <img src={uploadedImg} alt="Ad" className="w-full h-full object-cover" />
                                                : (
                                                    <div className="p-6 text-center w-full">
                                                        <p className="font-black leading-tight tracking-tighter uppercase break-words"
                                                            style={{ color: textColor, fontSize: 'clamp(10px, 3.5vw, 32px)' }}>
                                                            {headline}
                                                        </p>
                                                        {subline && (
                                                            <p className="mt-2 opacity-70 font-semibold"
                                                                style={{ color: textColor, fontSize: 'clamp(7px, 1.4vw, 14px)' }}>
                                                                {subline}
                                                            </p>
                                                        )}
                                                        {showBrand && (
                                                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                                                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                                                                    <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                                                </div>
                                                                <span className="font-black opacity-60" style={{ color: textColor, fontSize: 'clamp(6px, 1vw, 10px)' }}>{FOUNDER.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {/* scanlines */}
                                        {scanlines && (
                                            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay z-10"
                                                style={{ backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))', backgroundSize: '100% 2px,3px 100%' }} />
                                        )}
                                        {/* glare */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none z-20 group-hover:translate-x-full transition-transform duration-[3s]" />
                                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none z-30" />
                                    </div>
                                </div>
                            </div>

                            {/* scene overlay */}
                            {scene.overlay && <div className={`absolute inset-0 pointer-events-none ${scene.overlay}`} />}

                            {/* watermark */}
                            <div className="absolute bottom-3 right-4 text-white/30 font-black text-[7px] uppercase tracking-[0.3em]">CarouselGem Studio</div>
                        </div>
                        <p className="text-[9px] text-slate-500 mt-2 text-center">↑ Hover to see ambient effects • Export captures exactly what you see</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
