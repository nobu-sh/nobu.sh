export namespace MathF {
  export function Lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  export function Clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

}