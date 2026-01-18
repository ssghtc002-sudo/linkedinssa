import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">
                <div
                    className="w-10 h-10 rounded-md border shadow-sm shrink-0"
                    style={{ backgroundColor: color }}
                />
                <Input
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 cursor-pointer p-1"
                />
                <Input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-24 font-mono uppercase"
                />
            </div>
        </div>
    );
};
