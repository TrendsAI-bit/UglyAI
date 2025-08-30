// Image utility functions

export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function squareCrop(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement
): void {
  const size = Math.min(image.width, image.height);
  const offsetX = (image.width - size) / 2;
  const offsetY = (image.height - size) / 2;
  
  canvas.width = size;
  canvas.height = size;
  
  ctx.drawImage(
    image,
    offsetX, offsetY, size, size,
    0, 0, size, size
  );
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d')!;
  
  tempCanvas.width = width;
  tempCanvas.height = height;
  
  tempCtx.drawImage(canvas, 0, 0, width, height);
  
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(tempCanvas, 0, 0);
}

export function downloadImage(dataURL: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function stripEXIF(dataURL: string): Promise<string> {
  // Simple EXIF stripping by re-encoding
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = dataURL;
  });
}
