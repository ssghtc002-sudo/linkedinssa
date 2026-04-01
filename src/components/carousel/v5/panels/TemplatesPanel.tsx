'use client';

import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { Layout, Palette, Blocks, Shapes, Star, Sparkles, Image as ImageIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PRESET_TEMPLATES } from '@/lib/types';
import { useState } from 'react';

export function TemplatesPanel() {
    const { settings, updateSettings, updateSlides, slides, setSettings } = useEditor();
    const [searchQuery, setSearchQuery] = useState('');

    const applyTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
        setSettings({ ...settings, ...template.settings });
        toast.success(`Applied ${template.name} Style`, {
            description: template.description,
            icon: <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        });
    };

    const filteredTemplates = PRESET_TEMPLATES.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const proTemplates = filteredTemplates.filter(t => !t.id.startsWith('img-'));
    const imageTemplates = filteredTemplates.filter(t => t.id.startsWith('img-'));

    return (
        <div className="space-y-10 pb-32">
            
            {/* Search Bar */}
            <div className="relative group px-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search templates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-11 pr-4 text-[10px] font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
            </div>

            {/* Pro Mesh & Neon Collection */}
            {proTemplates.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            <label className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.2em] block">Pro Procedural</label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {proTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => applyTemplate(template)}
                                className={cn(
                                    "p-3 rounded-[2.2rem] border text-left transition-all duration-300 relative group overflow-hidden flex flex-col gap-3",
                                    settings.backgroundColor === template.settings.backgroundColor && settings.backgroundType !== 'image'
                                        ? "bg-blue-500/5 border-blue-400 dark:bg-blue-900/10 shadow-lg ring-1 ring-blue-500/20 scale-[0.98]" 
                                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 hover:border-blue-300"
                                )}
                            >
                                <div className={cn("w-full h-20 rounded-2xl flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 relative overflow-hidden", template.thumbnail)}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="px-1 min-w-0">
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.05em] text-slate-800 dark:text-slate-100 truncate">{template.name}</h3>
                                    <p className="text-[7.5px] font-bold text-slate-400 truncate tracking-tight">{template.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Premium Image Collection */}
            {imageTemplates.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                            <label className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] block">Asset Collection</label>
                        </div>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">HQ ASSETS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {imageTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => applyTemplate(template)}
                                className={cn(
                                    "p-3 rounded-[2.2rem] border text-left transition-all duration-300 relative group overflow-hidden flex flex-col gap-3",
                                    settings.backgroundImage === template.settings.backgroundImage && settings.backgroundType === 'image'
                                        ? "bg-indigo-500/5 border-indigo-400 dark:bg-indigo-900/10 shadow-lg ring-1 ring-indigo-500/20 scale-[0.98]" 
                                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 hover:border-indigo-300"
                                )}
                            >
                                <div className="w-full h-20 rounded-2xl shadow-sm ring-1 ring-black/5 relative overflow-hidden bg-slate-100 dark:bg-white/5">
                                    <img 
                                        src={template.settings.backgroundImage} 
                                        alt="" 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                </div>

                                <div className="px-1 min-w-0">
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.05em] text-slate-800 dark:text-slate-100 truncate">{template.name}</h3>
                                    <p className="text-[7.5px] font-bold text-slate-400 truncate tracking-tight">{template.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Global Context Footer */}
            <div className="mt-8 p-6 rounded-[2.5rem] bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/10 space-y-5">
                <div className="flex flex-col items-center text-center gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">One-Click Layout</label>
                    <p className="text-[8px] font-bold text-slate-400/60 uppercase tracking-tighter">Sync structure across all slides</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: 'center', label: 'Center All', icon: Layout },
                        { id: 'left', label: 'Left Aligned', icon: Layout },
                    ].map((l) => (
                        <button
                            key={l.id}
                            onClick={() => {
                                const newSlides = slides.map(s => ({ ...s, layout: l.id as any }));
                                updateSlides(newSlides);
                                toast.success(`Applied ${l.label} to all slides`);
                            }}
                            className="group flex flex-col items-center gap-2 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-[9px] font-black uppercase tracking-tight text-slate-500 hover:text-blue-500 hover:border-blue-400 transition-all shadow-sm active:scale-95"
                        >
                            <l.icon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                            {l.id}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
