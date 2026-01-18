'use client';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
    text: string;
    label?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    disabled?: boolean;
}

export const CopyButton = ({
    text,
    label = 'Copy',
    variant = 'outline',
    size = 'sm',
    className = '',
    disabled = false
}: CopyButtonProps) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            onClick={handleCopy}
            variant={copied ? 'default' : variant}
            size={size}
            disabled={disabled}
            className={`transition-all ${copied ? 'bg-green-600 hover:bg-green-700' : ''} ${className}`}
        >

            {copied ? (
                <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4 mr-2" />
                    {label}
                </>
            )}
        </Button>
    );
};
