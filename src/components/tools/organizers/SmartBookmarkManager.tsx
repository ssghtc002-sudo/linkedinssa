'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark, ExternalLink, Trash2, Tag, Search, Plus } from 'lucide-react';

interface BookmarkItem {
    id: string;
    url: string;
    title: string;
    category: string;
    date: string;
}

const categories = ['All', 'Inspiration', 'Competitors', 'Tools', 'Learning', 'Other'];

export const SmartBookmarkManager = () => {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Inspiration');
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('linkedin-bookmarks');
        if (saved) {
            setBookmarks(JSON.parse(saved));
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('linkedin-bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = () => {
        if (!url || !title) return;

        const newBookmark: BookmarkItem = {
            id: Date.now().toString(),
            url: url.startsWith('http') ? url : `https://${url}`,
            title,
            category,
            date: new Date().toLocaleDateString()
        };

        setBookmarks([newBookmark, ...bookmarks]);
        setUrl('');
        setTitle('');
        setCategory('Inspiration');
    };

    const removeBookmark = (id: string) => {
        setBookmarks(bookmarks.filter(b => b.id !== id));
    };

    const filteredBookmarks = bookmarks.filter(b => {
        const matchesCategory = filter === 'All' || b.category === filter;
        const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.url.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar / Add Section */}
            <Card className="p-6 h-fit lg:col-span-1 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <Bookmark className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Add New Bookmark</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://linkedin.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Great carousel example"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.filter(c => c !== 'All').map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={addBookmark} className="w-full" disabled={!url || !title}>
                        <Plus className="w-4 h-4 mr-2" />
                        Save Bookmark
                    </Button>
                </div>

                <div className="pt-6 border-t">
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <Badge
                                key={c}
                                variant={filter === c ? 'default' : 'outline'}
                                className="cursor-pointer"
                                onClick={() => setFilter(c)}
                            >
                                {c}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Main List Section */}
            <Card className="p-6 lg:col-span-2 min-h-[500px] bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bookmarks..."
                            className="pl-9 bg-white dark:bg-slate-950"
                        />
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {filteredBookmarks.length} items
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredBookmarks.length > 0 ? (
                        filteredBookmarks.map(bookmark => (
                            <div
                                key={bookmark.id}
                                className="group flex items-center justify-between p-4 bg-white dark:bg-slate-950 rounded-lg border hover:border-blue-300 transition-all shadow-sm"
                            >
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{bookmark.category}</Badge>
                                        <span className="text-xs text-muted-foreground">{bookmark.date}</span>
                                    </div>
                                    <h4 className="font-medium truncate">{bookmark.title}</h4>
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline truncate block"
                                    >
                                        {bookmark.url}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                                    >
                                        <ExternalLink className="w-4 h-4 text-slate-500" />
                                    </a>
                                    <button
                                        onClick={() => removeBookmark(bookmark.id)}
                                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No bookmarks found</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
