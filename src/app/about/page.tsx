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
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-500/20 mb-8 border-4 border-white dark:border-slate-800 rotate-3">
                SSG
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Shyam Sunder Goyal</h3>
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm mb-6">Founder & Lead Developer</p>
              <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic italic">
                "We built CarouselGem out of a personal frustration. I wanted a way to share knowledge on LinkedIn without spending my whole weekend in design software. Today, CarouselGem is helping thousands of creators share their wisdom effortlessy."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
