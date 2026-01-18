'use client';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    onClick: () => void;
    label?: string;
    disabled?: boolean;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
}

export const DownloadButton = ({
    onClick,
    label = 'Download',
    disabled = false,
    variant = 'default',
    size = 'default',
    className = ''
}: DownloadButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            size={size}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white ${className}`}
        >
            <Download className="w-4 h-4 mr-2" />
            {label}
        </Button>
    );
};
