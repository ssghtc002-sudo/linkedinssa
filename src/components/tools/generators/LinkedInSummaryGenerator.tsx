'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FOUNDER } from '@/lib/founder-profile';
import {
    Sparkles, RefreshCw, Copy, Check, Zap, Target,
    User, Briefcase, TrendingUp, Heart, ChevronDown,
    FileText, Star, CheckCircle2, Info,
} from 'lucide-react';
import { CopyButton } from '../shared/CopyButton';

// ─── Presets ──────────────────────────────────────────────────────────────────

const TONES = [
    { id: 'professional', label: 'Professional',  emoji: '💼', hint: 'Formal, credibility-focused' },
    { id: 'storytelling', label: 'Storytelling',  emoji: '📖', hint: 'Narrative, journey-driven' },
    { id: 'bold',         label: 'Bold & Direct', emoji: '⚡', hint: 'Punchy, high-contrast' },
    { id: 'warm',         label: 'Warm & Human',  emoji: '🤝', hint: 'Authentic, personable' },
    { id: 'results',      label: 'Results-First', emoji: '📈', hint: 'Numbers, outcomes, proof' },
];

const STYLES = [
    { id: 'standard',    label: 'Standard About',         desc: 'Classic LinkedIn About section structure' },
    { id: 'story',       label: "Hero's Journey",         desc: 'Past pain → transformation → outcome' },
    { id: 'list',        label: 'Bullet + Narrative',     desc: 'Short paragraph + key achievements list' },
    { id: 'recruiter',   label: 'Recruiter-Optimized',    desc: 'Keywords-heavy, ATS-friendly format' },
    { id: 'founder',     label: 'Founder / Builder',      desc: 'Mission-driven, product-led storytelling' },
];

const CHAR_LIMIT = 2600;

