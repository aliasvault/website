"use client";

import { motion } from "framer-motion";

/**
 * iOS Safari/Chrome struggle with large `filter: blur()` surfaces, especially when
 * animated. Below `md` we use soft radial gradients only (no blur, no JS animation).
 */
const StaticMobileBackground = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden md:hidden"
    aria-hidden
  >
    <div
      className="absolute h-[min(100vw,28rem)] w-[min(100vw,28rem)] rounded-full opacity-25 dark:opacity-20"
      style={{
        background: "radial-gradient(circle, #f49541 0%, transparent 72%)",
        top: "-8%",
        right: "-15%",
      }}
    />
    <div
      className="absolute h-[min(90vw,24rem)] w-[min(90vw,24rem)] rounded-full opacity-20 dark:opacity-15"
      style={{
        background: "radial-gradient(circle, #d68338 0%, transparent 72%)",
        bottom: "5%",
        left: "-10%",
      }}
    />
    <div
      className="absolute h-[min(70vw,16rem)] w-[min(70vw,16rem)] rounded-full opacity-15 dark:opacity-10"
      style={{
        background: "radial-gradient(circle, #fbb040 0%, transparent 72%)",
        top: "35%",
        left: "25%",
      }}
    />
    <div
      className="absolute hidden h-[min(80vw,20rem)] w-[min(80vw,20rem)] rounded-full dark:block dark:opacity-[0.12]"
      style={{
        background: "radial-gradient(circle, #6366f1 0%, transparent 72%)",
        bottom: "15%",
        right: "10%",
      }}
    />
  </div>
);

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      <StaticMobileBackground />

      <div
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        aria-hidden
      >
      {/* Primary gradient orb - large, slow moving */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #f49541 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary gradient orb - medium, different timing */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-15 blur-[80px]"
        style={{
          background: "radial-gradient(circle, #d68338 0%, transparent 70%)",
          bottom: "10%",
          left: "-5%",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary accent orb - smaller, faster */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 dark:opacity-10 blur-[60px]"
        style={{
          background: "radial-gradient(circle, #fbb040 0%, transparent 70%)",
          top: "40%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle purple/blue accent for depth - dark mode enhancement */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-0 dark:opacity-10 blur-[90px]"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          bottom: "20%",
          right: "20%",
        }}
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/20"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
