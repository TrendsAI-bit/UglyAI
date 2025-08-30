import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { limit } from "@/lib/rate-limit";
import { GenerateRequestSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    await limit(req);
    const body = await req.json();
    const { prompt, size, n } = GenerateRequestSchema.parse(body);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create an ugly, distorted, cursed avatar: ${prompt}. Make it look intentionally bad with pixelation, color distortion, and weird artifacts.`,
      size: size as "1024x1024" | "512x512",
      n: n,
      quality: "standard",
      response_format: "b64_json",
    });

    const images = response.data?.map((image: { b64_json: string }) => image.b64_json) || [];

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

    return NextResponse.json(
      { error: "Failed to generate image. Please try again." },
      { status: 500 }
    );
  }
}