const EXAMPLES = [
    {
        label: 'SaaS Founder',
        snippet: `I failed my first startup at 24.

Lost $80K, 2 years, and a lot of sleep.

That failure taught me everything I needed to build CarouselGem — a platform now used by 50,000+ LinkedIn creators to grow their personal brand without spending hours on design.

What I do:
→ Build AI tools for content creators
→ Mentor early-stage SaaS founders
→ Write weekly about growing on LinkedIn

Want to connect? I reply to every DM.`,
    },
    {
        label: 'Marketing Leader',
        snippet: `10 years ago I was writing cold emails that nobody opened.

Today I lead a 40-person growth team at a $200M ARR company.

Here's what I've learned: great marketing isn't about tricks. It's about understanding people deeply and telling the truth in a compelling way.

My expertise:
• B2B demand generation
• Product-led growth
• LinkedIn content strategy

Open to advisory roles and speaking gigs. DM me.`,
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const LinkedInSummaryGenerator = () => {
    const [role, setRole]           = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills]       = useState('');
    const [achievement, setAchievement] = useState('');
    const [goal, setGoal]           = useState('');
    const [cta, setCta]             = useState('');
    const [tone, setTone]           = useState('storytelling');
    const [style, setStyle]         = useState('standard');
    const [result, setResult]       = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError]         = useState('');
    const [showExamples, setShowExamples] = useState(false);
    const [copied, setCopied]       = useState(false);

    const charCount = result.length;
    const charPct   = Math.min(100, (charCount / CHAR_LIMIT) * 100);

    const generate = async () => {
        if (!role.trim() && !experience.trim()) return;
        setIsGenerating(true);
        setError('');

        const topic = [
            role         && `Role/Title: ${role}`,
            experience   && `Experience/Background: ${experience}`,
            skills       && `Key Skills: ${skills}`,
            achievement  && `Top Achievement: ${achievement}`,
            goal         && `Goal/What they're looking for: ${goal}`,
            cta          && `Call to Action: ${cta}`,
            `Style Preset: ${STYLES.find(s => s.id === style)?.label}`,
        ].filter(Boolean).join('\n');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'summary', topic, tone }),
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

    const copyText = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: INPUTS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-500/20">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Summary Generator</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">LinkedIn About Section • 2600 char limit</p>
                        </div>
                    </div>

                    {/* Structured inputs */}
                    <div className="px-4 py-3 space-y-3 border-b border-slate-100 dark:border-white/5">

                        {/* Role */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <User className="w-3 h-3" /> Your Role / Title *
                            </p>
                            <input type="text" value={role} onChange={e => setRole(e.target.value)}
                                placeholder="e.g. SaaS Founder, Growth Marketer, AI Consultant"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 placeholder:text-slate-300" />
                        </div>

                        {/* Experience */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> Background / Experience
                            </p>
                            <textarea rows={2} value={experience} onChange={e => setExperience(e.target.value)}
                                placeholder="e.g. 10 years in B2B SaaS, ex-Google, bootstrapped 2 startups to $1M ARR"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 resize-none placeholder:text-slate-300" />
                        </div>

                        {/* Skills */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <Star className="w-3 h-3" /> Key Skills / Expertise
                            </p>
                            <input type="text" value={skills} onChange={e => setSkills(e.target.value)}
                                placeholder="e.g. Demand generation, product-led growth, LinkedIn strategy"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 placeholder:text-slate-300" />
                        </div>

                        {/* Achievement */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Top Achievement
                            </p>
                            <input type="text" value={achievement} onChange={e => setAchievement(e.target.value)}
                                placeholder="e.g. Grew MRR from $0 to $500K in 18 months"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 placeholder:text-slate-300" />
                        </div>

                        {/* Goal */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <Target className="w-3 h-3" /> Current Goal / Focus
                            </p>
                            <input type="text" value={goal} onChange={e => setGoal(e.target.value)}
                                placeholder="e.g. Hiring senior engineers, finding angel investors"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 placeholder:text-slate-300" />
                        </div>

                        {/* CTA */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                                <Heart className="w-3 h-3" /> Call to Action
                            </p>
                            <input type="text" value={cta} onChange={e => setCta(e.target.value)}
                                placeholder="e.g. DM me to collaborate, I reply to every message"
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-violet-500/30 placeholder:text-slate-300" />
                        </div>
                    </div>

                    {/* Style presets */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Summary Style</p>
                        <div className="space-y-1.5">
                            {STYLES.map(s => (
                                <button key={s.id} onClick={() => setStyle(s.id)}
                                    className={`w-full p-2.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                                        style === s.id
                                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-violet-300'
                                    }`}>
                                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${style === s.id ? 'border-violet-500 bg-violet-500' : 'border-slate-300'}`} />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{s.label}</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{s.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tone */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tone of Voice</p>
                        <div className="flex flex-wrap gap-1.5">
                            {TONES.map(t => (
                                <button key={t.id} onClick={() => setTone(t.id)}
                                    title={t.hint}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        tone === t.id
                                            ? 'bg-violet-600 text-white border-violet-600'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-violet-400'
                                    }`}>
                                    <span>{t.emoji}</span> {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate */}
                    <div className="px-4 py-4">
                        <button onClick={generate}
                            disabled={(!role.trim() && !experience.trim()) || isGenerating}
                            className="w-full h-11 rounded-2xl text-sm font-black bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            {isGenerating
                                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
                                : <><Sparkles className="w-4 h-4" /> Generate About Section</>
                            }
                        </button>
                        {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
                    </div>
                </div>

                {/* Tips */}
                <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">About Section Best Practices</p>
                    {[
                        'First 2 lines are visible before "See more" — hook them fast',
                        'Write in first person ("I" not "He/She")',
                        'Include one clear achievement with a number',
                        'End with a compelling call to action',
                        '2600 char limit — use 1800–2200 for best results',
                    ].map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                            <Zap className="w-3 h-3 text-violet-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-violet-700 dark:text-violet-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: OUTPUT ═══ */}
            <div className="lg:col-span-7 space-y-4">

                {/* Result card */}
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest">Generated Summary</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {result && (
                                <>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                                        charCount > CHAR_LIMIT ? 'bg-red-100 text-red-600' :
                                        charCount > 1800       ? 'bg-green-100 text-green-600' :
                                                                  'bg-slate-100 text-slate-500'
                                    }`}>
                                        {charCount}/{CHAR_LIMIT}
                                    </span>
                                    <button onClick={copyText}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-black transition-all">
                                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Char bar */}
                    {result && (
                        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
                            <div className={`h-full transition-all duration-500 rounded-full ${
                                charCount > CHAR_LIMIT ? 'bg-red-500' :
                                charCount > 1800       ? 'bg-green-500' : 'bg-violet-500'
                            }`} style={{ width: `${charPct}%` }} />
                        </div>
                    )}

                    <div className="p-6 min-h-[300px]">
                        {result ? (
                            <div className="space-y-4">
                                {/* LinkedIn About preview */}
                                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-violet-200">
                                            <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800 dark:text-white">{FOUNDER.name}</p>
                                            <p className="text-[10px] text-slate-400">{role || FOUNDER.headline} • About</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap line-clamp-6">
                                        {result}
                                    </p>
                                    <button className="text-[10px] font-bold text-blue-600 mt-1">...see more</button>
                                </div>

                                {/* Editable textarea */}
                                <textarea
                                    value={result}
                                    onChange={e => setResult(e.target.value)}
                                    rows={12}
                                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm font-medium leading-relaxed resize-none outline-none focus:ring-2 focus:ring-violet-500/30 whitespace-pre-wrap"
                                />

                                <div className="flex items-center justify-between">
                                    <button onClick={generate} disabled={isGenerating}
                                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-violet-600 hover:text-violet-800 transition-colors">
                                        <RefreshCw className="w-3 h-3" /> Regenerate
                                    </button>
                                    {charCount > CHAR_LIMIT && (
                                        <p className="text-[10px] font-black text-red-500">
                                            ⚠ {charCount - CHAR_LIMIT} chars over LinkedIn limit
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
                                <p className="font-bold text-slate-400 mb-1">Your About section will appear here</p>
                                <p className="text-xs text-slate-400/70 max-w-xs mx-auto">Fill in your role and background on the left, then click Generate.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Example summaries */}
                <div className="rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden">
                    <button onClick={() => setShowExamples(v => !v)}
                        className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">High-Performing Example Summaries</p>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                    </button>
                    {showExamples && (
                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {EXAMPLES.map((ex, i) => (
                                <div key={i} className="p-5 group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-md">{ex.label}</span>
                                        <button onClick={() => setResult(ex.snippet)}
                                            className="text-[9px] font-black uppercase tracking-widest text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-violet-700">
                                            Use This →
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap line-clamp-5">
                                        {ex.snippet}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Structure tips */}
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Anatomy of a Top 1% LinkedIn About</p>
                    <div className="space-y-2">
                        {[
                            { step: '1', label: 'Hook',        desc: 'Bold statement or surprising fact' },
                            { step: '2', label: 'Story',       desc: 'Where you came from / your challenge' },
                            { step: '3', label: 'Value',       desc: 'What you do and for whom' },
                            { step: '4', label: 'Proof',       desc: 'Results, metrics, credibility' },
                            { step: '5', label: 'CTA',         desc: 'Invite them to connect or DM' },
                        ].map(({ step, label, desc }) => (
                            <div key={step} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                                    <span className="text-[9px] font-black text-violet-600">{step}</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 w-14 shrink-0">{label}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
