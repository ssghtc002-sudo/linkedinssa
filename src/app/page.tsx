import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { Testimonials } from '@/components/landing/Testimonials';
import { FreeTools } from '@/components/landing/FreeTools';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Carousel Maker & Generator 2026 | CarouselGem',
  description: 'Create viral LinkedIn carousels in seconds with CarouselGem, the #1 Free AI Carousel Maker & Generator for 2026. No design skills needed. High-converting PDF exports.',
  keywords: ['Free AI Carousel Maker 2026', 'AI Carousel Generator', 'CarouselGem', 'Best LinkedIn Carousel Tool 2026', 'Free AI Content Generator', 'LinkedIn Marketing AI'],
  openGraph: {
    title: 'Free AI Carousel Maker & Generator 2026 | CarouselGem',
    description: 'The #1 Free AI tool for LinkedIn creators to generate high-converting PDF carousels instantly.',
    url: 'https://carouselgem.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://carouselgem.com',
  }
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CarouselGem AI Carousel Maker",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "CarouselGem is the #1 Free AI Carousel Maker and Generator for 2026, helping creators grow on LinkedIn with automated design and copywriting.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "12840"
    }
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to create a LinkedIn Carousel with AI",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Topic",
        "text": "Provide a topic or idea to the CarouselGem AI Carousel Generator."
      },
      {
        "@type": "HowToStep",
        "name": "AI Generation",
        "text": "Our AI Carousel Maker creates the slides, copy, and design instantly."
      },
      {
        "@type": "HowToStep",
        "name": "Download PDF",
        "text": "Export your high-converting carousel as a High-DPI PDF ready for LinkedIn."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <Navbar />
      <Hero />
      
      {/* Hidden SEO Content Section for Keyword Density */}
      <section className="sr-only">
        <h2>Free AI Carousel Maker 2026</h2>
        <p>CarouselGem is the best AI Carousel Generator for LinkedIn creators in 2026.</p>
        <h2>Best AI Carousel Generator</h2>
        <p>Generate viral carousels in seconds with our free online tool.</p>
      </section>

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
