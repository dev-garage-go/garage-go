"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { setBreadcrumbs } from "@/features/home"
import { VehicleServicesFeaturesIconsMap } from "@/features/services"
import { useVehicleContext } from "@/features/vehicle"
import clsx from "clsx"
import { Skeleton } from "@/components"

type PossibleFeatures = 'pick-delivery' | 'super-check' | 'garantia';

interface Props {
  title?: string
  description?: string
  hasVehicleData?: boolean      // TODO: Change name to typeVehicle
  withImage?: boolean
  imageSrc?: string
  imageAlt?: string
  featuresImages?: PossibleFeatures[]
}

// The banner must be used with "title and description" or with "hasVehicleData = true, vehicleName and vehiclePatent"
// It must not be combined between groups.
export const TopBanner = ({
  description,
  title,
  hasVehicleData = false,
  featuresImages,
  imageAlt,
  imageSrc,
  withImage
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const { vehicleInStorage, deleteVehicle } = useVehicleContext()

  // Breadcrums
  const [hasBreadCrumbs, setHasBreadCrumbs] = useState(false)
  const pathSegments = pathname.split("/").filter(Boolean) // remove empty strings

  // I use the hook to obtain the vehicle data because this is a dynamic component,
  // changes the data based if exist or not the vehicle
  const vehicleLicensePlate = vehicleInStorage?.licensePlate ?? <Skeleton color="light-blue" className="w-20 h-6" />
  const vehicleBrand = vehicleInStorage?.brand ?? <Skeleton color="light-blue" className="w-20 h-6" />
  const vehicleModel = vehicleInStorage?.model ?? <Skeleton color="light-blue" className="w-28 h-6" />

  useEffect(() => {
    setHasBreadCrumbs(pathSegments.length > 0)
  }, [pathSegments.length])

  return (
    <>
      <section className="w-full px-4 sm:px-6 xl:px-36 pb-6 sm:pb-8 xl:pb-10 pt-28 sm:pt-32 bg-primaryBlue-300">
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-4 w-full max-w-page">
            <div className={clsx("flex flex-wrap overflow-x-visible", {
              "col-span-4": hasVehicleData,
              "col-span-4 lg:col-span-2": !hasVehicleData
            })}>
              {/* Breadcrumbs */}
              <div className={`text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm flex w-full justify-start items-center mb-2 md:mb-4 text-white ${hasBreadCrumbs ? "block" : "hidden"}`}>
                <Link href="/" className="hover:font-medium duration-200">
                  Inicio
                  <span className="px-2">{">"}</span>
                </Link>
                {setBreadcrumbs(pathname).map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {crumb.isEllipsis ? (
                      <span className="px-2 text-white">...</span>
                    ) : !crumb.isLast ? (
                      <>
                        <Link href={crumb.href!} className="hover:font-medium duration-200">
                          {crumb.name}
                        </Link>
                        <span className="px-2">{">"}</span>
                      </>
                    ) : (
                      <span>{crumb.name}</span>
                    )}
                  </div>
                ))}
              </div>
              <div>

                {!hasVehicleData ? (
                  <>
                    <h1 className="title-h1 uppercase text-white">{title}</h1>
                    <p className="description-of-title-h1 mt-1 sm:mt-2 xl:mt-4 text-white">{description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="flex items-center gap-2 lg:gap-4 text-2xl md:text-2xl xl:text-4xl font-bold text-white">
                      <span>Patente:</span>
                      <span className="uppercase">{vehicleLicensePlate}</span>
                    </h2>
                    <div className="flex justify-between gap-6 mt-1 xl:mt-2 items-center w-full">
                      <div className="flex w-full justify-start items-center gap-2.5 tracking-wide">
                        <p className="text-base sm:text-lg xl:text-xl uppercase text-white">
                          {vehicleBrand}
                        </p>
                        <p className="text-base sm:text-lg xl:text-xl uppercase text-white">
                          {vehicleModel}
                        </p>
                      </div>
                      <button
                        className="hidden md:block text-sm bg-primaryBlue-900 hover:brightness-125 hover:scale-110 duration-200 transition-all px-6 xl:px-10 py-1 rounded-md text-white text-nowrap"
                        onClick={() => { deleteVehicle() }}
                      >
                        Cambiar patente
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
        <div className="relative w-full h-40 sm:h-52 md:h-64">
          <Image
            src={imageSrc!}
            alt={imageAlt!}
            sizes="(min-width: 560px) 100vw, calc(12.08vw + 475px)"
            fill
            className="object-cover w-auto h-auto"
          />

          <div className="absolute bottom-0 h-12 sm:h-14 md:h-16 bg-white opacity-80 w-full flex justify-center items-center gap-10 sm:gap-12 md:gap-14">
            {featuresImages?.map((feature, index) => (
              <div
                key={feature}
                className="relative z-20 flex items-center justify-center h-11 md:h-12 w-16 md:w-20"
              >
                <Image
                  fill
                  sizes="calc(min-width: 768px) 80px, 64px"
                  src={VehicleServicesFeaturesIconsMap[feature]}
                  alt={feature}
                  className="object-contain p-1 sm:p-0"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
