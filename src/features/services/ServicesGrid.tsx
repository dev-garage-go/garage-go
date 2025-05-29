"use client"

import { ServiceCard } from "@/features";
import { ServicesData } from '@/constants'

export const ServicesGrid = () => {
  return (
    <div className="max-w-page padding-central-page grid-central-page">
      {ServicesData.map((service, index) => (
        <ServiceCard key={index + service.title} {...service} />
      ))}
    </div>
  )
}
