'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EditableTextProps {
    value: string;
    onChange: (newValue: string) => void;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    multiline?: boolean;
}

export function EditableText({ value, onChange, className, style, placeholder, multiline = false }: EditableTextProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        autoResize();
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                autoResize();
            }}
            placeholder={placeholder}
            rows={1}
            style={style}
            className={cn(
                "w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none resize-none overflow-hidden placeholder:text-slate-400/30 transition-shadow transition-colors rounded hover:bg-black/[0.02] dark:hover:bg-white/[0.02] focus:bg-black/[0.05] dark:focus:bg-white/[0.05]",
                className
            )}
            onKeyDown={(e) => {
                if (!multiline && e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.blur();
                }
            }}
        />
    );
}
