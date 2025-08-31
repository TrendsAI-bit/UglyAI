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
  const [prompt, setPrompt] = useState('');

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

  const generateUglyImage = useCallback(async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Convert image to base64 for API
      const base64Image = selectedImage.split(',')[1]; // Remove data:image/png;base64, prefix
      
      const response = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          prompt: prompt || 'Make this image extremely ugly, distorted, cursed, and intentionally bad. Add pixelation, weird artifacts, color distortion, and make it look like a terrible profile picture from the 90s.',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate ugly image');
      }

      setProcessedImage(`data:image/png;base64,${data.image}`);
      toast.success('Image uglified with AI!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate ugly image';
      toast.error(errorMessage);
      console.error('Generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, prompt]);

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

      {/* Image Preview and AI Generation */}
      {selectedImage && (
        <div className="panel">
          <h3 className="h-pixel text-lg font-bold mb-4">Selected Image:</h3>
          <div className="flex justify-center mb-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-64 h-64 object-contain rounded border border-current"
            />
          </div>
          
          {/* AI Prompt Input */}
          <div className="mb-4">
            <h4 className="h-pixel text-md font-bold mb-2">AI Prompt (optional):</h4>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how to make it ugly (e.g., 'add pixelation, weird colors, make it cursed')"
              className="input-retro"
              disabled={isProcessing}
            />
          </div>
          
          <div className="text-center">
            <Button
              onClick={generateUglyImage}
              className="btn-ugly"
              disabled={isProcessing}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isProcessing ? 'AI is making it ugly...' : 'Make it Ugly with AI!'}
            </Button>
          </div>
        </div>
      )}

      {/* Processed Image */}
      {processedImage && (
        <div className="panel">
          <h3 className="h-pixel text-lg font-bold mb-4">Your AI-Uglified Creation:</h3>
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
