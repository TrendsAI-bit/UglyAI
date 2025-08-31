# Ugly AI - The Ultimate Cursed Avatar Factory

A fun, fast, retro PFP factory that creates intentionally awful, pixelated, and cursed profile pictures using AI generation or applies retro filters to existing images.

## Features

- **AI Engine**: Generate cursed avatars from text prompts using OpenAI's DALL-E 3
- **Filter Engine**: Apply retro effects like pixelation, dithering, and chromatic aberration
- **Asset Gallery**: Built-in collection of cartoon face assets to start with
- **Retro CRT Theme**: Authentic scanlines, noise effects, and vintage color palette
- **Instant Download**: Download creations as high-quality PNG files
- **Privacy-Friendly**: No persistent storage by default
- **Rate Limited**: Built-in protection against abuse

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: OpenAI API (DALL-E 3) for image generation and editing
- **Effects**: Canvas-based image processing with custom filters
- **Deployment**: Vercel (zero-config)

## Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TrendsAI-bit/UglyAI.git
cd UglyAI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Asset Gallery
1. Click "Show Asset Gallery" in the studio
2. Choose from our collection of cartoon faces
3. Apply filters to make them ugly
4. Download your creation

### AI Generation
1. Switch to "AI" engine in the toolbar
2. Enter a descriptive prompt (e.g., "corporate mugshot with cursed energy")
3. Click "Generate AI Avatar"
4. Download your creation

### Filter Engine
1. Switch to "Filter" engine in the toolbar
2. Upload an image (drag & drop or click to browse) or select from assets
3. Choose from preset effects or adjust sliders manually
4. Click "Uglify Image"
5. Download the result

### Presets
- **Cursed Cartoon**: High pixelation with stickers
- **1998 Webcam**: Low-quality webcam aesthetic
- **Fax Machine**: Heavy dithering and compression
- **Sticker Attack**: Maximum sticker chaos
- **Mugshot Monday**: Classic police photo style

## API Routes

### POST /api/generate
Generate AI images from prompts.

**Request:**
```json
{
  "prompt": "cursed avatar description",
  "size": "1024x1024",
  "n": 1
}
```

**Response:**
```json
{
  "success": true,
  "images": ["base64_image_data"],
  "prompt": "revised_prompt"
}
```

### POST /api/edit
Edit existing images with AI.

**Request:**
```json
{
  "image": "base64_image_data",
  "mask": "base64_mask_data", // optional
  "prompt": "make it uglier"
}
```

## Effects Engine

The filter engine includes these effects:

- **Pixelation**: Reduce image resolution and scale back up
- **Posterize**: Quantize color channels
- **Dithering**: Floyd-Steinberg error diffusion
- **Chromatic Aberration**: RGB channel shifting
- **JPEG Compression**: Multiple quality reduction passes
- **Noise**: Per-pixel random noise
- **Vignette**: Radial darkening
- **Stickers**: Random emoji overlays

## Asset Collection

The app includes a built-in collection of cartoon face assets:
- **Sad Face**: Dark messy hair, sad expression
- **Surprised Face**: Red spiky hair, shocked expression  
- **Disappointed Face**: Light brown hair, disappointed look
- **Original Face**: Classic cartoon face

All assets are 500x500 PNG files with transparent backgrounds, perfect for applying ugly filters.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `KV_URL`: Vercel KV URL (optional, for production rate limiting)

## Rate Limiting

The app includes built-in rate limiting:
- 10 requests per minute per IP (in-memory)
- For production, consider using Vercel KV for distributed rate limiting

## Privacy

- No images are stored server-side by default
- All processing happens in memory
- EXIF data is stripped from uploaded images
- Optional toggle for "Keep nothing (stateless)" mode

## Troubleshooting

### API Issues
- Make sure your `OPENAI_API_KEY` is set correctly
- Check that your OpenAI account has billing enabled
- Ensure your prompt is under 1000 characters
- Verify your image size is under 20MB for edit operations

### Common Errors
- **414 URI Too Long**: Prompt or image data too large
- **429 Rate Limit**: Too many requests, wait and try again
- **402 Billing**: OpenAI account needs billing setup
- **400 Content Policy**: Prompt violates OpenAI's content policy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is inspired by community projects like "Ugly Avatar" but all effects have been re-implemented from scratch. Please note the non-commercial license of the original inspiration.

## Acknowledgments

- Inspired by community projects like "Ugly Avatar"
- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- Deployed on [Vercel](https://vercel.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## Links

- [OpenAI Platform](https://platform.openai.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Repository](https://github.com/TrendsAI-bit/UglyAI)
