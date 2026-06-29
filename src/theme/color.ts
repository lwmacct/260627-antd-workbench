export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeHexColor(value: string, fallback: string): string {
  const normalized = value.trim().toLowerCase();
  const short = /^#([0-9a-f]{3})$/i.exec(normalized);

  if (short) {
    return `#${short[1]
      .split("")
      .map((char) => `${char}${char}`)
      .join("")}`;
  }

  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : fallback;
}

export function alphaHex(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function mixHex(from: string, to: string, amount: number): string {
  const safeAmount = clamp(amount, -1, 1);

  if (safeAmount < 0) {
    return mixHex(from, relativeLuminance(from) < 0.5 ? "#ffffff" : "#000000", -safeAmount);
  }

  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mix = {
    r: Math.round(a.r + (b.r - a.r) * safeAmount),
    g: Math.round(a.g + (b.g - a.g) * safeAmount),
    b: Math.round(a.b + (b.b - a.b) * safeAmount),
  };

  return rgbToHex(mix);
}

export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

function hexToRgb(hex: string): { b: number; g: number; r: number } {
  const value = hex.replace("#", "");

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: { b: number; g: number; r: number }): string {
  return `#${[rgb.r, rgb.g, rgb.b]
    .map((value) => clamp(value, 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

