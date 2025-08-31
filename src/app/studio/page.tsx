'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Download, Upload, Sparkles, Zap } from 'lucide-react';
import { UglyEffects } from '@/lib/effects';
import { PRESETS, PRESET_NAMES } from '@/lib/presets';
import { FilterSettings } from '@/lib/schemas';

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
  const [activeTab, setActiveTab] = useState<'ai' | 'local'>('ai');
  
  // Local filter settings
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    pixelSize: 16,
    posterizeLevels: 3,
    aberration: 4,
    dither: true,
    jpegMush: 2,
    noise: 25,
    vignette: 0.3,
    stickers: true,
  });

  // Debug effect to monitor processed image changes
  useEffect(() => {
    console.log('Processed image changed:', processedImage ? 'Has image' : 'No image');
  }, [processedImage]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setProcessedImage(''); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAssetSelect = useCallback((assetPath: string) => {
    setSelectedImage(assetPath);
    setProcessedImage(''); // Clear previous result
  }, []);

  // AI Generation
  const generateUglyImage = useCallback(async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    
    try {
      const base64Image = selectedImage.split(',')[1];
      
      const response = await fetch('/api/image-to-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          prompt: prompt || 'Transform this image into an ugly, distorted, and cursed version while keeping the same style and composition. Add pixelation, color distortion, and make it look intentionally terrible.',
          size: '1024x1024'
        }),
      });

      const data = await response.json();
      
      console.log('API Response:', data); // Debug log
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        console.error('API Error:', data); // Debug log
        throw new Error(data.error || 'Failed to generate ugly image');
      }

      if (data.images && data.images.length > 0) {
        const imageDataUrl = `data:image/png;base64,${data.images[0]}`;
        console.log('Setting image:', imageDataUrl.substring(0, 100) + '...'); // Debug log
        setProcessedImage(imageDataUrl);
        toast.success('AI generated an ugly version based on your image!');
      } else {
        console.log('No images in response:', data); // Debug log
        throw new Error('No image was generated');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate ugly image';
      toast.error(errorMessage);
      console.error('Generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, prompt]);

  // Local Filter Generation
  const generateLocalUglyImage = useCallback(async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          // Set canvas size
          canvas.width = 512;
          canvas.height = 512;
          
          // Draw and square crop the image
          const size = Math.min(img.width, img.height);
          const offsetX = (img.width - size) / 2;
          const offsetY = (img.height - size) / 2;
          
          ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 512, 512);
          
          // Apply ugly effects
          const effects = new UglyEffects(canvas);
          effects.applyEffects(filterSettings);
          
          // Get the processed image
          const processedDataURL = canvas.toDataURL('image/png');
          setProcessedImage(processedDataURL);
          toast.success('Local filter applied successfully!');
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
      
      img.src = selectedImage;
    } catch (error) {
      console.error('Error in local processing:', error);
      toast.error('Failed to process image');
      setIsProcessing(false);
    }
  }, [selectedImage, filterSettings]);

  const downloadImage = useCallback(() => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'ugly-avatar.png';
      link.href = processedImage;
      link.click();
    }
  }, [processedImage]);

  const applyPreset = useCallback((presetName: string) => {
    const preset = PRESETS[presetName];
    if (preset) {
      setFilterSettings(preset);
      toast.success(`Applied ${presetName} preset`);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ugly Avatar Studio</h1>
        <p className="text-muted-foreground">Create intentionally awful profile pictures</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'ai' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="w-4 h-4 mr-2 inline" />
          AI Generation
        </button>
        <button
          onClick={() => setActiveTab('local')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'local' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className="w-4 h-4 mr-2 inline" />
          Local Filters (Fast)
        </button>
      </div>

      {/* Prominent Classic Version Link */}
      <div className="text-center">
        <a 
          href="https://txstc55.github.io/ugly-avatar/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="mr-2">⚡</span>
          Classic Version
          <span className="ml-2">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Click to upload or drag and drop
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Or Choose from Assets</label>
            <div className="grid grid-cols-2 gap-2">
              {ASSETS.map((asset, index) => (
                <div
                  key={index}
                  onClick={() => handleAssetSelect(asset)}
                  className="relative aspect-square cursor-pointer rounded-lg border-2 border-muted-foreground/25 hover:border-foreground transition-colors overflow-hidden"
                >
                  <img
                    src={asset}
                    alt={`Asset ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {selectedImage && (
            <div>
              <label className="block text-sm font-medium mb-2">Selected Image</label>
              <div className="relative aspect-square rounded-lg border overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Processing */}
        <div className="space-y-4">
          {activeTab === 'ai' ? (
            /* AI Generation Tab */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  AI Prompt (optional)
                </label>
                <Input
                  type="text"
                  placeholder="Describe how to make it ugly while keeping the same style..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={generateUglyImage} 
                disabled={!selectedImage || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Creating ugly version...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ugly Version with AI
                  </>
                )}
              </Button>
            </div>
          ) : (
            /* Local Filters Tab */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quick Presets</label>
                <Select onValueChange={applyPreset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a preset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESET_NAMES.map((preset) => (
                      <SelectItem key={preset} value={preset}>
                        {preset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pixel Size: {filterSettings.pixelSize}</label>
                  <Slider
                    value={[filterSettings.pixelSize]}
                    onValueChange={([value]) => setFilterSettings(prev => ({ ...prev, pixelSize: value }))}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Posterize Levels: {filterSettings.posterizeLevels}</label>
                  <Slider
                    value={[filterSettings.posterizeLevels]}
                    onValueChange={([value]) => setFilterSettings(prev => ({ ...prev, posterizeLevels: value }))}
                    max={8}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Chromatic Aberration: {filterSettings.aberration}</label>
                  <Slider
                    value={[filterSettings.aberration]}
                    onValueChange={([value]) => setFilterSettings(prev => ({ ...prev, aberration: value }))}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Noise: {filterSettings.noise}</label>
                  <Slider
                    value={[filterSettings.noise]}
                    onValueChange={([value]) => setFilterSettings(prev => ({ ...prev, noise: value }))}
                    max={50}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vignette: {filterSettings.vignette}</label>
                  <Slider
                    value={[filterSettings.vignette]}
                    onValueChange={([value]) => setFilterSettings(prev => ({ ...prev, vignette: value }))}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={filterSettings.dither}
                    onCheckedChange={(checked) => setFilterSettings(prev => ({ ...prev, dither: checked }))}
                  />
                  <label className="text-sm font-medium">Dithering</label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={filterSettings.stickers}
                    onCheckedChange={(checked) => setFilterSettings(prev => ({ ...prev, stickers: checked }))}
                  />
                  <label className="text-sm font-medium">Add Stickers</label>
                </div>
              </div>

              <Button 
                onClick={generateLocalUglyImage} 
                disabled={!selectedImage || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Applying filters...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Apply Local Filters
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {processedImage && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Processed Image</label>
                <div className="relative aspect-square rounded-lg border overflow-hidden">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <Button onClick={downloadImage} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
