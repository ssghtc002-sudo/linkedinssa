import React from 'react';
import { useEditor } from '../../v2/context/EditorContext';
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Slide } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SlideEditorTab() {
    const { slides, updateSlides, updateSlide, activeSlideId, setActiveSlideId } = useEditor();

    const addSlide = () => {
        const newSlide: Slide = {
            id: Date.now().toString(),
            title: 'New Slide',
            content: 'Write something amazing here...',
            slideType: 'standard',
            layout: 'left'
        };
        updateSlides([...slides, newSlide]);
        setActiveSlideId(newSlide.id);
    };

    const deleteSlide = (id: string) => {
        if (slides.length <= 1) return;
        const newSlides = slides.filter(s => s.id !== id);
        updateSlides(newSlides);
        if (activeSlideId === id) {
            setActiveSlideId(newSlides[0].id);
        }
    };

    const moveSlide = (index: number, direction: -1 | 1) => {
        if (index + direction < 0 || index + direction >= slides.length) return;
        const newSlides = [...slides];
        const temp = newSlides[index];
        newSlides[index] = newSlides[index + direction];
        newSlides[index + direction] = temp;
        updateSlides(newSlides);
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 pb-12">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold opacity-80 uppercase tracking-widest">Your Slides</h3>
                <button 
                    onClick={addSlide}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" /> ADD SLIDE
                </button>
            </div>

            <div className="space-y-3">
                {slides.map((s, i) => {
                    const isActive = s.id === activeSlideId;
                    
                    return (
                        <div 
                            key={s.id}
                            className={cn(
                                "border rounded-xl bg-white dark:bg-[#111] overflow-hidden transition-all duration-200",
                                isActive 
                                    ? "ring-2 ring-blue-500/50 border-blue-500/20 shadow-md" 
                                    : "border-border/10 hover:border-border/30 cursor-pointer"
                            )}
                            onClick={() => !isActive && setActiveSlideId(s.id)}
                        >
                            {/* Slide Header (Always visible) */}
                            <div className="flex items-center justify-between p-3 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-muted-foreground/30 hidden md:block" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Slide {i + 1}</span>
                                    {!isActive && <span className="text-sm font-medium opacity-70 truncate max-w-[150px] md:max-w-xs ml-2">{s.title || 'Empty Slide'}</span>}
                                </div>
                                <div className="flex items-center gap-1">
                                    {isActive && (
                                        <>
                                            <button onClick={(e) => { e.stopPropagation(); moveSlide(i, -1); }} disabled={i === 0} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md disabled:opacity-30 transition-colors"><ChevronUp className="w-4 h-4 text-muted-foreground" /></button>
                                            <button onClick={(e) => { e.stopPropagation(); moveSlide(i, 1); }} disabled={i === slides.length - 1} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md disabled:opacity-30 transition-colors"><ChevronDown className="w-4 h-4 text-muted-foreground" /></button>
                                            <div className="w-[1px] h-4 bg-border/40 mx-1" />
                                            <button onClick={(e) => { e.stopPropagation(); deleteSlide(s.id); }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Slide Content (Only visible if active) */}
                            {isActive && (
                                <div className="p-4 md:p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {s.showTagline !== false && (
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Tagline</label>
                                            <input 
                                                className="w-full text-sm font-bold uppercase tracking-widest text-[#555] dark:text-[#aaa] bg-[#f5f5f5] dark:bg-[#222] border-0 focus:ring-1 focus:ring-blue-500/50 rounded-lg p-3"
                                                value={s.tagline || ''}
                                                onChange={e => updateSlide(s.id, 'tagline', e.target.value)}
                                                placeholder="OPTIONAL TAGLINE"
                                            />
                                        </div>
                                    )}
                                    
                                    {s.slideType !== 'quote' && (
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Main Title</label>
                                            <input 
                                                className="w-full text-base font-bold text-foreground bg-[#f5f5f5] dark:bg-[#222] border-0 focus:ring-1 focus:ring-blue-500/50 rounded-lg p-3"
                                                value={s.title}
                                                onChange={e => updateSlide(s.id, 'title', e.target.value)}
                                                placeholder="Slide Title..."
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block">Body Content</label>
                                        <textarea 
                                            className="w-full text-sm text-foreground/80 bg-[#f5f5f5] dark:bg-[#222] border-0 focus:ring-1 focus:ring-blue-500/50 rounded-lg p-3 resize-none"
                                            value={s.content}
                                            onChange={e => updateSlide(s.id, 'content', e.target.value)}
                                            placeholder="Write your content here..."
                                            rows={4}
                                        />
                                    </div>
                                    
                                    <div className="pt-2">
                                        <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider block mb-2">Slide Layout Format</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {['list', 'quote', 'center', 'left'].map(l => (
                                                <button
                                                    key={l}
                                                    onClick={() => updateSlide(s.id, 'layout', l)}
                                                    className={cn(
                                                        "py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors",
                                                        s.layout === l 
                                                            ? "bg-slate-800 text-white dark:bg-white dark:text-black" 
                                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                    )}
                                                >
                                                    {l}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
