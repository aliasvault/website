import type { CSSProperties } from "react";
import { useId } from "react";

/**
 * Decorative background elements in the AliasVault brand style.
 */

export type GlowTone = "orange" | "amber" | "gold" | "ember" | "slate";

const TONES: Record<GlowTone, string> = {
  orange: "#f49541",
  amber: "#d68338",
  gold: "#fbb040",
  ember: "#b8702f",
  slate: "#4a559c",
};

/** Hex colour to `rgba(r, g, b, a)`. */
const rgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/**
 * Gaussian effect falloff.
 */
const glowGradient = (hex: string) =>
  `radial-gradient(circle, ${rgba(hex, 1)} 0%, ${rgba(hex, 0.82)} 14%, ${rgba(hex, 0.5)} 30%, ${rgba(hex, 0.22)} 46%, ${rgba(hex, 0.07)} 60%, ${rgba(hex, 0)} 72%)`;

interface GlowOrbProps {
  tone?: GlowTone;
  /** CSS size, used for width and height. */
  size?: string;
  /** Placement, z-index and opacity classes (the orb is `absolute` already). */
  className?: string;
  style?: CSSProperties;
}

/**
 * Soft radial glow.
 */
export const GlowOrb = ({ tone = "orange", size = "28rem", className = "", style }: GlowOrbProps) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute rounded-full ${className}`}
    style={{
      width: size,
      height: size,
      background: glowGradient(TONES[tone]),
      ...style,
    }}
  />
);

export const glowStyle = (tone: GlowTone): CSSProperties => ({ background: glowGradient(TONES[tone]) });

/**
 * Tiny tiled monochrome noise.
 */
const NOISE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const Grain = ({ className = "opacity-[0.035] dark:opacity-[0.06]" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{ backgroundImage: NOISE_TILE, backgroundSize: "160px 160px" }}
  />
);

/** Width of one seamless wave period in viewBox units. */
export const WAVE_PERIOD = 1440;
const WAVE_HEIGHT = 320;

interface WaveLayer {
  d: string;
  opacity: number;
  gradient: "a" | "b";
}

export type WavesVariant = "hero" | "footer";

/**
 * Each layer is periodic over WAVE_PERIOD (start and end at the same y), so
 * repeated copies tile seamlessly.
 */
const WAVE_LAYERS: Record<WavesVariant, WaveLayer[]> = {
  hero: [
    { d: "M0,170 C360,250 1080,90 1440,170 L1440,320 L0,320 Z", opacity: 0.1, gradient: "a" },
    { d: "M0,230 C360,160 1080,300 1440,230 L1440,320 L0,320 Z", opacity: 0.14, gradient: "b" },
    { d: "M0,275 C240,300 480,240 720,275 C960,310 1200,250 1440,275 L1440,320 L0,320 Z", opacity: 0.18, gradient: "a" },
  ],
  footer: [
    { d: "M0,160 C360,190 1080,140 1440,160 L1440,320 L0,320 Z", opacity: 0.07, gradient: "b" },
    { d: "M0,212 C360,206 1080,222 1440,212 L1440,320 L0,320 Z", opacity: 0.12, gradient: "a" },
    { d: "M0,284 C240,296 480,282 720,284 C960,292 1200,286 1440,284 L1440,320 L0,320 Z", opacity: 0.18, gradient: "a" },
  ],
};

interface WavesProps {
  className?: string;
  repeat?: number;
  flip?: boolean;
  variant?: WavesVariant;
}

/**
 * Layered translucent waves.
 */
export const Waves = ({
  className = "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 w-full",
  repeat = 1,
  flip = false,
  variant = "hero",
}: WavesProps) => {
  const id = useId().replace(/:/g, "");
  const width = WAVE_PERIOD * repeat;
  const layers = WAVE_LAYERS[variant];

  return (
    <svg
      aria-hidden
      className={className}
      viewBox={`0 0 ${width} ${WAVE_HEIGHT}`}
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-a`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WAVE_PERIOD} y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor={TONES.orange} />
          <stop offset="0.35" stopColor={TONES.gold} />
          <stop offset="0.7" stopColor={TONES.slate} />
          <stop offset="1" stopColor={TONES.orange} />
        </linearGradient>
        <linearGradient id={`${id}-b`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WAVE_PERIOD} y2="0" spreadMethod="repeat">
          <stop offset="0" stopColor={TONES.amber} />
          <stop offset="0.4" stopColor={TONES.gold} />
          <stop offset="0.7" stopColor={TONES.orange} />
          <stop offset="1" stopColor={TONES.amber} />
        </linearGradient>
      </defs>
      {Array.from({ length: repeat }, (_, i) => (
        <g key={i} transform={`translate(${i * WAVE_PERIOD} 0)`}>
          {layers.map((layer) => (
            <path key={layer.d} d={layer.d} fill={`url(#${id}-${layer.gradient})`} opacity={layer.opacity} />
          ))}
        </g>
      ))}
    </svg>
  );
};
