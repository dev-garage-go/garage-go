"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  title: string
  description: string
  vehicleName?: string
  vehiclePatent?: string
}

// Can added more mappings
const segmentNameMap: Record<string, string> = {
  services: "Servicios",
  battery_change: "Cambio de batería",
  mileage_maintenance: "Mantención por kilometraje",
  oil_change: "Cambio de aceite",
  preventive_check: "Checkeo preventivo",
  technical_revision: "Revisión técnica",
  tire_change: "Cambio de cubiertas",
}

export const TopBanner = ({ description, title, vehiclePatent, vehicleName }: Props) => {
  const pathname = usePathname()
  const [hasBreadCrumbs, setHasBreadCrumbs] = useState(false)

  const pathSegments = pathname.split("/").filter(Boolean) // remove empty strings

  useEffect(() => {
    setHasBreadCrumbs(pathSegments.length > 0)
  }, [pathname])

  return (
    <section className="w-full px-36 pb-6 pt-32 bg-primaryBlue-300">
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-6">
          <div className="flex flex-wrap col-start-2 col-end-4">
            {/* Breadcrumbs */}
            <div className={`text-sm flex flex-wrap justify-start items-center text-white mb-4 ${hasBreadCrumbs ? "block" : "hidden"}`}>
              {pathSegments.map((segment, index) => {
                const href = "/" + pathSegments.slice(0, index + 1).join("/")
                const name = segmentNameMap[segment] || decodeURIComponent(segment)
                const isLast = index === pathSegments.length - 1

                return (
                  <div key={href} className="flex items-center">
                    {!isLast ? (
                      <>
                        <Link href={href} className="hover:underline capitalize">
                          {name}
                        </Link>
                        <span className="px-2">{">"}</span>
                      </>
                    ) : (
                      <span className="capitalize">
                        {name}
                      </span> // last element no clickeable
                    )}
                  </div>
                )
              })}
            </div>

            <h1 className="title-h1 uppercase text-white">{title}</h1>
            <p className="description-of-title-h1 mt-4 text-white">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
