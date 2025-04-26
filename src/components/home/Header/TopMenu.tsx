import Link from 'next/link'
import Image from 'next/image';

import { CompanyFacebook, CompanyInstagram, } from '@/constants';

import { Instagram, Facebook, GarageGoLogo } from '@/assets';
import { WhatsAppButton } from '../Buttons/WhatsAppButton';
import { BookingButton } from '../Buttons/BookingButton';


export const TopMenu = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4">
      {/* Company Logo */}
      <Link
        href={'/'}
        className="relative h-8 w-20 sm:w-28 sm:h-10 flex justify-start"
      >
        <Image
          src={GarageGoLogo}
          fill
          priority
          alt="Garage Go"
          className="object-contain w-auto h-auto"
        />
      </Link>

      {/* Social networks */}
      <div className="hidden sm:flex justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={CompanyInstagram}
            className="text-primaryBlue-500 hover:opacity-80 rounded-lg"
          >
            <div className='relative w-4 h-4 md:w-5 md:h-5'>
              <Image
                src={Instagram}
                fill
                alt="Instagram"
                className="object-contain w-auto h-auto"
              />
            </div>
          </Link>
          <Link
            href={CompanyFacebook}
            className="text-primaryBlue-500 hover:opacity-80 rounded-lg"
          >
            <div className='relative w-4 h-4 md:w-5 md:h-5'>
              <Image
                src={Facebook}
                fill
                alt="Facebook"
                className="object-contain w-auto h-auto"
              />
            </div>
          </Link>
        </div>

        {/* Whatsapp and booking btns */}
        <div className="flex flex-wrap justify-center gap-4">
          <WhatsAppButton />
          <BookingButton />
        </div>
      </div>
    </div>
  )
}
