"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Instagram, Facebook, GarageGoLogo } from '@/assets';
import { CompanyWhatsappLink } from '@/constants';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonBaseStyle = "flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm";

  return (
    <div className="flex justify-center w-full bg-white">
      <header className="shadow-md w-full max-w-7xl">
        <div className="bg-white py-3">
          <div className="flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
            <div className="w-full md:w-auto flex justify-center md:justify-start">
              <Image
                src={GarageGoLogo}
                width={32}
                height={32}
                alt="Garage Go"
                className="h-8"
              />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center gap-4">
                <Link href="#" className="text-primaryBlue-500 hover:opacity-80 rounded-lg">
                  <Image
                    src={Instagram}
                    width={10}
                    height={10}
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                </Link>
                <Link href="#" className="text-primaryBlue-500 hover:opacity-80 rounded-lg">
                  <Image
                    src={Facebook}
                    width={10}
                    height={10}
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={CompanyWhatsappLink}
                  target="_blank"
                  className={`${buttonBaseStyle} bg-green-500 hover:bg-green-600 shadow-sm`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  +56 9 9783 2409
                </Link>
                <button className={`${buttonBaseStyle} bg-primaryBlue-500 hover:opacity-90 shadow-sm`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 2.25h.75a.75.75 0 01.75.75v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H3.75a3 3 0 01-3-3V7.5a3 3 0 013-3h.75V3a.75.75 0 01.75-.75H6.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                  Agenda en línea
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className="bg-primaryBlue-500">
          <div className="flex justify-between items-center">
            <button
              className="md:hidden text-white p-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto absolute md:relative left-0 top-full md:top-auto bg-[#2D31FA] md:bg-transparent z-50`}>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Inicio</Link></li>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Servicios</Link></li>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Herramientas</Link></li>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Pick&delivery</Link></li>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Servicio empresas</Link></li>
              <li><Link href="#" className="text-white px-4 py-3 block hover:bg-[#2428c8] text-center transition-colors">Blog</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;