
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
    const items = [
        {
            q: "Is it really free?",
            a: "Yes! Use core features completely free. No credit card required."
        },
        {
            q: "Can I remove watermarks?",
            a: "Free plan includes a subtle watermark. Pro plan for white-labeling is coming soon."
        },
        {
            q: "What formats are supported?",
            a: "Natively support High-DPI LinkedIn PDF (4:5) for perfect swipeable carousels."
        },
        {
            q: "Who owns the content?",
            a: "You do. 100% ownership of everything you generate and export."
        }
    ];

    return (
        <section className="py-12 md:py-24 bg-white dark:bg-slate-950">
            <div className="container px-4 mx-auto max-w-2xl">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x underline decoration-slate-200 dark:decoration-slate-800 underline-offset-8">FAQ</h2>
                    <p className="text-sm md:text-base text-slate-500 font-medium tracking-tight">Quick answers to common questions.</p>
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
