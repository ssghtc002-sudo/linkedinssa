import { FOUNDER } from './founder-profile';

export interface Slide {
  id: string;
  tagline?: string;
  showTagline?: boolean;
  title: string;
  showTitle?: boolean;
  content: string;
  showContent?: boolean;
  slideType?: 'intro' | 'standard' | 'list' | 'quote' | 'outro';
  swipeText?: string;
  showSwipeIndicator?: boolean;
  image?: string;
  backgroundColor?: string;
  color?: string;
  layout?: 'center' | 'left' | 'image-left' | 'image-right' | 'quote' | 'list';
  animation?: 'none' | 'fade' | 'slide' | 'zoom' | 'flip';
  icon?: string; // lucide icon name
  // Element specific overrides
  colorOverrides?: Record<string, string>;
  fontOverrides?: Record<string, string>;
}

export type PanelType = 'ai' | 'outline' | 'templates' | 'settings' | 'import' | 'brand' | 'colors' | 'text' | null;
export type ThemeId = 'modern' | 'bold' | 'minimal' | 'gradient' | 'luxe';
export type FontPairId = 'inter' | 'roboto' | 'playfair' | 'oswald';

export interface DesignSettings {
  theme: ThemeId;
  opacity: number;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
  // Typography
  fontPair: FontPairId;
  fontSize: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'medium' | 'bold' | 'extrabold';
  lineHeight: number; // 1.0 to 2.0
  letterSpacing: number; // -0.05 to 0.1
  alignment: 'left' | 'center' | 'right';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  backgroundType: 'solid' | 'gradient' | 'image';
  visualStyle: 'none' | 'mesh' | 'neon' | 'organic' | 'geometric';
  gradientSettings?: {
    fromColor: string;
    toColor: string;
    angle: number;
  };
  backgroundImage?: string;
  showWatermark: boolean;
  watermarkText: string;
  authorName: string;
  authorHandle: string;
  authorImage?: string;
  // Advanced
  borderRadius: number; // 0-50
  padding: number; // 8-24
  shadowIntensity: 'none' | 'light' | 'medium' | 'heavy';
  showSwipeIndicator: boolean;
  swipeIndicatorType: 'text' | 'arrow' | 'both';
}

export const ASPECT_RATIOS = {
  '1:1': { label: 'Square (1:1)', width: 1080, height: 1080 },
  '4:5': { label: 'Portrait (4:5)', width: 1080, height: 1350 },
  '16:9': { label: 'Landscape (16:9)', width: 1920, height: 1080 },
  '9:16': { label: 'Stories (9:16)', width: 1080, height: 1920 },
};

export const DEFAULT_DESIGN: DesignSettings = {
  theme: 'bold',
  aspectRatio: '4:5',
  opacity: 1,
  fontPair: 'oswald',
  fontSize: 'medium',
  fontWeight: 'extrabold',
  lineHeight: 1.1,
  letterSpacing: -0.02,
  alignment: 'left',
  backgroundColor: '#0f172a',
  textColor: '#ffffff',
  accentColor: '#10b981',
  backgroundType: 'gradient',
  visualStyle: 'mesh',
  gradientSettings: {
    fromColor: '#4f46e5',
    toColor: '#10b981',
    angle: 135
  },
  showWatermark: true,
  watermarkText: '@shyam-goyal',
  authorName: FOUNDER.name,
  authorHandle: FOUNDER.headline,
  authorImage: FOUNDER.avatar,
  borderRadius: 40,
  padding: 10,
  shadowIntensity: 'heavy',
  showSwipeIndicator: true,
  swipeIndicatorType: 'both',
};

