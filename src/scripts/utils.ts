export const randomIntFromRange = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const randomColor = (colors: string[]): string => colors[Math.floor(Math.random() * colors.length)];

export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};
const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};
