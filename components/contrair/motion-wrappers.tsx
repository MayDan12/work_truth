"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import React from "react";

const editorialEase = [0.22, 1, 0.36, 1] as const;

interface MotionFadeInProps extends Omit<HTMLMotionProps<"div">, "viewport"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  viewport?: boolean;
}

export function MotionFadeIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  yOffset = 14,
  viewport = true,
  ...props
}: MotionFadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: yOffset };

  const animate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  const transition = {
    duration: shouldReduceMotion ? 0.01 : duration,
    delay,
    ease: editorialEase,
  };

  if (viewport) {
    return (
      <motion.div
        className={className}
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-40px" }}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  viewportOnce?: boolean;
  as?: "div" | "ol" | "ul";
}

export function MotionStagger({
  children,
  className,
  staggerDelay = 0.13,
  delay = 0,
  viewportOnce = true,
  as = "div",
}: MotionStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = {
    className,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: viewportOnce, margin: "-40px" },
    variants: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          delayChildren: delay,
        },
      },
    },
  };

  if (as === "ol") {
    return <motion.ol {...motionProps}>{children}</motion.ol>;
  }

  if (as === "ul") {
    return <motion.ul {...motionProps}>{children}</motion.ul>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

interface MotionStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  as?: "div" | "article" | "li";
}

export function MotionStaggerItem({
  children,
  className,
  yOffset = 14,
  as = "div",
}: MotionStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = {
    className,
    variants: {
      hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: yOffset },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.01 : 0.6,
          ease: editorialEase,
        },
      },
    },
  };

  if (as === "article") {
    return <motion.article {...motionProps}>{children}</motion.article>;
  }

  if (as === "li") {
    return <motion.li {...motionProps}>{children}</motion.li>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

export function MotionTap({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
