'use client'

import { CompanyWhatsappLink } from "@/constants"
import { usePathname, useRouter } from "next/navigation"

export const ServicePageButtons = () => {
  const baseClassBtn = 'flex justify-center text-sm sm:text-base items-center text-center py-2 px-6 sm:px-8 md:px-10 bg-white rounded-md border hover:text-white duration-300'

  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='flex sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full mt-6'>
      <button
        type='button'
        className={`${baseClassBtn} border-green-500 text-green-500 hover:border-green-600 hover:bg-green-600`}
        onClick={() => router.push(CompanyWhatsappLink)}
      >
        Tienes dudas
      </button>
      <button
        type='button'
        className={`${baseClassBtn} border-primaryBlue-500 text-primaryBlue-500 hover:border-primaryBlue-900 hover:bg-primaryBlue-900`}
        onClick={() => router.push(`${pathname}/checkout`)}
      >
        Agenda ahora
      </button>
    </div>
  )
}
