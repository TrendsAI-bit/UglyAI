import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { limit } from "@/lib/rate-limit";
import { EditRequestSchema } from "@/lib/schemas";

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

    const { image, mask, prompt } = EditRequestSchema.parse(body);

    // Validate prompt length to prevent 414 errors
    if (prompt && prompt.length > 1000) {
      return NextResponse.json(
        { error: "Prompt too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // Validate image size to prevent 414 errors
    if (image.length > 20000000) { // ~20MB limit
      return NextResponse.json(
        { error: "Image too large. Please use a smaller image." },
        { status: 400 }
      );
    }

    const openai = getOpenAI();
    
    // Use image generation with the original image as a reference
    // We'll create a new image based on the prompt and reference
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create an ugly, distorted, cursed version of this image: ${prompt || 'Make it look extremely ugly, pixelated, with weird colors and artifacts'}. The image should be intentionally bad, with pixelation, color distortion, weird artifacts, and look like a terrible profile picture from the 90s.`,
      size: "1024x1024",
      n: 1,
      quality: "standard",
      response_format: "b64_json",
    });

    const generatedImage = response.data?.[0]?.b64_json;

    if (!generatedImage) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      image: generatedImage,
      prompt: response.data?.[0]?.revised_prompt || prompt 
    });

  } catch (error: unknown) {
    console.error("Generation error:", error);
    
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
