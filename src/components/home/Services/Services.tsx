"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GoogleIcon } from '@/assets';
import { ServiceCard } from '@/components';
import { ServicesData } from '@/constants';

export const Services = () => {
  const [viewAll, setViewAll] = useState(false);

  const firstServices = ServicesData.slice(0, 5);
  const extraServices = ServicesData.slice(5);

  return (
    <section>
      <div className="max-w-7xl mx-auto padding-central-page">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primaryBlue-500 mb-4">
            Todos los servicios
            <br />
            que necesita tu auto
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Image
              width={20}
              height={20}
              src={GoogleIcon}
              alt="Google"
              className="object-contain"
            />
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-gray-700 font-medium">4.7</span>
            <span className="text-primaryBlue-500 ml-2 font-medium">Servicios más solicitados</span>
          </div>
        </div>

        {/* Main services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {firstServices.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              func={() => console.log(`Agendar: ${service.title}`)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
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

        {/* Aditional services as animated block */}
        <AnimatePresence initial={false}>
          {viewAll && (
            <motion.div
              layout
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {extraServices.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    {...service}
                    func={() => console.log(`Agendar: ${service.title}`)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="bg-primaryBlue-500 text-white px-8 py-3 rounded-lg hover:opacity-90 font-medium transition"
          >
            {viewAll ? "Ver menos" : "Ver todos"}
          </button>
        </div>
      </div>
    </section>
  );
};
