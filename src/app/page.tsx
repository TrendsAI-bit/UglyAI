import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CRTFrame } from '@/components/crt-frame';
import { Sparkles, Wand2, Download } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hsl(var(--crt-dark)) to-hsl(var(--crt-dark) / 0.8) p-4">
      <CRTFrame className="max-w-6xl mx-auto">
        <div className="p-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-hsl(var(--crt-green)) via-transparent to-hsl(var(--crt-magenta))" />
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          {/* Animated Scanline */}
          <div className="scanline-animation" style={{ animationDelay: '1s' }}></div>
          <div className="scanline-animation" style={{ animationDelay: '2s' }}></div>
          {/* Hero Section */}
          <div className="text-center mb-16 relative z-10">
            {/* Glitch Effect */}
            <div className="relative">
              <h1 className="pixel-text text-6xl font-bold mb-6 text-hsl(var(--crt-green)) relative">
                <span className="absolute inset-0 text-hsl(var(--crt-magenta)) animate-pulse opacity-50" style={{ transform: 'translate(2px, 2px)' }}>
                  UGLY AI
                </span>
                <span className="relative">UGLY AI</span>
              </h1>
            </div>
            
            <p className="pixel-text text-2xl mb-8 text-hsl(var(--crt-amber)) animate-pulse">
              The Ultimate Cursed Avatar Factory
            </p>
            
            <div className="bg-hsl(var(--crt-dark) / 0.7) border-2 border-hsl(var(--crt-green)) rounded-lg p-6 mb-8 max-w-2xl mx-auto backdrop-blur-sm">
              <p className="text-lg text-hsl(var(--crt-beige)) leading-relaxed">
                Create intentionally awful, pixelated, and cursed profile pictures using AI generation 
                or apply retro filters to your existing images. Perfect for those who embrace the chaos!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studio">
                <Button size="lg" className="btn-ugly text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Open Studio
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="btn-ugly text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200">
                <Wand2 className="w-5 h-5 mr-2" />
                View Gallery
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
            <div className="text-center p-6 bg-hsl(var(--crt-dark) / 0.8) rounded-lg border-2 border-hsl(var(--crt-green)) backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-hsl(var(--crt-magenta))">
              <div className="w-16 h-16 mx-auto mb-4 bg-hsl(var(--crt-green) / 0.2) rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-hsl(var(--crt-magenta))" />
              </div>
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                AI Generation
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Generate cursed avatars from text prompts using OpenAI&apos;s latest models
              </p>
            </div>

            <div className="text-center p-6 bg-hsl(var(--crt-dark) / 0.8) rounded-lg border-2 border-hsl(var(--crt-green)) backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-hsl(var(--crt-amber))">
              <div className="w-16 h-16 mx-auto mb-4 bg-hsl(var(--crt-amber) / 0.2) rounded-full flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-hsl(var(--crt-amber))" />
              </div>
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                Filter Engine
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Apply retro effects like pixelation, dithering, and chromatic aberration
              </p>
            </div>

            <div className="text-center p-6 bg-hsl(var(--crt-dark) / 0.8) rounded-lg border-2 border-hsl(var(--crt-green)) backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-hsl(var(--crt-magenta))">
              <div className="w-16 h-16 mx-auto mb-4 bg-hsl(var(--crt-magenta) / 0.2) rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-hsl(var(--crt-magenta))" />
              </div>
              <h3 className="pixel-text text-xl font-bold mb-2 text-hsl(var(--crt-green))">
                Instant Download
              </h3>
              <p className="text-hsl(var(--crt-beige))">
                Download your creations as high-quality PNG files ready to use
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mb-16 relative z-10">
            <h2 className="pixel-text text-3xl font-bold text-center mb-8 text-hsl(var(--crt-amber))">
              See It In Action
            </h2>
            <div className="bg-hsl(var(--crt-dark) / 0.8) rounded-lg border-2 border-hsl(var(--crt-green)) p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="pixel-text text-xl font-bold mb-4 text-hsl(var(--crt-green))">
                    Retro CRT Aesthetic
                  </h3>
                  <ul className="space-y-3 text-hsl(var(--crt-beige))">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-hsl(var(--crt-magenta)) rounded-full mr-3"></span>
                      Authentic scanlines and noise effects
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-hsl(var(--crt-amber)) rounded-full mr-3"></span>
                      Vintage color palette
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-hsl(var(--crt-green)) rounded-full mr-3"></span>
                      Pixel-perfect typography
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-hsl(var(--crt-magenta)) rounded-full mr-3"></span>
                      Responsive design
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-hsl(var(--crt-green) / 0.3) to-hsl(var(--crt-magenta) / 0.3) rounded-lg border-2 border-hsl(var(--crt-green)) flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-hsl(var(--crt-green) / 0.1) animate-pulse"></div>
                    <div className="relative z-10">
                      <p className="pixel-text text-hsl(var(--crt-amber)) text-lg">
                        Live Demo Coming Soon
                      </p>
                      <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-hsl(var(--crt-magenta)) rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-hsl(var(--crt-amber)) rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-hsl(var(--crt-green)) rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Presets Preview */}
          <div className="mb-16 relative z-10">
            <h2 className="pixel-text text-3xl font-bold text-center mb-8 text-hsl(var(--crt-amber))">
              Ugly Presets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: 'Cursed Cartoon', color: 'magenta', icon: '😈' },
                { name: '1998 Webcam', color: 'amber', icon: '📹' },
                { name: 'Fax Machine', color: 'green', icon: '📠' },
                { name: 'Sticker Attack', color: 'magenta', icon: '🎭' },
                { name: 'Mugshot Monday', color: 'amber', icon: '📸' }
              ].map((preset) => (
                <div key={preset.name} className="text-center p-4 bg-hsl(var(--crt-dark) / 0.8) rounded-lg border-2 border-hsl(var(--crt-green)) backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:border-hsl(var(--crt-magenta))">
                  <h4 className="pixel-text text-sm font-bold text-hsl(var(--crt-green)) mb-3">
                    {preset.name}
                  </h4>
                  <div className={`w-16 h-16 mx-auto bg-hsl(var(--crt-${preset.color}) / 0.2) rounded-lg border-2 border-hsl(var(--crt-${preset.color})) flex items-center justify-center text-2xl`}>
                    {preset.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center relative z-10">
            <div className="bg-hsl(var(--crt-dark) / 0.8) border-2 border-hsl(var(--crt-green)) rounded-lg p-8 backdrop-blur-sm">
              <h2 className="pixel-text text-3xl font-bold mb-6 text-hsl(var(--crt-green))">
                Ready to Create Something Awful?
              </h2>
              <p className="text-lg mb-8 text-hsl(var(--crt-beige))">
                Join the revolution of intentionally ugly avatars!
              </p>
              <Link href="/studio">
                <Button size="lg" className="btn-ugly text-xl px-12 py-6 transform hover:scale-110 transition-transform duration-200">
                  <Sparkles className="w-6 h-6 mr-3" />
                  Start Creating Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-hsl(var(--crt-green) / 0.3) text-center relative z-10">
            <div className="bg-hsl(var(--crt-dark) / 0.6) rounded-lg p-6 backdrop-blur-sm">
              <p className="text-sm text-hsl(var(--crt-beige) / 0.7) mb-4">
                Inspired by community projects like &apos;Ugly Avatar&apos; (non-commercial license noted). 
                Effects re-implemented from scratch.
              </p>
              <div className="flex justify-center space-x-4 text-xs text-hsl(var(--crt-beige) / 0.5)">
                <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber)) transition-colors duration-200">
                  OpenAI
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber)) transition-colors duration-200">
                  Vercel
                </a>
                <a href="https://github.com/TrendsAI-bit/UglyAI" target="_blank" rel="noopener noreferrer" className="hover:text-hsl(var(--crt-amber)) transition-colors duration-200">
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </CRTFrame>
    </div>
  );
}
