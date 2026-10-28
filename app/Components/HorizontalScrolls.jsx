"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalScroll = ({ children, title, subtitle }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const element = scrollRef.current;
    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 5);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 5
    );
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * scrollRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    updateButtons();

    element.addEventListener("scroll", updateButtons, { passive: true });
    const observer = new ResizeObserver(updateButtons);
    observer.observe(element);

    return () => {
      element.removeEventListener("scroll", updateButtons);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full py-6">
      {(title || subtitle) && (
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
            )}
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child, index) => (
          <div key={child?.key ?? index} className="shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;