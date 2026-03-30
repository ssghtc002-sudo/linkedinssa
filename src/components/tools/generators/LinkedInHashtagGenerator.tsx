'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '../shared/CopyButton';
import {
    Hash, Sparkles, RefreshCw, Plus, CheckCircle2,
    X, Zap, TrendingUp, Target, Search, LayoutGrid,
    ChevronDown,
} from 'lucide-react';

// ─── Preset curated hashtag library ──────────────────────────────────────────

const PRESET_LIBRARY: Record<string, { broad: string[]; niche: string[] }> = {
    'Entrepreneurship': {
        broad: ['entrepreneurship', 'startup', 'founder', 'business', 'entrepreneur'],
        niche: ['startuplife', 'founderstory', 'b2b', 'venturecapital', 'bootstrapped', 'solopreneur', 'sidehustle'],
    },
    'Leadership': {
        broad: ['leadership', 'management', 'ceo', 'strategy', 'innovation'],
        niche: ['executivemindset', 'servantleadership', 'leadershipdevelopment', 'thoughtleader', 'cxo'],
    },
    'Marketing': {
        broad: ['marketing', 'digitalmarketing', 'contentmarketing', 'socialmedia', 'branding'],
        niche: ['b2bmarketing', 'demandgeneration', 'growthmarketing', 'seo', 'ppc', 'emailmarketing', 'copywriting'],
    },
    'Technology': {
        broad: ['technology', 'tech', 'ai', 'innovation', 'software'],
        niche: ['artificialintelligence', 'machinelearning', 'saas', 'cloudcomputing', 'devops', 'generativeai', 'llm'],
    },
    'Career Growth': {
        broad: ['career', 'jobs', 'hiring', 'recruitment', 'productivity'],
        niche: ['careertips', 'jobsearch', 'careeradvice', 'remotework', 'linkedintips', 'personalbranding', 'networking'],
    },
    'Sales': {
        broad: ['sales', 'business', 'revenue', 'growth', 'b2b'],
        niche: ['salesstrategy', 'b2bsales', 'salessuccess', 'coldoutreach', 'salestips', 'pipeline', 'crm'],
    },
    'Finance': {
        broad: ['finance', 'investing', 'money', 'wealth', 'economy'],
        niche: ['personalfinance', 'venturecapital', 'privateequity', 'fintech', 'stockmarket', 'passiveincome'],
    },
    'HR & Culture': {
        broad: ['hr', 'culture', 'diversity', 'hiring', 'futureofwork'],
        niche: ['employeeexperience', 'talentacquisition', 'dei', 'remotefirst', 'companyculture', 'peoplefirst'],
    },
};

const NICHE_INDUSTRIES = Object.keys(PRESET_LIBRARY);

// ─── Trending LinkedIn hashtags (always relevant) ──────────────────────────

