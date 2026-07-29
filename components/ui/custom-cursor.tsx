"use client";

import * as React from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPointer, setIsPointer] = React.useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, [role='button'], .cursor-pointer")
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          scale: isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.8 : 0.4,
          backgroundColor: isPointer ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
          borderColor: isPointer ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="size-8 rounded-full border border-foreground/30 backdrop-blur-xs flex items-center justify-center"
      >
        {/* Inner Glowing Core Dot */}
        <motion.div
          animate={{
            scale: isPointer ? 1.4 : 1,
            backgroundColor: isPointer ? "#10b981" : "currentColor",
          }}
          className="size-2 rounded-full bg-foreground"
        />
      </motion.div>
    </motion.div>
  );
}
