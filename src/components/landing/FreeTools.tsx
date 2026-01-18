import Link from 'next/link';
import { ArrowRight, Type, Image as ImageIcon, Sparkles, Hash, FileText, Smile } from 'lucide-react';

const tools = [
    {
        slug: 'linkedin-post-text-formatter',
        icon: Type,
        name: "Font Gen",
        desc: "Bold & Italic styles.",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        color: "text-blue-600"
    },
    {
        slug: 'linkedin-post-generator',
        icon: Sparkles,
        name: "Post AI",
        desc: "Viral post generator.",
        bg: "bg-purple-50 dark:bg-purple-900/20",
        color: "text-purple-600"
    },
    {
        slug: 'linkedin-headline-generator',
        icon: Hash,
        name: "Headline",
        desc: "Pro AI headlines.",
        bg: "bg-pink-50 dark:bg-pink-900/20",
        color: "text-pink-600"
    },
    {
        slug: 'linkedin-post-preview',
        icon: FileText,
        name: "Preview",
        desc: "Desktop & Mobile.",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        color: "text-orange-600"
    },
    {
        slug: 'linkedin-summary-generator',
        icon: ImageIcon,
        name: "Summary",
        desc: "AI About section.",
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
        color: "text-emerald-600"
    },
    {
        slug: 'linkedin-text-staircase-generator',
        icon: Smile,
        name: "Staircase",
        desc: "Visual text fun.",
        bg: "bg-cyan-50 dark:bg-cyan-900/20",
        color: "text-cyan-600"
    }
];

export const FreeTools = () => {
    return (
        <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950/50">
            <div className="container px-4 mx-auto">
                <div className="flex items-end justify-between mb-12 max-w-4xl mx-auto px-4 md:px-0">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">Kit.</span>
                        </h2>
                        <p className="text-sm md:text-base text-slate-500 font-medium">Free professional utilities for LinkedIn growth.</p>
                    </div>
                    <Link href="/tools" className="hidden md:flex items-center gap-2 group text-sm font-black uppercase italic tracking-wider text-slate-400 hover:text-blue-600 transition-colors">
                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
                    {tools.map((tool, i) => (
                        <Link href={`/tools/${tool.slug}`} key={i} className="group">
                            <div className="p-4 md:p-6 rounded-[2.2rem] bg-slate-100/50 dark:bg-slate-900 border border-white dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 text-center relative overflow-hidden">
                                {/* Subtle Tool Glow */}
                                <div className={`absolute -right-4 -top-4 w-12 h-12 ${tool.bg} opacity-10 group-hover:opacity-30 rounded-full blur-xl transition-opacity animate-pulse`}></div>

                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${tool.bg} flex items-center justify-center mb-4 mx-auto ring-1 ring-white dark:ring-slate-800 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <tool.icon className={`w-5 h-5 md:w-6 md:h-6 ${tool.color}`} />
                                </div>
                                <h3 className="text-xs md:text-sm font-black uppercase tracking-tight italic mb-1 truncate">{tool.name}</h3>
                                <p className="text-[10px] md:text-xs text-slate-400 font-medium leading-tight hidden md:block">{tool.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <Link href="/tools" className="flex items-center gap-2 text-xs font-black uppercase italic tracking-wider text-slate-400">
                        Explore more <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
