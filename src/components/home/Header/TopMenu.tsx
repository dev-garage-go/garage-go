import Link from 'next/link'
import Image from 'next/image';

import { CompanyFacebook, CompanyInstagram, } from '@/constants';

import { Instagram, Facebook, GarageGoLogo } from '@/assets';
import { WhatsAppButton } from '../Buttons/WhatsAppButton';
import { BookingButton } from '../Buttons/BookingButton';


export const TopMenu = () => {
  return (
    <div className="flex justify-between items-center p-4">
      {/* Company Logo */}
      <div className="flex justify-start">
        <Image
          src={GarageGoLogo}
          width={80}
          height={80}
          alt="Garage Go"
          className="object-contain w-20 sm:w-24"
        />
      </div>

      {/* Social networks */}
      <div className="hidden sm:flex justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={CompanyInstagram}
            className="text-primaryBlue-500 hover:opacity-80 rounded-lg"
          >
            <Image
              src={Instagram}
              width={10}
              height={10}
              alt="Instagram"
              className="w-5 h-5"
            />
          </Link>
          <Link
            href={CompanyFacebook}
            className="text-primaryBlue-500 hover:opacity-80 rounded-lg"
          >
            <Image
              src={Facebook}
              width={10}
              height={10}
              alt="Facebook"
              className="w-5 h-5"
            />
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
