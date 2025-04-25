"use client"

import { ServiceCard } from "@/components";
import { ServicesData } from '@/constants'

export const ServicesGrid = () => {
  return (
    <div className="max-w-page padding-central-page grid-central-page">
      {ServicesData.map((service, index) => (
        <ServiceCard
          key={index}
          func={() => console.log(service.title)}
          {...service}
        />
      ))}
    </div>
  )
}
