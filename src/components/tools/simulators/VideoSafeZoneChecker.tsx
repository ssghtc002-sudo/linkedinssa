'use client';

import { useState, useCallback, useRef } from 'react';
import {
    Upload, Smartphone, Monitor, Info, Zap, ShieldCheck,
    Eye, Layout, Tablet, CheckCircle2, AlertTriangle, X,
} from 'lucide-react';

// ─── Guide definitions ────────────────────────────────────────────────────────
const GUIDES = [
    {
        id: 'mobile',
        name: 'Mobile (9:16)',
        aspect: 9 / 16,
        cssAspect: 'aspect-[9/16]',
        icon: Smartphone,
        safe: { top: '10%', right: '8%', bottom: '22%', left: '8%' },
        unsafeZones: [
            { label: 'Profile + Name', pos: 'bottom-[18%] left-0 right-[20%] h-[10%]' },
            { label: 'Action buttons', pos: 'bottom-[15%] right-0 w-[18%] h-[30%]' },
            { label: 'Progress bar',  pos: 'bottom-0 left-0 right-0 h-[5%]' },
        ],
        desc: 'LinkedIn native mobile video feed. Most viewed format — most UI chrome.',
    },
    {
        id: 'square',
        name: 'Square (1:1)',
        aspect: 1,
        cssAspect: 'aspect-square',
        icon: Layout,
        safe: { top: '8%', right: '8%', bottom: '12%', left: '8%' },
        unsafeZones: [
            { label: 'Caption area', pos: 'bottom-0 left-0 right-0 h-[12%]' },
        ],
        desc: 'Great for desktop feed and displays well on mobile without black bars.',
    },
    {
        id: 'landscape',
        name: 'Landscape (16:9)',
        aspect: 16 / 9,
        cssAspect: 'aspect-video',
        icon: Monitor,
        safe: { top: '6%', right: '10%', bottom: '10%', left: '10%' },
        unsafeZones: [
            { label: 'Lower captions', pos: 'bottom-0 left-0 right-0 h-[10%]' },
        ],
        desc: 'Best for articles and company page posts on desktop.',
    },
    {
        id: 'tall',
        name: 'Vertical (4:5)',
        aspect: 4 / 5,
        cssAspect: 'aspect-[4/5]',
        icon: Tablet,
        safe: { top: '8%', right: '8%', bottom: '15%', left: '8%' },
        unsafeZones: [
            { label: 'Caption + CTA', pos: 'bottom-0 left-0 right-0 h-[15%]' },
        ],
        desc: 'Growing format — maximises feed space without full vertical crop.',
    },
] satisfies {
    id: string;
    name: string;
    aspect: number;
    cssAspect: string;
    icon: React.FC<{ className?: string }>;
    safe: { top: string; right: string; bottom: string; left: string };
    unsafeZones: { label: string; pos: string }[];
    desc: string;
}[];

