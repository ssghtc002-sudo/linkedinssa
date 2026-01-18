'use client';
import React from 'react';
import { Slide } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SlideCard } from './SlideCard';

interface SlideListProps {
    slides: Slide[];
    setSlides: (slides: Slide[]) => void;
}

export const SlideList: React.FC<SlideListProps> = ({ slides, setSlides }) => {

    const addSlide = () => {
        const newSlide: Slide = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Slide',
            content: 'Add your content here.',
            layout: 'left'
        };
        setSlides([...slides, newSlide]);
    };

    const removeSlide = (id: string) => {
        if (slides.length <= 1) return; // Prevent deleting last slide
        setSlides(slides.filter((s) => s.id !== id));
    };

    const updateSlide = (id: string, field: keyof Slide, value: string) => {
        setSlides(
            slides.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
    };

    const moveSlide = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === slides.length - 1) return;

        const newSlides = [...slides];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
        setSlides(newSlides);
    };

    const duplicateSlide = (index: number) => {
        const slideToCopy = slides[index];
        const newSlide: Slide = {
            ...slideToCopy,
            id: Math.random().toString(36).substr(2, 9),
            title: `${slideToCopy.title} (Copy)`
        };
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, newSlide);
        setSlides(newSlides);
    };

    return (
        <div className="space-y-0 pb-16">
            <div className="flex justify-between items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 px-2.5 py-1.5 border-b border-border/10 shadow-sm">
                <div>
                    <h3 className="text-[10px] font-bold text-foreground">Slides ({slides.length})</h3>
                </div>
                <Button onClick={addSlide} size="icon" className="h-5 w-5 text-xs shadow-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                    <Plus className="w-3 h-3" />
                </Button>
            </div>

            <div className="space-y-1.5 px-2.5 py-2">
                {slides.map((slide, index) => (
                    <SlideCard
                        key={slide.id}
                        slide={slide}
                        index={index}
                        totalSlides={slides.length}
                        onUpdate={(field, value) => updateSlide(slide.id, field, value)}
                        onMoveUp={() => moveSlide(index, 'up')}
                        onMoveDown={() => moveSlide(index, 'down')}
                        onDuplicate={() => duplicateSlide(index)}
                        onDelete={() => removeSlide(slide.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < slides.length - 1}
                    />
                ))}
            </div>

            <div className="px-2.5 pb-3">
                <Button onClick={addSlide} variant="ghost" className="w-full border border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5 h-7 text-muted-foreground hover:text-primary transition-all text-[9px] uppercase tracking-wide rounded-md">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Slide
                </Button>
            </div>
        </div>
    );
};
