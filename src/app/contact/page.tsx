import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Mail, Phone, MapPin, Sparkles, Send, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Contact Us - CarouselGem',
  description: 'Get in touch with the CarouselGem team for support, feedback, or business inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-900 bg-slate-50/20 dark:bg-slate-950/20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-blue-600 uppercase border border-blue-200 rounded-full bg-blue-50/50 mb-6 tracking-widest italic">
            <Sparkles className="w-3.5 h-3.5" /> Support & Contact
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
              Touch.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed italic uppercase tracking-tight">
            Have questions? Feedback? Need help building your LinkedIn presence? We're here for you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Contact Details */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                  Contact <span className="text-blue-600">Info.</span>
                </h2>
                <p className="text-slate-500 font-medium italic">Our team usually responds within 12-24 hours. Feel free to reach out directly.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-1">Founder</h3>
                    <p className="text-xl font-bold italic uppercase tracking-tight">Shyam Sunder Goyal</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-1">Email us</h3>
                    <a href="mailto:shyamihtc@gmail.com" className="text-xl font-bold italic uppercase tracking-tight hover:text-blue-600 transition-colors">
                      shyamihtc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group opacity-50">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/40 flex items-center justify-center text-slate-400">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-1">Location</h3>
                    <p className="text-xl font-bold italic uppercase tracking-tight">Digital HQ @ Planet Earth</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-blue-500/10 blur-[40px] animate-pulse"></div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <h4 className="font-black text-lg italic uppercase tracking-tight mb-2">Join 10k+ Creators</h4>
                <p className="text-sm text-slate-500 font-medium italic">Building with CarouselGem every single day.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 rotate-12"></div>
              <div className="p-8 md:p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-3xl shadow-blue-500/5">
                <form className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">First Name</label>
                      <Input placeholder="John" className="bg-slate-50/50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 h-14 rounded-2xl px-6 font-medium italic" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Last Name</label>
                      <Input placeholder="Doe" className="bg-slate-50/50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 h-14 rounded-2xl px-6 font-medium italic" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="bg-slate-50/50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 h-14 rounded-2xl px-6 font-medium italic" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Your Message</label>
                    <textarea 
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full bg-slate-50/50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-5 font-medium italic text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    ></textarea>
                  </div>
                  <Button size="lg" className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-lg uppercase italic tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 active:scale-95 border-0">
                    <Send className="w-5 h-5 mr-3" /> Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
