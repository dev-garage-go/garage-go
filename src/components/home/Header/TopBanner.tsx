"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  title: string,
  description: string,
  vehicleName?: string,
  vehiclePatent?: string,
}

export const TopBanner = ({ description, title, vehiclePatent, vehicleName }: Props) => {
  const [hasBreadCrums, setHasBreadCrums] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.repeat(2).includes("/")) {
      setHasBreadCrums(true)
    }
    setHasBreadCrums(false)
  }, [pathname])


  return (
    <section className="w-full px-36 pb-6 pt-32 bg-primaryBlue-300">
      <div className="flex justify-center items-centerw-full">

        <div className="grid grid-cols-6">
          <div className="flex flex-wrap col-start-2 col-end-4">
            <h1 className="title-h1 uppercase text-white">
              {title}
            </h1>
            <p className="description-of-title-h1 mt-4 text-white">
              {description}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
