export interface FAQItem {
    question: string;
    answer: string;
}

export const TOOL_FAQS: Record<string, FAQItem[]> = {
    'linkedin-post-generator': [
        {
            question: "How does the LinkedIn Post Generator work?",
            answer: "Our AI-powered LinkedIn Post Generator analyzes your topic and creates engaging, professional posts in seconds. Simply enter your topic, and the tool generates multiple post variations optimized for LinkedIn engagement."
        },
        {
            question: "Is the LinkedIn Post Generator free?",
            answer: "Yes! Our LinkedIn Post Generator is 100% free with no registration required. Generate unlimited posts for your LinkedIn profile."
        },
        {
            question: "Can I customize the generated posts?",
            answer: "Absolutely! The generated posts are fully editable. You can modify the tone, length, and content to match your personal brand and voice."
        },
        {
            question: "What makes a good LinkedIn post?",
            answer: "Good LinkedIn posts are concise (under 1300 characters), start with a hook, provide value, include relevant hashtags, and have a clear call-to-action. Our generator follows these best practices automatically."
        }
    ],

    'linkedin-post-preview': [
        {
            question: "Why should I preview my LinkedIn post?",
            answer: "Previewing helps you see exactly how your post will appear on both desktop and mobile before publishing. This ensures proper formatting, line breaks, and visual appeal across all devices."
        },
        {
            question: "Does the preview show the exact LinkedIn layout?",
            answer: "Yes! Our preview tool replicates the actual LinkedIn post layout including profile picture, name, timestamp, and post formatting to give you an accurate representation."
        },
        {
            question: "Can I preview posts with images?",
            answer: "Currently, the preview tool focuses on text formatting. Image previews will be added in a future update."
        },
        {
            question: "Is the preview tool mobile-friendly?",
            answer: "Yes! The tool shows both desktop and mobile previews, and the tool itself is fully responsive so you can use it on any device."
        }
    ],

    'linkedin-post-text-formatter': [
        {
            question: "How do I make text bold on LinkedIn?",
            answer: "Use our LinkedIn Text Formatter to convert your text to bold Unicode characters. Simply type your text, copy the bold version, and paste it into your LinkedIn post."
        },
        {
            question: "Can I use italic text on LinkedIn?",
            answer: "Yes! Our tool generates italic Unicode text that works perfectly on LinkedIn. The formatting displays correctly across all devices and platforms."
        },
        {
            question: "Will formatted text work in LinkedIn comments?",
            answer: "Yes! The Unicode formatted text works in posts, comments, profile sections, and messages on LinkedIn."
        },
        {
            question: "Is the text formatter free to use?",
            answer: "Absolutely! Our LinkedIn Text Formatter is 100% free with unlimited usage and no registration required."
        }
    ],

    'linkedin-text-staircase-generator': [
        {
            question: "What is staircase text formatting?",
            answer: "Staircase text is a visual formatting style where each line is progressively indented, creating a step-like appearance. It's eye-catching and great for LinkedIn hooks and lists."
        },
        {
            question: "Why use staircase formatting on LinkedIn?",
            answer: "Staircase formatting makes your posts stand out in the feed, improves readability, and draws attention to key points. It's particularly effective for lists and sequential information."
        },
        {
            question: "Can I customize the staircase pattern?",
            answer: "Yes! You can adjust the indentation level and choose different staircase styles to match your content and personal brand."
        },
        {
            question: "Does staircase text work on mobile LinkedIn?",
            answer: "Yes! The staircase formatting uses Unicode spaces that display correctly on all devices including mobile apps."
        }
    ],

    'linkedin-summary-generator': [
        {
            question: "What is a LinkedIn summary?",
            answer: "A LinkedIn summary (also called 'About' section) is a brief professional bio that appears on your profile. It's your chance to tell your story and showcase your expertise."
        },
        {
            question: "How long should my LinkedIn summary be?",
            answer: "LinkedIn allows up to 2,600 characters, but the sweet spot is 3-5 short paragraphs (300-500 words). Our generator creates summaries optimized for this length."
        },
        {
            question: "Can I edit the generated summary?",
            answer: "Yes! The generated summary is fully editable. Use it as a starting point and customize it to reflect your unique voice and experience."
        },
        {
            question: "What should I include in my LinkedIn summary?",
            answer: "Include your current role, key achievements, skills, what you're passionate about, and a call-to-action. Our AI generator includes all these elements automatically."
        }
    ],

    'linkedin-headline-generator': [
        {
            question: "What is a LinkedIn headline?",
            answer: "Your LinkedIn headline is the 120-character text that appears below your name on your profile. It's one of the most important elements for searchability and first impressions."
        },
        {
            question: "How do I write a good LinkedIn headline?",
            answer: "A good headline includes your role, value proposition, and keywords. Use our generator to create headlines that attract recruiters and showcase your expertise."
        },
        {
            question: "Can I use emojis in my LinkedIn headline?",
            answer: "Yes! Emojis can make your headline stand out, but use them sparingly. Our generator includes strategic emoji placement when appropriate."
        },
        {
            question: "Should I include my company in my headline?",
            answer: "It depends on your goals. If you're job hunting, focus on skills and value. If you're building your company brand, include it. Our generator offers both options."
        }
    ],

    'linkedin-banner-maker': [
        {
            question: "What size should my LinkedIn banner be?",
            answer: "The optimal LinkedIn banner size is 1584 x 396 pixels. Our banner maker automatically creates images at this exact dimension for perfect display."
        },
        {
            question: "Can I add text to my LinkedIn banner?",
            answer: "Yes! You can add headlines, taglines, and contact information to your banner. Keep text readable and avoid the bottom-left corner where your profile photo appears."
        },
        {
            question: "Is the LinkedIn banner maker free?",
            answer: "Yes! Create unlimited professional LinkedIn banners for free with no watermarks or registration required."
        },
        {
            question: "What makes a good LinkedIn banner?",
            answer: "A good banner is professional, on-brand, includes relevant imagery, and complements your headline. Avoid clutter and ensure it looks good on both desktop and mobile."
        }
    ],

    'linkedin-quote-card-generator': [
        {
            question: "What is a quote card for LinkedIn?",
            answer: "A quote card is a visual image featuring a quote or key message. They're highly shareable and get great engagement on LinkedIn."
        },
        {
            question: "What size should LinkedIn quote cards be?",
            answer: "We recommend 1080 x 1080 pixels (square) for maximum visibility in the feed. Our generator creates cards at this optimal size."
        },
        {
            question: "Can I customize the quote card design?",
            answer: "Yes! Choose from multiple templates, colors, fonts, and backgrounds to match your personal brand."
        },
        {
            question: "Do quote cards increase LinkedIn engagement?",
            answer: "Yes! Visual content like quote cards typically gets 2-3x more engagement than text-only posts on LinkedIn."
        }
    ],

    'linkedin-qr-code-generator': [
        {
            question: "How do I create a LinkedIn QR code?",
            answer: "Enter your LinkedIn profile URL into our generator, and it will create a custom QR code that links directly to your profile. Download and share it anywhere."
        },
        {
            question: "Where can I use my LinkedIn QR code?",
            answer: "Add it to business cards, email signatures, presentations, conference materials, or anywhere you want to make it easy for people to connect with you on LinkedIn."
        },
        {
            question: "Can I customize my LinkedIn QR code?",
            answer: "Yes! You can adjust the size, color, and add your logo to the center of the QR code while maintaining scannability."
        },
        {
            question: "Is the QR code permanent?",
            answer: "Yes! As long as your LinkedIn profile URL doesn't change, the QR code will continue to work indefinitely."
        }
    ],

    'linkedin-cheat-sheet-generator': [
        {
            question: "What is a cheat sheet for LinkedIn?",
            answer: "A cheat sheet is a visual guide or reference document that provides quick, valuable information on a specific topic. They're great for establishing expertise and getting saves/shares."
        },
        {
            question: "What format should I use for LinkedIn cheat sheets?",
            answer: "PDF carousel format works best for LinkedIn. Our generator creates multi-page cheat sheets optimized for LinkedIn's carousel feature."
        },
        {
            question: "How many pages should a cheat sheet have?",
            answer: "Aim for 5-10 pages for optimal engagement. This is enough to provide value without overwhelming readers."
        },
        {
            question: "Can I use cheat sheets for lead generation?",
            answer: "Absolutely! Cheat sheets are excellent lead magnets. Include a CTA to download a full version or connect with you for more information."
        }
    ],

    'linkedin-profile-picture-frame-generator': [
        {
            question: "What is a LinkedIn profile picture frame?",
            answer: "A profile picture frame is a decorative border or overlay that goes around your profile photo. It can include your company branding, achievements, or certifications."
        },
        {
            question: "What size should my LinkedIn profile picture be?",
            answer: "LinkedIn recommends 400 x 400 pixels minimum. Our frame generator works with this size and maintains quality."
        },
        {
            question: "Can I add text to my profile picture frame?",
            answer: "Yes! You can add text like 'Hiring', 'Open to Work', certifications, or your company name to the frame."
        },
        {
            question: "Will the frame work on mobile LinkedIn?",
            answer: "Yes! The frame is designed to display correctly on all devices including mobile apps."
        }
    ],

    'linkedin-carousel-to-video-converter': [
        {
            question: "Why convert LinkedIn carousels to video?",
            answer: "Video format allows you to repurpose your LinkedIn carousel content for TikTok, Instagram Reels, and YouTube Shorts, expanding your reach across platforms."
        },
        {
            question: "What video format does the converter create?",
            answer: "The converter creates MP4 videos in vertical (9:16) format, perfect for TikTok and Reels, with smooth slide transitions."
        },
        {
            question: "Can I add music to the converted video?",
            answer: "Yes! You can add background music, adjust transition timing, and customize the video output."
        },
        {
            question: "What's the maximum number of slides I can convert?",
            answer: "You can convert carousels with up to 20 slides into video format."
        }
    ],

    'billboard-mockup-generator-linkedin': [
        {
            question: "What is a billboard mockup?",
            answer: "A billboard mockup places your message or design on a realistic billboard image. It's a creative way to showcase ideas and get attention on LinkedIn."
        },
        {
            question: "Why use billboard mockups on LinkedIn?",
            answer: "Billboard mockups are eye-catching, convey scale and importance, and get high engagement. They're perfect for announcements, achievements, or bold statements."
        },
        {
            question: "Can I customize the billboard location?",
            answer: "Yes! Choose from various billboard styles and locations including urban, highway, and digital billboards."
        },
        {
            question: "What resolution are the mockups?",
            answer: "All mockups are generated in high resolution (1920 x 1080 or higher) suitable for LinkedIn posts."
        }
    ],

    'linkedin-video-safe-zone-checker': [
        {
            question: "What is the LinkedIn video safe zone?",
            answer: "The safe zone is the area of your video that won't be covered by LinkedIn's UI elements like profile pictures, buttons, and captions. Keeping important content in this zone ensures visibility."
        },
        {
            question: "What are LinkedIn's video dimensions?",
            answer: "LinkedIn supports various aspect ratios. The most common are 16:9 (landscape), 1:1 (square), and 9:16 (vertical). Our tool shows safe zones for all formats."
        },
        {
            question: "Where should I place captions in LinkedIn videos?",
            answer: "Place captions in the upper two-thirds of the video to avoid being covered by the LinkedIn UI. Our safe zone checker shows you exactly where."
        },
        {
            question: "Does the safe zone differ on mobile vs desktop?",
            answer: "Yes! Mobile has more UI overlay. Our tool shows both desktop and mobile safe zones so you can optimize for both."
        }
    ],

    'linkedin-post-readability-score-optimizer': [
        {
            question: "What is a readability score?",
            answer: "A readability score measures how easy your text is to read and understand. Higher scores mean your content is more accessible to a wider audience."
        },
        {
            question: "Why does readability matter on LinkedIn?",
            answer: "LinkedIn users scroll quickly. Easy-to-read posts get more engagement because people can quickly grasp your message. Aim for a readability score of 60-70."
        },
        {
            question: "How can I improve my readability score?",
            answer: "Use shorter sentences, simpler words, active voice, and break up long paragraphs. Our optimizer provides specific suggestions for improvement."
        },
        {
            question: "What readability formula do you use?",
            answer: "We use the Flesch Reading Ease score, which is widely recognized and used by professional writers and marketers."
        }
    ],

    'linkedin-hashtag-generator': [
        {
            question: "How many hashtags should I use on LinkedIn?",
            answer: "LinkedIn experts generally recommend using 3 to 5 relevant hashtags per post. Using too many can make your post look like spam, while using none might limit your reach."
        },
        {
            question: "How does the hashtag generator work?",
            answer: "Our AI analyzes your post content or topic to identify keywords and then suggests a mix of high-reach, niche, and trending hashtags that match your content's context."
        },
        {
            question: "Are these hashtags optimized for LinkedIn?",
            answer: "Yes! Our generator prioritizes hashtags that are commonly used and followed on LinkedIn, helping your content appear in the feeds of people interested in those specific topics."
        },
        {
            question: "Can I use these hashtags on other platforms?",
            answer: "While specifically optimized for LinkedIn, these hashtags are generally relevant across other professional platforms like Twitter (X) and Instagram, though the optimal number of hashtags may vary."
        }
    ],

    'smart-bookmark-tool-linkedin': [
        {
            question: "How does the LinkedIn bookmark manager work?",
            answer: "Our tool helps you organize your saved LinkedIn posts with custom tags, folders, and notes. Find saved content instantly instead of scrolling through hundreds of bookmarks."
        },
        {
            question: "Can I export my bookmarks?",
            answer: "Yes! Export your organized bookmarks to CSV or JSON format for backup or analysis."
        },
        {
            question: "Does this tool access my LinkedIn account?",
            answer: "No! This is a manual organization tool. You copy post URLs from LinkedIn and organize them in our tool. Your LinkedIn credentials are never required."
        },
        {
            question: "Can I share my bookmark collections?",
            answer: "Yes! Create shareable collections of your favorite LinkedIn posts organized by topic or theme."
        }
    ]
};

// Generate JSON-LD schema for a specific tool
export function generateFAQSchema(slug: string) {
    const faqs = TOOL_FAQS[slug];
    if (!faqs || faqs.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}
