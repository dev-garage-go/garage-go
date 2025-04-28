"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { FeatureIconsMap, SegmentNameMap } from "@/constants"

interface Props {
  title?: string
  description?: string
  hasVehicleData?: boolean
  vehicleName?: string
  vehiclePatent?: string
  withImage?: boolean
  imageSrc?: string
  imageAlt?: string
  featuresImages?: string[]
}

// The banner must be used with "title and description" or with "hasVehicleData = true, vehicleName and vehiclePatent"
// It must not be combined between groups.
export const TopBanner = ({
  description,
  title,
  vehiclePatent,
  vehicleName,
  hasVehicleData = false,
  featuresImages,
  imageAlt,
  imageSrc,
  withImage
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [hasBreadCrumbs, setHasBreadCrumbs] = useState(false)

  const pathSegments = pathname.split("/").filter(Boolean) // remove empty strings

  useEffect(() => {
    setHasBreadCrumbs(pathSegments.length > 0)
  }, [pathname])

  return (
    <>
      <section className="w-full px-4 sm:px-6 xl:px-36 pb-6 xl:pb-7 pt-28 sm:pt-32 bg-primaryBlue-300">
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-6">
            <div className={
              `flex flex-wrap ${hasVehicleData
                ? 'col-start-1 col-end-6 xl:col-end-3'
                : 'col-start-1 col-end-6 xl:col-start-2 xl:col-end-4'}`}>
              {/* Breadcrumbs */}
              <div className={`text-sm flex w-full justify-start items-center mb-2 md:mb-4 text-white ${hasBreadCrumbs ? "block" : "hidden"}`}>
                <Link href="/" className="hover:font-medium duration-200 capitalize">
                  Inicio
                  <span className="px-2">{">"}</span>
                </Link>
                {pathSegments.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/")
                  const name = SegmentNameMap[segment] || decodeURIComponent(segment)
                  const isLast = index === pathSegments.length - 1

                  return (
                    <div key={href} className="flex items-center">
                      {!isLast ? (
                        <>
                          <Link href={href} className="hover:font-medium duration-200 capitalize">
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
              <div>

                {!hasVehicleData ? (
                  <>
                    <h1 className="title-h1 uppercase text-white">{title}</h1>
                    <p className="description-of-title-h1 mt-1 sm:mt-2 xl:mt-4 text-white">{description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-2xl xl:text-4xl font-bold text-white">
                      Patente:
                      <span className="uppercase">{" " + vehiclePatent}</span>
                    </h2>
                    <div className="flex justify-between gap-6 mt-1 xl:mt-2 items-center w-full">
                      <p className="text-base sm:text-lg xl:text-xl uppercase text-white">{vehicleName}</p>
                      <button
                        className="hidden md:block text-sm bg-primaryBlue-900 px-6 xl:px-10 py-0.5 rounded-md text-white"
                        onClick={() => router.back()}
                      >
                        Volver
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {withImage && (
        <div className="relative w-full h-52">
          <Image
            src={imageSrc ?? ''}
            alt={imageAlt ?? ''}
          />

          <div className="absolute bottom-0 h-20 bg-white opacity-30 w-full">
            {featuresImages?.map((feature, index) => (
              <Image
                height={24}
                width={50}
                key={index}
                src={FeatureIconsMap[feature]}
                alt={feature}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
