import OpenAI from "openai";

// Only initialize if API key is available (for build time)
export const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export function getOpenAI() {
  if (!openai) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  return openai;
}
