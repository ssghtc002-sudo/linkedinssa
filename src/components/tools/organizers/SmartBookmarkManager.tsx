'use client';

import { useState, useEffect } from 'react';
import {
    Bookmark, ExternalLink, Trash2, Tag, Search, Plus,
    Zap, Star, BookmarkIcon, Info, FolderOpen, Copy, Check,
    StickyNote, BarChart3, X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookmarkItem {
    id: string;
    url: string;
    title: string;
    category: string;
    note: string;
    date: string;
    starred: boolean;
}

const CATEGORIES = ['All', 'Inspiration', 'Competitors', 'Tools', 'Learning', 'Templates', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
    Inspiration: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    Competitors:  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    Tools:        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Learning:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Templates:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Other:        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

// ─── Component ────────────────────────────────────────────────────────────────
export const SmartBookmarkManager = () => {
    const [bookmarks, setBookmarks]       = useState<BookmarkItem[]>([]);
    const [url, setUrl]                   = useState('');
    const [title, setTitle]               = useState('');
    const [note, setNote]                 = useState('');
    const [category, setCategory]         = useState('Inspiration');
    const [filter, setFilter]             = useState('All');
    const [search, setSearch]             = useState('');
    const [showStarred, setShowStarred]   = useState(false);
    const [copiedId, setCopiedId]         = useState('');
    const [expandedId, setExpandedId]     = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('linkedin-bookmarks-v2');
        if (saved) setBookmarks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('linkedin-bookmarks-v2', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = () => {
        if (!url.trim() || !title.trim()) return;
        const item: BookmarkItem = {
            id: Date.now().toString(),
            url: url.startsWith('http') ? url : `https://${url}`,
            title: title.trim(),
            category,
            note: note.trim(),
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            starred: false,
        };
        setBookmarks(prev => [item, ...prev]);
        setUrl(''); setTitle(''); setNote('');
        setCategory('Inspiration');
    };

    const remove    = (id: string) => setBookmarks(prev => prev.filter(b => b.id !== id));
    const toggleStar = (id: string) => setBookmarks(prev =>
        prev.map(b => b.id === id ? { ...b, starred: !b.starred } : b));

    const copyUrl = async (id: string, link: string) => {
        await navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 1500);
    };

    const filtered = bookmarks.filter(b => {
        if (showStarred && !b.starred) return false;
        if (filter !== 'All' && b.category !== filter) return false;
        const q = search.toLowerCase();
        return !q || b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q) || b.note.toLowerCase().includes(q);
    });

    const counts = CATEGORIES.reduce((acc, c) => ({
        ...acc,
        [c]: c === 'All' ? bookmarks.length : bookmarks.filter(b => b.category === c).length,
    }), {} as Record<string, number>);

    return (
        <div className="grid lg:grid-cols-12 gap-6 items-start">

            {/* ═══ LEFT: ADD PANEL ═══ */}
            <div className="lg:col-span-4 space-y-4">
                <div className="rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                                <BookmarkIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black tracking-tight text-slate-800 dark:text-white">Vault</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{bookmarks.length} saved</p>
                            </div>
                        </div>
                        <button onClick={() => setShowStarred(v => !v)}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${showStarred ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500'}`}>
                            <Star className="w-3 h-3" /> Starred
                        </button>
                    </div>

                    {/* Form */}
                    <div className="px-4 py-3 space-y-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Bookmark</p>

                        <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                            placeholder="https://linkedin.com/posts/..."
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-slate-300 dark:placeholder:text-slate-600" />

                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addBookmark()}
                            placeholder="e.g. Masterclass Hook Design"
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-slate-300 dark:placeholder:text-slate-600" />

                        <textarea value={note} onChange={e => setNote(e.target.value)}
                            placeholder="Quick note (optional)..."
                            rows={2}
                            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600" />

                        {/* Category pills */}
                        <div className="flex flex-wrap gap-1.5">
                            {CATEGORIES.filter(c => c !== 'All').map(c => (
                                <button key={c} onClick={() => setCategory(c)}
                                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${
                                        category === c
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
                                    }`}>
                                    {c}
                                </button>
                            ))}
                        </div>

                        <button onClick={addBookmark}
                            disabled={!url.trim() || !title.trim()}
                            className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2">
                            <Plus className="w-3.5 h-3.5" /> Save Bookmark
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="px-4 py-3 grid grid-cols-3 gap-2">
                        {CATEGORIES.slice(1, 4).map(c => (
                            <div key={c} className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                                <p className="text-sm font-black text-slate-700 dark:text-white">{counts[c] || 0}</p>
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{c}</p>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 pb-4">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-blue-700 dark:text-blue-300 font-medium leading-relaxed">Saved in your browser — no login, no cloud, works offline.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ RIGHT: FEED ═══ */}
            <div className="lg:col-span-8 space-y-4">

                {/* Search + filter bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search bookmarks..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setFilter(c)}
                                className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-1 border ${
                                    filter === c
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-400'
                                }`}>
                                {c}
                                <span className={`text-[8px] ${filter === c ? 'text-blue-200' : 'text-slate-400'}`}>
                                    {counts[c] || 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookmark cards */}
                {filtered.length > 0 ? (
                    <div className="space-y-2">
                        {filtered.map(b => (
                            <div key={b.id}
                                className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 hover:shadow-md hover:shadow-blue-500/5 transition-all overflow-hidden">
                                <div className="p-4 flex items-start gap-3">
                                    {/* Star */}
                                    <button onClick={() => toggleStar(b.id)}
                                        className={`mt-0.5 shrink-0 transition-colors ${b.starred ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700 hover:text-amber-400'}`}>
                                        <Star className={`w-4 h-4 ${b.starred ? 'fill-amber-400' : ''}`} />
                                    </button>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${CATEGORY_COLORS[b.category] || CATEGORY_COLORS.Other}`}>
                                                {b.category}
                                            </span>
                                            <span className="text-[9px] text-slate-400 font-medium">{b.date}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight mb-1 truncate">{b.title}</p>
                                        <a href={b.url} target="_blank" rel="noopener noreferrer"
                                            className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 truncate font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                            {b.url.replace(/^https?:\/\//, '').substring(0, 55)}{b.url.length > 60 ? '…' : ''}
                                        </a>
                                        {b.note && (
                                            <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2.5 py-1.5 leading-relaxed">
                                                {b.note}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        <button onClick={() => copyUrl(b.id, b.url)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-500 transition-all">
                                            {copiedId === b.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                        <button onClick={() => remove(b.id)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-500 transition-all">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-4">
                            <Bookmark className="w-8 h-8 text-slate-200 dark:text-slate-700" />
                        </div>
                        <p className="font-bold text-slate-400 mb-1">
                            {bookmarks.length === 0 ? 'Your vault is empty' : 'No results'}
                        </p>
                        <p className="text-xs text-slate-400/70 max-w-xs">
                            {bookmarks.length === 0
                                ? 'Start saving LinkedIn posts, tools, and inspiration that fuel your content.'
                                : 'Try a different search term or category filter.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
