import { FilterSettings } from "./schemas";

// Canvas effects for uglifying images
export class UglyEffects {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  // Pixelate effect
  pixelate(size: number): void {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    tempCanvas.width = this.canvas.width / size;
    tempCanvas.height = this.canvas.height / size;
    
    tempCtx.drawImage(this.canvas, 0, 0, tempCanvas.width, tempCanvas.height);
    
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(tempCanvas, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingEnabled = true;
  }

  // Posterize effect
  posterize(levels: number): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.floor(data[i] / 255 * levels) * (255 / levels);     // R
      data[i + 1] = Math.floor(data[i + 1] / 255 * levels) * (255 / levels); // G
      data[i + 2] = Math.floor(data[i + 2] / 255 * levels) * (255 / levels); // B
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // Floyd-Steinberg dithering
  dither(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        const oldR = data[idx];
        const oldG = data[idx + 1];
        const oldB = data[idx + 2];
        
        const newR = oldR < 128 ? 0 : 255;
        const newG = oldG < 128 ? 0 : 255;
        const newB = oldB < 128 ? 0 : 255;
        
        data[idx] = newR;
        data[idx + 1] = newG;
        data[idx + 2] = newB;
        
        const errR = oldR - newR;
        const errG = oldG - newG;
        const errB = oldB - newB;
        
        // Distribute error to neighboring pixels
        if (x + 1 < width) {
          const idx1 = (y * width + x + 1) * 4;
          data[idx1] = Math.min(255, Math.max(0, data[idx1] + errR * 7 / 16));
          data[idx1 + 1] = Math.min(255, Math.max(0, data[idx1 + 1] + errG * 7 / 16));
          data[idx1 + 2] = Math.min(255, Math.max(0, data[idx1 + 2] + errB * 7 / 16));
        }
        
        if (x - 1 >= 0 && y + 1 < height) {
          const idx2 = ((y + 1) * width + x - 1) * 4;
          data[idx2] = Math.min(255, Math.max(0, data[idx2] + errR * 3 / 16));
          data[idx2 + 1] = Math.min(255, Math.max(0, data[idx2 + 1] + errG * 3 / 16));
          data[idx2 + 2] = Math.min(255, Math.max(0, data[idx2 + 2] + errB * 3 / 16));
        }
        
        if (y + 1 < height) {
          const idx3 = ((y + 1) * width + x) * 4;
          data[idx3] = Math.min(255, Math.max(0, data[idx3] + errR * 5 / 16));
          data[idx3 + 1] = Math.min(255, Math.max(0, data[idx3 + 1] + errG * 5 / 16));
          data[idx3 + 2] = Math.min(255, Math.max(0, data[idx3 + 2] + errB * 5 / 16));
        }
        
        if (x + 1 < width && y + 1 < height) {
          const idx4 = ((y + 1) * width + x + 1) * 4;
          data[idx4] = Math.min(255, Math.max(0, data[idx4] + errR * 1 / 16));
          data[idx4 + 1] = Math.min(255, Math.max(0, data[idx4 + 1] + errG * 1 / 16));
          data[idx4 + 2] = Math.min(255, Math.max(0, data[idx4 + 2] + errB * 1 / 16));
        }
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // Chromatic aberration
  aberration(offset: number): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Red channel shift
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.drawImage(tempCanvas, offset, 0);
    
    // Blue channel shift
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.drawImage(tempCanvas, -offset, 0);
    
    this.ctx.globalCompositeOperation = 'source-over';
  }

  // JPEG mush effect
  jpegMush(strength: number): void {
    const currentCanvas = this.canvas;
    
    for (let i = 0; i < strength; i++) {
      const quality = Math.max(0.1, 0.5 - (i * 0.1));
      const dataURL = currentCanvas.toDataURL('image/jpeg', quality);
      
      const img = new Image();
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
    }
  }

  // Noise effect
  noise(amount: number): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * amount;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // G
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // B
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // Vignette effect
  vignette(strength: number): void {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
    );
    
    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(1, `rgba(0, 0, 0, ${strength})`);
    
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  // Sticker effect
  stickers(): void {
    const stickers = ['😈', '💀', '👻', '🤡', '👹', '🎭', '💩', '🔥', '⚡', '💥'];
    const fontSize = Math.min(this.canvas.width, this.canvas.height) / 8;
    
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const sticker = stickers[Math.floor(Math.random() * stickers.length)];
      const rotation = (Math.random() - 0.5) * Math.PI;
      
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(rotation);
      this.ctx.fillText(sticker, 0, 0);
      this.ctx.restore();
    }
  }

  // Apply all effects based on settings
  applyEffects(settings: FilterSettings): void {
    if (settings.pixelSize > 1) {
      this.pixelate(settings.pixelSize);
    }
    
    if (settings.posterizeLevels > 2) {
      this.posterize(settings.posterizeLevels);
    }
    
    if (settings.dither) {
      this.dither();
    }
    
    if (settings.aberration > 0) {
      this.aberration(settings.aberration);
    }
    
    if (settings.jpegMush > 0) {
      this.jpegMush(settings.jpegMush);
    }
    
    if (settings.noise > 0) {
      this.noise(settings.noise);
    }
    
    if (settings.vignette > 0) {
      this.vignette(settings.vignette);
    }
    
    if (settings.stickers) {
      this.stickers();
    }
  }
}
