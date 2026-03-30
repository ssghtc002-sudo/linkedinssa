'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '../shared/CopyButton';
import {
    Type, Sparkles, Zap, Hash, Info,
    Monitor, Smartphone, MoreHorizontal,
    ThumbsUp, MessageSquare, Repeat, Send,
    List, ListOrdered, Heart, ChevronDown,
    AlignLeft, Bold, Italic,
} from 'lucide-react';
import {
    BOLD_SANS, ITALIC_SANS, BOLD_SERIF, ITALIC_SERIF, BOLD_ITALIC_SANS,
    SCRIPT_BOLD, DOUBLE_STRUCK, MONO, FULLWIDTH,
    UNDERLINE, STRIKETHROUGH, DOUBLE_UNDERLINE,
} from '@/lib/unicode-maps';

// ─── Reverse lookup: styled char → plain ASCII ────────────────────────────────
// Built once at module load. Used to strip any existing unicode style before
// applying a new one, so buttons always work even on already-styled text.
const REVERSE_MAP = new Map<string, string>();
for (const styleMap of [
    BOLD_SANS, ITALIC_SANS, BOLD_SERIF, ITALIC_SERIF, BOLD_ITALIC_SANS,
    SCRIPT_BOLD, DOUBLE_STRUCK, MONO, FULLWIDTH,
]) {
    for (const [plain, styled] of Object.entries(styleMap)) {
        // styled chars are outside the BMP (surrogate pairs) — store as-is
        REVERSE_MAP.set(styled, plain);
    }
}

/** Strip all unicode styles back to plain ASCII. Uses for-of to handle surrogate pairs. */
function normalizeText(text: string): string {
    let out = '';
    for (const ch of text) {           // for-of iterates CODE POINTS, not code units
        out += REVERSE_MAP.get(ch) ?? ch;
    }
    return out;
}

// ─── Forward transform ────────────────────────────────────────────────────────

const STYLE_MAPS: Record<string, Record<string, string>> = {
    'bold-sans': BOLD_SANS, 'italic-sans': ITALIC_SANS,
    'bold-serif': BOLD_SERIF, 'italic-serif': ITALIC_SERIF,
    'bold-italic-sans': BOLD_ITALIC_SANS,
    'script': SCRIPT_BOLD, 'double-struck': DOUBLE_STRUCK,
    'mono': MONO, 'fullwidth': FULLWIDTH,
};

function transformText(text: string, type: string): string {
    if (!text) return '';
    if (type === 'underline') return UNDERLINE(text);
    if (type === 'strikethrough') return STRIKETHROUGH(text);
    if (type === 'double-underline') return DOUBLE_UNDERLINE(text);
    if (type === 'staircase') return text.split('\n').map((l, i) => '\u2800'.repeat(i * 2) + l).join('\n');

    const m = STYLE_MAPS[type];
    if (!m) return text;

    // ⚠️ CRITICAL: use [...text] (iterates code points), NOT text.split('')
    // text.split('') splits surrogate pairs into individual half-chars and
    // the reverse lookup / map lookup then silently fails.
    return [...text].map(ch => m[ch] ?? ch).join('');
}

/** Normalize then transform — always produces correct output regardless of starting style */
function applyStyle(text: string, type: string): string {
    const plain = normalizeText(text);  // strip any existing unicode style first
    return transformText(plain, type);
}

// ─── Output style list ─────────────────────────────────────────────────────────
const OUTPUT_STYLES = [
    { id: 'bold-sans',        sample: 'Bold Sans'     },
    { id: 'italic-sans',      sample: 'Italic Sans'   },
    { id: 'bold-serif',       sample: 'Bold Serif'    },
    { id: 'italic-serif',     sample: 'Italic Serif'  },
    { id: 'bold-italic-sans', sample: 'Bold Italic'   },
    { id: 'script',           sample: 'Script Bold'   },
    { id: 'double-struck',    sample: 'Outline'       },
    { id: 'mono',             sample: 'Typewriter'    },
    { id: 'underline',        sample: 'Underline'     },
    { id: 'strikethrough',    sample: 'Strikethrough' },
];

