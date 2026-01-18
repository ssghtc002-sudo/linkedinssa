import Link from 'next/link';
import { TOOLS } from '@/lib/tools-data';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ArrowRight, ChevronRight, Sparkles, Zap, Smartphone, PenTool, Layout, Image as ImageIcon, QrCode } from 'lucide-react';

export const metadata = {
    title: 'Free LinkedIn Tools | CarouselGem',
    description: 'A collection of 15+ free AI tools to help you grow on LinkedIn. Post generators, formatters, previews, and more.',
};

export default function ToolsIndexPage() {
    // Group tools by category
    const categories = Array.from(new Set(TOOLS.map(t => t.category)));

    const categoryIcons: Record<string, any> = {
        'Writing': PenTool,
        'Profile': Smartphone,
        'Visuals': ImageIcon,
        'Utility': QrCode
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative">
            <Navbar />

            {/* Global Background Decorations */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-20 blur-[120px] pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-500/30 rounded-full animate-pulse"></div>
                <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-purple-500/30 rounded-full animate-pulse decoration-delay-2000"></div>
            </div>

            {/* Ultra-Modern Compact Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                <div className="container px-4 mx-auto relative">
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 max-w-6xl mx-auto">

                        <div className="text-center lg:text-left flex-1 space-y-6">
                            <nav className="flex items-center justify-center lg:justify-start text-[10px] font-black uppercase tracking-widest text-slate-400 space-x-2">
                                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                <span className="text-slate-900 dark:text-white italic">Free Kit</span>
                            </nav>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
                                Power Up <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">Growth.</span>
                            </h1>

                            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 italic">
                                <Sparkles className="w-3 h-3 mr-2" />
                                15+ PRO Utilities
                            </div>
                        </div>

                        <div className="flex-1 max-w-md text-center lg:text-right space-y-8">
                            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                                Everything you need to create, optimize, and grow.
                                <span className="block text-slate-900 dark:text-white mt-1">Free forever. No login. No limits.</span>
                            </p>

                            <div className="flex items-center justify-center lg:justify-end gap-8">
                                <div className="flex flex-col items-center lg:items-end">
                                    <Zap className="w-5 h-5 text-amber-500 mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Powered</span>
                                </div>
                                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                                <div className="flex flex-col items-center lg:items-end">
                                    <ImageIcon className="w-5 h-5 text-blue-500 mb-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Export HD</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Tools Sections */}
            <section className="py-24 relative">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="space-y-32">
                        {categories.map((category) => {
                            const Icon = categoryIcons[category] || Layout;
                            const categoryTools = TOOLS.filter(t => t.category === category);

                            return (
                                <div key={category} className="space-y-12">
                                    <div className="flex items-end justify-between px-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 italic">Category</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">{category}</h2>
                                        </div>
                                        <p className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                            {categoryTools.length} Utilities Available
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {categoryTools.map((tool) => (
                                            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group relative">
                                                <div className={`h-full relative p-8 md:p-10 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white dark:border-slate-800/60 transition-all duration-500 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 overflow-hidden flex flex-col items-start text-left shadow-[inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-none animate-in fade-in zoom-in duration-500`}>
                                                    {/* Strong Themed Background Overlay */}
                                                    <div className={`absolute inset-0 ${tool.bg} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 -z-10`}></div>

                                                    {/* Floating Glow Corner */}
                                                    <div className={`absolute -right-12 -top-12 w-48 h-48 ${tool.bg} opacity-20 group-hover:opacity-40 rounded-full blur-3xl transition-all duration-700 active:scale-150`}></div>

                                                    {/* Tool Icon */}
                                                    <div className={`relative w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-8 ring-1 ring-white dark:ring-slate-800 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 z-10`}>
                                                        <tool.icon className={`w-7 h-7 ${tool.color}`} />
                                                    </div>

                                                    <div className="relative z-10 w-full mb-auto">
                                                        <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight uppercase italic mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                                            {tool.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                                            {tool.description}
                                                        </p>
                                                    </div>

                                                    {/* Bottom Action */}
                                                    <div className="relative z-10 w-full mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pro Utility</span>
                                                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Launch Tool</span>
                                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ring-4 ring-transparent group-hover:ring-blue-600/10 shadow-sm">
                                                                <ArrowRight className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
