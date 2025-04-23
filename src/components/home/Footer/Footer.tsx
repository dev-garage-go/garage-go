import Link from "next/link"
import Image from 'next/image'

import { GarageGoLogoFooter, MediosPago } from '@/assets';
import { IoArrowForward, IoCall, IoLogoFacebook, IoLogoInstagram, IoMailSharp } from "react-icons/io5";
import {
  CompanyEmail,
  CompanyEmailLink,
  CompanyFacebook,
  CompanyHoursOperations,
  CompanyInstagram,
  CompanyWhatsappLink,
  CompanyPhoneNumber,
  CompanyAddress,
  CompanyCopyRight
} from '@/constants';

export const Footer = () => {
  return (
    <footer>
      <div className='flex justify-center bg-primaryBlue-900 text-white p-6 xl:p-8'>
        <div className="flex flex-col justify-start items-start sm:grid sm:grid-cols-3 w-full my-5 sm:mx-5 sm:my-10 xl:mx-40 xl:my-20">

          {/* Garage Go image */}
          <div className="relative w-full max-w-48 sm:max-w-xs h-10 sm:h-16 md:h-28 mb-10 xl:mb-20">
            <Image
              src={GarageGoLogoFooter}
              alt="Descripción"
              fill
              className="object-contain"
            />
          </div>

          <section className='sm:col-start-1 sm:col-end-2'>
            {/* Texts */}
            <div className="flex flex-col">
              <p className="text-sm xl:text-base">
                {CompanyAddress}
              </p>

              {/* Btns to contact */}
              <div className="flex flex-col justify-start items-start mt-6 sm:mt-10">
                <Link
                  rel="noopener noreferrer"
                  href={CompanyWhatsappLink}
                  target="_blank"
                  className="text-sm xl:text-base cursor-pointer hover:underline flex justify-center items-center gap-2 px-4 py-2">
                  <IoCall
                    size={20}
                    className="w-4 h-4 xl:h-5 xl:w-5"
                  />
                  <p className="text-sm xl:text-base">
                    {CompanyPhoneNumber}
                  </p>
                </Link>

                <Link
                  rel="noopener noreferrer"
                  href={CompanyEmailLink}
                  target="_blank"
                  className="bg-red-200  cursor-pointer hover:underline flex justify-center items-center gap-2 px-4 py-2">
                  <IoMailSharp
                    size={20}
                    className="w-4 h-4 xl:h-5 xl:w-5"
                  />
                  <p className="text-sm xl:text-base">
                    {CompanyEmail}
                  </p>
                </Link>
              </div>

              <div className="mt-6 sm:mt-10">
                <p className="text-sm xl:text-base">
                  Horario de atencion
                </p>
                <p className="text-sm xl:text-base">
                  {CompanyHoursOperations}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-2 mt-6 sm:mt-10 w-full max-w-52 sm:max-w-64">
              <button className="text-sm xl:text-base font-light flex gap-2 items-center justify-center py-2 border border-white rounded">
                Politicas de privacidad
                <IoArrowForward
                  size={20}
                  className="w-4 h-4 xl:h-5 xl:w-5"
                />
              </button>
              <button className="text-sm xl:text-base font-light flex gap-2 items-center justify-center py-2 border border-white rounded">
                Terminos y condiciones
                <IoArrowForward
                  size={20}
                  className="w-4 h-4 xl:h-5 xl:w-5"
                />
              </button>
            </div>

            {/* Payment method */}
            <div className="relative mt-6 sm:mt-10 xl:mt-20 w-full h-20">
              <Image
                src={MediosPago}
                fill
                alt="medios de pago"
                className="object-contain"
              />
            </div>
          </section>

          {/* Mobile divisor */}
          <div className="h-0.5 w-full rounded bg-white opacity-30 mt-4 mb-10 sm:hidden" />

          <section className="sm:col-start-2 col-end-3 justify-between items-center">
            <p className="text-sm xl:text-base">
              Siguenos en nuestras redes sociales
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 items-start justify-start mt-6 sm:mt-10">
              <Link
                rel="noopener noreferrer"
                href={CompanyInstagram}
                target="_blank"
                className="flex items-center justify-center gap-2 hover:underline cursor-pointer">
                <IoLogoInstagram
                  size={20}
                  className="w-4 h-4 xl:h-5 xl:w-5"
                />
                <p className="text-sm xl:text-base">
                  Instagram
                </p>
              </Link>
              <Link
                rel="noopener noreferrer"
                href={CompanyFacebook}
                target="_blank"
                className="flex items-center justify-center gap-2 hover:underline cursor-pointer">
                <IoLogoFacebook
                  size={20}
                  className="w-4 h-4 xl:h-5 xl:w-5"
                />
                <p className="text-sm xl:text-base">
                  Facebook
                </p>
              </Link>
            </div>
          </section>

          {/* Mobile divisor */}
          <div className="h-0.5 w-full rounded bg-white opacity-30 my-10 sm:hidden" />

          <section className="sm:col-start-3 sm:col-end-4">
            <form className="flex flex-col justify-center w-full gap-4 max-w-md">
              <p className="text-sm xl:text-base">
                Escribenos y uno de nuestros ejecutivos resolvera tus dudas
              </p>

              <input
                className="text-sm xl:text-base rounded h-8 xl:h-10"
                type="text" />
              <input
                className="text-sm xl:text-base rounded h-8 xl:h-10"
                type="text" />
              <textarea name="description"
                className="text-sm xl:text-base rounded h-32 xl:h-40 "
                placeholder=""
                id="">
              </textarea>

              <button
                className="text-sm xl:text-base w-full p-2 xl:p-3 bg-primaryPink-500 rounded mt-5">
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* Bottom section of footer */}
      <section className='bg-white text-center text-black p-4 border-t border-gray-300'>
        <p className="text-sm xl:text-base">
          {CompanyCopyRight}
        </p>
      </section>
    </footer>
  )
}
