import React from 'react';
import Image from 'next/image';

interface AssetGalleryProps {
  className?: string;
  onAssetSelect?: (assetPath: string) => void;
}

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

export function AssetGallery({ className = "", onAssetSelect }: AssetGalleryProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="pixel-text text-2xl font-bold text-hsl(var(--crt-green)) mb-2">
          Cartoon Face Assets
        </h3>
        <p className="text-hsl(var(--crt-beige)) text-sm">
          Click on any face to use it as a starting point
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ASSETS.map((asset) => (
          <div
            key={asset.name}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
            onClick={() => onAssetSelect?.(asset.path)}
          >
            <div className="relative bg-hsl(var(--crt-beige) / 0.1) rounded-lg border-2 border-hsl(var(--crt-green)) p-4 hover:border-hsl(var(--crt-pink)) transition-colors duration-200">
              <div className="relative w-full aspect-square mb-3">
                <Image
                  src={asset.path}
                  alt={asset.name}
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h4 className="pixel-text text-sm font-bold text-hsl(var(--crt-green)) text-center mb-1">
                {asset.name}
              </h4>
              <p className="text-xs text-hsl(var(--crt-beige) / 0.8) text-center">
                {asset.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-hsl(var(--crt-beige) / 0.6)">
          All assets are 500x500 PNG files with transparent backgrounds
        </p>
      </div>
    </div>
  );
}
