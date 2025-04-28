"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "@/components";

interface Props {
  extraServices: ServicesInterface[]
}

export const ViewAllServices = ({ extraServices }: Props) => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <>
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
                <ServiceCard key={index} {...service} />
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
    </>
  )
}
