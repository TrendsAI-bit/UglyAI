import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Download } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-3xl p-8 border-2 border-green-500 shadow-2xl">
        <div className="p-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-transparent to-pink-500" />
          </div>
          {/* Hero Section */}
          <div className="text-center mb-16 relative z-10">
            {/* Glitch Effect */}
            <div className="relative">
              <h1 className="font-pixel text-6xl font-bold mb-6 text-green-500 relative">
                <span className="absolute inset-0 text-pink-500 animate-pulse opacity-50" style={{ transform: 'translate(2px, 2px)' }}>
                  UGLY AI
                </span>
                <span className="relative">UGLY AI</span>
              </h1>
            </div>
            
            <p className="font-pixel text-2xl mb-8 text-yellow-400 animate-pulse">
              The Ultimate Cursed Avatar Factory
            </p>
            
            <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-lg text-gray-200 leading-relaxed">
                Create intentionally awful, pixelated, and cursed profile pictures using AI generation 
                or apply retro filters to your existing images. Perfect for those who embrace the chaos!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studio">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200 border-2 border-green-500 shadow-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Open Studio
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-transparent text-white text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200 border-2 border-green-500 hover:bg-green-500 hover:text-black">
                <Wand2 className="w-5 h-5 mr-2" />
                View Gallery
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
            <div className="text-center p-6 bg-gray-900 rounded-lg border-2 border-green-500 transform hover:scale-105 transition-all duration-300 hover:border-pink-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-pixel text-xl font-bold mb-2 text-green-500">
                AI Generation
              </h3>
              <p className="text-gray-200">
                Generate cursed avatars from text prompts using OpenAI&apos;s latest models
              </p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-lg border-2 border-green-500 transform hover:scale-105 transition-all duration-300 hover:border-yellow-400">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-pixel text-xl font-bold mb-2 text-green-500">
                Filter Engine
              </h3>
              <p className="text-gray-200">
                Apply retro effects like pixelation, dithering, and chromatic aberration
              </p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-lg border-2 border-green-500 transform hover:scale-105 transition-all duration-300 hover:border-pink-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-pixel text-xl font-bold mb-2 text-green-500">
                Instant Download
              </h3>
              <p className="text-gray-200">
                Download your creations as high-quality PNG files ready to use
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mb-16 relative z-10">
            <h2 className="font-pixel text-3xl font-bold text-center mb-8 text-yellow-400">
              See It In Action
            </h2>
            <div className="bg-gray-900 rounded-lg border-2 border-green-500 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-pixel text-xl font-bold mb-4 text-green-500">
                    Retro CRT Aesthetic
                  </h3>
                  <ul className="space-y-3 text-gray-200">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                      Authentic scanlines and noise effects
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      Vintage color palette
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Pixel-perfect typography
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                      Responsive design
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-green-500 to-pink-500 bg-opacity-30 rounded-lg border-2 border-green-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500 bg-opacity-10 animate-pulse"></div>
                    <div className="relative z-10">
                      <p className="font-pixel text-yellow-400 text-lg">
                        Live Demo Coming Soon
                      </p>
                      <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Presets Preview */}
          <div className="mb-16 relative z-10">
            <h2 className="font-pixel text-3xl font-bold text-center mb-8 text-yellow-400">
              Ugly Presets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: 'Cursed Cartoon', color: 'pink', icon: '😈' },
                { name: '1998 Webcam', color: 'yellow', icon: '📹' },
                { name: 'Fax Machine', color: 'green', icon: '📠' },
                { name: 'Sticker Attack', color: 'pink', icon: '🎭' },
                { name: 'Mugshot Monday', color: 'yellow', icon: '📸' }
              ].map((preset) => (
                <div key={preset.name} className="text-center p-4 bg-gray-900 rounded-lg border-2 border-green-500 transform hover:scale-105 transition-all duration-300 hover:border-pink-500">
                  <h4 className="font-pixel text-sm font-bold text-green-500 mb-3">
                    {preset.name}
                  </h4>
                  <div className={`w-16 h-16 mx-auto bg-${preset.color}-500 bg-opacity-20 rounded-lg border-2 border-${preset.color}-500 flex items-center justify-center text-2xl`}>
                    {preset.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center relative z-10">
            <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-8">
              <h2 className="font-pixel text-3xl font-bold mb-6 text-green-500">
                Ready to Create Something Awful?
              </h2>
              <p className="text-lg mb-8 text-gray-200">
                Join the revolution of intentionally ugly avatars!
              </p>
              <Link href="/studio">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xl px-12 py-6 transform hover:scale-110 transition-transform duration-200 border-2 border-green-500 shadow-lg">
                  <Sparkles className="w-6 h-6 mr-3" />
                  Start Creating Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-green-500 border-opacity-30 text-center relative z-10">
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-sm text-gray-400 mb-4">
                Inspired by community projects like &apos;Ugly Avatar&apos; (non-commercial license noted). 
                Effects re-implemented from scratch.
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-200">
                  OpenAI
                </a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-200">
                  Vercel
                </a>
                <a href="https://github.com/TrendsAI-bit/UglyAI" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-200">
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
