'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import {
    MoreHorizontal, ThumbsUp, MessageSquare, Share2,
    Send, Globe, Smartphone, Monitor, Eye, Info, Zap,
    AlertTriangle, CheckCircle2, Repeat,
} from 'lucide-react';
import { FOUNDER } from '@/lib/founder-profile';

// ─── Post-specific display data ──────────────────────────────────────────────
const POST_META = {
    connection: '1st',
    timeAgo: '1h',
    reactions: 1247,
    comments: 83,
    reposts: 41,
};

// ─── LinkedIn truncation rules ────────────────────────────────────────────────
// Desktop: ~210 chars / ~3 lines  |  Mobile: ~140 chars / ~3 lines
const DESKTOP_CUTOFF = 210;
const MOBILE_CUTOFF  = 140;

// ─── Utility ─────────────────────────────────────────────────────────────────
function truncate(text: string, cutoff: number): { preview: string; rest: string; truncated: boolean } {
    if (!text || text.length <= cutoff) return { preview: text, rest: '', truncated: false };
    // Avoid cutting mid-word
    const idx = text.lastIndexOf(' ', cutoff);
    const split = idx > cutoff * 0.7 ? idx : cutoff;
    return { preview: text.slice(0, split), rest: text.slice(split), truncated: true };
}

