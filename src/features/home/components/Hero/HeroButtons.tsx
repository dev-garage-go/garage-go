import Link from 'next/link'
import { CompanyWhatsappLink } from '@/features/home';

export const HeroButtons = () => {
  return (
    <>
      <button className="text-center px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-primaryPink-500 text-white rounded-lg hover:bg-primaryPink-700 transition-colors duration-300">
        Agenda ahora
      </button>
      <Link
        href={CompanyWhatsappLink}
        className='text-center px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-white text-secundaryGreen-500 border border-secundaryGreen-500 rounded-lg hover:bg-secundaryGreen-600 hover:border-secundaryGreen-600 hover:text-white transition-colors duration-300'>
        Chatea con nosotros
      </Link>
    </>
  )
}
