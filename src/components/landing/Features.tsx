import { Palette, Share2, Zap, LayoutTemplate, FileOutput, Moon } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Generate professional slides in seconds. Just watch it transform.",
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
        icon: Palette,
        title: "Brand Sync",
        description: "Sync your colors and logo once. We handle the rest automatically.",
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        icon: LayoutTemplate,
        title: "Viral Layouts",
        description: "Curated collection of high-converting, proven viral designs.",
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
        icon: FileOutput,
        title: "Vector Export",
        description: "Ultra-crisp PDF exports for LinkedIn without any quality loss.",
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
        icon: Moon,
        title: "Dark Mode",
        description: "Built for late-night creators. Perfect visibility in any light.",
        color: "text-slate-900 dark:text-white",
        bg: "bg-slate-100 dark:bg-slate-800"
    },
    {
        icon: Share2,
        title: "Omni-Channel",
        description: "One click exports for all platforms. Content repurposing made easy.",
        color: "text-pink-500",
        bg: "bg-pink-50 dark:bg-pink-900/20"
    }
];

export const Features = () => {
    return (
        <section className="py-20 md:py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
                        Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">Speed.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium">
                        Everything you need to create viral content without the headache of complex design tools.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 md:p-8 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1">
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 ring-1 ring-slate-200/50 dark:ring-slate-800/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <feature.icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-base md:text-xl font-black tracking-tight mb-2 uppercase italic">{feature.title}</h3>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
