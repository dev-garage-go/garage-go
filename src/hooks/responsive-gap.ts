'use client'

import { useEffect, useState } from "react";

export const useResponsiveGap = () => {
  const [gap, setGap] = useState(60); // default

  useEffect(() => {
    const updateGap = () => {
      if (window.innerWidth >= 1536) { // 2xl
        setGap(135);
      } else if (window.innerWidth >= 1280) { // xl
        setGap(120)
      } else if (window.innerWidth >= 1024) { // lg
        setGap(105);
      } else if (window.innerWidth >= 768) { // md
        setGap(90);
      } else if (window.innerWidth >= 640) { // sm
        setGap(75);
      } else {
        setGap(60);
      }
    };

    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);

  return gap;
};
