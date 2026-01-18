import { TOOLS } from '@/lib/tools-data';
import { TOOL_FAQS, generateFAQSchema } from '@/lib/tools-faq';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { FAQ } from '@/components/tools/FAQ';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
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

    const metaTitle = `Free AI LinkedIn ${cleanToolName} 2026`;
    const metaDescription = `Free AI LinkedIn ${cleanToolName} 2026 - ${tool.description}`;

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
        ],
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            type: 'website',
            siteName: 'CarouselAI',
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
        },
        alternates: {
            canonical: `/tools/${slug}`,
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
                        <div className="mt-16 pt-16 border-t prose prose-blue dark:prose-invert max-w-none">
                            <h2>About {tool.title}</h2>
                            <p>
                                Use our free <strong>{tool.title}</strong> to enhance your LinkedIn presence.
                                This tool is designed to help you {tool.description.toLowerCase()}
                                It is part of the CarouselAI suite of free utilities for content creators and LinkedIn professionals.
                            </p>
                            <p>
                                Whether you're a marketer, entrepreneur, job seeker, or thought leader, our {tool.title} helps you create professional LinkedIn content in seconds.
                                No design skills or technical knowledge required - just enter your information and let our tool do the work.
                            </p>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
