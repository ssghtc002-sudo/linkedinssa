'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    Sparkles, RefreshCw, Zap, Target, Type,
    MessageSquare, Settings2, ThumbsUp, Share2,
    Repeat, Globe, MoreHorizontal, Copy, Check,
    TrendingUp, Lightbulb, BookOpen, Flame,
    ChevronDown, Info,
} from 'lucide-react';
import { FOUNDER } from '@/lib/founder-profile';

// ─── Data ──────────────────────────────────────────────────────────────────────

const TONES = [
    { id: 'professional', label: 'Professional', emoji: '💼' },
    { id: 'viral',        label: 'Viral',        emoji: '🔥' },
    { id: 'storytelling', label: 'Story',        emoji: '📖' },
    { id: 'casual',       label: 'Casual',       emoji: '👋' },
    { id: 'funny',        label: 'Funny',        emoji: '😄' },
    { id: 'educational',  label: 'Educational',  emoji: '📚' },
];

const FORMATS = [
    { id: 'Standard Post',                  label: 'Standard',      icon: BookOpen,  desc: 'Balanced text post' },
    { id: 'Contrarian Take (Hot Take)',      label: 'Hot Take',      icon: Flame,     desc: 'Bold contrarian view' },
    { id: 'Step-by-Step Guide',             label: 'Guide',         icon: Lightbulb, desc: 'Numbered steps' },
    { id: "Hero's Journey Story",           label: 'Story',         icon: TrendingUp, desc: 'Past → transformation' },
    { id: 'Listicle',                       label: 'Listicle',      icon: Type,      desc: 'Bullet-point value' },
    { id: 'Personal Revelation',            label: 'Revelation',    icon: Sparkles,  desc: 'Vulnerable insight' },
];

const AUDIENCES = [
    'General Professionals', 'Founders & Entrepreneurs', 'Recruiters & Hiring Managers',
    'Engineers & Developers', 'Marketers & Growth Teams', 'Executives & Leaders', 'Sales Teams',
];

const CTAS = [
    { id: 'None',                                       label: 'No CTA' },
    { id: 'Ask a provocative question',                 label: 'Ask a Question' },
    { id: "Encourage 'Agree/Disagree' debate",          label: 'Encourage Debate' },
    { id: 'Drive to Link in bio / comments',            label: 'Drive to Link' },
    { id: 'Follow for more content like this',          label: 'Follow Request' },
    { id: 'Save this post for later',                   label: 'Save Post' },
];

const HOOK_TEMPLATES = [
    'I made a $50,000 mistake so you don\'t have to.',
    'Everyone tells you to X. Here\'s why they\'re wrong.',
    '5 years ago I was broke. Here\'s what changed.',
    'The uncomfortable truth about [your industry]:',
    'I just learned something that changes everything about [topic].',
    'Hot take: [conventional wisdom] is actually holding you back.',
    'The #1 mistake I see [audience] making every single day:',
    'Nobody talks about this, but [insight].',
];

const CHAR_LIMIT = 3000;
const POST_META  = { timeAgo: '1h', reactions: 1247, comments: 83, reposts: 41 };

// ─── Component ────────────────────────────────────────────────────────────────

