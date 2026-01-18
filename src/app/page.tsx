import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { Testimonials } from '@/components/landing/Testimonials';
import { FreeTools } from '@/components/landing/FreeTools';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'Free AI LinkedIn Carousel Generator - CarouselGem',
  description: 'Create viral LinkedIn carousels in seconds with AI. CarouselGem is the #1 free AI tool for LinkedIn creators to generate high-converting PDF carousels.',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <Testimonials />
      <FreeTools />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
