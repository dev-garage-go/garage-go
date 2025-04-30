"use client";

import { useState, useEffect, useRef } from 'react';

interface Props<T> {
  items: T[]; // expects an array of objects
  renderItem: (item: T) => React.ReactNode; // this function should tell the carousel how each item to be rendered from the array (items) should look like.
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

  // Cloned items to infinite effect
  useEffect(() => {
    if (isInfinite && items.length > 0) {
      setClonedItems([...items, ...items, ...items]);
    } else {
      setClonedItems(items);
    }
  }, [items, isInfinite]);

  // Move automatically from 'position' = 0
  useEffect(() => {
    if (!isInfinite || items.length === 0) return;

    const interval = setInterval(() => {
      // 'prev' = This is the functional form of setState
      // It allows you to update the state (position) based on its previous value, it is necessary because the setInterval runs outside the normal React cycle and can have an old version of the state if not used in this way
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
