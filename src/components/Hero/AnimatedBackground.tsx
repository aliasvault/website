"use client";

import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
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
  );
};

export default AnimatedBackground;
