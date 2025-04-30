'use client'

import { useEffect, useState } from "react";

export const useResponsiveGap = () => {
  const [gap, setGap] = useState(16); // default

  useEffect(() => {
    const updateGap = () => {
      if (window.innerWidth >= 1536) { // 2xl
        setGap(120);
      } else if (window.innerWidth >= 1280) { // xl
        setGap(84)
      } else if (window.innerWidth >= 1024) { // lg
        setGap(68);
      } else if (window.innerWidth >= 768) { // md
        setGap(52);
      } else if (window.innerWidth >= 640) { // sm
        setGap(36);
      } else {
        setGap(30);
      }
    };

    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);

  return gap;
};
