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

    // Convert base64 to File objects
    const imageBlob = new Blob([Buffer.from(image, 'base64')], { type: 'image/png' });
    const imageFile = new File([imageBlob], 'image.png', { type: 'image/png' });
    
    let maskFile: File | undefined;
    if (mask) {
      const maskBlob = new Blob([Buffer.from(mask, 'base64')], { type: 'image/png' });
      maskFile = new File([maskBlob], 'mask.png', { type: 'image/png' });
    }

    const openai = getOpenAI();
    const response = await openai.images.edit({
      image: imageFile,
      mask: maskFile,
      prompt: `Make this image uglier and more cursed: ${prompt || 'Make it look intentionally bad with pixelation, color distortion, weird artifacts, and cartoon style'}. Add pixelation, color distortion, weird artifacts, and make it look intentionally bad.`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const editedImage = response.data?.[0]?.b64_json;

    if (!editedImage) {
      return NextResponse.json(
        { error: "No edited image was generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      image: editedImage,
      prompt: response.data?.[0]?.revised_prompt || prompt 
    });

  } catch (error: unknown) {
    console.error("Edit error:", error);
    
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
      { error: "Failed to edit image. Please try again." },
      { status: 500 }
    );
  }
}
