'use client';

import React, { useState, useMemo } from 'react';
import { CopyButton } from '../shared/CopyButton';
import {
    Stethoscope,
    Zap, Info, ChevronDown, ChevronUp,
    Monitor, Smartphone, MoreHorizontal,
    ThumbsUp, MessageSquare, Repeat, Send, Heart,
    AlignLeft, AlignRight, AlignCenter,
    ArrowDown, ArrowUp, Layers, RefreshCw,
} from 'lucide-react';
import Image from 'next/image';

// ─── Staircase Engine ─────────────────────────────────────────────────────────

type Direction = 'left' | 'right' | 'center';
type StepUnit = 'spaces' | 'embraille' | 'nbsp';

interface StaircaseOptions {
    direction: Direction;
    stepSize: number;
    stepUnit: StepUnit;
    reverse: boolean;
    addBullet: boolean;
    bulletChar: string;
    prefix: string;
    suffix: string;
    emptyLinesBetween: boolean;
    skipBlanks: boolean;
}

function buildIndent(count: number, unit: StepUnit): string {
    const char = unit === 'embraille' ? '\u2800' : unit === 'nbsp' ? '\u00a0' : ' ';
    return char.repeat(count);
}

function generateStaircase(text: string, opts: StaircaseOptions): string {
    const rawLines = text.split('\n');
    const lines = opts.skipBlanks ? rawLines.filter(l => l.trim().length > 0) : rawLines;
    if (lines.length === 0) return '';

    const total = lines.length;

    const result: string[] = [];
    lines.forEach((line, i) => {
        const idx = opts.reverse ? (total - 1 - i) : i;
        const indentCount = idx * opts.stepSize;

        let newLine: string;
        if (opts.direction === 'left') {
            const indent = buildIndent(indentCount, opts.stepUnit);
            const bullet = opts.addBullet ? opts.bulletChar + ' ' : '';
            newLine = `${opts.prefix}${indent}${bullet}${line.trim()}${opts.suffix}`;
        } else if (opts.direction === 'right') {
            // Right staircase: indent increases from bottom
            const rightIdx = total - 1 - idx;
            const indent = buildIndent(rightIdx * opts.stepSize, opts.stepUnit);
            const bullet = opts.addBullet ? opts.bulletChar + ' ' : '';
            newLine = `${opts.prefix}${indent}${bullet}${line.trim()}${opts.suffix}`;
        } else {
            // Center: mirror-indent
            const half = Math.floor(indentCount / 2);
            const indent = buildIndent(half, opts.stepUnit);
            const bullet = opts.addBullet ? opts.bulletChar + ' ' : '';
            newLine = `${opts.prefix}${indent}${bullet}${line.trim()}${opts.suffix}`;
        }

        result.push(newLine);
        if (opts.emptyLinesBetween && i < lines.length - 1) {
            result.push('');
        }
    });

    return result.join('\n');
}

// ─── Templates ────────────────────────────────────────────────────────────────

const TEMPLATES = [
    {
        label: '🚀 Classic Left',
        text: 'First thought\nSecond thought grows\nThird goes deeper here\nFourth is even wider than before',
        opts: { direction: 'left' as Direction, stepSize: 2, reverse: false, addBullet: false },
    },
    {
        label: '↩️ Reverse Right',
        text: 'Start big with impact\nThen get specific\nNarrow it down\nKeep focus',
        opts: { direction: 'left' as Direction, stepSize: 3, reverse: true, addBullet: false },
    },
    {
        label: '🎯 Bullet Steps',
        text: 'Do the research\nBuild your strategy\nExecute with focus\nMeasure and iterate\nScale what works',
        opts: { direction: 'left' as Direction, stepSize: 2, reverse: false, addBullet: true },
    },
    {
        label: '📊 Spaced Out',
        text: 'Hook\nContext\nInsight\nAction',
        opts: { direction: 'left' as Direction, stepSize: 4, reverse: false, addBullet: false },
    },
];

const BULLET_OPTIONS = ['•', '→', '▸', '◆', '✅', '🔥', '⭐', '💡', '🎯', '🚀'];

// ─── Component ────────────────────────────────────────────────────────────────

