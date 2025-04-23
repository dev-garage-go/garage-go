"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleIcon,
} from '@/assets';
import { BrandCarousel, ServiceCard } from '@/components';
import { ServicesData } from '@/constants';

export const Services = () => {
  const [viewAll, setViewAll] = useState(false);

  const firstServices = ServicesData.slice(0, 5);
  const extraServices = ServicesData.slice(5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2D31FA] mb-4">
            Todos los servicios
            <br />
            que necesita tu auto
          </h2>
          <div className="flex items-center justify-center gap-2">
            <img src={GoogleIcon} alt="Google" className="h-5" />
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-700 font-medium">4.7</span>
            <span className="text-[#2D31FA] ml-2 font-medium">Servicios más solicitados</span>
          </div>
        </div>

        {/* Servicios principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {firstServices.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              func={() => console.log(`Agendar: ${service.title}`)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
          <div className="md:col-span-3">
            <ServiceCard
              {...firstServices[3]}
              func={() => console.log(`Agendar: ${firstServices[3].title}`)}
            />
          </div>
          <div className="md:col-span-2">
            <ServiceCard
              {...firstServices[4]}
              func={() => console.log(`Agendar: ${firstServices[4].title}`)}
            />
          </div>
        </div>

        {/* Servicios adicionales animados individualmente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <AnimatePresence>
            {viewAll &&
              extraServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                >
                  <ServiceCard
                    {...service}
                    func={() => console.log(`Agendar: ${service.title}`)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Botón */}
        <div className="text-center mt-12">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="bg-[#2D31FA] text-white px-8 py-3 rounded-lg hover:opacity-90 font-medium transition"
          >
            {viewAll ? "Ver menos" : "Ver todos"}
          </button>
        </div>

        {/* Carrusel de marcas */}
        <div className="mt-16">
          <BrandCarousel />
        </div>
      </div>
    </section>
  );
};
