'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Sparkles, RefreshCw, Settings2, Target, Type, MessageSquare, Briefcase, Zap, PenTool } from 'lucide-react';
import { CopyButton } from '../shared/CopyButton';

interface PostGeneratorProps {
    type: 'post' | 'headline' | 'summary';
}

export const PostGenerator = ({ type }: PostGeneratorProps) => {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('professional');
    const [audience, setAudience] = useState('General Professionals');
    const [format, setFormat] = useState('Standard Post');
    const [cta, setCta] = useState('None');
    
    const [showAdvanced, setShowAdvanced] = useState(false);
    
    const [result, setResult] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        
        let enhancedTopic = topic;
        
        // Inject advanced directives invisibly into the topic payload
        if (type === 'post') {
            enhancedTopic = `Main Topic: ${topic}\n\nTarget Audience: ${audience}\nDesired Format: ${format}\nCall To Action: ${cta}`;
        }
        
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    topic: enhancedTopic,
                    tone,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate content');
            const data = await response.json();
            setResult(data.result);
        } catch (error: any) {
            console.error('AI Generation Error:', error);
            setResult('Error: Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const labels = {
        post: { label: 'What do you want to write about?', placeholder: 'e.g. My top 3 lessons learned after failing my first startup...' },
        headline: { label: 'Describe your expertise & goals', placeholder: 'e.g. B2B SaaS Marketer helping companies scale MRR...' },
        summary: { label: 'Summarize your career journey', placeholder: 'e.g. 10 years experience transitioning from sales to software engineering...' }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Input Configurator (Left Column) */}
            <div className="lg:col-span-5 space-y-6">
                <div className="p-6 md:p-8 rounded-[2rem] bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white dark:border-slate-800/60 shadow-[inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-none transition-all relative overflow-hidden">
                    {/* Subtle Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <PenTool className="w-5 h-5 text-blue-500" />
                                {labels[type].label}
                            </Label>
                            <Textarea
                                placeholder={labels[type].placeholder}
                                className="min-h-[140px] text-base resize-none bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500/50 rounded-2xl shadow-sm leading-relaxed"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        {/* Tone & Quick Settings */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tone of Voice</Label>
                                <Select value={tone} onValueChange={setTone}>
                                    <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-11 text-sm font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="viral">Viral / Bold</SelectItem>
                                        <SelectItem value="storytelling">Storytelling</SelectItem>
                                        <SelectItem value="casual">Casual / Personal</SelectItem>
                                        <SelectItem value="funny">Humorous</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Language</Label>
                                <Select defaultValue="english">
                                    <SelectTrigger className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-11 text-sm font-medium">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English (US)</SelectItem>
                                        <SelectItem value="uk">English (UK)</SelectItem>
                                        <SelectItem value="spanish">Spanish</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {type === 'post' && (
                            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                                <button 
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors w-full justify-between group"
                                >
                                    <span className="flex items-center gap-2">
                                        <Settings2 className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                        Advanced Target Settings
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">{showAdvanced ? 'Hide' : 'Show'}</span>
                                </button>
                                
                                <div className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${showAdvanced ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Target className="w-3.5 h-3.5"/> Target Audience</Label>
                                        <Select value={audience} onValueChange={setAudience}>
                                            <SelectTrigger className="rounded-xl bg-white dark:bg-slate-950 h-11 font-medium text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General Professionals">General Professionals</SelectItem>
                                                <SelectItem value="Founders & Entrepreneurs">Founders & Entrepreneurs</SelectItem>
                                                <SelectItem value="Recruiters & Hiring Managers">Recruiters & Hiring</SelectItem>
                                                <SelectItem value="Engineers & Developers">Engineers & Developers</SelectItem>
                                                <SelectItem value="Marketers">Marketers</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Type className="w-3.5 h-3.5"/> Post Format</Label>
                                        <Select value={format} onValueChange={setFormat}>
                                            <SelectTrigger className="rounded-xl bg-white dark:bg-slate-950 h-11 font-medium text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Standard Post">Standard Post</SelectItem>
                                                <SelectItem value="Contrarian Take (Hot Take)">Contrarian Take</SelectItem>
                                                <SelectItem value="Step-by-Step Guide">Step-by-Step Guide</SelectItem>
                                                <SelectItem value="Hero's Journey Story">Hero's Journey Story</SelectItem>
                                                <SelectItem value="Listicle">Listicle / Bullet Points</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5"/> Call-To-Action (Bottom)</Label>
                                        <Select value={cta} onValueChange={setCta}>
                                            <SelectTrigger className="rounded-xl bg-white dark:bg-slate-950 h-11 font-medium text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="None">None</SelectItem>
                                                <SelectItem value="Ask a provocative question">Ask a question</SelectItem>
                                                <SelectItem value="Encourage 'Agree/Disagree' debate">Encourage Debate</SelectItem>
                                                <SelectItem value="Drive to Link in bio / comments">Drive to Link</SelectItem>
                                                <SelectItem value="Follow for more content like this">Follow Request</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={handleGenerate}
                            disabled={!topic || isGenerating}
                            className={`w-full h-14 rounded-2xl text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 relative overflow-hidden group border-0 text-white ${isGenerating ? 'opacity-90 pointer-events-none' : ''}`}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-[200%] -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></div>
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                                    Synthesizing AI Post...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-all duration-300" />
                                    Generate {type === 'post' ? 'Viral Post' : type === 'headline' ? 'Headline' : 'Summary'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Output Preview (Right Column) */}
            <div className="lg:col-span-7 h-full flex flex-col min-h-full">
                <div className="p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-[#1b1f23] border border-slate-200 dark:border-white/10 shadow-xl flex-1 flex flex-col relative h-full transition-all duration-500">
                    {/* Fake LinkedIn Header */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 lg:w-14 lg:h-14 shrink-0 shadow-inner">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Your LinkedIn Feed</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] md:max-w-xs">{audience !== 'General Professionals' ? `Targeting: ${audience}` : 'Senior Professional • Innovator'}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 flex items-center gap-1">Just now <span className="w-1 h-1 bg-slate-300 rounded-full"></span> 🌍</p>
                            </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <CopyButton text={result} disabled={!result} />
                        </div>
                    </div>

                    {/* Editor / Render Box */}
                    <div className="flex-1 relative min-h-[400px]">
                        {isGenerating ? (
                            <div className="space-y-4 animate-pulse p-2">
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-11/12"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-4/6 mt-6"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-4/6"></div>
                                <div className="flex gap-2 mt-8">
                                    <div className="h-5 bg-blue-100 dark:bg-blue-900/30 text-transparent rounded w-16"></div>
                                    <div className="h-5 bg-blue-100 dark:bg-blue-900/30 text-transparent rounded w-20"></div>
                                    <div className="h-5 bg-blue-100 dark:bg-blue-900/30 text-transparent rounded w-24"></div>
                                </div>
                            </div>
                        ) : result ? (
                            <Textarea
                                value={result}
                                onChange={(e) => setResult(e.target.value)}
                                className="w-full h-full min-h-[400px] bg-transparent border-0 resize-none focus-visible:ring-0 p-2 text-[15px] md:text-base leading-relaxed text-slate-800 dark:text-slate-200 selection:bg-blue-200 selection:text-blue-900"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                                <div className="text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-white/5 shadow-sm">
                                        <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">Feed Simulation Ready</p>
                                    <p className="text-sm text-slate-400/80 leading-relaxed max-w-sm mx-auto">
                                        Configure your post on the left. The AI will perfectly structure spacing, hooks, and hashtags to ensure maximum algorithm visibility natively here.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* LinkedIn Footer Simulation */}
                    <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between pointer-events-none pb-2">
                        <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">👍🏻 Like</span>
                            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">💬 Comment</span>
                            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">🔁 Repost</span>
                        </div>
                        {result && (
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full ml-auto">
                                {result.length} chars
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
