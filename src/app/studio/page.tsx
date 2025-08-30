'use client';

import React, { useState, useCallback } from 'react';
import { CRTFrame } from '@/components/crt-frame';
import { Toolbar } from '@/components/toolbar';
import { Dropzone } from '@/components/dropzone';
import { UglyCanvas } from '@/components/ugly-canvas';
import { PreviewGrid } from '@/components/preview-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterSettings } from '@/lib/schemas';
import { PRESETS } from '@/lib/presets';
import { blobToDataURL, stripEXIF } from '@/lib/image';
import { toast } from 'sonner';
import { Sparkles, Wand2 } from 'lucide-react';

export default function StudioPage() {
  const [engine, setEngine] = useState<'ai' | 'filter'>('ai');
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<FilterSettings>(PRESETS['Cursed Cartoon']);

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const dataURL = await blobToDataURL(file);
      const cleanDataURL = await stripEXIF(dataURL);
      setUploadedImage(cleanDataURL);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    }
  }, []);

  const generateAIImages = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size: '1024x1024',
          n: 1,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedImages(data.images);
      toast.success('AI images generated!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate images';
      toast.error(errorMessage);
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const applyFilter = useCallback(() => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsGenerating(true);
    // The UglyCanvas component will handle the processing
    // and call onProcessed when done
  }, [uploadedImage]);

  const handleFilterProcessed = useCallback((processedImage: string) => {
    setGeneratedImages([processedImage]);
    setIsGenerating(false);
    toast.success('Image uglified!');
  }, []);

  const randomizeSettings = useCallback(() => {
    const presets = Object.values(PRESETS);
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    setSettings(randomPreset);
    toast.success('Settings randomized!');
  }, []);

  const makeUglier = useCallback(() => {
    if (generatedImages.length === 0) {
      toast.error('No images to make uglier');
      return;
    }

    // Apply additional random effects
    const uglierSettings = {
      ...settings,
      pixelSize: Math.min(50, settings.pixelSize + Math.floor(Math.random() * 10)),
      noise: Math.min(100, settings.noise + Math.floor(Math.random() * 20)),
      jpegMush: Math.min(5, settings.jpegMush + Math.floor(Math.random() * 2)),
      aberration: Math.min(10, settings.aberration + Math.floor(Math.random() * 3)),
    };
    setSettings(uglierSettings);
    toast.success('Made it uglier!');
  }, [settings, generatedImages]);

  const handleReUglify = useCallback((_index: number) => {
    if (engine === 'filter' && uploadedImage) {
      // Re-apply filter to the uploaded image
      setIsGenerating(true);
    } else {
      // Re-generate AI image
      generateAIImages();
    }
  }, [engine, uploadedImage, generateAIImages]);

  const handleMakeVariation = useCallback(async (index: number) => {
    if (generatedImages.length === 0) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: generatedImages[index].split(',')[1], // Remove data:image/png;base64, prefix
          prompt: 'Make this even uglier and more cursed',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Variation failed');
      }

      const newImages = [...generatedImages];
      newImages[index] = `data:image/png;base64,${data.image}`;
      setGeneratedImages(newImages);
      toast.success('Variation created!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create variation';
      toast.error(errorMessage);
      console.error('Variation error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [generatedImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-hsl(var(--crt-dark)) to-hsl(var(--crt-dark) / 0.8) p-4">
      <CRTFrame className="max-w-7xl mx-auto">
        <div className="p-6">
          <h1 className="pixel-text text-4xl font-bold text-center mb-8 text-hsl(var(--crt-green))">
            UGLY AI STUDIO
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Toolbar
                engine={engine}
                onEngineChange={setEngine}
                settings={settings}
                onSettingsChange={setSettings}
                onRandomize={randomizeSettings}
                onMakeUglier={makeUglier}
                isGenerating={isGenerating}
              />

              {/* AI Prompt Input */}
              {engine === 'ai' && (
                <div className="space-y-4 p-6 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
                  <h3 className="pixel-text text-lg font-bold">AI Prompt:</h3>
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your ugly avatar..."
                    className="pixel-text"
                    disabled={isGenerating}
                  />
                  <Button
                    onClick={generateAIImages}
                    className="btn-ugly w-full"
                    disabled={isGenerating || !prompt.trim()}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Avatar
                  </Button>
                </div>
              )}

              {/* Image Upload */}
              {engine === 'filter' && (
                <div className="space-y-4">
                  <h3 className="pixel-text text-lg font-bold">Upload Image:</h3>
                  <Dropzone onFileSelect={handleFileSelect} />
                  
                  {uploadedImage && (
                    <div className="space-y-4">
                      <h4 className="pixel-text text-md font-bold">Preview:</h4>
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-32 object-cover rounded-lg border border-hsl(var(--crt-green))"
                      />
                      <Button
                        onClick={applyFilter}
                        className="btn-ugly w-full"
                        disabled={isGenerating || !uploadedImage}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Uglify Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="pixel-text text-2xl font-bold text-hsl(var(--crt-amber))">
                Preview
              </h2>
              
              {engine === 'filter' && uploadedImage && (
                <div className="mb-6">
                  <h3 className="pixel-text text-lg font-bold mb-4">Filter Preview:</h3>
                  <UglyCanvas
                    imageSrc={uploadedImage}
                    settings={settings}
                    onProcessed={handleFilterProcessed}
                    className="max-w-md mx-auto"
                  />
                </div>
              )}

              <PreviewGrid
                images={generatedImages}
                onReUglify={handleReUglify}
                onMakeVariation={handleMakeVariation}
                isProcessing={isGenerating}
              />
            </div>
          </div>
        </div>
      </CRTFrame>
    </div>
  );
}
