"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchend", () => setIsDragging(false));
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white text-center">{title}</h3>
      <div
        ref={sliderRef}
        // touch-pan-y: a horizontal finger-drag drives the slider instead of
        // being claimed by the browser as a scroll gesture; vertical scrolling
        // over the image still works. No effect on mouse input.
        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-col-resize select-none bg-neutral-900 touch-pan-y"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
            <span className="text-white text-sm font-semibold">BEFORE</span>
          </div>
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={afterImage}
            alt="After"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full backdrop-blur-sm">
            <span className="text-white text-sm font-semibold">AFTER</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 transition-all"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-400 rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
            <div className="flex gap-1">
              <div className="w-0.5 h-6 bg-neutral-950 rounded-full" />
              <div className="w-0.5 h-6 bg-neutral-950 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-neutral-400">
        Drag the slider to compare
      </p>
    </div>
  );
}
