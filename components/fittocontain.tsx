"use client";
import { useCallback, useEffect, useRef } from "react";

export const ScreenFitText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const resizeText = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    let min = 1;
    let max = Math.min(2500, Math.floor(containerHeight * 1));

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";

      if (
        text.scrollWidth <= containerWidth &&
        text.offsetHeight <= containerHeight
      ) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = max + "px";
  }, []);

  useEffect(() => {
    resizeText();

    window.addEventListener("resize", resizeText);
    document.fonts.ready.then(resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, [resizeText]);

  return (
    <div
      aria-hidden="true"
      className="flex h-[clamp(5rem,14vw,10rem)] w-full items-center justify-center overflow-hidden border-t border-border bg-section-muted"
      ref={containerRef}
    >
      <span
        className="block flex-none whitespace-nowrap text-center font-bold uppercase leading-none text-primary/10"
        ref={textRef}
      >
        GistHQ
      </span>
    </div>
  );
};
