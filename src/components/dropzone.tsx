import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, Image } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string[];
  maxSize?: number;
}

export function Dropzone({ onFileSelect, accept = ['image/*'], maxSize = 5242880 }: DropzoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive || dragActive
          ? 'border-hsl(var(--crt-magenta)) bg-hsl(var(--crt-magenta) / 0.1)'
          : 'border-hsl(var(--crt-green)) bg-hsl(var(--crt-beige) / 0.1)'
        }
        hover:border-hsl(var(--crt-amber)) hover:bg-hsl(var(--crt-amber) / 0.1)
      `}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 rounded-full bg-hsl(var(--crt-green) / 0.2)">
          {isDragActive ? (
            <Upload className="w-8 h-8 text-hsl(var(--crt-magenta))" />
          ) : (
            <Image className="w-8 h-8 text-hsl(var(--crt-green))" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="pixel-text text-lg font-bold">
            {isDragActive ? 'Drop your image here!' : 'Drag & drop an image here'}
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse files
          </p>
          <p className="text-xs text-muted-foreground">
            Max size: 5MB • Supported: JPG, PNG, GIF
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="btn-ugly"
          onClick={(e) => e.stopPropagation()}
        >
          Choose File
        </Button>
      </div>
    </div>
  );
}
