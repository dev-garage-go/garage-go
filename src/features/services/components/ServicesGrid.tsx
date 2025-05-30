"use client"

import { ServiceCard, ServicesCardsData } from "@/features/services";

export const ServicesGrid = () => {
  return (
    <div className="max-w-page padding-central-page grid-central-page">
      {ServicesCardsData.map((service, index) => (
        <ServiceCard key={index + service.title} {...service} />
      ))}
    </div>
  )
}
