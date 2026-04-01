'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StudioLoader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 15;
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[500] bg-slate-50 dark:bg-[#0b0c10] flex flex-col items-center justify-center animate-in fade-in duration-500">
            
            {/* Background Mesh (Subtle) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] animate-pulse" />
            </div>

            <div className="relative flex flex-col items-center gap-8">
                
                {/* Logo Animation */}
                <div className="flex items-center gap-3 animate-bounce shadow-2xl shadow-blue-500/10 p-6 rounded-[3rem] bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl animate-pulse ring-4 ring-blue-500/20">
                        <Sparkles className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <span className="font-black text-3xl tracking-tighter text-slate-900 dark:text-white">
                        Carousel<span className="text-blue-600 dark:text-blue-400">Gem</span>
                    </span>
                </div>

                {/* Loading Bar Group */}
                <div className="w-64 space-y-3">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/60 dark:text-blue-400/60 animate-pulse">
                            Optimizing Workspace
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    
                    {/* The Rail */}
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        {/* The Actual Progress Bar */}
                        <div 
                            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Funky Tech Detail */}
                    <div className="flex justify-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "w-1 h-1 rounded-full transition-all duration-500",
                                    progress > (i + 1) * 20 ? "bg-blue-500 scale-125" : "bg-slate-300 dark:bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Subtitle */}
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-4">
                    Preparing Professional Assets...
                </p>
            </div>

            {/* Technical Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
