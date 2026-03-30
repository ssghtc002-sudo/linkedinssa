import Link from 'next/link';
import { TOOLS } from '@/lib/tools-data';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FAQ } from '@/components/tools/FAQ';
import { ArrowRight, Sparkles, Zap, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '15+ Free AI LinkedIn Tools 2026 | CarouselGem',
    description: 'Skyrocket your personal brand with 15+ Free AI LinkedIn Tools in 2026. Create viral posts, format text, generate QR codes, preview posts, and more. Free forever.',
    keywords: ['free ai linkedin tools 2026', 'linkedin post generator', 'linkedin text formatter', 'linkedin carousel maker', 'free linkedin tools', 'linkedin hashtag generator'],
    openGraph: {
        title: '15+ Free AI LinkedIn Tools 2026 | CarouselGem',
        description: 'Skyrocket your personal brand with 15+ Free AI LinkedIn Tools.',
        type: 'website',
        url: 'https://carouselgem.com/tools',
    },
    alternates: { canonical: 'https://carouselgem.com/tools' },
};

const hubFAQs = [
    {
        question: "What are the best Free AI LinkedIn Tools in 2026?",
        answer: "The best free AI LinkedIn tools in 2026 include CarouselGem's suite: the Viral Post Generator, Text Formatter, Staircase Generator, Hashtag Generator, and QR Code Generator. These tools automate content creation without any subscriptions."
    },
    {
        question: "Are these LinkedIn tools truly free?",
        answer: "Yes. CarouselGem provides 15+ completely free utilities. No paywalls, hidden fees, or watermarks on the assets you generate."
    },
    {
        question: "Do I need design skills to use these tools?",
        answer: "No. All tools are designed for non-designers. Just enter your text or topic and the tool does the rest — from formatting to generation."
    }
];

const hubFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFAQs.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
};

export default function ToolsIndexPage() {
    const categories = Array.from(new Set(TOOLS.map(t => t.category)));

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubFAQSchema) }} />
            <Navbar />

            {/* ── Hero ── */}
            <section className="pt-24 pb-10 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <nav className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-slate-600 dark:text-slate-300">Free Tools</span>
                    </nav>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-[10px] font-black uppercase tracking-widest text-blue-600">
                        <Sparkles className="w-3 h-3" /> {TOOLS.length}+ Pro Utilities — Free Forever
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">
                        Power Up Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            LinkedIn Growth.
                        </span>
                    </h1>

                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
                        Everything you need to create, optimize, and grow — no login, no limits, no cost.
                    </p>

                    {/* Quick stats */}
                    <div className="flex items-center justify-center gap-6 pt-2">
                        {[
                            { label: 'AI Tools',      val: `${TOOLS.length}+` },
                            { label: 'Always Free',   val: '100%' },
                            { label: 'No Login',      val: '✓' },
                        ].map(({ label, val }) => (
                            <div key={label} className="text-center">
                                <p className="text-lg font-black text-slate-800 dark:text-white">{val}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tools Grid by Category ── */}
            <section className="flex-1 pb-16 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    {categories.map(category => {
                        const categoryTools = TOOLS.filter(t => t.category === category);
                        return (
                            <div key={category}>
                                {/* Category label */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{category}</span>
                                        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                            {categoryTools.length}
                                        </span>
                                    </div>
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-4" />
                                </div>

                                {/* Tool cards — compact 4-column grid on desktop */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {categoryTools.map(tool => (
                                        <Link
                                            key={tool.slug}
                                            href={`/tools/${tool.slug}`}
                                            className="group relative flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                                        >
                                            {/* Hover glow */}
                                            <div className={`absolute inset-0 ${tool.bg} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />

                                            {/* Icon */}
                                            <div className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center mb-3 shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                                                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                            </div>

                                            {/* Text */}
                                            <h2 className="text-sm font-black leading-tight tracking-tight mb-1.5 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                                {tool.title}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                                                {tool.description}
                                            </p>

                                            {/* Footer arrow */}
                                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Free</span>
                                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                    <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="px-4 pb-16">
                <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 relative overflow-hidden border border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/30 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full translate-y-16 -translate-x-16 blur-3xl" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-[9px] font-black uppercase tracking-widest mb-3">
                                <Sparkles className="w-3 h-3" /> #1 LinkedIn Carousel Maker
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic mb-2">
                                Create Viral Carousels in Seconds.
                            </h2>
                            <p className="text-blue-100/70 text-sm font-medium max-w-md">
                                Turn any idea into a stunning, high-converting LinkedIn PDF carousel instantly.
                            </p>
                        </div>
                        <Link href="/create" className="shrink-0">
                            <button className="h-12 px-8 rounded-2xl text-sm font-black bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap">
                                Start Designing Free
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="px-4 pb-16">
                <div className="max-w-3xl mx-auto">
                    <FAQ faqs={hubFAQs} />
                </div>
            </section>

            {/* ── SEO content ── */}
            <section className="px-4 pb-16 border-t border-slate-200 dark:border-slate-800 pt-12">
                <div className="max-w-3xl mx-auto">
                    <article className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-400">
                        <h2 className="text-xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">
                            The Ultimate Suite of Free AI LinkedIn Tools in 2026
                        </h2>
                        <p>
                            Whether you&apos;re a Top Voice, a B2B SaaS founder, or an ambitious professional, our <strong>Free AI LinkedIn Tools</strong> help you dominate the feed. From formatting text with Unicode bold/italic to generating viral posts with AI — everything is free, instant, and requires no login.
                        </p>
                        <h3 className="text-base font-bold uppercase tracking-tight mt-6">Why Use CarouselGem Tools?</h3>
                        <p>
                            Writing viral posts, formatting text perfectly, and designing carousels used to require a dedicated agency. CarouselGem eliminates the friction with 15+ free utilities — from Text Staircases to Flesch-Kincaid readability analysis — all powered by AI and available instantly.
                        </p>
                    </article>
                </div>
            </section>

            <Footer />
        </main>
    );
}
