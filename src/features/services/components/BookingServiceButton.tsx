'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export const BookingServiceButton = () => {
  const pathname = usePathname()
  const lastPath = pathname.split("/").at(-1)

  return (
    <Link
      href={`${lastPath}/contracting`}
      className='text-sm sm:text-base font-light text-white bg-primaryBlue-900 hover:scale-105 hover:brightness-125 transition-all duration-300 rounded-md px-10 sm:px-14 md:px-28 py-2 text-center'>
      Agenda ahora
    </Link>
  )
}
