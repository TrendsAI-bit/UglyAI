import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CRTFrame } from '@/components/crt-frame';
import { Sparkles, Wand2, Download } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hsl(var(--crt-dark)) to-hsl(var(--crt-dark) / 0.8)">
      <CRTFrame className="max-w-6xl mx-auto p-4">
        <div className="p-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="pixel-text text-6xl font-bold mb-6 text-hsl(var(--crt-green))">
              UGLY AI
            </h1>
            <p className="pixel-text text-2xl mb-8 text-hsl(var(--crt-amber))">
              The Ultimate Cursed Avatar Factory
            </p>
            <p className="text-lg mb-8 text-hsl(var(--crt-beige)) max-w-2xl mx-auto">
              Create intentionally awful, pixelated, and cursed profile pictures using AI generation 
              or apply retro filters to your existing images. Perfect for those who embrace the chaos!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studio">
                <Button size="lg" className="btn-ugly text-lg px-8 py-4">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Open Studio
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-ugly text-lg px-8 py-4">
                <Wand2 className="w-5 h-5 mr-2" />
                View Gallery
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-hsl(var(--crt-magenta))" />
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                AI Generation
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Generate cursed avatars from text prompts using OpenAI&apos;s latest models
              </p>
            </div>

            <div className="text-center p-6 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
              <Wand2 className="w-12 h-12 mx-auto mb-4 text-hsl(var(--crt-amber))" />
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                Filter Engine
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Apply retro effects like pixelation, dithering, and chromatic aberration
              </p>
            </div>

            <div className="text-center p-6 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
              <Download className="w-12 h-12 mx-auto mb-4 text-hsl(var(--crt-magenta))" />
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                Instant Download
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Download your creations as high-quality PNG files ready to use
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mb-16">
            <h2 className="pixel-text text-3xl font-bold text-center mb-8 text-hsl(var(--crt-amber))">
              See It In Action
            </h2>
            <div className="bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green)) p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="pixel-text text-xl font-bold mb-4 text-hsl(var(--crt-green))">
                    Retro CRT Aesthetic
                  </h3>
                  <ul className="space-y-2 text-hsl(var(--crt-beige))">
                    <li>• Authentic scanlines and noise effects</li>
                    <li>• Vintage color palette</li>
                    <li>• Pixel-perfect typography</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-hsl(var(--crt-green) / 0.2) rounded-lg border-2 border-hsl(var(--crt-green)) flex items-center justify-center">
                    <p className="pixel-text text-hsl(var(--crt-amber))">
                      Live Demo Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Presets Preview */}
          <div className="mb-16">
            <h2 className="pixel-text text-3xl font-bold text-center mb-8 text-hsl(var(--crt-amber))">
              Ugly Presets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {['Cursed Cartoon', '1998 Webcam', 'Fax Machine', 'Sticker Attack', 'Mugshot Monday'].map((preset) => (
                <div key={preset} className="text-center p-4 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
                  <h4 className="pixel-text text-sm font-bold text-hsl(var(--crt-green)) mb-2">
                    {preset}
                  </h4>
                  <div className="w-16 h-16 mx-auto bg-hsl(var(--crt-green) / 0.2) rounded border border-hsl(var(--crt-green))" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="pixel-text text-3xl font-bold mb-6 text-hsl(var(--crt-green))">
              Ready to Create Something Awful?
            </h2>
            <p className="text-lg mb-8 text-hsl(var(--crt-beige))">
              Join the revolution of intentionally ugly avatars!
            </p>
            <Link href="/studio">
              <Button size="lg" className="btn-ugly text-xl px-12 py-6">
                <Sparkles className="w-6 h-6 mr-3" />
                Start Creating Now
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-hsl(var(--crt-green) / 0.3) text-center">
            <p className="text-sm text-hsl(var(--crt-beige) / 0.7) mb-4">
              Inspired by community projects like &apos;Ugly Avatar&apos; (non-commercial license noted). 
              Effects re-implemented from scratch.
            </p>
            <div className="flex justify-center space-x-4 text-xs text-hsl(var(--crt-beige) / 0.5)">
              <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber))">
                OpenAI
              </a>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber))">
                Vercel
              </a>
              <a href="https://github.com/TrendsAI-bit/UglyAI" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber))">
                GitHub
              </a>
            </div>
          </footer>
        </div>
      </CRTFrame>
    </div>
  );
}
