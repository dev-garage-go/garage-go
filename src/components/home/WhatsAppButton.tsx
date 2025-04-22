import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io5";
import { CompanyWhatsappLink, CompanyWhatsappNumber } from '@/constants'

export const WhatsAppButton = () => {
  return (
    <Link
      href={CompanyWhatsappLink}
      target="_blank"
      className="btn-base-style bg-green-500 hover:bg-green-600 shadow-sm"
    >
      <IoLogoWhatsapp
        size={20}
        className='text-white'
      />
      {CompanyWhatsappNumber}
    </Link>
  )
}
