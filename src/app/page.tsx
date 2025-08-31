import Link from 'next/link';
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
          Use AI to generate intentionally awful profile pictures
        </p>
        
        <Link href="/studio">
          <Button size="lg" className="btn-ugly text-lg px-8 py-4">
            Start Creating
          </Button>
        </Link>
      </div>

      {/* Asset Showcase */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Asset Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {ASSETS.map((asset, index) => (
            <div key={index} className="aspect-square rounded-lg border overflow-hidden">
              <img
                src={asset.path}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold">1</span>
            </div>
            <p>1. Upload an image or choose from assets</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold">2</span>
            </div>
            <p>2. Choose AI generation or fast local filters</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold">3</span>
            </div>
            <p>3. Download your ugly masterpiece</p>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="text-center opacity-60">
        <p className="text-sm">
          AI Generation + Local Filters
        </p>
      </footer>
    </div>
  );
}
