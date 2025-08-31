'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Download, Upload, Sparkles } from 'lucide-react';

const ASSETS = [
  '/assets/face (1).png',
  '/assets/face (2).png',
  '/assets/face (3).png',
  '/assets/face.png'
];

export default function StudioPage() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAssetSelect = useCallback((assetPath: string) => {
    setSelectedImage(assetPath);
  }, []);

  const applyUglyEffects = useCallback(() => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    
    // Simple ugly effects using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      
      // Draw image
      ctx?.drawImage(img, 0, 0, 512, 512);
      
      // Apply simple pixelation
      const imageData = ctx?.getImageData(0, 0, 512, 512);
      if (imageData) {
        const data = imageData.data;
        const pixelSize = 8;
        
        for (let y = 0; y < 512; y += pixelSize) {
          for (let x = 0; x < 512; x += pixelSize) {
            const idx = (y * 512 + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            // Fill pixel block with average color
            for (let py = 0; py < pixelSize && y + py < 512; py++) {
              for (let px = 0; px < pixelSize && x + px < 512; px++) {
                const pidx = ((y + py) * 512 + (x + px)) * 4;
                data[pidx] = r;
                data[pidx + 1] = g;
                data[pidx + 2] = b;
              }
            }
          }
        }
        
        ctx?.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL());
      }
      
      setIsProcessing(false);
      toast.success('Image uglified!');
    };
    
    img.src = selectedImage;
  }, [selectedImage]);

  const downloadImage = useCallback(() => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'ugly-avatar.png';
      link.click();
      toast.success('Image downloaded!');
    }
  }, [processedImage]);

  return (
    <div className="space-y-6">
      <h1 className="h-pixel text-3xl font-bold text-center">
        UGLY STUDIO
      </h1>

      {/* Asset Selection */}
      <div>
        <h2 className="h-pixel text-xl font-bold mb-4">Choose a face to start with:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {ASSETS.map((asset, index) => (
            <div
              key={index}
              className="panel cursor-pointer hover:ring-crt transition-all"
              onClick={() => handleAssetSelect(asset)}
            >
              <img
                src={asset}
                alt={`Face ${index + 1}`}
                className="w-full h-32 object-contain rounded"
              />
            </div>
          ))}
        </div>

        {/* File Upload */}
        <div className="panel">
          <h3 className="h-pixel text-lg font-bold mb-4">Or upload your own image:</h3>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="input-retro"
            />
            <Upload className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {selectedImage && (
        <div className="panel">
          <h3 className="h-pixel text-lg font-bold mb-4">Selected Image:</h3>
          <div className="flex justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-64 h-64 object-contain rounded border border-current"
            />
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={applyUglyEffects}
              className="btn-ugly"
              disabled={isProcessing}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Make it Ugly!'}
            </Button>
          </div>
        </div>
      )}

      {/* Processed Image */}
      {processedImage && (
        <div className="panel">
          <h3 className="h-pixel text-lg font-bold mb-4">Your Ugly Creation:</h3>
          <div className="flex justify-center">
            <img
              src={processedImage}
              alt="Processed"
              className="w-64 h-64 object-contain rounded border border-current"
            />
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={downloadImage}
              className="btn-retro"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
