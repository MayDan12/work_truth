"use client";

import { useEffect, useRef, useState } from "react";
import { Blobatar } from "@blobatar/react";
import { thinking, unsure, surprised } from "blobatar/expression";
import { gaze } from "blobatar/gaze";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle } from "lucide-react";
import "blobatar/motion.css";
import "blobatar/gaze.css";

const inquisitiveThoughts = [
  "What's the management really like?",
  "Is the culture actually healthy?",
  "How flexible are the hours?",
  "What's the compensation like?",
  "Do employees actually stay long?",
  "Are promotions based on merit?",
];

export function InquisitiveBlobatar({
  name = "alain00",
  size = 72,
  className = "",
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Arm the gaze tracker so eyes follow the cursor inquisitively
  useEffect(() => {
    if (!containerRef.current) return;
    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    try {
      const g = gaze(svg, { target: "pointer" });
      return () => {
        g.stop();
      };
    } catch {
      // Fallback gracefully if gaze is unsupported in the current environment
    }
  }, []);

  // Determine inquisitive expression
  const currentExpression = isClicked
    ? surprised
    : isHovered
      ? unsure
      : thinking;

  function handleInteraction() {
    setIsClicked(true);
    setThoughtIndex((prev) => (prev + 1) % inquisitiveThoughts.length);
    setTimeout(() => setIsClicked(false), 800);
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Floating Inquisitive Thought Bubble */}
      <AnimatePresence mode="wait">
        <motion.button
          aria-label="Click to hear another question"
          className="group relative mb-2 inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-card hover:text-foreground cursor-pointer"
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          key={thoughtIndex}
          onClick={handleInteraction}
          transition={{ duration: 0.25, ease: "easeOut" }}
          type="button"
        >
          <HelpCircle
            aria-hidden="true"
            className="size-3.5 text-primary opacity-80 transition-transform group-hover:scale-110"
          />
          <span>{inquisitiveThoughts[thoughtIndex]}</span>
          <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">
            (click)
          </span>

          {/* Speech bubble beak */}
          <div
            aria-hidden="true"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-r border-b border-border/80 bg-card"
          />
        </motion.button>
      </AnimatePresence>

      {/* Blobatar with inquisitive float and gaze tracking */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: isHovered ? [0, 4, -3, 0] : [-1.5, 2, -1.5],
        }}
        className="relative cursor-pointer"
        onClick={handleInteraction}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
        style={
          {
            "--mo-track-travel": "8px",
          } as React.CSSProperties
        }
        transition={{
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: isHovered ? 0.6 : 5,
            repeat: isHovered ? 1 : Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94, rotate: -6 }}
      >
        <Blobatar
          animate="always"
          expression={currentExpression}
          name={name}
          size={size}
        />

        {/* Inquisitive sparkle accent on interaction */}
        {isClicked && (
          <motion.div
            aria-hidden="true"
            className="absolute -top-1 -right-1 text-primary pointer-events-none"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1.2, rotate: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="size-4" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