export const StaircaseGenerator = () => {
    const [text, setText] = useState('First line of your hook\nSecond line builds on it\nThird line adds more context\nFourth line drives the point home\nFifth line delivers the CTA');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [isExpanded, setIsExpanded] = useState(false);

    const [opts, setOpts] = useState<StaircaseOptions>({
        direction: 'left',
        stepSize: 3,
        stepUnit: 'embraille',
        reverse: false,
        addBullet: false,
        bulletChar: '•',
        prefix: '',
        suffix: '',
        emptyLinesBetween: false,
        skipBlanks: true,
    });

    const setOpt = <K extends keyof StaircaseOptions>(key: K, val: StaircaseOptions[K]) =>
        setOpts(prev => ({ ...prev, [key]: val }));

    const output = useMemo(() => generateStaircase(text, opts), [text, opts]);

    const lineCount = text.split('\n').filter(l => l.trim()).length;

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
                                <Layers className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Staircase Builder</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{lineCount} lines</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full">
                            {output.length} chars
                        </span>
                    </div>

                    {/* Templates */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-900/30">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Quick Templates</p>
                        <div className="flex flex-wrap gap-1.5">
                            {TEMPLATES.map(t => (
                                <button key={t.label}
                                    onClick={() => { setText(t.text); setOpts(prev => ({ ...prev, ...t.opts })); }}
                                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 transition-all">
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-4">

                        {/* Direction */}
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Direction</label>
                            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                {([
                                    { val: 'left', icon: AlignLeft, label: 'Left ↘' },
                                    { val: 'right', icon: AlignRight, label: 'Right ↙' },
                                    { val: 'center', icon: AlignCenter, label: 'Center' },
                                ] as const).map(({ val, icon: Icon, label }) => (
                                    <button key={val}
                                        onClick={() => setOpt('direction', val)}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${opts.direction === val ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                                        <Icon className="w-3 h-3" /> {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step Size & Unit */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                                    Step Size: <span className="text-amber-500">{opts.stepSize}</span>
                                </label>
                                <input type="range" min={1} max={10} value={opts.stepSize}
                                    onChange={e => setOpt('stepSize', Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-amber-500" />
                                <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-bold">
                                    <span>Fine</span><span>Bold</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Space Type</label>
                                <select value={opts.stepUnit} onChange={e => setOpt('stepUnit', e.target.value as StepUnit)}
                                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-amber-500/30 outline-none">
                                    <option value="embraille">Braille Blank (LinkedIn safe)</option>
                                    <option value="nbsp">Non-breaking Space</option>
                                    <option value="spaces">Regular Spaces</option>
                                </select>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-2">
                            {([
                                { key: 'reverse', icon: RefreshCw, label: 'Reverse Order' },
                                { key: 'emptyLinesBetween', icon: ArrowDown, label: 'Empty Line Gap' },
                                { key: 'skipBlanks', icon: ArrowUp, label: 'Skip Blank Lines' },
                                { key: 'addBullet', icon: AlignLeft, label: 'Add Bullet' },
                            ] as const).map(({ key, icon: Icon, label }) => (
                                <button key={key}
                                    onClick={() => setOpt(key, !opts[key])}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${opts[key as keyof StaircaseOptions] ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-amber-300'}`}>
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Bullet picker (only when addBullet is ON) */}
                        {opts.addBullet && (
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Bullet Style</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {BULLET_OPTIONS.map(b => (
                                        <button key={b}
                                            onClick={() => setOpt('bulletChar', b)}
                                            className={`w-9 h-9 rounded-lg text-base transition-all border ${opts.bulletChar === b ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-400 text-amber-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-300'}`}>
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Prefix / Suffix */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Line Prefix</label>
                                <input type="text" value={opts.prefix} maxLength={5}
                                    onChange={e => setOpt('prefix', e.target.value)}
                                    placeholder="e.g. → or 🔥"
                                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/30" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Line Suffix</label>
                                <input type="text" value={opts.suffix} maxLength={5}
                                    onChange={e => setOpt('suffix', e.target.value)}
                                    placeholder="e.g. ✅"
                                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/30" />
                            </div>
                        </div>
                    </div>

                    {/* Input Text */}
                    <div>
                        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Lines (one per line)</p>
                        </div>
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            rows={8}
                            placeholder="Type each line of your post here...&#10;Each line becomes a step in the staircase."
                            className="w-full px-5 py-4 text-sm font-medium bg-transparent border-0 outline-none resize-none leading-relaxed text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
                    <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold leading-relaxed">
                        <span className="font-black">LinkedIn tip:</span> Use <strong>Braille Blank</strong> spaces — they survive LinkedIn's formatting strip and create a real visual staircase in the feed.
                    </p>
                </div>
            </div>

            {/* ═══ RIGHT: PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">

                {/* Output card */}
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest">Live Preview</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CopyButton
                                text={output}
                                disabled={!output}
                                className="h-8 rounded-xl px-4 text-xs font-black bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg shadow-amber-500/20" />
                            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                {(['desktop', 'mobile'] as const).map(mode => (
                                    <button key={mode} onClick={() => setViewMode(mode)}
                                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                        {mode === 'desktop' ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6">

                        {/* LinkedIn Post Simulator */}
                        <div className={`bg-white dark:bg-[#1b1f23] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-[390px]' : 'w-full'}`}>

                            {/* Post Header */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
                                        <Image src="/images/about/shyami-goyal.png" alt="Shyam Sunder Goyal" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Shyam Sunder Goyal</span>
                                            <span className="text-[10px] text-slate-400">• 1st</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-tight">Founder &amp; Lead Architect at CarouselGem</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">1h • 🌍</p>
                                    </div>
                                </div>
                                <MoreHorizontal className="w-5 h-5 text-slate-400 shrink-0" />
                            </div>

                            {/* Post Body */}
                            <div className="px-4 pb-3">
                                <div className={`relative ${!isExpanded && output.split('\n').length > 7 ? 'max-h-[200px] overflow-hidden' : ''}`}>
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                                        {output || 'Your staircase will appear here...\n\nType your lines on the left and watch them step into shape! 🪜'}
                                    </pre>
                                    {!isExpanded && output.split('\n').length > 7 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-[#1b1f23] to-transparent flex items-end">
                                            <button onClick={() => setIsExpanded(true)} className="text-sm font-bold text-slate-500 hover:text-amber-500">...see more</button>
                                        </div>
                                    )}
                                </div>
                                {isExpanded && (
                                    <button onClick={() => setIsExpanded(false)} className="text-sm font-bold text-amber-500 mt-2 block">Show less</button>
                                )}
                            </div>

                            {/* Reactions */}
                            <div className="px-4 py-2 border-t border-slate-50 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white dark:border-slate-900"><ThumbsUp className="w-2 h-2 text-white" /></div>
                                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white dark:border-slate-900"><Heart className="w-2 h-2 text-white" /></div>
                                    </div>
                                    <span>1,240 reactions</span>
                                </div>
                                <span>82 comments</span>
                            </div>

                            {/* Action bar */}
                            <div className="px-2 py-1 border-t border-slate-50 dark:border-white/5 grid grid-cols-4">
                                {([
                                    { icon: ThumbsUp, label: 'Like' },
                                    { icon: MessageSquare, label: 'Comment' },
                                    { icon: Repeat, label: 'Repost' },
                                    { icon: Send, label: 'Send' },
                                ] as const).map(({ icon: Icon, label }) => (
                                    <button key={label} className="flex items-center justify-center gap-1.5 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-500 text-xs font-bold transition-all">
                                        <Icon className="w-4 h-4" /> {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Raw output box */}
                    <div className="mx-6 mb-6">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Raw Output — Copy &amp; Paste to LinkedIn</p>
                            <CopyButton text={output} disabled={!output} className="h-6 text-[9px] rounded-lg px-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" />
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 max-h-[200px] overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-600 dark:text-slate-400 leading-relaxed break-all">
                                {output || 'Your staircase output appears here...'}
                            </pre>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <Zap className="w-3 h-3 text-amber-500" /> CarouselGem Studio
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Staircase v1.0
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/30 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-3">How Staircase Posts Work</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {[
                            { step: '1', title: 'Write Lines', desc: 'Enter each idea on its own line — each becomes a step.' },
                            { step: '2', title: 'Adjust Style', desc: 'Pick direction, step size, and add bullets or emojis.' },
                            { step: '3', title: 'Copy & Paste', desc: 'Copy the output and paste directly into LinkedIn.' },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{step}</div>
                                <div>
                                    <p className="text-xs font-black text-amber-900 dark:text-amber-200">{title}</p>
                                    <p className="text-[11px] text-amber-700/70 dark:text-amber-300/70 mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