export const LinkedInPostGenerator = () => {
    const [topic, setTopic]       = useState('');
    const [tone, setTone]         = useState('viral');
    const [format, setFormat]     = useState('Standard Post');
    const [audience, setAudience] = useState('General Professionals');
    const [cta, setCta]           = useState('None');
    const [result, setResult]     = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError]       = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showHooks, setShowHooks]       = useState(false);
    const [copied, setCopied]             = useState(false);
    const [expanded, setExpanded]         = useState(false);

    const charCount = result.length;
    const charPct   = Math.min(100, (charCount / CHAR_LIMIT) * 100);

    // Truncation at ~220 chars
    const CUTOFF     = 210;
    const truncated  = result.length > CUTOFF && !expanded;
    const displayText = truncated ? result.slice(0, CUTOFF) : result;

    const generate = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        setError('');
        setResult('');
        setExpanded(false);

        const enhancedTopic = [
            `Main Topic: ${topic}`,
            `Target Audience: ${audience}`,
            `Desired Format: ${format}`,
            `Call To Action: ${cta}`,
        ].join('\n');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'post', topic: enhancedTopic, tone }),
            });
            if (!res.ok) throw new Error('fail');
            const data = await res.json();
            setResult(data.result?.trim() || '');
        } catch {
            setError('Generation failed. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const copy = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: CONTROLS ═══ */}
            <div className="lg:col-span-5 space-y-4">

                {/* Main config card */}
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Post Generator</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI-Powered • Viral Optimised</p>
                        </div>
                    </div>

                    {/* Topic */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                <Type className="w-3 h-3" /> Your Topic *
                            </p>
                            <button onClick={() => setShowHooks(v => !v)}
                                className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                <Lightbulb className="w-3 h-3" /> Hook ideas
                                <ChevronDown className={`w-3 h-3 transition-transform ${showHooks ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        <textarea rows={4} value={topic} onChange={e => setTopic(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && e.ctrlKey && generate()}
                            placeholder="e.g. What I learned after building 3 startups that all failed before 30..."
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 resize-none placeholder:text-slate-300 leading-relaxed" />

                        {/* Hook panel */}
                        {showHooks && (
                            <div className="space-y-1.5 pt-1">
                                {HOOK_TEMPLATES.map(h => (
                                    <button key={h} onClick={() => setTopic(h)}
                                        className="w-full text-left px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-[11px] font-medium text-blue-700 dark:text-blue-300 transition-all leading-relaxed border border-blue-100 dark:border-blue-900/30">
                                        {h}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tone */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tone of Voice</p>
                        <div className="flex flex-wrap gap-1.5">
                            {TONES.map(t => (
                                <button key={t.id} onClick={() => setTone(t.id)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        tone === t.id
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
                                    }`}>
                                    <span>{t.emoji}</span> {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Format */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Post Format</p>
                        <div className="grid grid-cols-3 gap-1.5">
                            {FORMATS.map(f => (
                                <button key={f.id} onClick={() => setFormat(f.id)}
                                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                                        format === f.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                                    }`}>
                                    <f.icon className={`w-3.5 h-3.5 mb-1 ${format === f.id ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{f.label}</p>
                                    <p className="text-[8px] text-slate-400 mt-0.5 leading-relaxed">{f.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced (Audience + CTA) */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <button onClick={() => setShowAdvanced(v => !v)}
                            className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                            <span className="flex items-center gap-1.5"><Settings2 className="w-3 h-3" /> Advanced Settings</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                        </button>
                        {showAdvanced && (
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1"><Target className="w-3 h-3" /> Audience</p>
                                    <div className="space-y-1">
                                        {AUDIENCES.map(a => (
                                            <button key={a} onClick={() => setAudience(a)}
                                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                                                    audience === a
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                                                }`}>
                                                {a}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Call to Action</p>
                                    <div className="space-y-1">
                                        {CTAS.map(c => (
                                            <button key={c.id} onClick={() => setCta(c.id)}
                                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                                                    cta === c.id
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-purple-50 hover:text-purple-600'
                                                }`}>
                                                {c.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Generate button */}
                    <div className="px-4 py-4">
                        <button onClick={generate} disabled={!topic.trim() || isGenerating}
                            className="w-full h-12 rounded-2xl text-sm font-black bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                            {isGenerating
                                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating Viral Post...</>
                                : <><Zap className="w-4 h-4" /> Generate Viral Post</>
                            }
                        </button>
                        {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
                        <p className="text-[9px] text-slate-400 mt-2 text-center">Tip: Ctrl+Enter to generate</p>
                    </div>
                </div>

                {/* Viral tips */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">What Makes Posts Go Viral</p>
                    {[
                        'First line is everything — make it impossible to scroll past',
                        'Short paragraphs (max 2–3 lines) for mobile readers',
                        'End with a question to drive comments (+3× reach)',
                        '3–5 hashtags outperform 10+ every time',
                    ].map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                            <Zap className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: LIVE PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-4">

                {/* LinkedIn post card */}
                <div className="rounded-3xl bg-white dark:bg-[#1e2328] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                    {/* Card header */}
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Live Post Preview
                        </p>
                        <div className="flex items-center gap-2">
                            {result && (
                                <>
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${
                                        charCount > CHAR_LIMIT ? 'bg-red-100 text-red-600' :
                                        charCount > 1500       ? 'bg-amber-100 text-amber-600' :
                                                                  'bg-green-100 text-green-600'
                                    }`}>{charCount}/{CHAR_LIMIT}</span>
                                    <button onClick={copy}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black transition-all">
                                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Char progress bar */}
                    {result && (
                        <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-800">
                            <div className={`h-full transition-all duration-500 ${
                                charCount > CHAR_LIMIT ? 'bg-red-500' :
                                charCount > 1500       ? 'bg-amber-400' : 'bg-green-500'
                            }`} style={{ width: `${charPct}%` }} />
                        </div>
                    )}

                    {/* Simulated post */}
                    <div className="p-5">
                        {/* Profile row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-start gap-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
                                    <Image src={FOUNDER.avatar} alt={FOUNDER.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{FOUNDER.name}</span>
                                        <span className="text-[10px] text-slate-400">• 1st</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">{FOUNDER.headline}</p>
                                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
                                        <span>{POST_META.timeAgo}</span>
                                        <span>•</span>
                                        <Globe className="w-2.5 h-2.5" />
                                    </div>
                                </div>
                            </div>
                            <MoreHorizontal className="w-5 h-5 text-slate-300 shrink-0 mt-1" />
                        </div>

                        {/* Post content */}
                        <div className="min-h-[160px]">
                            {isGenerating ? (
                                <div className="space-y-2.5 animate-pulse py-2">
                                    {[1, 0.9, 0.7, 1, 0.85, 0.6, 1, 0.75].map((w, i) => (
                                        <div key={i} className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full" style={{ width: `${w * 100}%` }} />
                                    ))}
                                    <div className="flex gap-2 mt-4">
                                        {[60, 80, 96].map(w => (
                                            <div key={w} className="h-5 bg-blue-50 dark:bg-blue-900/20 rounded" style={{ width: w }} />
                                        ))}
                                    </div>
                                </div>
                            ) : result ? (
                                <>
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-900 dark:text-slate-100">
                                        {displayText}
                                    </pre>
                                    {result.length > CUTOFF && (
                                        <button onClick={() => setExpanded(v => !v)}
                                            className="text-slate-500 hover:text-blue-600 text-sm font-semibold mt-1 transition-colors">
                                            {expanded ? 'see less' : '...see more'}
                                        </button>
                                    )}
                                    {/* Editable textarea for refinement */}
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Edit & Refine</p>
                                        <textarea value={result} onChange={e => setResult(e.target.value)} rows={8}
                                            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-medium leading-relaxed resize-none outline-none focus:ring-2 focus:ring-blue-500/20" />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-3">
                                        <Sparkles className="w-7 h-7 text-slate-200 dark:text-slate-700" />
                                    </div>
                                    <p className="font-bold text-slate-400 mb-1">Your post will appear here</p>
                                    <p className="text-xs text-slate-400/70 max-w-xs">Add a topic on the left and hit Generate to see your LinkedIn post as it would appear in the feed.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reaction bar */}
                    {result ? (
                        <>
                            <div className="mx-5 py-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1">
                                        {['👍', '❤️', '💡'].map((e, i) => (
                                            <div key={i} className="w-4 h-4 rounded-full bg-blue-500 border border-white flex items-center justify-center text-white" style={{ fontSize: 7, background: i === 1 ? '#ef4444' : i === 2 ? '#f59e0b' : '#3b82f6' }}>{e}</div>
                                        ))}
                                    </div>
                                    <span>{POST_META.reactions.toLocaleString()}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>{POST_META.comments} comments</span>
                                    <span>{POST_META.reposts} reposts</span>
                                </div>
                            </div>
                            <div className="mx-2 pb-3 border-t border-slate-50 dark:border-white/5 grid grid-cols-4 pt-1">
                                {[
                                    { icon: ThumbsUp,      label: 'Like' },
                                    { icon: MessageSquare, label: 'Comment' },
                                    { icon: Repeat,        label: 'Repost' },
                                    { icon: Share2,        label: 'Send' },
                                ].map(({ icon: Icon, label }) => (
                                    <button key={label} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                        <Icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="mx-5 mb-5 pt-3 border-t border-slate-100 dark:border-white/5 grid grid-cols-4 gap-1 opacity-30 pointer-events-none">
                            {['Like', 'Comment', 'Repost', 'Send'].map(l => (
                                <div key={l} className="py-2 rounded-xl text-[11px] font-semibold text-slate-400 text-center">{l}</div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Regenerate strip */}
                {result && (
                    <div className="flex items-center gap-3">
                        <button onClick={generate} disabled={isGenerating}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all">
                            <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                        </button>
                        <div className="flex items-start gap-1.5 text-[10px] text-slate-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 rounded-xl px-3 py-2 flex-1">
                            <Info className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" />
                            Best posting times: Tue–Thu, 7–9 AM or 12–1 PM in your audience's timezone.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