const ALWAYS_TRENDING = [
    'linkedin', 'linkedintips', 'personalbranding', 'thoughtleadership',
    'networking', 'inspiration', 'motivation', 'success', 'mindset', 'growth',
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function cleanTags(raw: string[]): string[] {
    return [...new Set(
        raw
            .map(t => t.replace(/^#+/, '').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())
            .filter(t => t.length >= 2 && t.length <= 50)
    )];
}

const MAX_RECOMMENDED = 5;

// ─── Component ────────────────────────────────────────────────────────────────

export const LinkedInHashtagGenerator = () => {
    const [content, setContent]                     = useState('');
    const [hashtags, setHashtags]                   = useState<string[]>([]);
    const [selectedHashtags, setSelectedHashtags]   = useState<Set<string>>(new Set());
    const [isGenerating, setIsGenerating]           = useState(false);
    const [error, setError]                         = useState('');
    const [manualInput, setManualInput]             = useState('');
    const [selectedIndustry, setSelectedIndustry]   = useState('');
    const [copyFormat, setCopyFormat]               = useState<'space' | 'newline'>('space');
    const [showPresets, setShowPresets]             = useState(false);
    const [showTrending, setShowTrending]           = useState(false);

    // ── Generate via AI ────────────────────────────────────────────────────
    const generateHashtags = async () => {
        if (!content.trim()) return;
        setIsGenerating(true);
        setError('');
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'hashtags', topic: content }),
            });
            if (!response.ok) throw new Error('Failed');
            const data = await response.json();
            const tags = cleanTags(data.result.trim().split(/\s+/));
            setHashtags(prev => cleanTags([...prev, ...tags]));
            setSelectedHashtags(prev => {
                const next = new Set(prev);
                tags.forEach(t => next.add(t));
                return next;
            });
        } catch {
            setError('AI generation failed. Try again or add hashtags manually below.');
        } finally {
            setIsGenerating(false);
        }
    };

    // ── Preset industry load ───────────────────────────────────────────────
    const loadPreset = (industry: string) => {
        const preset = PRESET_LIBRARY[industry];
        if (!preset) return;
        const all = cleanTags([...preset.broad, ...preset.niche]);
        setHashtags(prev => cleanTags([...prev, ...all]));
        setShowPresets(false);
    };

    // ── Trending add ──────────────────────────────────────────────────────
    const addTrending = () => {
        setHashtags(prev => cleanTags([...prev, ...ALWAYS_TRENDING]));
        setShowTrending(false);
    };

    // ── Manual add ────────────────────────────────────────────────────────
    const addManual = () => {
        if (!manualInput.trim()) return;
        const tags = cleanTags(manualInput.split(/[\s,#]+/));
        setHashtags(prev => cleanTags([...prev, ...tags]));
        setManualInput('');
    };

    // ── Toggle / Select all ───────────────────────────────────────────────
    const toggle = (tag: string) => {
        setSelectedHashtags(prev => {
            const next = new Set(prev);
            next.has(tag) ? next.delete(tag) : next.add(tag);
            return next;
        });
    };

    const selectAll = () => setSelectedHashtags(new Set(hashtags));
    const clearAll  = () => setSelectedHashtags(new Set());

    const removeTag = (tag: string) => {
        setHashtags(prev => prev.filter(t => t !== tag));
        setSelectedHashtags(prev => { const n = new Set(prev); n.delete(tag); return n; });
    };

    // ── Copy string ────────────────────────────────────────────────────────
    const copyText = useMemo(() => {
        const tags = Array.from(selectedHashtags).map(t => `#${t}`);
        return copyFormat === 'newline' ? tags.join('\n') : tags.join(' ');
    }, [selectedHashtags, copyFormat]);

    const selectedCount = selectedHashtags.size;

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                                <Hash className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Hashtag Builder</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI-Powered • Free</p>
                            </div>
                        </div>
                        {hashtags.length > 0 && (
                            <span className="text-[10px] font-black bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full">
                                {hashtags.length} tags
                            </span>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-900/30 space-y-2.5">

                        {/* Industry presets */}
                        <div className="relative">
                            <button onClick={() => setShowPresets(v => !v)}
                                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-sm font-bold text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4 text-blue-500" />
                                    {selectedIndustry || 'Load Industry Preset'}
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showPresets ? 'rotate-180' : ''}`} />
                            </button>
                            {showPresets && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                    {NICHE_INDUSTRIES.map(ind => (
                                        <button key={ind}
                                            onClick={() => { setSelectedIndustry(ind); loadPreset(ind); }}
                                            className="w-full px-4 py-2.5 text-left text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-white/5 last:border-0">
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Trending always-on */}
                        <button onClick={addTrending}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-400 hover:text-pink-600 transition-all text-sm font-bold text-slate-600 dark:text-slate-300">
                            <TrendingUp className="w-4 h-4 text-pink-500" />
                            Add 10 Always-Trending Tags
                        </button>
                    </div>

                    {/* AI Content Input */}
                    <div className="px-4 py-3 space-y-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Generate from Content</p>
                        <Textarea
                            placeholder="Paste your post content or describe a topic...&#10;&#10;AI will extract the best hashtags for maximum LinkedIn reach."
                            className="min-h-[120px] text-sm resize-none bg-white dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:ring-blue-500/30 rounded-2xl leading-relaxed"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />

                        {error && (
                            <p className="text-xs text-red-500 font-semibold">{error}</p>
                        )}

                        <button
                            onClick={generateHashtags}
                            disabled={!content.trim() || isGenerating}
                            className="w-full h-12 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5">
                            {isGenerating ? (
                                <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Content...</>
                            ) : (
                                <><Sparkles className="w-4 h-4" /> Generate AI Hashtags</>
                            )}
                        </button>
                    </div>

                    {/* Manual Add */}
                    <div className="px-4 py-3 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Manually</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={manualInput}
                                onChange={e => setManualInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addManual()}
                                placeholder="#yourtag or separate by comma"
                                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:font-normal placeholder:text-slate-400"
                            />
                            <button onClick={addManual}
                                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tips card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">LinkedIn Hashtag Strategy</p>
                    {[
                        { icon: Target, tip: 'Use 3–5 hashtags max — LinkedIn penalizes over-tagging' },
                        { icon: TrendingUp, tip: 'Mix 1 broad + 2 niche tags for widest reach' },
                        { icon: Search, tip: 'Niche tags get more targeted engagement from the right audience' },
                        { icon: Zap, tip: 'Add hashtags at the end of your post, not in the middle' },
                    ].map(({ icon: Icon, tip }) => (
                        <div key={tip} className="flex items-start gap-2.5">
                            <Icon className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: OUTPUT ═══ */}
            <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                    {/* Output header */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white">
                                Your Hashtag Bank
                                {hashtags.length > 0 && (
                                    <span className="ml-2 font-normal text-slate-400 normal-case text-xs">
                                        ({hashtags.length} total, {selectedCount} selected)
                                    </span>
                                )}
                            </p>
                        </div>
                        {hashtags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <button onClick={selectedCount < hashtags.length ? selectAll : clearAll}
                                    className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-500 hover:text-blue-600 transition-all">
                                    {selectedCount < hashtags.length ? 'Select All' : 'Clear All'}
                                </button>
                                <button onClick={() => { setHashtags([]); setSelectedHashtags(new Set()); }}
                                    className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/20 text-red-400 hover:text-red-600 transition-all">
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-6 min-h-[200px]">

                        {/* Loading skeleton */}
                        {isGenerating && (
                            <div className="flex flex-wrap gap-2">
                                {[100, 80, 130, 90, 110, 85, 120, 75, 95, 140, 88, 105].map((w, i) => (
                                    <div key={i} className="h-9 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" style={{ width: w }} />
                                ))}
                            </div>
                        )}

                        {/* Tag cloud */}
                        {!isGenerating && hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {hashtags.map(tag => (
                                    <div key={tag} className="group relative">
                                        <button
                                            onClick={() => toggle(tag)}
                                            className={`inline-flex items-center gap-1.5 pl-4 pr-8 py-2 rounded-full border text-sm font-bold transition-all ${
                                                selectedHashtags.has(tag)
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md'
                                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600'
                                            }`}>
                                            {selectedHashtags.has(tag)
                                                ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                                : <span className="text-blue-500 font-black text-xs">#</span>
                                            }
                                            {tag}
                                        </button>
                                        {/* Remove X on hover */}
                                        <button
                                            onClick={e => { e.stopPropagation(); removeTag(tag); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100">
                                            <X className="w-2.5 h-2.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Empty state */}
                        {!isGenerating && hashtags.length === 0 && (
                            <div className="h-[200px] flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-white/5">
                                        <Hash className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="font-bold text-slate-400 mb-1">Your hashtags will appear here</p>
                                    <p className="text-xs text-slate-400/70 max-w-xs mx-auto">Use the tools on the left — load a preset, add trending tags, or generate from your content with AI.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Copy block */}
                    {selectedCount > 0 && (
                        <div className="mx-6 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-blue-100 dark:border-blue-900/30">
                            {/* Controls row */}
                            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedCount > MAX_RECOMMENDED ? 'text-orange-500' : 'text-slate-400'}`}>
                                        {selectedCount} selected {selectedCount > MAX_RECOMMENDED ? `⚠ LinkedIn recommends max ${MAX_RECOMMENDED}` : `✓ Good count`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Format toggle */}
                                    <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                        {(['space', 'newline'] as const).map(f => (
                                            <button key={f}
                                                onClick={() => setCopyFormat(f)}
                                                className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${copyFormat === f ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                                                {f === 'space' ? 'Inline' : 'Block'}
                                            </button>
                                        ))}
                                    </div>
                                    <CopyButton text={copyText} disabled={false} className="h-8 rounded-xl px-4 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md" />
                                </div>
                            </div>

                            {/* Preview string */}
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold leading-relaxed break-words whitespace-pre-wrap">
                                {copyText}
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <Zap className="w-3 h-3 text-blue-500" /> CarouselGem AI
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Hashtag Studio v2.0
                        </div>
                    </div>
                </div>

                {/* Usage guide */}
                <div className="grid sm:grid-cols-3 gap-3">
                    {[
                        { icon: LayoutGrid, title: 'Load Preset', desc: 'Pick your industry to instantly load curated broad + niche tags.' },
                        { icon: Sparkles, title: 'AI Generate', desc: 'Paste your post content and AI extracts the perfect hashtags.' },
                        { icon: Target, title: 'Select & Copy', desc: 'Click tags to select the best 3–5, then copy directly to LinkedIn.' },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-blue-300 transition-all">
                            <Icon className="w-5 h-5 text-blue-500 mb-2" />
                            <p className="text-xs font-black text-slate-700 dark:text-white mb-1">{title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
