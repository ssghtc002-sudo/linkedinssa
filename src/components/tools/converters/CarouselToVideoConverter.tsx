'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Upload, Play, Pause, Zap, Clock,
    RefreshCw, Eye, ChevronLeft, ChevronRight, Film,
} from 'lucide-react';

const ASPECT_RATIOS = [
    { id: '1:1',  label: '1:1 Square', w: 1080, h: 1080, cls: 'aspect-square' },
    { id: '9:16', label: '9:16 Reel',  w: 1080, h: 1920, cls: 'aspect-[9/16]' },
    { id: '16:9', label: '16:9 Wide',  w: 1920, h: 1080, cls: 'aspect-video' },
];

const TRANSITIONS = [
    { id: 'cut',  label: 'Cut',  desc: 'Instant switch' },
    { id: 'fade', label: 'Fade', desc: 'Smooth fade' },
];

export const CarouselToVideoConverter = () => {
    const [slides, setSlides]         = useState<string[]>([]);
    const [duration, setDuration]     = useState(2);
    const [isPlaying, setIsPlaying]   = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [ratio, setRatio]           = useState(ASPECT_RATIOS[0]);
    const [transition, setTransition] = useState(TRANSITIONS[0]);
    const [fading, setFading]         = useState(false);

    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const mediaRecRef = useRef<MediaRecorder | null>(null);
    const chunksRef   = useRef<Blob[]>([]);

    useEffect(() => {
        if (!isPlaying || slides.length === 0) return;
        const next = () => {
            if (transition.id === 'fade') { setFading(true); setTimeout(() => { setCurrentIdx(p => (p + 1) % slides.length); setFading(false); }, 400); }
            else setCurrentIdx(p => (p + 1) % slides.length);
        };
        const id = setInterval(next, duration * 1000);
        return () => clearInterval(id);
    }, [isPlaying, duration, slides.length, transition]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSlides(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        setSlides(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };

    const removeSlide = (i: number) => {
        setSlides(prev => prev.filter((_, idx) => idx !== i));
        if (currentIdx >= i && currentIdx > 0) setCurrentIdx(c => c - 1);
    };

    const startRecording = async () => {
        if (slides.length === 0 || !canvasRef.current) return;
        setIsRecording(true); setIsPlaying(true); setCurrentIdx(0);
        chunksRef.current = [];
        const stream = canvasRef.current.captureStream(30);
        const mr = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
        mr.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `carousel-video-${Date.now()}.webm`;
            a.click();
            setIsRecording(false); setIsPlaying(false);
        };
        mediaRecRef.current = mr; mr.start();
        const ctx = canvasRef.current.getContext('2d')!;
        let frame = 0;
        const total = slides.length * duration * 30;
        const loop = async () => {
            if (frame >= total) { mr.stop(); return; }
            const idx = Math.floor(frame / (duration * 30));
            const img = new Image(); img.src = slides[Math.min(idx, slides.length - 1)];
            await new Promise(r => { if (img.complete) r(null); else img.onload = () => r(null); });
            ctx.clearRect(0, 0, ratio.w, ratio.h);
            const s = Math.min(ratio.w / img.width, ratio.h / img.height);
            ctx.drawImage(img, (ratio.w - img.width * s) / 2, (ratio.h - img.height * s) / 2, img.width * s, img.height * s);
            frame++;
            if (mr.state === 'recording') requestAnimationFrame(loop);
        };
        loop();
    };

    const totalDur = (slides.length * duration).toFixed(1);

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* LEFT */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                            <Film className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Carousel → Video</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">WebM Export • TikTok / Reels</p>
                        </div>
                    </div>

                    {/* Upload */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Slides</p>
                        <label onDrop={handleDrop} onDragOver={e => e.preventDefault()}
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
                            {slides.length > 0 ? (
                                <div className="text-center">
                                    <p className="text-sm font-black text-indigo-600">{slides.length} slides loaded</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">Drop more to add</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="w-7 h-7 mx-auto mb-1.5 text-indigo-300 group-hover:text-indigo-500 transition-colors" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Drop images or click</p>
                                </div>
                            )}
                        </label>
                        {slides.length > 0 && (
                            <div className="flex gap-1.5 overflow-x-auto pb-1">
                                {slides.map((s, i) => (
                                    <div key={i} className={`relative shrink-0 w-11 h-11 rounded-xl overflow-hidden border-2 ${i === currentIdx ? 'border-indigo-500' : 'border-transparent'}`}>
                                        <img src={s} alt="" className="w-full h-full object-cover" />
                                        <button onClick={() => removeSlide(i)} className="absolute inset-0 bg-red-500/70 opacity-0 hover:opacity-100 transition-opacity text-white text-xs flex items-center justify-center font-black">×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Settings</p>
                        <div className="flex gap-1.5">
                            {ASPECT_RATIOS.map(r => (
                                <button key={r.id} onClick={() => setRatio(r)}
                                    className={`flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all border ${ratio.id === r.id ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                                    {r.id}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>Duration/Slide</span><span className="text-indigo-600">{duration}s</span>
                            </div>
                            <input type="range" min={1} max={10} step={0.5} value={duration} onChange={e => setDuration(+e.target.value)} className="w-full accent-indigo-600" />
                        </div>
                        <div className="flex gap-2">
                            {TRANSITIONS.map(t => (
                                <button key={t.id} onClick={() => setTransition(t)}
                                    className={`flex-1 p-2 rounded-xl border-2 text-left ${transition.id === t.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                    <p className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-200">{t.label}</p>
                                    <p className="text-[8px] text-slate-400">{t.desc}</p>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30">
                            <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                                {slides.length} slides × {duration}s = <strong>{totalDur}s</strong> video
                            </p>
                        </div>
                    </div>

                    <div className="px-4 py-4 space-y-2">
                        <button onClick={startRecording} disabled={slides.length === 0 || isRecording}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            {isRecording ? <><RefreshCw className="w-4 h-4 animate-spin" /> Recording…</> : <><Zap className="w-4 h-4" /> Render & Download</>}
                        </button>
                        <p className="text-[9px] text-center text-slate-400">Preview first, then render to download</p>
                    </div>
                </div>
            </div>

            {/* RIGHT: Preview */}
            <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#0c0e10] border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Motion Preview</p>
                        <span className="text-[9px] font-black bg-slate-800 text-slate-400 px-2 py-1 rounded-lg">{ratio.label}</span>
                    </div>
                    <div className="p-5 flex flex-col items-center gap-4">
                        <canvas ref={canvasRef} width={ratio.w} height={ratio.h} className="hidden" />
                        <div className={`relative w-full max-w-[280px] bg-zinc-900 rounded-2xl overflow-hidden ring-1 ring-white/10 ${ratio.cls}`}>
                            {slides.length > 0 && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-20">
                                    <div className="h-full bg-indigo-500 transition-all" style={{ width: `${((currentIdx + 1) / slides.length) * 100}%` }} />
                                </div>
                            )}
                            {slides.length > 0 ? (
                                <img src={slides[currentIdx]} alt="" className={`w-full h-full object-contain transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`} />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 gap-3">
                                    <Film className="w-10 h-10 opacity-30" />
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Upload slides</span>
                                </div>
                            )}
                            {slides.length > 0 && (
                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded-lg text-[9px] font-black text-white">{currentIdx + 1}/{slides.length}</div>
                            )}
                            {isRecording && <div className="absolute inset-0 border-4 border-red-500/60 animate-pulse pointer-events-none rounded-2xl" />}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setCurrentIdx(p => Math.max(0, p - 1))} disabled={slides.length === 0}
                                className="p-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
                            <button onClick={() => setIsPlaying(v => !v)} disabled={slides.length === 0}
                                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest disabled:opacity-30 flex items-center gap-2 transition-all">
                                {isPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Play</>}
                            </button>
                            <button onClick={() => setCurrentIdx(p => Math.min(slides.length - 1, p + 1))} disabled={slides.length === 0}
                                className="p-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
