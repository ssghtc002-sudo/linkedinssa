'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FOUNDER } from '@/lib/founder-profile';
import { Sparkles, RefreshCw, Copy, Check, ChevronDown, Zap, Target, Award, TrendingUp, User, Briefcase } from 'lucide-react';
import { CopyButton } from '../shared/CopyButton';

// ─── Presets ──────────────────────────────────────────────────────────────────
const TONES = [
    { id: 'professional', label: 'Professional', emoji: '💼' },
    { id: 'bold',         label: 'Bold & Direct', emoji: '⚡' },
    { id: 'creative',     label: 'Creative',      emoji: '🎨' },
    { id: 'storytelling', label: 'Storytelling',  emoji: '📖' },
    { id: 'results',      label: 'Results-First', emoji: '📈' },
];

const INDUSTRIES = [
    'Technology / SaaS', 'Marketing & Growth', 'Leadership & Management',
    'Finance & Consulting', 'Design & Creative', 'Sales & BD', 'HR & People Ops',
    'Entrepreneurship', 'Healthcare', 'Education', 'Real Estate', 'Legal',
];

const EXAMPLES = [
    'Founder @CarouselGem | Building AI tools for LinkedIn creators | 50K+ professionals helped',
    'B2B SaaS Growth Marketer | Scaling startups from $0 → $10M ARR | ex-HubSpot',
    'LinkedIn Top Voice 🏆 | Helping leaders grow to 100K+ followers without paid ads',
    'CEO @ [Company] | Angel Investor | I write about the future of AI every Tuesday',
];

const CHAR_LIMIT = 220;

// ─── Component ────────────────────────────────────────────────────────────────
export const LinkedInHeadlineGenerator = () => {
    const [role, setRole]             = useState('');
    const [industry, setIndustry]     = useState('');
    const [achievement, setAchievement] = useState('');
    const [tone, setTone]             = useState('professional');
    const [result, setResult]         = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError]           = useState('');
    const [showDrop, setShowDrop]     = useState(false);

    const charCount = result.length;

    const generate = async () => {
        if (!role.trim()) return;
        setIsGenerating(true);
        setError('');
        const topic = `Role: ${role}${industry ? ` | Industry: ${industry}` : ''}${achievement ? ` | Achievement/USP: ${achievement}` : ''}`;
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'headline', topic, tone }),
            });
            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            setResult(data.result?.trim() || '');
        } catch {
            setError('Generation failed. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: INPUTS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                            <Award className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Headline Generator</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI-Powered • {CHAR_LIMIT} char limit</p>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="px-4 py-3 space-y-3 border-b border-slate-100 dark:border-white/5">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <User className="w-3 h-3" /> Your Role / Title *
                            </p>
                            <input
                                type="text"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                placeholder="e.g. SaaS Founder, Growth Marketer, AI Consultant"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/30"
                            />
                        </div>

                        {/* Industry dropdown */}
                        <div className="relative">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> Industry
                            </p>
                            <button onClick={() => setShowDrop(v => !v)}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-left">
                                <span className={industry ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}>{industry || 'Select your industry…'}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showDrop ? 'rotate-180' : ''}`} />
                            </button>
                            {showDrop && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto">
                                    {INDUSTRIES.map(ind => (
                                        <button key={ind} onClick={() => { setIndustry(ind); setShowDrop(false); }}
                                            className="w-full px-4 py-2.5 text-left text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-white/5 last:border-0 transition-all">
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Key Achievement / USP
                            </p>
                            <input
                                type="text"
                                value={achievement}
                                onChange={e => setAchievement(e.target.value)}
                                placeholder="e.g. Helped 10K+ companies, $50M revenue generated"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500/30"
                            />
                        </div>
                    </div>

                    {/* Tone picker */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                            <Target className="w-3 h-3" /> Tone
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {TONES.map(t => (
                                <button key={t.id} onClick={() => setTone(t.id)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        tone === t.id
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-400'
                                    }`}>
                                    <span>{t.emoji}</span> {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate */}
                    <div className="px-4 py-4">
                        <button onClick={generate} disabled={!role.trim() || isGenerating}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            {isGenerating
                                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
                                : <><Sparkles className="w-4 h-4" /> Generate Headline</>
                            }
                        </button>
                        {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
                    </div>
                </div>

                {/* Tips */}
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">What Makes a Great Headline</p>
                    {[
                        '220 chars max — every character counts',
                        'Lead with your value, not just your title',
                        'Include a number or proof point if you have one',
                        'Add 1 emoji to increase click-through by 25%',
                    ].map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                            <Zap className="w-3 h-3 text-indigo-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: OUTPUT ═══ */}
            <div className="lg:col-span-7 space-y-4">

                {/* Result card */}
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest">Generated Headline</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {result && (
                                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${charCount > CHAR_LIMIT ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {charCount}/{CHAR_LIMIT}
                                </span>
                            )}
                            {result && <CopyButton text={result} disabled={false} />}
                        </div>
                    </div>

                    <div className="p-6 min-h-[180px] flex items-center">
                        {result ? (
                            <div className="space-y-4 w-full">
                                {/* LinkedIn profile preview */}
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-start gap-3">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-indigo-200">
                                            <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{FOUNDER.name}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5 max-w-sm">{result}</p>
                                            <p className="text-[9px] text-slate-400 mt-1">{FOUNDER.location} · {FOUNDER.connections} connections</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Raw editable text */}
                                <textarea
                                    value={result}
                                    onChange={e => setResult(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm font-medium leading-relaxed resize-none outline-none focus:ring-2 focus:ring-indigo-500/30"
                                />
                                <button onClick={generate} disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">
                                    <RefreshCw className="w-3 h-3" /> Regenerate
                                </button>
                            </div>
                        ) : (
                            <div className="text-center w-full py-8">
                                <Award className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                                <p className="font-bold text-slate-400 mb-1">Your headline will appear here</p>
                                <p className="text-xs text-slate-400/70">Fill in your role and click Generate.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Example headlines */}
                <div className="rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">High-Converting Examples</p>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                        {EXAMPLES.map((ex, i) => (
                            <div key={i} className="px-6 py-3 flex items-center justify-between gap-3 group hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
                                onClick={() => setResult(ex)}>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed flex-1">{ex}</p>
                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Use this</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
