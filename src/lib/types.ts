export interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
  backgroundColor?: string;
  color?: string;
  layout?: 'center' | 'left' | 'image-left' | 'image-right' | 'quote' | 'list';
  animation?: 'none' | 'fade' | 'slide' | 'zoom' | 'flip';
  icon?: string; // lucide icon name
}

export type ThemeId = 'modern' | 'bold' | 'minimal' | 'gradient' | 'luxe';
export type FontPairId = 'inter' | 'roboto' | 'playfair' | 'oswald';

export interface DesignSettings {
  theme: ThemeId;
  opacity: number;
  aspectRatio: '1:1' | '4:5' | '16:9';
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
}

export const ASPECT_RATIOS = {
  '1:1': { label: 'Square (1:1)', width: 1080, height: 1080 },
  '4:5': { label: 'Portrait (4:5)', width: 1080, height: 1350 },
  '16:9': { label: 'Landscape (16:9)', width: 1920, height: 1080 },
};

export const DEFAULT_DESIGN: DesignSettings = {
  theme: 'modern',
  aspectRatio: '4:5',
  opacity: 0.8,
  fontPair: 'inter',
  fontSize: 'medium',
  fontWeight: 'normal',
  lineHeight: 1.5,
  letterSpacing: 0,
  alignment: 'left',
  backgroundColor: '#1e293b',
  textColor: '#ffffff',
  accentColor: '#3b82f6',
  backgroundType: 'solid',
  gradientSettings: {
    fromColor: '#1e293b',
    toColor: '#0f172a',
    angle: 135
  },
  showWatermark: true,
  watermarkText: '@yourhandle',
  authorName: 'Your Name',
  authorHandle: '@yourhandle',
  borderRadius: 16,
  padding: 12,
  shadowIntensity: 'medium',
};

export const DEFAULT_SLIDES: Slide[] = [
  { id: '1', title: 'Hook Your Audience', content: 'Stop scrolling! Here is how to create viral carousels in 5 minutes.', layout: 'center' },
  { id: '2', title: 'Step 1: Focus', content: 'Pick one clear topic per carousel. Don\'t confuse your readers.', layout: 'left' },
  { id: '3', title: 'Step 2: Design', content: 'Use high contrast colors and readable fonts.', layout: 'left' },
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
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean & Professional',
    thumbnail: 'bg-slate-900',
    settings: {
      theme: 'modern',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      accentColor: '#38bdf8',
      fontPair: 'inter',
      backgroundType: 'solid'
    }
  },
  {
    id: 'bold-yellow',
    name: 'Bold Impact',
    description: 'High Contrast',
    thumbnail: 'bg-black',
    settings: {
      theme: 'bold',
      backgroundColor: '#000000',
      textColor: '#facc15',
      accentColor: '#ffffff',
      fontPair: 'oswald',
      backgroundType: 'solid'
    }
  },
  {
    id: 'purple-gradient',
    name: 'Creative Flow',
    description: 'Vibrant Gradient',
    thumbnail: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    settings: {
      theme: 'luxe',
      backgroundColor: '#581c87',
      textColor: '#f3e8ff',
      accentColor: '#d8b4fe',
      fontPair: 'playfair',
      backgroundType: 'gradient',
      gradientSettings: { fromColor: '#581c87', toColor: '#1e1b4b', angle: 135 }
    }
  },
  {
    id: 'minimal-light',
    name: 'Clean Minimal',
    description: 'Simple & Elegant',
    thumbnail: 'bg-white border',
    settings: {
      theme: 'minimal',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      accentColor: '#0f172a',
      fontPair: 'roboto',
      backgroundType: 'solid'
    }
  }
];
