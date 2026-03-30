
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
    const items = [
        {
            q: "What is the best Free AI Carousel Maker in 2026?",
            a: "CarouselGem is the leading Free AI Carousel Maker in 2026, designed to help LinkedIn creators generate high-converting, viral PDF carousels in seconds without any design experience."
        },
        {
            q: "How do I use an AI Carousel Generator for LinkedIn?",
            a: "Simply enter your topic or idea into the CarouselGem AI Carousel Generator. Our engine will handle the copywriting, layout, and visual design, delivering a ready-to-post PDF file instantly."
        },
        {
            q: "Is it really 100% free with no watermarks?",
            a: "Yes! Use core features of CarouselGem completely free. No credit card required. We offer a totally free plan that helps you scale your personal brand without hidden costs."
        },
        {
            q: "What formats does the Carousel Maker support?",
            a: "We natively support High-DPI LinkedIn PDF (4:5) for perfect swipeable carousels, ensuring your content looks professional on all devices including mobile and desktop."
        }
    ];

    return (
        <section className="py-12 md:py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto max-w-2xl">
                <div className="text-center mb-10 md:mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block italic">Knowledge Base</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x underline decoration-slate-200 dark:decoration-slate-800 underline-offset-8">FAQ</h2>
                    <p className="text-sm md:text-base text-slate-500 font-medium tracking-tight">Everything you need to know about our <b className="text-slate-900 dark:text-white">AI Carousel Generator</b>.</p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-3">
                    {items.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-6 bg-slate-50/50 dark:bg-slate-900/40 transition-all duration-300 overflow-hidden">
                            <AccordionTrigger className="text-left font-bold text-sm md:text-base py-5 hover:no-underline uppercase tracking-tight italic">
                                {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed pb-5 font-medium">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};
