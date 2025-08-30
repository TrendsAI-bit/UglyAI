import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterSettings } from '@/lib/schemas';
import { PRESETS, PRESET_NAMES } from '@/lib/presets';
import { Wand2, Sparkles, Shuffle } from 'lucide-react';

interface ToolbarProps {
  engine: 'ai' | 'filter';
  onEngineChange: (engine: 'ai' | 'filter') => void;
  settings: FilterSettings;
  onSettingsChange: (settings: FilterSettings) => void;
  onRandomize: () => void;
  onMakeUglier: () => void;
  isGenerating: boolean;
}

export function Toolbar({
  engine,
  onEngineChange,
  settings,
  onSettingsChange,
  onRandomize,
  onMakeUglier,
  isGenerating
}: ToolbarProps) {
  const updateSetting = (key: keyof FilterSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const applyPreset = (presetName: string) => {
    const preset = PRESETS[presetName];
    if (preset) {
      onSettingsChange(preset);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-hsl(var(--crt-beige) / 0.1) rounded-lg border border-hsl(var(--crt-green))">
      {/* Engine Toggle */}
      <div className="flex items-center space-x-4">
        <span className="pixel-text text-lg font-bold">Engine:</span>
        <div className="flex bg-hsl(var(--crt-dark)) rounded-lg p-1">
          <Button
            variant={engine === 'ai' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onEngineChange('ai')}
            className={`btn-ugly ${engine === 'ai' ? '' : 'bg-transparent'}`}
            disabled={isGenerating}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI
          </Button>
          <Button
            variant={engine === 'filter' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onEngineChange('filter')}
            className={`btn-ugly ${engine === 'filter' ? '' : 'bg-transparent'}`}
            disabled={isGenerating}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <span className="pixel-text text-lg font-bold">Ugly Presets:</span>
        <Select onValueChange={applyPreset} disabled={isGenerating}>
          <SelectTrigger className="btn-ugly">
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

      {/* Effect Sliders */}
      <div className="space-y-4">
        <span className="pixel-text text-lg font-bold">Advanced Controls:</span>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Pixel Size: {settings.pixelSize}</label>
            <Slider
              value={[settings.pixelSize]}
              onValueChange={([value]) => updateSetting('pixelSize', value)}
              min={1}
              max={50}
              step={1}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Posterize Levels: {settings.posterizeLevels}</label>
            <Slider
              value={[settings.posterizeLevels]}
              onValueChange={([value]) => updateSetting('posterizeLevels', value)}
              min={2}
              max={8}
              step={1}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Chromatic Aberration: {settings.aberration}</label>
            <Slider
              value={[settings.aberration]}
              onValueChange={([value]) => updateSetting('aberration', value)}
              min={0}
              max={10}
              step={1}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium">JPEG Mush: {settings.jpegMush}</label>
            <Slider
              value={[settings.jpegMush]}
              onValueChange={([value]) => updateSetting('jpegMush', value)}
              min={0}
              max={5}
              step={1}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Noise: {settings.noise}</label>
            <Slider
              value={[settings.noise]}
              onValueChange={([value]) => updateSetting('noise', value)}
              min={0}
              max={100}
              step={5}
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Vignette: {Math.round(settings.vignette * 100)}%</label>
            <Slider
              value={[settings.vignette]}
              onValueChange={([value]) => updateSetting('vignette', value)}
              min={0}
              max={1}
              step={0.05}
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Dither</label>
            <Switch
              checked={settings.dither}
              onCheckedChange={(checked) => updateSetting('dither', checked)}
              disabled={isGenerating}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Stickers</label>
            <Switch
              checked={settings.stickers}
              onCheckedChange={(checked) => updateSetting('stickers', checked)}
              disabled={isGenerating}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          onClick={onRandomize}
          className="btn-ugly flex-1"
          disabled={isGenerating}
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Randomize
        </Button>
        <Button
          onClick={onMakeUglier}
          className="btn-ugly flex-1"
          disabled={isGenerating}
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Make Uglier
        </Button>
      </div>
    </div>
  );
}
