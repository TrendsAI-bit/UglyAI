import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { limit } from "@/lib/rate-limit";
import { ImageToImageRequestSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please set OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    await limit(req);
    
    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { image, prompt, size } = ImageToImageRequestSchema.parse(body);

    // Validate prompt length to prevent 414 errors
    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: "Prompt too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // Validate image size (base64 can be large)
    if (image.length > 20000000) { // ~20MB limit
      return NextResponse.json(
        { error: "Image too large. Please use a smaller image." },
        { status: 400 }
      );
    }

    const openai = getOpenAI();

    // First, analyze the image to get a description
    const imageBuffer = Buffer.from(image, 'base64');

    // Use GPT-4 Vision to analyze the image and create a detailed description
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail, focusing on the person's appearance, facial features, hair style, clothing, and overall style. Be specific about colors, shapes, and characteristics. This description will be used to create an ugly version of this image."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${image}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const imageDescription = analysisResponse.choices[0]?.message?.content || "a person";

    // Now generate the ugly version using the detailed description
    const enhancedPrompt = `Create an extremely ugly, distorted, and cursed version of this person: ${imageDescription}. ${prompt}. Make it look intentionally terrible with pixelation, color distortion, weird artifacts, cartoon style, and make it look like the worst profile picture ever. The result should maintain the same basic composition and features as the original but make it look absolutely awful.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: size as "1024x1024" | "512x512",
      n: 1,
      quality: "standard",
      response_format: "b64_json",
    });

    const images = response.data?.map((image) => image.b64_json).filter(Boolean) || [];

    if (images.length === 0) {
      return NextResponse.json(
        { error: "No images were generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      images,
      prompt: response.data?.[0]?.revised_prompt || enhancedPrompt,
      originalDescription: imageDescription
    });

  } catch (error: unknown) {
    console.error("Image-to-image generation error:", error);
    
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes("billing")) {
      return NextResponse.json(
        { error: "OpenAI billing issue. Please check your account." },
        { status: 402 }
      );
    }

    if (error instanceof Error && error.message.includes("content_policy")) {
      return NextResponse.json(
        { error: "Content policy violation. Please try a different prompt." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate image. Please try again." },
      { status: 500 }
    );
  }
}
