"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { FeatureIconsMap } from "@/constants"
import { useGetVehicleOnChangeStorage } from "@/hooks"
import { getBreadcrumbs } from "@/utils"

type PossibleFeatures = 'pick-delivery' | 'super-check' | 'garantia';

interface Props {
  title?: string
  description?: string
  hasVehicleData?: boolean      // TODO: Change name to typeVehicle
  vehicleName?: string          // TODO: Delete it, the vehicle data it will be obtained in this component calling back actions
  vehiclePatent?: string        // TODO: Delete it, the vehicle data it will be obtained in this component calling back actions
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

  // Breadcrums
  const [hasBreadCrumbs, setHasBreadCrumbs] = useState(false)
  const pathSegments = pathname.split("/").filter(Boolean) // remove empty strings

  // Vehicle logic
  // const licensePlate = useLicensePlateOnChangeStorage()
  // const licensePlateTxt = licensePlate ? licensePlate : '-'

  const vehicle = useGetVehicleOnChangeStorage()
  const licensePlateTxt = vehicle ? vehicle.licensePlate : '-'

  // TODO: const vehicleData = getVehiculeByLicensePlate(id: string) -> import {} from "@actions"

  useEffect(() => {
    setHasBreadCrumbs(pathSegments.length > 0)
  }, [pathSegments.length])

  return (
    <>
      <section className="w-full px-4 sm:px-6 xl:px-36 pb-6 sm:pb-8 xl:pb-10 pt-28 sm:pt-32 bg-primaryBlue-300">
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-6">
            <div className={
              `flex flex-wrap overflow-x-visible ${hasVehicleData
                ? 'col-start-1 col-end-6 xl:col-end-3'
                : 'col-start-1 col-end-6 xl:col-start-2 xl:col-end-4'}`}>
              {/* Breadcrumbs */}
              <div className={`text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm flex w-full justify-start items-center mb-2 md:mb-4 text-white ${hasBreadCrumbs ? "block" : "hidden"}`}>
                <Link href="/" className="hover:font-medium duration-200">
                  Inicio
                  <span className="px-2">{">"}</span>
                </Link>
                {getBreadcrumbs(pathname).map((crumb, index) => (
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
                    <h2 className="text-2xl md:text-2xl xl:text-4xl font-bold text-white">
                      Patente:
                      <span className="uppercase">{" " + licensePlateTxt}</span>
                    </h2>
                    <div className="flex justify-between gap-6 mt-1 xl:mt-2 items-center w-full">
                      <p className="text-base sm:text-lg xl:text-xl uppercase text-white">{vehicleName}</p>
                      <button
                        className="hidden md:block text-sm bg-primaryBlue-900 hover:brightness-125 hover:scale-110 duration-200 transition-all px-6 xl:px-10 py-0.5 rounded-md text-white"
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
        <div className="relative w-full h-40 sm:h-52 md:h-64">
          <Image
            src={imageSrc!}
            alt={imageAlt!}
            fill
            className="object-cover w-auto h-auto"
          />

          <div className="absolute bottom-0 h-12 sm:h-14 md:h-16 bg-white opacity-80 w-full flex justify-center items-center gap-10 sm:gap-12 md:gap-14">
            {featuresImages?.map((feature, index) => (
              <Image
                height={24}
                width={50}
                key={index + feature}
                src={FeatureIconsMap[feature]}
                alt={feature}
                className="object-contain z-20 opacity-100 p-1 sm:p-0"
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
