import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io5";
import { CompanyWhatsappLink, CompanyPhoneNumber } from '@/features/home'

export const WhatsAppButton = () => {
  return (
    <a
      href={CompanyWhatsappLink}
      target="_blank"
      rel="noreferrer nofollow"
      className="btn-base-style bg-secundaryGreen-500 hover:bg-secundaryGreen-600 duration-300 shadow-sm"
    >
      <IoLogoWhatsapp
        size={20}
        className='text-white'
      />
      {CompanyPhoneNumber}
    </a>
  )
}
