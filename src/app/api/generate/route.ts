import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { limit } from "@/lib/rate-limit";
import { GenerateRequestSchema } from "@/lib/schemas";

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

    const { prompt, size, n } = GenerateRequestSchema.parse(body);

    // Validate prompt length to prevent 414 errors
    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: "Prompt too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    const openai = getOpenAI();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create an ugly, distorted, cursed avatar: ${prompt}. Make it look intentionally bad with pixelation, color distortion, and weird artifacts. Style: cartoon, retro, glitch aesthetic.`,
      size: size as "1024x1024" | "512x512",
      n: Math.min(n, 1), // DALL-E 3 only supports n=1
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
