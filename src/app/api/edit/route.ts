import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { limit } from "@/lib/rate-limit";
import { EditRequestSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    await limit(req);
    const body = await req.json();
    const { image, mask, prompt } = EditRequestSchema.parse(body);

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
      prompt: `Make this image uglier and more cursed: ${prompt}. Add pixelation, color distortion, weird artifacts, and make it look intentionally bad.`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const editedImage = response.data?.[0]?.b64_json;

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

    return NextResponse.json(
      { error: "Failed to edit image. Please try again." },
      { status: 500 }
    );
  }
}
