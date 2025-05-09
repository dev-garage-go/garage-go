'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CompanyWhatsappLink } from "@/constants"

export const ServicePageButtons = () => {
  const pathname = usePathname()
  const baseClassBtn = 'flex justify-center text-sm sm:text-base items-center text-center py-2 px-6 sm:px-8 md:px-10 bg-white rounded-md border hover:text-white duration-300'

  return (
    <div className='flex sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full mt-6'>
      <Link
        href={CompanyWhatsappLink}
        className={`${baseClassBtn} border-secundaryGreen-500 text-secundaryGreen-500 hover:border-secundaryGreen-600 hover:bg-secundaryGreen-600`}
      >
        Tienes dudas
      </Link>
      <Link
        className={`${baseClassBtn} border-primaryBlue-500 text-primaryBlue-500 hover:border-primaryBlue-900 hover:bg-primaryBlue-900`}
        href={`${pathname}/contracting`}
      >
        Agenda ahora
      </Link>
    </div>
  )
}
