"use client"

import { useState, useEffect } from 'react';
import {
  Audi,
  Bmw,
  Chevrolet,
  Citroen,
  Fiat,
  Ford,
  Hyundai,
  Jeep
} from '@/assets';

const brandLogos = [
  { id: 'audi', image: Audi },
  { id: 'bmw', image: Bmw },
  { id: 'chevrolet', image: Chevrolet },
  { id: 'citroen', image: Citroen },
  { id: 'fiat', image: Fiat },
  { id: 'ford', image: Ford },
  { id: 'hyundai', image: Hyundai },
  { id: 'jeep', image: Jeep }
];

export const BrandCarousel = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev - 1; // Movimiento más suave, pixel por pixel
        // Resetea la posición cuando todos los logos hayan pasado
        const resetPoint = -(brandLogos.length * 200);
        return next <= resetPoint ? 0 : next;
      });
    }, 20); // Intervalo más corto para movimiento más suave

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 overflow-hidden relative w-full bg-gray-50">  {/* Cambiado de max-w-5xl a max-w-7xl */}
      <div
        className="flex transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(${position}px)` }}
      >
        {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-none w-[180px] px-6 flex items-center justify-center" // Ajustado tamaño y padding
          >
            <img
              src={logo.image}
              alt={logo.id}
              className="w-20 h-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;