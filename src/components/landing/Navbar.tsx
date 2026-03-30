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
        <div className="relative">
            <div className="fixed z-[60] left-0 right-0 flex justify-center px-4 w-full top-4 md:top-5">
                {/* The Animated Border Wrapper */}
                <div className="relative w-full max-w-3xl p-[1.5px] rounded-full overflow-hidden shadow-lg shadow-purple-500/20">
                    {/* The Running Gradient */}
                    <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e3a8a_0%,#9333ea_50%,#db2777_100%)] opacity-100"></div>
                    
                    {/* The Navbar Form Factor */}
                    <nav className="relative z-10 w-full flex items-center justify-between bg-white dark:bg-slate-950 rounded-full py-2 px-4 sm:px-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group relative z-50">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-blue-500/25 transition-all duration-300">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">Carousel<span className="text-primary tracking-normal">Gem</span></span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-5">
                            <Link href="/about" className="text-xs font-bold uppercase italic tracking-wider text-slate-500 hover:text-blue-600 transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-xs font-bold uppercase italic tracking-wider text-slate-500 hover:text-blue-600 transition-colors">
                                Contact
                            </Link>
                            <Link
                                href="/tools"
                                className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 active:scale-95 px-5 py-2.5 rounded-full transition-all shadow-md shadow-blue-500/25"
                            >
                                Free Tools
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors relative z-50"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden pt-24 px-6 animate-in slide-in-from-top-5 fade-in duration-200">
                    <div className="flex flex-col gap-6 text-lg font-medium">
                        <Link
                            href="/about"
                            className="text-slate-500 p-4 rounded-xl text-center hover:bg-slate-50 transition-colors uppercase font-black tracking-tighter italic"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="text-slate-500 p-4 rounded-xl text-center hover:bg-slate-50 transition-colors uppercase font-black tracking-tighter italic"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
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
        </div>
    );
};
