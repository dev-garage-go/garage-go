"use client";

import { useState, useEffect, useRef } from 'react';

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemWidth?: number;
  scrollSpeed?: number; // milliseconds per displacement
  isInfinite?: boolean;
  direction?: 'left' | 'right';
  gap?: number; // px
}

export const Carousel = <T,>({
  items,
  renderItem,
  itemWidth = 200,
  scrollSpeed = 20,
  isInfinite = true,
  direction = 'left',
  gap = 24,
}: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [clonedItems, setClonedItems] = useState<T[]>([]);

  useEffect(() => {
    if (isInfinite && items.length > 0) {
      setClonedItems([...items, ...items, ...items]);
    } else {
      setClonedItems(items);
    }
  }, [items, isInfinite]);

  useEffect(() => {
    if (!isInfinite || items.length === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const step = direction === 'left' ? -1 : 1;
        let nextPosition = prev + step;

        if (direction === 'left') {
          const resetPoint = -items.length * (itemWidth + gap);
          if (nextPosition <= resetPoint) {
            nextPosition = 0;
          }
        } else {
          if (nextPosition > 0) {
            nextPosition = -items.length * (itemWidth + gap);
          }
        }
        return nextPosition;
      });
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [isInfinite, items.length, itemWidth, scrollSpeed, direction, gap, clonedItems.length]);

  return (
    <div className="overflow-hidden relative w-full" ref={containerRef}>
      <div
        className="flex transition-transform duration-100 ease-linear"
        style={{
          transform: `translateX(${position}px)`,
          gap: `${gap}px`,
          width: `${clonedItems.length * (itemWidth + gap)}px`,
        }}
      >
        {clonedItems.map((item, index) => (
          <div
            key={index}
            className={`flex-none w-[${itemWidth}px] flex items-center justify-center`}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
