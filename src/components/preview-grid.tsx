import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { downloadImage } from '@/lib/image';

interface PreviewGridProps {
  images: string[];
  onReUglify?: (index: number) => void;
  onMakeVariation?: (index: number) => void;
  isProcessing?: boolean;
}

export function PreviewGrid({ 
  images, 
  onReUglify, 
  onMakeVariation, 
  isProcessing = false 
}: PreviewGridProps) {
  const handleDownload = (imageDataURL: string, index: number) => {
    const filename = `ugly-avatar-${index + 1}-${Date.now()}.png`;
    downloadImage(imageDataURL, filename);
  };

  const _handleShare = async (imageDataURL: string) => {
    try {
      const blob = await fetch(imageDataURL).then(r => r.blob());
      const file = new File([blob], 'ugly-avatar.png', { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Ugly Avatar',
          text: 'Check out this cursed avatar I made!',
          files: [file]
        });
      } else {
        // Fallback: copy to clipboard or show share dialog
        navigator.clipboard.writeText(imageDataURL);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border-2 border-dashed border-hsl(var(--crt-green))">
        <div className="text-center">
          <p className="pixel-text text-lg text-muted-foreground">
            No images generated yet
          </p>
          <p className="text-sm text-muted-foreground">
            Use the AI engine or upload an image to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden border-hsl(var(--crt-green))">
          <CardContent className="p-4">
            <div className="relative aspect-square mb-4">
              <img
                src={image}
                alt={`Ugly avatar ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-hsl(var(--crt-green))"
              />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-white pixel-text text-lg">
                    Processing...
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleDownload(image, index)}
                className="btn-ugly flex-1"
                disabled={isProcessing}
              >
                <Download className="w-4 h-4 mr-1" />
                PNG
              </Button>
              
              {onReUglify && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReUglify(index)}
                  className="btn-ugly"
                  disabled={isProcessing}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Re-uglify
                </Button>
              )}
              
              {onMakeVariation && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMakeVariation(index)}
                  className="btn-ugly"
                  disabled={isProcessing}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Variation
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