export const DEFAULT_SLIDES: Slide[] = [
  { 
    id: '1', 
    slideType: 'intro',
    tagline: 'A FOUNDER STORY',
    showTagline: true,
    title: 'Building LinkedIn Tools for 50,000+ Creators', 
    showTitle: true,
    content: 'How I built CarouselGem to help professionals create high-impact content in minutes.', 
    showContent: true,
    layout: 'center',
    swipeText: 'Read the story',
    showSwipeIndicator: true
  },
  { 
    id: '2', 
    slideType: 'standard',
    tagline: 'THE MISSION',
    showTagline: true,
    title: '15+ Free AI Tools', 
    showTitle: true,
    content: 'From Hook Generators to Quote Cards — we build the tools you need to stand out on LinkedIn.', 
    showContent: true,
    layout: 'left',
    swipeText: 'See more',
    showSwipeIndicator: true
  },
  { 
    id: '3', 
    slideType: 'quote',
    tagline: 'OUR PHILOSOPHY',
    showTagline: true,
    title: 'Personal Branding', 
    showTitle: true,
    content: 'I help creators build their personal brand faster with intuitive, AI-powered design tools.', 
    showContent: true,
    layout: 'quote',
    swipeText: 'Why?',
    showSwipeIndicator: true
  },
  { 
    id: '4', 
    slideType: 'standard',
    tagline: 'THE NEXT LEVEL',
    showTagline: true,
    title: 'Visual Excellence', 
    showTitle: true,
    content: 'We are evolving into the world\'s most powerful design studio for LinkedIn content creators.', 
    showContent: true,
    layout: 'left',
    swipeText: 'Let\'s connect',
    showSwipeIndicator: true
  },
  { 
    id: '5', 
    slideType: 'outro',
    tagline: 'GET IN TOUCH',
    showTagline: true,
    title: 'Let\'s Build Together', 
    showTitle: true,
    content: 'Open to collaborations & mentorship. DM me — I reply to every message on LinkedIn.', 
    showContent: true,
    layout: 'center',
    swipeText: 'Follow Shyam',
    showSwipeIndicator: true
  },
];

export const FONT_PAIRS: Record<FontPairId, { label: string; heading: string; body: string }> = {
  inter: { label: 'Clean (Inter)', heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
  roboto: { label: 'Tech (Roboto)', heading: 'Roboto, sans-serif', body: 'Open Sans, sans-serif' },
  playfair: { label: 'Elegant (Serif)', heading: 'Playfair Display, serif', body: 'Lato, sans-serif' },
  oswald: { label: 'Bold (Oswald)', heading: 'Oswald, sans-serif', body: 'Montserrat, sans-serif' },
};

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  settings: Partial<DesignSettings>;
}

