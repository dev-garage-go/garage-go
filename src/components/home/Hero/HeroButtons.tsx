import Link from 'next/link'
import { CompanyWhatsappLink } from '@/constants';

export const HeroButtons = () => {
  return (
    <>
      <button className="text-center px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
        Agenda ahora
      </button>
      <Link
        href={CompanyWhatsappLink}
        className='text-center px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-white text-green-500 border border-green-500 rounded-lg hover:bg-green-50 transition-colors'>
        Chatea con nosotros
      </Link>
    </>
  )
}
