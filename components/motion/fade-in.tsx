"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
  /**
   * When true the animation fires once on enter. Default true — re-firing on every
   * scroll-in is distracting on long pages.
   */
  once?: boolean;
};

/**
 * Lightweight scroll-triggered fade + slide-up. Respects prefers-reduced-motion
 * by collapsing to an instant render so motion-sensitive users aren't punished.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "section" | "ul" | "ol";
};

/**
 * Stagger container — children must be wrapped in <FadeInChild> to inherit the staircase timing.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: StaggerProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function FadeInChild({
  children,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