function charColor(len: number) {
    if (len > 2800) return 'text-red-500';
    if (len > 2000) return 'text-amber-500';
    if (len > 1200) return 'text-yellow-500';
    return 'text-green-500';
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PostPreview = () => {
    const [mode, setMode]       = useState<'desktop' | 'mobile'>('desktop');
    const [content, setContent] = useState('');
    const [expanded, setExpanded] = useState(false);

    const charCount = content.length;
    const lineCount = content.split('\n').length;
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

    const cutoff = mode === 'mobile' ? MOBILE_CUTOFF : DESKTOP_CUTOFF;

    const { preview, rest, truncated } = useMemo(
        () => truncate(content, cutoff),
        [content, cutoff]
    );

    // Reset expand when content or mode changes
    // (intentionally simple: let the user expand again)

    const displayText = expanded ? content : preview;

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: EDITOR ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                                <Eye className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Post Editor</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Preview Engine</p>
                            </div>
                        </div>
                        {/* Char badge */}
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 ${charColor(charCount)}`}>
                            {charCount} / 3000
                        </span>
                    </div>

                    {/* Stats bar */}
                    <div className="px-5 py-2.5 border-b border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-slate-900/30 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className={lineCount > 5 ? 'text-amber-500' : 'text-slate-400'}>{lineCount} lines</span>
                        <span>{wordCount} words</span>
                        {truncated && !expanded && (
                            <span className="text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Truncated on {mode}
                            </span>
                        )}
                        {!truncated && content && (
                            <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Fits above fold
                            </span>
                        )}
                    </div>

                    {/* Textarea */}
                    <textarea
                        className="w-full min-h-[320px] px-5 py-5 text-sm font-medium bg-transparent border-0 outline-none resize-none leading-relaxed text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder={`Write your LinkedIn post here...\n\nWatch the right side update in real-time.\nThe preview shows exactly where LinkedIn will cut your text with "...see more".`}
                        value={content}
                        onChange={e => { setContent(e.target.value); setExpanded(false); }}
                    />
                </div>

                {/* Tips */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">LinkedIn Best Practices</p>
                    {[
                        { icon: AlertTriangle, tip: '"See more" triggers at ~3 lines on mobile. Make your hook strong.' },
                        { icon: CheckCircle2, tip: 'Keep the most important point in the first 140 characters.' },
                        { icon: Zap,         tip: 'Use emojis and line breaks to stop the scroll.' },
                        { icon: Info,        tip: 'LinkedIn allows up to 3,000 characters per post.' },
                    ].map(({ icon: Icon, tip }) => (
                        <div key={tip} className="flex items-start gap-2">
                            <Icon className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ RIGHT: LINKEDIN SIMULATOR ═══ */}
            <div className="lg:col-span-7 space-y-4">

                {/* Device toggle */}
                <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-blue-500" /> Live Feed Simulator
                    </p>
                    <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {(['desktop', 'mobile'] as const).map(m => (
                            <button key={m}
                                onClick={() => { setMode(m); setExpanded(false); }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                                {m === 'desktop' ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Simulator frame */}
                <div className="flex justify-center">
                    <div className={`transition-all duration-500 ${
                        mode === 'mobile'
                            ? 'w-[360px] rounded-[2.5rem] border-[10px] border-slate-900 dark:border-black shadow-[0_30px_60px_rgba(0,0,0,0.4)] bg-slate-900'
                            : 'w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-zinc-950'
                    }`}>

                        {/* Mobile notch */}
                        {mode === 'mobile' && (
                            <div className="h-7 flex items-center justify-center bg-slate-900 dark:bg-black rounded-t-2xl">
                                <div className="w-24 h-4 bg-black rounded-b-2xl" />
                            </div>
                        )}

                        {/* LinkedIn App Header (mobile only) */}
                        {mode === 'mobile' && (
                            <div className="bg-white dark:bg-zinc-950 px-4 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                                <div className="text-blue-600 font-black text-lg tracking-tight">in</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700" />
                                </div>
                            </div>
                        )}

                        {/* Post card */}
                        <div className={`bg-white dark:bg-zinc-950 ${mode === 'mobile' ? 'rounded-b-2xl overflow-hidden' : 'rounded-2xl overflow-hidden'}`}>

                            {/* Post header with real profile */}
                            <div className="p-4 flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
                                        <Image
                                            src={FOUNDER.avatar}
                                            alt={FOUNDER.name}
                                            fill
                                            className="object-cover"
                                            onError={() => {}} // fallback gracefully
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{FOUNDER.name}</span>
                                            <span className="text-[10px] text-slate-400">• {POST_META.connection}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-snug mt-0.5 line-clamp-2">{FOUNDER.headline}</p>
                                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400 font-medium">
                                            <span>{POST_META.timeAgo}</span>
                                            <span>•</span>
                                            <Globe className="w-2.5 h-2.5" />
                                        </div>
                                    </div>
                                </div>
                                <MoreHorizontal className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                            </div>

                            {/* Post content with real truncation */}
                            <div className="px-4 pb-3">
                                <pre className={`whitespace-pre-wrap font-sans text-[13px] sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 ${!content ? 'opacity-30 italic' : ''}`}>
                                    {displayText || 'Start typing your post on the left\nto see exactly how it looks in the LinkedIn feed...\n\nYour hook is everything. ✨'}
                                </pre>
                                {truncated && !expanded && (
                                    <button
                                        onClick={() => setExpanded(true)}
                                        className="text-slate-500 hover:text-blue-600 text-[13px] font-semibold mt-1 transition-colors">
                                        ...see more
                                    </button>
                                )}
                                {expanded && rest && (
                                    <button
                                        onClick={() => setExpanded(false)}
                                        className="text-slate-500 hover:text-blue-600 text-[13px] font-semibold mt-1 block transition-colors">
                                        see less
                                    </button>
                                )}
                            </div>

                            {/* Reaction summary */}
                            <div className="mx-4 py-2.5 border-t border-slate-50 dark:border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 border border-white dark:border-zinc-950 flex items-center justify-center text-white" style={{ fontSize: 7 }}>👍</div>
                                        <div className="w-4 h-4 rounded-full bg-red-500 border border-white dark:border-zinc-950 flex items-center justify-center text-white" style={{ fontSize: 7 }}>❤️</div>
                                        <div className="w-4 h-4 rounded-full bg-amber-500 border border-white dark:border-zinc-950 flex items-center justify-center text-white" style={{ fontSize: 7 }}>💡</div>
                                    </div>
                                    <span>{POST_META.reactions.toLocaleString()}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>{POST_META.comments} comments</span>
                                    <span>{POST_META.reposts} reposts</span>
                                </div>
                            </div>

                            {/* Action bar */}
                            <div className="mx-1 pb-1 border-t border-slate-50 dark:border-slate-900 grid grid-cols-4">
                                {([
                                    { icon: ThumbsUp,       label: 'Like' },
                                    { icon: MessageSquare,  label: 'Comment' },
                                    { icon: Repeat,         label: 'Repost' },
                                    { icon: Send,           label: 'Send' },
                                ] as const).map(({ icon: Icon, label }) => (
                                    <button key={label} className="flex items-center justify-center gap-1.5 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-500 text-xs font-bold transition-all">
                                        <Icon className="w-4 h-4" /> {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile home bar */}
                        {mode === 'mobile' && (
                            <div className="h-7 bg-slate-900 dark:bg-black rounded-b-2xl flex items-center justify-center">
                                <div className="w-20 h-1 bg-white/30 rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Truncation awareness panel */}
                {content && (
                    <div className={`p-4 rounded-2xl border transition-all ${
                        truncated && !expanded
                            ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30'
                            : 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30'
                    }`}>
                        <div className="flex items-start gap-2.5">
                            {truncated && !expanded
                                ? <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                : <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            }
                            <div>
                                <p className={`text-xs font-black ${truncated && !expanded ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
                                    {truncated && !expanded
                                        ? `⚠ Post truncated on ${mode} — ${rest.length} chars hidden behind "see more"`
                                        : `✓ Full post visible on ${mode} without "see more"`
                                    }
                                </p>
                                {truncated && !expanded && (
                                    <p className="text-[11px] text-red-600/70 dark:text-red-400/70 mt-0.5">
                                        Your hook must compel them to click "{`see more`}" before they scroll away.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
