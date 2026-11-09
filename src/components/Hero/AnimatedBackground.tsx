"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlowOrb, Grain, Waves, glowStyle } from "@/components/Common/Decor";

/**
 * Below `md` the glows are static: no JS animation, so scrolling on phones
 * stays smooth.
 */
const StaticMobileBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden md:hidden" aria-hidden>
    <GlowOrb
      tone="orange"
      size="min(110vw, 30rem)"
      className="-right-[18%] -top-[6%] opacity-25 dark:opacity-20"
    />
  </div>
);

/**
 * Layered waves along the bottom edge, drifting slowly by one full period so the
 * loop is seamless. Transform-only, so it is cheap on every device.
 */
const DriftingWaves = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 overflow-hidden md:h-[45%]" aria-hidden>
      <motion.div
        className="absolute bottom-0 left-0 h-full w-[200%]"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <Waves repeat={2} className="h-full w-full opacity-70 dark:opacity-50" />
      </motion.div>
    </div>
  );
};

/**
 * Desktop glows. No `filter: blur()` and no `scale` animation: Chrome rasterises
 * a blurred layer once and re-samples it while it moves, which looks blocky.
 * A gradient translated on the compositor stays crisp and costs almost nothing.
 */
const ORBS = [
  {
    tone: "orange",
    size: 760,
    className: "opacity-30 dark:opacity-20",
    position: { top: "-18%", right: "-12%" },
    path: { x: [0, 60, -40, 0], y: [0, -40, 30, 0] },
    duration: 24,
  },
  {
    tone: "slate",
    size: 560,
    className: "opacity-[0.12] dark:opacity-[0.16]",
    position: { bottom: "5%", right: "12%" },
    path: { x: [0, -40, 50, 0], y: [0, 40, -30, 0] },
    duration: 22,
  },
] as const;

const DesktopOrbs = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
      {ORBS.map((orb) => (
        <motion.div
          key={orb.tone}
          className={`absolute rounded-full will-change-transform ${orb.className}`}
          style={{ width: orb.size, height: orb.size, ...orb.position, ...glowStyle(orb.tone) }}
          animate={reduceMotion ? undefined : { x: [...orb.path.x], y: [...orb.path.y] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      <StaticMobileBackground />
      <DesktopOrbs />
      <DriftingWaves />
      <Grain />

      {/* Dissolve the hero (white / gray-dark) into the page background so the waves
          fade out instead of being cut off at the section edge. Colours match <body>. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#FCFCFC] dark:to-black md:h-56"
        aria-hidden
      />
    </div>
  );
};

export default AnimatedBackground;
