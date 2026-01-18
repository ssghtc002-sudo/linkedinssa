'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ReadabilityOptimizer = () => {
    const [text, setText] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimize = async () => {
        if (!text.trim()) return;
        setIsOptimizing(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'rewrite',
                    topic: text,
                }),
            });

            if (!response.ok) throw new Error('Failed to optimize text');
            const data = await response.json();
            setText(data.result);
        } catch (error: any) {
            console.error('AI Optimization Error:', error);
        } finally {
            setIsOptimizing(false);
        }
    };


    // Simple syllable counter
    const countSyllables = (word: string) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 1;
    };

    const analyzeText = () => {
        if (!text.trim()) return null;

        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const totalWords = words.length;
        const totalSentences = sentences.length || 1;
        const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

        // Flesch Reading Ease Score
        // 206.835 - 1.015(total words/total sentences) - 84.6(total syllables/total words)
        const score = 206.835 -
            (1.015 * (totalWords / totalSentences)) -
            (84.6 * (totalSyllables / totalWords));

        return {
            score: Math.min(100, Math.max(0, Math.round(score))),
            words: totalWords,
            sentences: totalSentences,
            syllables: totalSyllables,
            avgSentenceLength: (totalWords / totalSentences).toFixed(1),
        };
    };

    const stats = analyzeText();

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-blue-500';
        if (score >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return 'Very Easy (5th grade)';
        if (score >= 80) return 'Easy (6th grade)';
        if (score >= 70) return 'Fairly Easy (7th grade)';
        if (score >= 60) return 'Standard (8th-9th grade) - Ideal for LinkedIn';
        if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
        if (score >= 30) return 'Difficult (College)';
        return 'Very Difficult (Professional)';
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 h-fit">
                <div className="flex items-center justify-between mb-2">
                    <Label>Your Post Content</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleOptimize}
                        disabled={!text.trim() || isOptimizing}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2 h-8"
                    >
                        {isOptimizing ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Optimizing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Optimize with AI
                            </>
                        )}
                    </Button>
                </div>
                <Textarea
                    placeholder="Paste your LinkedIn post here to analyze..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[300px] text-base resize-none p-4"
                />

            </Card>

            <div className="space-y-6">
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Readability Score</h3>
                    {stats ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className={`text-6xl font-black mb-2 ${stats.score >= 60 ? 'text-green-600' : 'text-orange-500'
                                    }`}>
                                    {stats.score}
                                </div>
                                <Badge variant="outline" className="text-base px-4 py-1">
                                    {getScoreLabel(stats.score)}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Complexity</span>
                                    <span>{100 - stats.score}%</span>
                                </div>
                                <Progress value={stats.score} className={`h-3 ${getScoreColor(stats.score)}`} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-muted-foreground text-sm">Word Count</div>
                                    <div className="font-bold text-xl">{stats.words}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground text-sm">Avg. Sentence Length</div>
                                    <div className="font-bold text-xl">{stats.avgSentenceLength} words</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Enter text to see your score</p>
                        </div>
                    )}
                </Card>

                {stats && (
                    <Card className="p-6 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            Suggestions
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {stats.score < 60 && (
                                <li className="flex gap-2">
                                    <span>•</span>
                                    <span>Your text is quite complex. Try shortening your sentences.</span>
                                </li>
                            )}
                            {stats.score < 60 && (
                                <li className="flex gap-2">
                                    <span>•</span>
                                    <span>Use simpler words where possible (e.g., "use" instead of "utilize").</span>
                                </li>
                            )}
                            {parseFloat(stats.avgSentenceLength) > 20 && (
                                <li className="flex gap-2">
                                    <span>•</span>
                                    <span>Break long paragraphs into shorter chunks for better mobile readability.</span>
                                </li>
                            )}
                            {stats.score >= 60 && (
                                <li className="text-green-600 font-medium">
                                    Great job! Your text is clear and readable for a general audience.
                                </li>
                            )}
                        </ul>
                    </Card>
                )}
            </div>
        </div>
    );
};
