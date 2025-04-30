'use client'

import { useEffect, useState } from "react";

export const useResponsiveGap = () => {
  const [gap, setGap] = useState(16); // default

  useEffect(() => {
    const updateGap = () => {
      if (window.innerWidth >= 1280) { // xl
        setGap(60);
      } else if (window.innerWidth >= 1024) { // lg
        setGap(40);
      } else if (window.innerWidth >= 768) { // md
        setGap(32);
      } else if (window.innerWidth >= 640) { // sm
        setGap(24);
      } else {
        setGap(16);
      }
    };

    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);

  return gap;
};
