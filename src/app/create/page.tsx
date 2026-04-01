'use client';

import { EditorLayoutV5 } from "@/components/carousel/v5/EditorLayout";
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function EditorContent() {
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic');

    // Here you could automatically fire off an AI generation if 'topic' exists
    useEffect(() => {
        if (topic) {
            console.log('Generating for topic:', topic);
        }
    }, [topic]);

    return <EditorLayoutV5 />;
}

export default function CreatePage() {
    return (
        <main className="w-screen h-screen overflow-hidden bg-background">
            <Suspense fallback={<div className="flex items-center justify-center h-screen text-muted-foreground animate-pulse">Initializing Studio V5...</div>}>
                <EditorContent />
            </Suspense>
        </main>
    );
}
