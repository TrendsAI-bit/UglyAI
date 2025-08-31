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

    // First, analyze the image using GPT-4 Vision to understand its characteristics
    const imageBuffer = Buffer.from(image, 'base64');
    const imageFile = new File([imageBuffer], 'reference.png', { type: 'image/png' });

    let imageAnalysis = "";
    try {
      const analysisResponse = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Describe this image in detail. Focus on: 1) The style (cartoon, realistic, etc.), 2) The colors and color scheme, 3) The composition and layout, 4) Any distinctive features or characteristics. Keep it concise but specific."
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
        max_tokens: 200
      });

      imageAnalysis = analysisResponse.choices[0]?.message?.content || "";
    } catch (visionError) {
      console.log("Vision analysis failed, using fallback approach:", visionError);
      // Fallback: use a generic approach
      imageAnalysis = "cartoon style profile picture";
    }

    // Create a targeted prompt that maintains the original image's characteristics
    const basePrompt = prompt || "Make this image extremely ugly, distorted, and cursed";
    
    const enhancedPrompt = `Transform this exact image into an ugly version while maintaining its original style and composition: ${imageAnalysis}. ${basePrompt}. 

Requirements:
- Keep the same basic composition and layout as the original
- Maintain the same art style (cartoon, realistic, etc.)
- Use similar colors but make them distorted and ugly
- Add pixelation, glitches, and artifacts
- Make it look intentionally terrible while still being recognizable as the same image
- The result should look like a corrupted, cursed version of the original

Style: ${imageAnalysis}
Original characteristics must be preserved but made ugly.`;

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
      analysis: imageAnalysis
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
