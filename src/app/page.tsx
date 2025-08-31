import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Download, Image as ImageIcon } from 'lucide-react';

const ASSETS = [
  {
    name: 'Sad Face',
    path: '/assets/face (1).png',
    description: 'Dark messy hair, sad expression'
  },
  {
    name: 'Surprised Face', 
    path: '/assets/face (2).png',
    description: 'Red spiky hair, shocked expression'
  },
  {
    name: 'Disappointed Face',
    path: '/assets/face (3).png', 
    description: 'Light brown hair, disappointed look'
  },
  {
    name: 'Original Face',
    path: '/assets/face.png',
    description: 'Classic cartoon face'
  }
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        {/* Glitch Effect */}
        <div className="relative mb-6">
          <h1 className="h-pixel text-4xl sm:text-5xl md:text-6xl crt-glow relative">
            <span className="absolute inset-0 text-magenta animate-pulse opacity-50" style={{ transform: 'translate(2px, 2px)' }}>
              UGLY AI
            </span>
            <span className="relative">UGLY AI</span>
          </h1>
        </div>
        
        <p className="h-pixel text-xl sm:text-2xl mb-8 text-amber animate-pulse">
          The Ultimate Cursed Avatar Factory
        </p>
        
        <div className="panel mb-8 max-w-2xl mx-auto">
          <p className="text-lg leading-relaxed">
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
          <Button size="lg" variant="outline" className="btn-retro text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200">
            <Wand2 className="w-5 h-5 mr-2" />
            View Gallery
          </Button>
        </div>
      </div>

      {/* Asset Showcase */}
      <div>
        <h2 className="h-pixel text-2xl sm:text-3xl font-bold text-center mb-8 text-amber">
          Cartoon Face Assets
        </h2>
        <div className="panel mb-8">
          <p className="text-center mb-6">
            Start with our collection of cartoon faces and make them ugly!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ASSETS.map((asset) => (
              <div key={asset.name} className="text-center group">
                <div className="relative panel transform hover:scale-105 transition-all duration-300">
                  <div className="relative w-full aspect-square mb-3">
                    <Image
                      src={asset.path}
                      alt={asset.name}
                      fill
                      className="object-contain rounded"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h4 className="h-pixel text-sm font-bold mb-1">
                    {asset.name}
                  </h4>
                  <p className="text-xs opacity-70">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/studio">
              <Button className="btn-ugly">
                <ImageIcon className="w-4 h-4 mr-2" />
                Use These Assets
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center panel transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-black/40 rounded-full flex items-center justify-center border border-current">
            <Sparkles className="w-8 h-8 text-magenta" />
          </div>
          <h3 className="h-pixel text-xl font-bold mb-2">
            AI Generation
          </h3>
          <p>
            Generate cursed avatars from text prompts using OpenAI&apos;s latest models
          </p>
        </div>

        <div className="text-center panel transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-black/40 rounded-full flex items-center justify-center border border-current">
            <Wand2 className="w-8 h-8 text-amber" />
          </div>
          <h3 className="h-pixel text-xl font-bold mb-2">
            Filter Engine
          </h3>
          <p>
            Apply retro effects like pixelation, dithering, and chromatic aberration
          </p>
        </div>

        <div className="text-center panel transform hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-black/40 rounded-full flex items-center justify-center border border-current">
            <Download className="w-8 h-8 text-magenta" />
          </div>
          <h3 className="h-pixel text-xl font-bold mb-2">
            Instant Download
          </h3>
          <p>
            Download your creations as high-quality PNG files ready to use
          </p>
        </div>
      </div>

      {/* Demo Section */}
      <div>
        <h2 className="h-pixel text-2xl sm:text-3xl font-bold text-center mb-8 text-amber">
          See It In Action
        </h2>
        <div className="panel">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="h-pixel text-xl font-bold mb-4">
                Retro CRT Aesthetic
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-magenta rounded-full mr-3"></span>
                  Authentic scanlines and noise effects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber rounded-full mr-3"></span>
                  Vintage color palette
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3 bg-current"></span>
                  Pixel-perfect typography
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-magenta rounded-full mr-3"></span>
                  Responsive design
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-black/40 rounded-lg border border-current flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-current bg-opacity-10 animate-pulse"></div>
                <div className="relative z-10">
                  <p className="h-pixel text-amber text-lg">
                    Live Demo Coming Soon
                  </p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-magenta rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-amber rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 rounded-full animate-bounce bg-current" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Presets Preview */}
      <div>
        <h2 className="h-pixel text-2xl sm:text-3xl font-bold text-center mb-8 text-amber">
          Ugly Presets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: 'Cursed Cartoon', color: 'magenta', icon: '😈' },
            { name: '1998 Webcam', color: 'amber', icon: '📹' },
            { name: 'Fax Machine', color: 'current', icon: '📠' },
            { name: 'Sticker Attack', color: 'magenta', icon: '🎭' },
            { name: 'Mugshot Monday', color: 'amber', icon: '📸' }
          ].map((preset) => (
            <div key={preset.name} className="text-center panel transform hover:scale-105 transition-all duration-300">
              <h4 className="h-pixel text-sm font-bold mb-3">
                {preset.name}
              </h4>
              <div className={`w-16 h-16 mx-auto bg-black/40 rounded-lg border border-current flex items-center justify-center text-2xl`}>
                {preset.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="panel">
          <h2 className="h-pixel text-2xl sm:text-3xl font-bold mb-6">
            Ready to Create Something Awful?
          </h2>
          <p className="text-lg mb-8">
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
      <footer className="pt-8 border-t border-current border-opacity-30 text-center">
        <div className="panel">
          <p className="text-sm opacity-60 mb-4">
            Inspired by community projects like &apos;Ugly Avatar&apos; (non-commercial license noted). 
            Effects re-implemented from scratch.
          </p>
          <div className="flex justify-center space-x-4 text-xs opacity-50">
            <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors duration-200">
              OpenAI
            </a>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors duration-200">
              Vercel
            </a>
            <a href="https://github.com/TrendsAI-bit/UglyAI" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors duration-200">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
