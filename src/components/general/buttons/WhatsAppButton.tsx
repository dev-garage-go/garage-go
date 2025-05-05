import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io5";
import { CompanyWhatsappLink, CompanyPhoneNumber } from '@/constants'

export const WhatsAppButton = () => {
  return (
    <Link
      href={CompanyWhatsappLink}
      target="_blank"
      className="btn-base-style bg-secundaryGreen-500 hover:bg-secundaryGreen-600 duration-300 shadow-sm"
    >
      <IoLogoWhatsapp
        size={20}
        className='text-white'
      />
      {CompanyPhoneNumber}
    </Link>
  )
}
