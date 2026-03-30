import { TOOLS } from '@/lib/tools-data';
import { TOOL_FAQS, generateFAQSchema } from '@/lib/tools-faq';
import { SEO_ARTICLES } from '@/lib/seo-articles';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FAQ } from '@/components/tools/FAQ';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ToolWorkspace } from '@/components/tools/ToolWorkspace';
import type { Metadata } from 'next';

// Generate params for all tools to support static export/SEO
export function generateStaticParams() {
    return TOOLS.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = TOOLS.find((t) => t.slug === slug);
    if (!tool) return {};

    const toolName = tool.title;
    // Remove "LinkedIn" from the start if it exists to avoid duplication (e.g., "Free AI LinkedIn LinkedIn Post Generator")
    const cleanToolName = toolName.replace(/^LinkedIn\s+/i, '');

    const isPostGenerator = slug === 'linkedin-post-generator';
    const metaTitle = isPostGenerator 
        ? 'Free AI LinkedIn Post Generator 2026 | Create Viral Posts Instantly'
        : `Free AI LinkedIn ${cleanToolName} 2026`;
        
    const metaDescription = isPostGenerator
        ? 'Use our highly-accurate Free AI LinkedIn Post Generator to write viral, engaging, and professional posts in seconds. Boost your LinkedIn reach today with CarouselGem.'
        : `Free AI LinkedIn ${cleanToolName} 2026 - ${tool.description}`;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: [
            toolName.toLowerCase(),
            `${cleanToolName.toLowerCase()} free`,
            'free ai linkedin tools',
            'linkedin generator 2026',
            'linkedin marketing',
            'free linkedin tool',
            tool.category.toLowerCase(),
            'social media tools',
            'linkedin growth',
            ...(isPostGenerator ? ['linkedin post writer', 'ai linkedin post creator', 'viral linkedin posts generator', 'best ai for linkedin', 'linkedin content generator'] : []),
        ],
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            type: 'website',
            siteName: 'CarouselGem', // Updated siteName to CarouselGem
            url: `https://carouselgem.com/tools/${slug}`, // Added URL for SEO
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
        },
        alternates: {
            canonical: `https://carouselgem.com/tools/${slug}`, // Absolute canonical URL is better
        },
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = TOOLS.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    const faqs = TOOL_FAQS[slug] || [];
    const faqSchema = generateFAQSchema(slug);
    const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== slug).slice(0, 3);

    return (
        <>
            {/* FAQ Schema Markup */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />

                <div className="flex-1 pt-32 pb-20">
                    <div className="container px-4 mx-auto max-w-4xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center text-sm text-muted-foreground mb-8 animate-fade-in">
                            <Link href="/" className="hover:text-primary transition-colors hover:underline">Home</Link>
                            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                            <Link href="/tools" className="hover:text-primary transition-colors hover:underline">Free Tools</Link>
                            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                            <span className="text-foreground font-medium truncate">{tool.title}</span>
                        </nav>

                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <div className={`mx-auto w-16 h-16 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 shadow-lg`}>
                                <tool.icon className={`w-8 h-8 ${tool.color}`} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{tool.title}</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{tool.description}</p>
                        </div>

                        {/* Tool Workspace */}
                        <div className="mb-16">
                            <ToolWorkspace slug={slug} />
                        </div>

                        {/* Benefits Section */}
                        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold mb-6">Why Use This Tool?</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Free to use forever',
                                    'No login required',
                                    'Instant results',
                                    'Mobile friendly',
                                    'No watermarks',
                                    'Unlimited usage'
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                        <span className="text-foreground font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        {faqs.length > 0 && <FAQ faqs={faqs} />}

                        {/* Related Tools */}
                        {relatedTools.length > 0 && (
                            <div className="mt-16 pt-16 border-t">
                                <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {relatedTools.map((relatedTool) => (
                                        <Link
                                            key={relatedTool.slug}
                                            href={`/tools/${relatedTool.slug}`}
                                            className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-md bg-card"
                                        >
                                            <div className={`w-12 h-12 rounded-lg ${relatedTool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <relatedTool.icon className={`w-6 h-6 ${relatedTool.color}`} />
                                            </div>
                                            <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                                                {relatedTool.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {relatedTool.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEO Content Section */}
                        {SEO_ARTICLES[slug] ? (
                            <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                                {SEO_ARTICLES[slug]}
                            </div>
                        ) : (
                            <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                                <article className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-6">
                                        About The {tool.title}
                                    </h2>
                                    <p className="lead text-xl italic font-medium">
                                        Use our free <strong>{tool.title}</strong> to instantly enhance your LinkedIn profile and content pipeline. 
                                        This powerful tool is specifically designed to help you <strong>{tool.description.toLowerCase()}</strong>
                                    </p>

                                    <h3 className="text-2xl font-bold uppercase tracking-tight mt-10">Why Choose CarouselGem?</h3>
                                    <p>
                                        It is part of the CarouselGem suite of free, professional-grade utilities crafted for content creators, marketers, and LinkedIn professionals. We believe in providing absolutely friction-less tools—meaning no paywalls, no watermarks, and no technical barriers.
                                    </p>

                                    <h3 className="text-2xl font-bold uppercase tracking-tight mt-10">Who Is This For?</h3>
                                    <p>
                                        Whether you're a seasoned marketer analyzing competitive campaigns, an ambitious entrepreneur building a personal brand, a proactive job seeker looking to stand out to recruiters, or a recognized industry thought leader—our <strong>{tool.title}</strong> gives you a massive advantage.
                                    </p>
                                    
                                    <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-800">
                                        <p className="m-0 font-medium italic">
                                            Create professional, engaging LinkedIn content in a fraction of the time. No advanced design skills or technical knowledge required—just input your needs and let our optimized tools do the heavy lifting for you.
                                        </p>
                                    </div>
                                </article>
                            </div>
                        )}

                        {/* Grand CTA to Main Tool */}
                        <div className="mt-20 p-10 md:p-14 rounded-[2rem] bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden shadow-2xl border border-white/10">
                            {/* Background Elements */}
                            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        #1 AI Carousel Maker
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 uppercase italic">
                                        Create Viral Carousels in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Seconds.</span>
                                    </h2>
                                    <p className="text-blue-100/80 text-lg md:text-xl font-medium max-w-xl">
                                        Stop wasting hours on design. Turn any text, prompt, or idea into a stunning, high-converting LinkedIn PDF carousel instantly.
                                    </p>
                                </div>
                                
                                <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                                    <Link href="/create">
                                        <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto">
                                            Start Designing Free
                                        </Button>
                                    </Link>
                                    <span className="text-xs text-blue-200/60 font-medium uppercase tracking-wider">No Credit Card Required</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
