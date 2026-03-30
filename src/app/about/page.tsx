import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Sparkles, Heart, Zap, Award } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - CarouselGem',
  description: 'The story behind CarouselGem and our mission to simplify LinkedIn content creation for everyone.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-blue-600 uppercase border border-blue-200 rounded-full bg-blue-50/50 mb-6 tracking-widest italic">
            <Sparkles className="w-3.5 h-3.5" /> Our Story
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
              Next-Gen Creators.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed italic uppercase tracking-tight">
            CarouselGem was born from a simple realization: creating high-performing LinkedIn content shouldn't take hours of design work.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950/20 border-y border-slate-100 dark:border-slate-900">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-blue-600">
                The Problem.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                Content creators, SaaS founders, and solopreneurs spend over 70% of their LinkedIn time wrestling with complex design tools instead of focusing on their message. The "Manual Design Hell" kills consistency and growth.
              </p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-purple-600">
                The Mission.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                Our mission is to democratize high-end design through AI. We believe that everyone should be able to create viral, professional-grade carousels in seconds, not hours.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-10 animate-pulse"></div>
              <div className="relative p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl italic uppercase tracking-tight">Speed First</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">30 Seconds vs 2 Hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-600">
                      <Heart className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl italic uppercase tracking-tight">Simplicity</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Zero Design Skills Needed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-900/40 flex items-center justify-center text-pink-600">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl italic uppercase tracking-tight">Quality Output</h3>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">High-DPI Vector PDFs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight italic uppercase">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Founders.</span>
            </h2>
            <div className="flex flex-col items-center group">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden mb-8 border-4 border-white dark:border-slate-800 shadow-2xl shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:-rotate-2 group">
                <Image 
                  src="/images/about/shyami-goyal.png" 
                  alt="Shyam Sunder Goyal" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2">Shyam Sunder Goyal</h3>
              <p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm mb-6">Founder & Lead Architect</p>
              
              <div className="flex gap-4 mb-8">
                <a href="https://in.linkedin.com/in/shyami-goyal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/shyami_goyal/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </div>

              <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic max-w-2xl">
                "We built CarouselGem out of a personal frustration. I wanted a way to share knowledge on LinkedIn without spending my whole weekend in design software. Today, CarouselGem is helping thousands of creators share their wisdom effortlessly."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
