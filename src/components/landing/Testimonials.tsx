import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Sarah J.",
        role: "Creator @ TechFlow",
        content: "I used to spend 2 hours in Canva. Now it takes me 5 mins. AI suggestions are fire!",
        stars: 5,
        photo: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Marcus C.",
        role: "Growth Marketer",
        content: "Auto-resize for LinkedIn is a game changer. Engagement doubled instantly.",
        stars: 5,
        photo: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
        name: "Elara V.",
        role: "SaaS Founder",
        content: "Finally a tool that understands branding properly. Simple, fast, and free.",
        stars: 5,
        photo: "https://randomuser.me/api/portraits/women/33.jpg"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
                        Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">Creators.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium">
                        Join thousands of creators who are scaling their LinkedIn presence with CarouselGem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.0 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-bold leading-relaxed mb-8 italic">
                                "{review.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800">
                                    <Image
                                        src={review.photo}
                                        alt={review.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <div className="font-black text-sm uppercase tracking-tight">{review.name}</div>
                                    <div className="text-[10px] uppercase font-black text-slate-400">{review.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
