"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShortcuts, clamp } from "@/hooks/use-shortcut";
import { ScrollReveal } from "./scroll-reveal";

const IMAGES = [
  "/images/d1.jpg",
  "/images/d2.jpg",
  "/images/d3.jpg",
  "/images/d4.jpg",
  "/images/d5.jpg",
];

const FRAME_OFFSET = -30;
const FRAMES_VISIBLE_LENGTH = 3;
const SCROLL_THRESHOLD = 40;
const BUFFER_SIZE = 8; // Render 8 cards before and after visible range (increased for fast scrolling)

export default function TimeMachine({
  shouldImplementPreloading = false,
}: {
  shouldImplementPreloading?: boolean;
}) {
  // Bounded index that stops at first/last image
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollAccumulator = React.useRef(0);
  const lastUpdateTime = React.useRef(Date.now());
  const touchStartY = React.useRef(0);

  // Trigger initial animation
  React.useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate boundaries
  const minIndex = 0;
  const maxIndex = IMAGES.length - 1;

  // Calculate which cards should be rendered (visible + buffer)
  const getVisibleCards = React.useCallback(() => {
    const start = Math.max(minIndex, currentIndex - BUFFER_SIZE);
    const end = Math.min(
      maxIndex,
      currentIndex + FRAMES_VISIBLE_LENGTH + BUFFER_SIZE
    );
    const cards = [];

    for (let i = start; i <= end; i++) {
      cards.push({
        index: i,
        imageIndex: i, // Direct mapping, no wrapping
      });
    }

    return cards;
  }, [currentIndex, minIndex, maxIndex]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const MIN_UPDATE_INTERVAL = 75; // Minimum 75ms between index changes (max ~13 changes per second)

    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Allow native scroll when at boundaries
      const atStart = currentIndex <= minIndex && scrollingUp;
      const atEnd = currentIndex >= maxIndex && scrollingDown;

      if (atStart || atEnd) {
        // Reset accumulator and allow normal page scroll
        scrollAccumulator.current = 0;
        return;
      }

      e.preventDefault();
      scrollAccumulator.current += e.deltaY;

      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime.current;

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        // Only update if enough time has passed since last update
        if (timeSinceLastUpdate >= MIN_UPDATE_INTERVAL) {
          const delta = scrollAccumulator.current > 0 ? 1 : -1;
          const newIndex = clamp(currentIndex + delta, [minIndex, maxIndex]);

          // Only update if we're not at boundary
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            scrollAccumulator.current = 0;
            lastUpdateTime.current = now;
          } else {
            // At boundary, clear accumulator
            scrollAccumulator.current = 0;
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;
      touchStartY.current = touchY;

      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;

      // Allow native scroll when at boundaries
      const atStart = currentIndex <= minIndex && scrollingUp;
      const atEnd = currentIndex >= maxIndex && scrollingDown;

      if (atStart || atEnd) {
        // Reset accumulator and allow normal page scroll
        scrollAccumulator.current = 0;
        return;
      }

      e.preventDefault();
      scrollAccumulator.current += deltaY;

      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime.current;

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        if (timeSinceLastUpdate >= MIN_UPDATE_INTERVAL) {
          const delta = scrollAccumulator.current > 0 ? 1 : -1;
          const newIndex = clamp(currentIndex + delta, [minIndex, maxIndex]);

          // Only update if we're not at boundary
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            scrollAccumulator.current = 0;
            lastUpdateTime.current = now;
          } else {
            // At boundary, clear accumulator
            scrollAccumulator.current = 0;
          }
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex, minIndex, maxIndex]);

  useShortcuts({
    ArrowRight: () => {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    },
    ArrowLeft: () => {
      setCurrentIndex((prev) => Math.max(prev - 1, minIndex));
    },
  });

  const visibleCards = getVisibleCards();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <p
        className="absolute z-[2000] text-sm font-medium uppercase tracking-widest text-muted-foreground italic"
        style={{ top: "40px" }}
      >
        do you remember?~
      </p>
      <div className="relative w-full h-full flex items-center justify-center">
        {visibleCards.map((card) => {
          const offsetIndex = card.index - currentIndex;
          const blur = currentIndex > card.index ? 2 : 0;
          const opacity = currentIndex > card.index ? 0 : 1;
          const scale = clamp(1 - offsetIndex * 0.08, [0.08, 2]);
          const y = clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

          const src = IMAGES[card.imageIndex];
          const image = (
            <img
              alt=""
              src={src || "/placeholder.svg"}
              className="object-cover w-full h-full"
            />
          );

          return (
            <motion.div
              key={card.index}
              className="absolute w-[98%] md:w-[95%] max-w-[1200px] aspect-[16/9] rounded-lg overflow-hidden shadow-2xl"
              initial={
                !hasAnimated
                  ? {
                      opacity: 0,
                      scale: 0.8,
                      y: 50,
                    }
                  : false
              }
              animate={{
                y,
                scale,
                opacity: hasAnimated ? opacity : 1,
                transition: hasAnimated
                  ? {
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                      mass: 0.5,
                    }
                  : {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      delay: offsetIndex * 0.1,
                    },
              }}
              style={{
                willChange: "opacity, filter, transform",
                filter: `blur(${blur}px)`,
                opacity: !hasAnimated ? undefined : opacity,
                transitionProperty: "opacity, filter",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-in-out",
                zIndex: 1000 - card.index,
              }}
            >
              {shouldImplementPreloading ? (
                <>{offsetIndex < FRAMES_VISIBLE_LENGTH ? image : null}</>
              ) : (
                image
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
