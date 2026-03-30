'use client';

import { PostGenerator } from './generators/PostGenerator';
import { LinkedInPostGenerator } from './generators/LinkedInPostGenerator';
import { LinkedInHeadlineGenerator } from './generators/LinkedInHeadlineGenerator';
import { LinkedInSummaryGenerator } from './generators/LinkedInSummaryGenerator';
import { TextFormatter } from './formatters/TextFormatter';
import { StaircaseGenerator } from './formatters/StaircaseGenerator';
import { PostPreview } from './simulators/PostPreview';
import { QRCodeGenerator } from './generators/QRCodeGenerator';
import { QuoteCardGenerator } from './generators/QuoteCardGenerator';
import { BannerMaker } from './generators/BannerMaker';
import { ProfileFrameGenerator } from './generators/ProfileFrameGenerator';
import { ReadabilityOptimizer } from './analyzers/ReadabilityOptimizer';
import { CheatSheetGenerator } from './generators/CheatSheetGenerator';
import { BillboardMockupGenerator } from './simulators/BillboardMockupGenerator';
import { VideoSafeZoneChecker } from './simulators/VideoSafeZoneChecker';
import { CarouselToVideoConverter } from './converters/CarouselToVideoConverter';
import { SmartBookmarkManager } from './organizers/SmartBookmarkManager';
import { LinkedInHashtagGenerator } from './generators/LinkedInHashtagGenerator';
import { Card } from '@/components/ui/card';
import { Wrench as ToolIcon } from 'lucide-react';

export const ToolWorkspace = ({ slug }: { slug: string }) => {

    // AI Content Generators (PostGenerator handles all 3 types)
    if (slug === 'linkedin-post-generator') return <LinkedInPostGenerator />;
    if (slug === 'linkedin-headline-generator') return <LinkedInHeadlineGenerator />;
    if (slug === 'linkedin-summary-generator') return <LinkedInSummaryGenerator />;
    if (slug === 'linkedin-hashtag-generator') return <LinkedInHashtagGenerator />;

    // Text Formatters
    if (slug === 'linkedin-post-text-formatter') return <TextFormatter />;
    if (slug === 'linkedin-text-staircase-generator') return <StaircaseGenerator />;

    // Visual Generators
    if (slug === 'linkedin-qr-code-generator') return <QRCodeGenerator />;
    if (slug === 'linkedin-quote-card-generator') return <QuoteCardGenerator />;
    if (slug === 'linkedin-banner-maker') return <BannerMaker />;
    if (slug === 'linkedin-profile-picture-frame-generator') return <ProfileFrameGenerator />;
    if (slug === 'linkedin-cheat-sheet-generator') return <CheatSheetGenerator />;

    // Analyzers
    if (slug === 'linkedin-post-readability-score-optimizer') return <ReadabilityOptimizer />;

    // Simulators & Mockups
    if (slug === 'billboard-mockup-generator-linkedin') return <BillboardMockupGenerator />;
    if (slug === 'linkedin-video-safe-zone-checker') return <VideoSafeZoneChecker />;

    // Converters
    if (slug === 'linkedin-carousel-to-video-converter') return <CarouselToVideoConverter />;

    // Organizers
    if (slug === 'smart-bookmark-tool-linkedin') return <SmartBookmarkManager />;

    if (slug === 'linkedin-post-preview') return <PostPreview />;

    // Fallback for tools not yet implemented with specialized UI
    return (
        <Card className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <ToolIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tool Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
                We are currently building the advanced interface for <strong>{slug.replace(/-/g, ' ')}</strong>.
                Check back soon for updates!
            </p>
        </Card>
    );
};
