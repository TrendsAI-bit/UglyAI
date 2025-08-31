import React, { useRef, useEffect, useState } from 'react';
import { UglyEffects } from '@/lib/effects';
import { FilterSettings } from '@/lib/schemas';
import { squareCrop, resizeCanvas } from '@/lib/image';
import { toast } from 'sonner';

interface UglyCanvasProps {
  imageSrc: string;
  settings: FilterSettings;
  onProcessed?: (dataURL: string) => void;
  className?: string;
}

export function UglyCanvas({ imageSrc, settings, onProcessed, className = "" }: UglyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS issues
    
    img.onload = () => {
      try {
        // Square crop the image
        squareCrop(canvas, ctx, img);
        
        // Resize to 512x512 for consistent processing
        resizeCanvas(canvas, 512, 512);
        
        // Apply ugly effects
        const effects = new UglyEffects(canvas);
        effects.applyEffects(settings);
        
        // Get the processed image
        const processedDataURL = canvas.toDataURL('image/png');
        
        if (onProcessed) {
          onProcessed(processedDataURL);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Failed to process image');
      } finally {
        setIsProcessing(false);
      }
    };
    
    img.onerror = () => {
      console.error('Failed to load image');
      toast.error('Failed to load image');
      setIsProcessing(false);
    };
    
    img.src = imageSrc;
  }, [imageSrc, settings, onProcessed]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={512}
        height={512}
        className="w-full h-auto border-2 border-current rounded-lg"
      />
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-white h-pixel text-lg">
            Processing...
          </div>
        </div>
      )}
    </div>
  );
}
