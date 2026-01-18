
export const LogoCloud = () => {
    const logos = [
        "ACME Corp", "Quantum", "Echo Valley", "Pinnacle", "Global Bank", "Niemand"
    ];

    return (
        <section className="py-20 border-b bg-background/50 backdrop-blur-sm">
            <div className="container px-4 mx-auto text-center">
                <p className="text-sm font-semibold tracking-widest text-muted-foreground/60 mb-10 uppercase">
                    Trusted by 10,000+ marketing teams
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Using text placeholders that look like logos for portability */}
                    {logos.map(logo => (
                        <h3 key={logo} className="text-2xl font-bold tracking-tighter text-foreground font-sans select-none">{logo}</h3>
                    ))}
                </div>
            </div>
        </section>
    );
};
