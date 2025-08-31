import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
      {/* Simple Hero */}
      <div className="text-center">
        <h1 className="h-pixel text-4xl sm:text-5xl md:text-6xl mb-4">
          UGLY AI
        </h1>
        <p className="text-xl mb-8 opacity-80">
          Use AI to create intentionally awful profile pictures
        </p>
        
        <Link href="/studio">
          <Button size="lg" className="btn-ugly text-lg px-8 py-4">
            Start Creating
          </Button>
        </Link>
      </div>

      {/* Simple Asset Showcase */}
      <div>
        <h2 className="h-pixel text-2xl font-bold text-center mb-6">
          Start with these faces
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ASSETS.map((asset) => (
            <div key={asset.name} className="text-center">
              <div className="panel">
                <div className="relative w-full aspect-square mb-3">
                  <Image
                    src={asset.path}
                    alt={asset.name}
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h4 className="h-pixel text-sm font-bold">
                  {asset.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Features */}
      <div className="text-center">
        <div className="panel max-w-2xl mx-auto">
          <h2 className="h-pixel text-xl font-bold mb-4">
            How it works
          </h2>
          <div className="space-y-4 text-sm">
            <p>1. Upload an image or use our assets</p>
            <p>2. AI makes it ugly with advanced effects</p>
            <p>3. Download your cursed creation</p>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="text-center opacity-60">
        <p className="text-sm">
          Powered by OpenAI • Inspired by the original Ugly Avatar project
        </p>
      </footer>
    </div>
  );
}
