import { FilterSettings } from "./schemas";

export const PRESETS: Record<string, FilterSettings> = {
  "Cursed Cartoon": {
    pixelSize: 16,
    posterizeLevels: 3,
    aberration: 4,
    dither: true,
    jpegMush: 2,
    noise: 25,
    vignette: 0.3,
    stickers: true,
  },
  "1998 Webcam": {
    pixelSize: 24,
    posterizeLevels: 4,
    aberration: 2,
    dither: false,
    jpegMush: 3,
    noise: 35,
    vignette: 0.4,
    stickers: false,
  },
  "Fax Machine": {
    pixelSize: 18,
    posterizeLevels: 2,
    aberration: 3,
    dither: true,
    jpegMush: 4,
    noise: 15,
    vignette: 0.15,
    stickers: true,
  },
  "Sticker Attack": {
    pixelSize: 12,
    posterizeLevels: 5,
    aberration: 5,
    dither: false,
    jpegMush: 1,
    noise: 10,
    vignette: 0.1,
    stickers: true,
  },
  "Mugshot Monday": {
    pixelSize: 14,
    posterizeLevels: 3,
    aberration: 3,
    dither: true,
    jpegMush: 2,
    noise: 20,
    vignette: 0.25,
    stickers: false,
  },
} as const;

export const PRESET_NAMES = Object.keys(PRESETS) as (keyof typeof PRESETS)[];