const EMOJI_CATEGORIES = [
    {
        label: '😊 Feelings',
        emojis: [
            '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇',
            '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚',
            '😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔',
            '🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥',
            '😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥵',
            '🥶','😰','😱','🤯','😳','🥴','😵','🤠','🥳','😎',
            '🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😦',
            '😧','😨','😢','😥','😭','😖','😣','😞','😓','😩',
            '😫','🥱','😤','😡','😠','🤬','💀','💩','🤡','👹',
        ],
    },
    {
        label: '👍 Gestures',
        emojis: [
            '👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞',
            '🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍',
            '👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝',
            '🙏','💪','🦾','🫂','💅','🤳',
        ],
    },
    {
        label: '💼 Business',
        emojis: [
            '🚀','🔥','✅','💡','📈','🎯','🧵','👇','💎','✨',
            '🤝','📢','🙌','⭐','📍','💪','🏆','💼','🧠','❤️',
            '📊','📉','💰','💸','🏅','🥇','🎖️','🏷️','📋','📌',
            '📁','📂','🗂️','📝','✏️','🖊️','🖋️','📖','📚','🔍',
            '🔎','💬','📣','📯','🗣️','🎙️','🎤','📡','🖥️','💻',
            '🖨️','⌨️','🖱️','📱','☎️','📞','📠','🔋','🔌','💾',
        ],
    },
    {
        label: '🌍 World',
        emojis: [
            '🌍','🌎','🌏','🌐','🗺️','🗾','🧭','🌋','🏔️','⛰️',
            '🌅','🌄','🌠','🎇','🎆','🌇','🌆','🏙️','🌃','🌉',
            '☀️','🌤️','⛅','🌥️','☁️','🌦️','🌧️','⛈️','🌩️','🌨️',
            '❄️','☃️','⛄','🌬️','💨','🌪️','🌫️','🌊','🌈','🌂',
        ],
    },
    {
        label: '❤️ Hearts',
        emojis: [
            '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
            '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️',
            '✝️','☪️','🕉️','☯️','✡️','🔯','♾️','💫','⭐','🌟',
        ],
    },
    {
        label: '🎉 Celebrate',
        emojis: [
            '🎉','🎊','🎈','🎁','🎀','🎂','🍰','🥂','🍾','🥳',
            '🎵','🎶','🎸','🎺','🎻','🥁','🎹','🎷','🎤','🎧',
            '🎬','🎭','🎪','🎨','🖼️','🎠','🎡','🎢','🎮','🕹️',
        ],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const TextFormatter = () => {
    const [input, setInput] = useState('');
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [emojiTab, setEmojiTab] = useState(0);
    const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * savedSel: captures selection at onMouseDown time BEFORE React re-renders.
     * React resets textarea selection when it updates el.value. Snapshotting at
     * mousedown (which fires before any state changes) gives us stable indices.
     */
    const savedSel = useRef<{ s: number; e: number }>({ s: 0, e: 0 });

    const snap = () => {
        const el = textareaRef.current;
        if (el) savedSel.current = { s: el.selectionStart, e: el.selectionEnd };
    };

    // ── Format handler ──────────────────────────────────────────────────────
    const handleStyle = (type: string) => {
        const el = textareaRef.current;
        if (!el) return;

        const { s, e } = savedSel.current;
        const val = el.value;   // live DOM value (never stale in controlled inputs)

        // Combining-char styles (underline/strikethrough) look garbled in a plain
        // textarea. They render correctly in the output grid below.
        if (type === 'underline' || type === 'strikethrough' || type === 'double-underline') {
            return; // visible only in the preview grid
        }

        if (s === e) {
            // No selection → transform the whole textarea text
            setInput(applyStyle(val, type));
        } else {
            // Selection → transform only selected segment
            const before     = val.substring(0, s);
            const selected   = val.substring(s, e);
            const after      = val.substring(e);
            const transformed = applyStyle(selected, type);
            setInput(before + transformed + after);

            // Restore cursor after React re-renders the controlled textarea
            requestAnimationFrame(() => {
                el.focus();
                // Count code points in transformed to get correct end index
                const transformedCodePoints = [...transformed].length;
                // Each code point may be 1 or 2 code units; use the string length directly
                el.setSelectionRange(s, s + transformed.length);
            });
        }
    };

    // ── Emoji ──────────────────────────────────────────────────────────────
    const insertEmoji = (emoji: string) => {
        const el = textareaRef.current;
        if (!el) { setInput(p => p + emoji); setIsEmojiOpen(false); return; }
        const { s, e } = savedSel.current;
        const val = el.value;
        const next = val.substring(0, s) + emoji + val.substring(e);
        setInput(next);
        setIsEmojiOpen(false);
        requestAnimationFrame(() => {
            const pos = s + emoji.length;
            el.focus();
            el.setSelectionRange(pos, pos);
        });
    };

    // ── Hashtag ────────────────────────────────────────────────────────────
    const applyHashtag = () => {
        const el = textareaRef.current;
        if (!el) return;
        const { s, e } = savedSel.current;
        const val = el.value;
        if (s === e) {
            setInput(val.substring(0, s) + '#' + val.substring(s));
        } else {
            const selected = val.substring(s, e);
            const tagged = selected.trim().split(/\s+/).map(w => w.startsWith('#') ? w : '#' + w).join(' ');
            setInput(val.substring(0, s) + tagged + val.substring(e));
        }
    };

    // ── Case cycle ────────────────────────────────────────────────────────
    const cycleCase = () => {
        const el = textareaRef.current;
        if (!el) return;
        const { s, e } = savedSel.current;
        const val = el.value;
        const target = s === e ? val : val.substring(s, e);
        let result: string;
        if (target === target.toUpperCase()) result = target.toLowerCase();
        else if (target === target.toLowerCase()) result = target.replace(/\b\w/g, c => c.toUpperCase());
        else result = target.toUpperCase();
        setInput(s === e ? result : val.substring(0, s) + result + val.substring(e));
    };

    // ── Utilities ──────────────────────────────────────────────────────────
    const smartSpacing = () => setInput(p => p.split('\n').map(l => l.trim()).filter(Boolean).join('\n\n'));
    const applyBullets = () => setInput(p => p.split('\n').map(l => l.trim() ? `• ${l.replace(/^[•\-*]\s*/, '')}` : l).join('\n'));
    const applyNumbers = () => setInput(p => p.split('\n').map((l, i) => l.trim() ? `${i + 1}. ${l.replace(/^\d+\.\s*/, '')}` : l).join('\n'));
    const cleanText    = () => setInput(p => p.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim());

    // ── Shared button classes ──────────────────────────────────────────────
    const b = (extra = '') =>
        `flex items-center justify-center transition-all active:scale-95 select-none px-2.5 py-2 text-xs font-bold gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 ${extra}`;

    const group = 'flex bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm divide-x divide-slate-100 dark:divide-slate-700';

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: EDITOR ═══ */}
            <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                                <Type className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">The Workshop</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">LinkedIn Formatter</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full">
                            {input.length} chars
                        </span>
                    </div>

                    {/* ── Toolbar ── */}
                    <div className="px-4 py-3 space-y-2 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-slate-900/30">

                        {/* ROW 1 — Text style buttons */}
                        <div className="flex flex-wrap gap-2">
                            {/* Sans group: B I BI TT Ａ */}
                            <div className={group}>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('bold-sans'); }}
                                    className={b('rounded-l-xl rounded-r-none')} title="𝗕old Sans">
                                    <Bold className="w-3.5 h-3.5" />
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('italic-sans'); }}
                                    className={b('rounded-none')} title="𝘐talic Sans">
                                    <Italic className="w-3.5 h-3.5" />
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('bold-italic-sans'); }}
                                    className={b('rounded-none')} title="𝘽old 𝙄talic Sans">
                                    <span className="font-black italic">BI</span>
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('mono'); }}
                                    className={b('rounded-none')} title="𝙼ono Typewriter">
                                    <span className="font-mono font-black">TT</span>
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('fullwidth'); }}
                                    className={b('rounded-l-none rounded-r-xl')} title="Ｆullwidth">
                                    <span className="font-bold">Ａ</span>
                                </button>
                            </div>

                            {/* Serif group: B I Script Outline */}
                            <div className={group}>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('bold-serif'); }}
                                    className={b('rounded-l-xl rounded-r-none')} title="𝐁old Serif">
                                    <span className="font-serif font-black">B</span>
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('italic-serif'); }}
                                    className={b('rounded-none')} title="𝐼talic Serif">
                                    <span className="font-serif italic">I</span>
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('script'); }}
                                    className={b('rounded-none')} title="𝓢cript Bold">
                                    <Sparkles className="w-3.5 h-3.5" />
                                </button>
                                <button onMouseDown={e => { snap(); e.preventDefault(); handleStyle('double-struck'); }}
                                    className={b('rounded-l-none rounded-r-xl')} title="𝔻ouble-Struck Outline">
                                    <span className="font-black">𝔻</span>
                                </button>
                            </div>

                            {/* Emoji */}
                            <div className="relative">
                                <button
                                    onMouseDown={e => { snap(); }}
                                    onClick={() => setIsEmojiOpen(v => !v)}
                                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all text-sm font-bold">
                                    😊 <ChevronDown className={`w-3 h-3 transition-transform ${isEmojiOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isEmojiOpen && (
                                    <div className="absolute top-full left-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 w-[290px]">
                                        {/* Category tab bar */}
                                        <div className="flex border-b border-slate-100 dark:border-white/10 overflow-x-auto">
                                            {EMOJI_CATEGORIES.map((cat, idx) => (
                                                <button key={idx}
                                                    onClick={() => setEmojiTab(idx)}
                                                    className={`flex-shrink-0 px-2.5 py-2 text-base transition-all ${
                                                        emojiTab === idx
                                                            ? 'border-b-2 border-blue-500'
                                                            : 'opacity-50 hover:opacity-100'
                                                    }`}>
                                                    {cat.label.split(' ')[0]}
                                                </button>
                                            ))}
                                        </div>
                                        {/* Emoji grid */}
                                        <div className="p-2 grid grid-cols-8 gap-0.5 max-h-[180px] overflow-y-auto">
                                            {EMOJI_CATEGORIES[emojiTab].emojis.map((em: string) => (
                                                <button key={em}
                                                    onMouseDown={ev => { snap(); ev.preventDefault(); insertEmoji(em); }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-base">
                                                    {em}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hashtag */}
                            <button onMouseDown={e => { snap(); e.preventDefault(); applyHashtag(); }}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-xs font-black text-blue-600"
                                title="Select words → click to add #hashtag">
                                <Hash className="w-3.5 h-3.5" /> #
                            </button>
                        </div>

                        {/* ROW 2 — Utilities */}
                        <div className="flex flex-wrap gap-1.5">
                            <button onMouseDown={e => { snap(); e.preventDefault(); smartSpacing(); }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow hover:bg-blue-700 transition-all">
                                <Zap className="w-3 h-3" /> Space
                            </button>
                            <button onMouseDown={e => { snap(); e.preventDefault(); applyBullets(); }}
                                className={b('bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700')}>
                                <List className="w-3.5 h-3.5" /> Bullets
                            </button>
                            <button onMouseDown={e => { snap(); e.preventDefault(); applyNumbers(); }}
                                className={b('bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700')}>
                                <ListOrdered className="w-3.5 h-3.5" /> Nums
                            </button>
                            <button onMouseDown={e => { snap(); e.preventDefault(); cycleCase(); }}
                                className={b('bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700')}
                                title="UPPER → lower → Title Case">
                                <AlignLeft className="w-3.5 h-3.5" /> Case
                            </button>
                            <button onMouseDown={e => { snap(); e.preventDefault(); cleanText(); }}
                                className={b('bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700')}>
                                Clean
                            </button>
                            <button onMouseDown={e => { snap(); e.preventDefault(); setInput(''); }}
                                className="px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Textarea */}
                    <Textarea
                        ref={textareaRef}
                        placeholder={"Type or paste your LinkedIn post here...\n\n💡 Select text, then click B / I / TT to style it.\n💡 Click with no selection to style the whole post.\n💡 Click a different style button anytime — it auto-converts!"}
                        className="min-h-[300px] sm:min-h-[380px] border-0 rounded-none text-base font-medium bg-transparent focus:ring-0 resize-none leading-relaxed px-5 py-5 shadow-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>

                {/* Info */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold leading-relaxed">
                        <span className="font-black">Tip:</span> Underline &amp; Strikethrough use Unicode combining characters — see them in the <span className="font-black">Style Previews</span> on the right.
                    </p>
                </div>
            </div>

            {/* ═══ RIGHT: LIVE PREVIEW ═══ */}
            <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-sm font-black uppercase tracking-widest">Live Preview</p>
                        </div>
                        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            {(['desktop', 'mobile'] as const).map(mode => (
                                <button key={mode} onClick={() => setViewMode(mode)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                                    {mode === 'desktop' ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[680px] space-y-6">

                        {/* LinkedIn Simulator */}
                        <div className={`bg-white dark:bg-[#1b1f23] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-300 mx-auto ${viewMode === 'mobile' ? 'max-w-[390px]' : 'w-full'}`}>
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

                            <div className="px-4 pb-3">
                                <div className={`relative ${!isPreviewExpanded && input.split('\n').length > 6 ? 'max-h-[180px] overflow-hidden' : ''}`}>
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                                        {input || 'Your styled post appears here...\n\nStart typing on the left! ✨'}
                                    </pre>
                                    {!isPreviewExpanded && input.split('\n').length > 6 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white dark:from-[#1b1f23] to-transparent flex items-end">
                                            <button onClick={() => setIsPreviewExpanded(true)} className="text-sm font-bold text-slate-500 hover:text-blue-500">...see more</button>
                                        </div>
                                    )}
                                </div>
                                {isPreviewExpanded && (
                                    <button onClick={() => setIsPreviewExpanded(false)} className="text-sm font-bold text-blue-500 mt-2 block">Show less</button>
                                )}
                            </div>

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

                        {/* Style Outputs */}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 mb-3">All Styles Preview</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {OUTPUT_STYLES.map(style => {
                                    const preview = input || style.sample;
                                    const displayText = preview.substring(0, 100) + (preview.length > 100 ? '…' : '');
                                    // For output grid, always normalize first so previews are never blank
                                    const transformed = transformText(normalizeText(displayText), style.id);
                                    return (
                                        <div key={style.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 hover:border-blue-400/40 transition-all hover:shadow-lg flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{style.sample}</span>
                                                <CopyButton
                                                    text={transformText(normalizeText(input || style.sample), style.id)}
                                                    disabled={!input}
                                                    className="h-7 rounded-full text-[9px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
                                                />
                                            </div>
                                            <pre className="whitespace-pre-wrap break-words text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed min-h-[28px]">
                                                {transformed}
                                            </pre>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <Zap className="w-3 h-3 text-amber-500" /> CarouselGem Studio
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <Sparkles className="w-3 h-3 text-blue-500" /> v6.2 Pro
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
