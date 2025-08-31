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

    // Create a prompt that references the uploaded image without using GPT-4 Vision
    // This approach uses the user's prompt and adds context about the reference image
    const enhancedPrompt = `Create an extremely ugly, distorted, and cursed version of the uploaded profile picture. ${prompt}. Make it look intentionally terrible with pixelation, color distortion, weird artifacts, cartoon style, and make it look like the worst profile picture ever. The result should maintain the same basic composition and features as the original but make it look absolutely awful and cursed.`;

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
      prompt: response.data?.[0]?.revised_prompt || enhancedPrompt
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
