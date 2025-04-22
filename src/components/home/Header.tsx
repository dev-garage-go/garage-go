"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IoCloseCircle, IoReorderThreeOutline } from "react-icons/io5";

import { Instagram, Facebook, GarageGoLogo } from '@/assets';
import { useState } from 'react'
import { HeaderOption } from './HeaderOption';
import {
  CompanyFacebook,
  CompanyInstagram,
  CompanyWhatsappLink,
  HeaderLinksOptions
} from '@/constants';
import { WhatsAppButton } from './WhatsAppButton';
import { BookingButton } from './BookingButton';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <header className="relative flex justify-center min-w-screen bg-white">
      <div className="shadow-md w-full">
        <section>
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
        </section>

        {/* Navbar with options */}
        <nav className="bg-primaryBlue-500">
          {/* Hamburger menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className='block sm:hidden px-4 py-3  items-center'
          >
            <IoReorderThreeOutline
              size={26}
              className='text-white'
            />
          </button>

          {/* Links menu - Desktop */}
          <div className="hidden sm:flex justify-between items-center">
            <ul className="w-full bg-primaryBlue-500 flex justify-center items-center">
              <HeaderOption
                options={HeaderLinksOptions}
              />
            </ul>
          </div>

          {/* Sidebar - mobile */}
          {menuOpen && (
            <aside className='absolute top-0 w-full min-h-screen z-20 bg-white'>
              <button
                className='w-full h-full bg-blue-200'
                onClick={() => setMenuOpen(false)}
              >
                <IoCloseCircle
                  size={30}
                  className='absolute right-4 top-4 text-neutral-800'
                />
              </button>

              <ul className="flex-col sm:hidden mt-20">
                <HeaderOption
                  mobile
                  options={HeaderLinksOptions}
                />
              </ul>

              {/* Whatsapp and booking buttons */}
              <div className='flex gap-3 justify-center items-center h-fit mt-20'>
                <WhatsAppButton />
                <BookingButton />
              </div>
            </aside>
          )}
        </nav>

      </div>
    </header >
  );
};