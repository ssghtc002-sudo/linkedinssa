'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/lib/tools-faq';

interface FAQProps {
    faqs: FAQItem[];
    title?: string;
}

export const FAQ = ({ faqs, title = "Frequently Asked Questions" }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-16 pt-16 border-t">
            <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                            <ChevronDown
                                className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="px-6 py-4 pt-0 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
