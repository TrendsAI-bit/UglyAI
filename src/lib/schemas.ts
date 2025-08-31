import { z } from "zod";

export const GenerateRequestSchema = z.object({
  prompt: z.string().min(3).max(1000),
  size: z.enum(["512x512", "1024x1024"]).default("1024x1024"),
  n: z.number().min(1).max(4).default(1),
  seed: z.number().optional(),
});

export const EditRequestSchema = z.object({
  image: z.string().min(1), // base64 image
  mask: z.string().optional(), // base64 mask
  prompt: z.string().min(3).max(1000),
});

export const ImageToImageRequestSchema = z.object({
  image: z.string().min(1), // base64 reference image
  prompt: z.string().min(3).max(1000),
  size: z.enum(["512x512", "1024x1024"]).default("1024x1024"),
});

export const FilterSettingsSchema = z.object({
  pixelSize: z.number().min(1).max(50).default(16),
  posterizeLevels: z.number().min(2).max(8).default(3),
  dither: z.boolean().default(true),
  aberration: z.number().min(0).max(10).default(3),
  jpegMush: z.number().min(0).max(5).default(2),
  noise: z.number().min(0).max(100).default(20),
  vignette: z.number().min(0).max(1).default(0.3),
  stickers: z.boolean().default(true),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;
export type EditRequest = z.infer<typeof EditRequestSchema>;
export type ImageToImageRequest = z.infer<typeof ImageToImageRequestSchema>;
export type FilterSettings = z.infer<typeof FilterSettingsSchema>;
