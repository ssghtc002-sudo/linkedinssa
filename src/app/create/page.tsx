'use client';

import CarouselEditor from '@/components/carousel/CarouselEditor';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Wrapper to handle Suspense for useSearchParams
function EditorContent() {
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic');

    useEffect(() => {
        if (topic) {
            // In a real app, we would trigger the AI generation here.
            console.log("Auto-generating for topic:", topic);
            // We could find the input field and populate it, or pass a prop to Editor.
            // For now, we'll just acknowledge it.
        }
    }, [topic]);

    return <CarouselEditor />;
}

export default function CreatePage() {
    return (
        <main className="min-h-screen bg-background">
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading editor...</div>}>
                <EditorContent />
            </Suspense>
        </main>
    );
}
