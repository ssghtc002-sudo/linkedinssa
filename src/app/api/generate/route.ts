import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { type, topic, tone, length, context } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        let prompt = "";
        let systemPrompt = "You are an expert LinkedIn content creator. Your goal is to create high-performing, engaging content.";

        if (type === 'carousel') {
            const slidesCount = length === 'short' ? 4 : length === 'long' ? 10 : 7;
            prompt = `Create a LinkedIn carousel about "${topic}" with ${slidesCount} slides.
            Tone: ${tone}
            
            Return a JSON object with a "slides" key containing an array of objects.
            Each object in the array must have:
            - id: a random string
            - title: a short, catchy slide title
            - content: the main content for the slide (max 200 characters). Use \\n for new lines.
            - layout: one of ['center', 'left', 'list', 'quote']
            
            Slide 1 should be a hook-driven title slide.
            Final slide should be a Call to Action.
            
            Format: { "slides": [{ "id": "1", "title": "...", "content": "...", "layout": "..." }, ...] }`;

            systemPrompt += " You must return valid JSON only. The root element must be an object with a 'slides' property.";
        } else if (type === 'post') {
            prompt = `Write a LinkedIn post about "${topic}".
            Tone: ${tone}
            
            Requirements:
            - Strong hook
            - Spaced out for readability
            - Use relevant emojis
            - Include 3-5 hashtags at the end
            - Professional but engaging.`;
        } else if (type === 'headline') {
            prompt = `Generate 3 catchy LinkedIn headlines for someone whose expertise is "${topic}".
            Tone: ${tone}
            
            Return them separated by new lines.`;
        } else if (type === 'summary') {
            prompt = `Write a professional LinkedIn 'About' summary based on this background: "${topic}".
            Tone: ${tone}
            
            Return 2-3 paragraphs.`;
        } else if (type === 'hashtags') {
            prompt = `Generate 15 high-performing LinkedIn hashtags related to: "${topic}".
            
            Return ONLY the hashtags separated by spaces, without the # symbol.
            Example: LinkedIn Networking Marketing Success Innovation`;
        } else if (type === 'cheatsheet') {
            prompt = `Create a professional LinkedIn cheat sheet about "${topic}".
            
            Return ONLY a JSON object with:
            - title: a catchy title
            - subtitle: a descriptive subtitle
            - items: an array of 5-8 objects, each with 'id' (string), 'title' (string), and 'content' (string).
            
            Each content should be a concise, actionable tip.`;
            systemPrompt += " You must return valid JSON only.";
        } else if (type === 'quote') {
            prompt = `Generate a short, inspiring LinkedIn quote about "${topic}".
            
            Return ONLY a JSON object with:
            - quote: the quote text (short, max 100 chars)
            - author: a famous person or just "Anonymous"
            
            Provide only one quote.`;
            systemPrompt += " You must return valid JSON only.";
        } else if (type === 'banner') {
            prompt = `Generate a powerful, short LinkedIn banner headline about "${topic}".
            Example: "Scaling Businesses with Data-Driven Marketing"
            
            Return ONLY a JSON object with:
            - slogan: the slogan text (max 60 chars)`;
            systemPrompt += " You must return valid JSON only.";
        } else if (type === 'rewrite') {
            prompt = `Rewrite this LinkedIn post to be more readable and engaging.
            Original: "${topic}"
            
            Requirements:
            - Improve flow and clarity
            - Keep it professional
            - Use short sentences
            - Output the optimized text.`;
        } else {





            // Generic tool generation
            prompt = `Generate content for a ${type} tool about "${topic}".
            Tone: ${tone}
            ${context ? `Context: ${context}` : ''}`;
        }

        const model = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-4o-mini";
        // Check for o1 models OR gpt-5 models (which often have similar restrictions on temp/system roles)
        const isRestrictedModel = model.startsWith('o1') || model.includes('gpt-5');

        const messages: any[] = [
            { role: isRestrictedModel ? "user" : "system", content: systemPrompt },
            { role: "user", content: prompt },
        ];

        // Prepare request parameters
        const requestParams: any = {
            model,
            messages,
            response_format: (type === 'carousel' || type === 'cheatsheet' || type === 'quote' || type === 'banner')
                ? { type: "json_object" }
                : undefined,
        };

        // Only add temperature if NOT using restricted model
        if (!isRestrictedModel) {
            requestParams.temperature = 0.7;
        }

        // restricted models (o1/gpt-5) currently might not support response_format or system prompts perfectly
        if (isRestrictedModel) {
            delete requestParams.response_format;
        }

        const response = await openai.chat.completions.create(requestParams);


        let content = response.choices[0].message.content || "";

        // Clean markdown code blocks if present (common with o1 without json_object)
        content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        if (type === 'carousel' || type === 'cheatsheet' || type === 'quote' || type === 'banner') {
            try {
                // If it's a JSON object but we need an array, we might need to parse it
                const parsed = JSON.parse(content);

                if (type === 'carousel') {
                    const slides = Array.isArray(parsed) ? parsed : (parsed.slides || parsed.carousel || Object.values(parsed)[0]);
                    return NextResponse.json({ slides });
                }

                return NextResponse.json(parsed);
            } catch (e) {
                console.error("Failed to parse AI JSON:", content);
                return NextResponse.json({ error: 'Failed to generate valid JSON data' }, { status: 500 });
            }
        }


        return NextResponse.json({ result: content });

    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
