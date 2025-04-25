"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  title: string,
  description: string,
  vehicleName?: string,
  vehiclePatent: string,

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
    <section>
      <div>
        
      </div>
    </section>
  )
}