// ─── Component ────────────────────────────────────────────────────────────────
export const VideoSafeZoneChecker = () => {
    const [media, setMedia]             = useState<string>('');
    const [mediaType, setMediaType]     = useState<'image' | 'video'>('image');
    const [guide, setGuide]             = useState(GUIDES[0]);
    const [showOverlay, setShowOverlay] = useState(true);
    const [dragging, setDragging]       = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const loadFile = (file: File) => {
        setMediaType(file.type.startsWith('video') ? 'video' : 'image');
        const reader = new FileReader();
        reader.onload = e => setMedia(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) loadFile(file);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) loadFile(file);
    }, []);

    const safeStyle: React.CSSProperties = {
        top: guide.safe.top,
        right: guide.safe.right,
        bottom: guide.safe.bottom,
        left: guide.safe.left,
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md shadow-rose-500/20">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Safe Zone Checker</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">LinkedIn Video Inspector</p>
                        </div>
                    </div>

                    {/* Upload */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Upload className="w-3 h-3" /> Upload Media
                        </p>
                        <label
                            onDragOver={e => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full h-32 rounded-2xl cursor-pointer border-2 border-dashed transition-all ${
                                dragging
                                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:bg-rose-50/20'
                            }`}>
                            <input ref={inputRef} type="file" accept="image/*,video/*" onChange={handleChange} className="hidden" />
                            {media ? (
                                <div className="text-center">
                                    <CheckCircle2 className="w-8 h-8 text-rose-500 mx-auto mb-1" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Asset Loaded</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">Click to swap</p>
                                </div>
                            ) : (
                                <div className="text-center px-4">
                                    <Upload className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drop MP4 or Image</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">or click to browse</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Format selector */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <Layout className="w-3 h-3" /> Target Format
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {GUIDES.map(g => (
                                <button key={g.id}
                                    onClick={() => setGuide(g)}
                                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                                        guide.id === g.id
                                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 text-slate-500'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <g.icon className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{g.name}</span>
                                    </div>
                                    <p className="text-[9px] leading-relaxed opacity-70">{g.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Overlay toggle */}
                    <div className="px-4 py-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <Eye className="w-3 h-3" /> Overlay
                            </p>
                            <button
                                onClick={() => setShowOverlay(v => !v)}
                                className={`w-10 h-5 rounded-full transition-all relative ${showOverlay ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showOverlay ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Unsafe zone legend */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UI Chrome Zones</p>
                    {guide.unsafeZones.map(z => (
                        <div key={z.label} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-rose-500/40 border border-rose-500/60 shrink-0" />
                            <p className="text-[10px] font-semibold text-slate-400">{z.label}</p>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm border-2 border-emerald-400 shrink-0" />
                        <p className="text-[10px] font-semibold text-emerald-400">Safe content zone</p>
                    </div>
                </div>

                {/* Tips */}
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Best Practices</p>
                    {[
                        'Keep text & logos inside the green safe zone',
                        'Never place CTAs in the bottom 20% on mobile',
                        '9:16 format gets 3× more reach than 16:9 on mobile',
                        'Add captions — 80% watch without sound',
                    ].map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                            <Info className="w-3 h-3 text-rose-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-[#0c0e10] border border-slate-800 shadow-2xl overflow-hidden p-5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-rose-500" /> Live Safe-Zone Preview
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                            {guide.name}
                        </span>
                    </div>

                    {/* Video frame */}
                    <div className="flex justify-center">
                        <div className={`relative w-full max-w-[320px] ${guide.cssAspect} bg-zinc-900 rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]`}>
                            {/* Media */}
                            {media ? (
                                mediaType === 'video'
                                    ? <video src={media} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                                    : <img src={media} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700">
                                    <Upload className="w-8 h-8 opacity-30 mb-2" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">Upload media</span>
                                </div>
                            )}

                            {/* ── Overlay ── */}
                            {showOverlay && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Unsafe zones */}
                                    {guide.unsafeZones.map(z => (
                                        <div key={z.label} className={`absolute ${z.pos} bg-rose-500/20 border border-rose-500/30`}>
                                            <span className="absolute top-0 left-1 text-[7px] text-rose-400 font-bold uppercase tracking-wider leading-tight mt-0.5">{z.label}</span>
                                        </div>
                                    ))}

                                    {/* Safe zone */}
                                    <div className="absolute" style={safeStyle}>
                                        {/* Outer shadow mask */}
                                        <div className="absolute inset-0 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
                                        {/* Green border */}
                                        <div className="absolute inset-0 border-2 border-emerald-400/80">
                                            {/* Label */}
                                            <div className="absolute top-2 left-2 bg-emerald-500 text-black text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest flex items-center gap-1">
                                                <ShieldCheck className="w-2.5 h-2.5" /> Safe Zone
                                            </div>
                                            {/* Corner marks */}
                                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
                                        </div>
                                    </div>

                                    {/* Simulated LinkedIn mobile chrome */}
                                    {guide.id === 'mobile' && (
                                        <>
                                            {/* Right action buttons */}
                                            <div className="absolute bottom-[18%] right-3 flex flex-col gap-4 items-center opacity-80">
                                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
                                                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
                                                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
                                            </div>
                                            {/* Bottom text */}
                                            <div className="absolute bottom-[18%] left-3 right-[20%] space-y-1.5 opacity-70">
                                                <div className="h-3 w-24 bg-white/30 rounded" />
                                                <div className="h-2.5 w-full bg-white/20 rounded" />
                                                <div className="h-2.5 w-4/5 bg-white/20 rounded" />
                                            </div>
                                            {/* Progress bar */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                                                <div className="w-1/3 h-full bg-white/40 rounded" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-white/5 flex items-center gap-2">
                        {media ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Asset validated — overlay active for {guide.name}</p>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-4 h-4 text-slate-500 shrink-0" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload a media file to begin safe-zone validation</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