export const PRESET_TEMPLATES: Template[] = [
  // --- Pro Procedural Collection (Mesh/Neon/Organic) ---
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm Liquid Gradients',
    thumbnail: 'bg-orange-500',
    settings: {
      backgroundColor: '#ea580c',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      visualStyle: 'mesh',
      fontPair: 'oswald',
      backgroundType: 'gradient',
      gradientSettings: { fromColor: '#ea580c', toColor: '#b91c1c', angle: 135 }
    }
  },
  {
    id: 'alien-green',
    name: 'Alien Green',
    description: 'Tech Noir Lines',
    thumbnail: 'bg-emerald-950',
    settings: {
      backgroundColor: '#064e3b',
      textColor: '#ffffff',
      accentColor: '#10b981',
      visualStyle: 'neon',
      fontPair: 'inter',
      backgroundType: 'solid'
    }
  },
  {
    id: 'purple-king',
    name: 'Purple King',
    description: 'Organic Creative Blobs',
    thumbnail: 'bg-purple-900',
    settings: {
      backgroundColor: '#581c87',
      textColor: '#f3e8ff',
      accentColor: '#d8b4fe',
      visualStyle: 'organic',
      fontPair: 'playfair',
      backgroundType: 'gradient',
      gradientSettings: { fromColor: '#581c87', toColor: '#1e1b4b', angle: 135 }
    }
  },
  {
    id: 'colors-layers',
    name: 'Colors Layers',
    description: 'Geometric Accents',
    thumbnail: 'bg-indigo-600',
    settings: {
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
      accentColor: '#818cf8',
      visualStyle: 'geometric',
      fontPair: 'inter',
      backgroundType: 'solid'
    }
  },
  {
    id: 'sun-city',
    name: 'Sun City',
    description: 'Bold Geometric Energy',
    thumbnail: 'bg-yellow-400',
    settings: {
      backgroundColor: '#fbbf24',
      textColor: '#000000',
      accentColor: '#ffffff',
      visualStyle: 'geometric',
      fontPair: 'oswald',
      backgroundType: 'solid'
    }
  },
  {
    id: 'cyber-dark',
    name: 'Cyber Dark',
    description: 'Modern Tech Mesh',
    thumbnail: 'bg-slate-900',
    settings: {
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      accentColor: '#38bdf8',
      visualStyle: 'neon',
      fontPair: 'inter',
      backgroundType: 'solid'
    }
  },
  {
    id: 'royal-waves',
    name: 'Royal Waves',
    description: 'Deep Blue Liquid',
    thumbnail: 'bg-indigo-900',
    settings: {
      backgroundColor: '#1e1b4b',
      textColor: '#ffffff',
      accentColor: '#6366f1',
      visualStyle: 'mesh',
      fontPair: 'inter',
      backgroundType: 'gradient',
      gradientSettings: { fromColor: '#1e1b4b', toColor: '#4338ca', angle: 135 }
    }
  },
  {
    id: 'liquid-silver',
    name: 'Liquid Silver',
    description: 'Minimalist Metallic',
    thumbnail: 'bg-slate-300',
    settings: {
      backgroundColor: '#cbd5e1',
      textColor: '#0f172a',
      accentColor: '#64748b',
      visualStyle: 'mesh',
      fontPair: 'inter',
      backgroundType: 'gradient',
      gradientSettings: { fromColor: '#cbd5e1', toColor: '#94a3b8', angle: 135 }
    }
  },
  {
    id: 'neon-sunset',
    name: 'Neon Sunset',
    description: 'Vibrant Tech Glow',
    thumbnail: 'bg-pink-600',
    settings: {
      backgroundColor: '#db2777',
      textColor: '#ffffff',
      accentColor: '#22d3ee',
      visualStyle: 'neon',
      fontPair: 'oswald',
      backgroundType: 'solid'
    }
  },
  {
    id: 'glass-minimal',
    name: 'Glass Minimal',
    description: 'Clean & Professional',
    thumbnail: 'bg-white border',
    settings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      accentColor: '#0f172a',
      visualStyle: 'none',
      fontPair: 'roboto',
      backgroundType: 'solid'
    }
  },

  // --- Premium Asset Collection (Images) ---
  {
    id: 'img-azure',
    name: 'Azure Flow',
    description: 'Abstract Professional Blue',
    thumbnail: 'bg-blue-400',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/abstract_azure.png',
      textColor: '#ffffff',
      accentColor: '#38bdf8',
      visualStyle: 'none',
      fontPair: 'inter'
    }
  },
  {
    id: 'img-gold',
    name: 'Gold Nocturne',
    description: 'Luxury Dark Gold',
    thumbnail: 'bg-black',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/luxury_gold.png',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      visualStyle: 'none',
      fontPair: 'oswald'
    }
  },
  {
    id: 'img-pastel',
    name: 'Pastel Dream',
    description: 'Soft Mesh Ethereal',
    thumbnail: 'bg-pink-100',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/pastel_mesh.png',
      textColor: '#831843',
      accentColor: '#db2777',
      visualStyle: 'none',
      fontPair: 'playfair'
    }
  },
  {
    id: 'img-cyber',
    name: 'Cyber Grid',
    description: 'Futuristic Tech Noir',
    thumbnail: 'bg-emerald-950',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/cyber_grid.png',
      textColor: '#ffffff',
      accentColor: '#10b981',
      visualStyle: 'none',
      fontPair: 'inter'
    }
  },
  {
    id: 'img-stone',
    name: 'Stone Minimal',
    description: 'Calm Architectural',
    thumbnail: 'bg-slate-200',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/stone_minimal.png',
      textColor: '#334155',
      accentColor: '#0f172a',
      visualStyle: 'none',
      fontPair: 'roboto'
    }
  },
  {
    id: 'img-vulcan',
    name: 'Vulcan Heat',
    description: 'Powerful Energy Swirls',
    thumbnail: 'bg-red-700',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/vulcan_heat.png',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      visualStyle: 'none',
      fontPair: 'oswald'
    }
  },
  {
    id: 'img-nebula',
    name: 'Indigo Nebula',
    description: 'Deep Space Creative',
    thumbnail: 'bg-indigo-950',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/indigo_nebula.png',
      textColor: '#ffffff',
      accentColor: '#a78bfa',
      visualStyle: 'none',
      fontPair: 'playfair'
    }
  },
  {
    id: 'img-glass',
    name: 'Frosted Mint',
    description: 'Clean Glassy Aesthetics',
    thumbnail: 'bg-slate-50',
    settings: {
      backgroundType: 'image',
      backgroundImage: '/templates/frosted_mint.png',
      textColor: '#0f172a',
      accentColor: '#0ea5e9',
      visualStyle: 'none',
      fontPair: 'inter'
    }
  }
];
