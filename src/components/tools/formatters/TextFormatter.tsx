'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CopyButton } from '../shared/CopyButton';

const boldSansMap: Record<string, string> = {
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const italicMap: Record<string, string> = {
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
};

function transformText(text: string, type: 'bold' | 'italic' | 'underline' | 'staircase') {
    if (type === 'bold') {
        return text.split('').map(char => boldSansMap[char] || char).join('');
    }
    if (type === 'italic') {
        return text.split('').map(char => italicMap[char] || char).join('');
    }
    if (type === 'underline') {
        return text.split('').map(c => c + '\u0332').join('');
    }
    if (type === 'staircase') {
        let indent = 0;
        return text.split('\n').map(line => {
            const spaces = ' '.repeat(indent * 2);
            if (line.trim().length > 0) indent++;
            return spaces + "↳ " + line;
        }).join('\n');
    }
    return text;
}

export const TextFormatter = () => {
    const [input, setInput] = useState('');

    const styles = [
        { name: 'Bold (Sans)', type: 'bold' as const, preview: '𝗕𝗼𝗹𝗱 𝗧𝗲𝘅𝘁' },
        { name: 'Italic (Sans)', type: 'italic' as const, preview: 'Italic Text' },
        { name: 'Underline', type: 'underline' as const, preview: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲' },
        { name: 'Staircase Mode', type: 'staircase' as const, preview: '↳ Staircase' },
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-8 h-full">
            <Card className="p-6 h-fit lg:min-h-[600px] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Input Text</h3>
                    <div className="text-xs text-muted-foreground">{input.length} chars</div>
                </div>
                <Textarea
                    placeholder="Type your text here to format it..."
                    className="flex-1 min-h-[300px] text-lg resize-none p-4"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Formatted Results</h3>
                <div className="grid gap-4">
                    {styles.map((style) => (
                        <Card key={style.type} className="p-4 bg-slate-50 dark:bg-slate-900/50">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                                    {style.name}
                                    <span className="text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">{style.preview}</span>
                                </div>
                                <CopyButton
                                    text={transformText(input, style.type)}
                                    disabled={!input}
                                    size="sm"
                                    variant="ghost"
                                />
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-3 rounded border min-h-[60px] whitespace-pre-wrap leading-relaxed">
                                {input ? transformText(input, style.type) : <span className="text-muted-foreground opacity-50 italic">Preview...</span>}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
