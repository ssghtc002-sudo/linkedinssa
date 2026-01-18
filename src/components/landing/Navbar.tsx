'use client';

import Link from 'next/link';

import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group relative z-50">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Carousel<span className="text-primary">Gem</span></span>
                    </Link>

                    {/* Desktop Action */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/tools"
                            className="text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 px-5 py-2.5 rounded-full transition-all"
                        >
                            Free Tools
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground relative z-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden pt-24 px-6 animate-in slide-in-from-top-5 fade-in duration-200">
                    <div className="flex flex-col gap-6 text-lg font-medium">
                        <Link
                            href="/tools"
                            className="bg-primary/10 text-primary p-4 rounded-xl text-center hover:bg-primary/20 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Explore Free Tools
                        </Link>
                        {/* Can add more mobile links here in the future */}
                    </div>
                </div>
            )}
        </>
    );
};
