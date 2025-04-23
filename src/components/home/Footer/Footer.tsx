import Link from "next/link"
import Image from 'next/image'

import { GarageGoLogoFooter, MediosPago, TelefonoBlanco } from '@/assets';
import {
  CompanyEmail,
  CompanyEmailLink,
  CompanyFacebook,
  CompanyHoursOperations,
  CompanyInstagram,
  CompanyWhatsappLink,
  CompanyPhoneNumber
} from '@/constants';
import { IoArrowForward, IoCall, IoLogoFacebook, IoLogoInstagram, IoMailSharp } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer>
      <div className='flex justify-center bg-primaryBlue-900 text-white p-8'>
        <div className="grid grid-cols-3 w-full mx-40 my-20">

          {/* Fist column */}
          <div className="relative w-full max-w-xs h-28 mb-20">
            <Image
              src={GarageGoLogoFooter}
              alt="Descripción"
              fill
              className="object-contain"
            />
          </div>

          <section className='col-start-1 col-end-2'>
            {/* Texts */}
            <div className="flex flex-col">
              <p className="text-base">
                Cordillera 580, Salida Lo Boza Pudahuel.
              </p>

              {/* Btns to contact */}
              <div className="flex flex-col justify-start items-start mt-10">
                <Link
                  href={CompanyWhatsappLink}
                  className="cursor-pointer hover:underline text-base flex justify-center items-center gap-2 px-4 py-2">
                  <IoCall
                    size={20}
                  />
                  <p className="text-base">
                    {CompanyPhoneNumber}
                  </p>
                </Link>

                <Link
                  href={CompanyEmailLink}
                  className="cursor-pointer hover:underline flex justify-center items-center gap-2 px-4 py-2">
                  <IoMailSharp
                    size={20}
                  />
                  <p className="text-base">
                    {CompanyEmail}
                  </p>
                </Link>
              </div>

              <div className="mt-10">
                <p className="text-base">
                  Horario de atencion
                </p>
                <p className="text-base">
                  {CompanyHoursOperations}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-10 w-full max-w-64">
              <button className="font-light flex gap-2 items-center justify-center py-2 border border-white rounded">
                Politicas de privacidad
                <IoArrowForward />
              </button>
              <button className="font-light flex gap-2 items-center justify-center py-2 border border-white rounded">
                Terminos y condiciones
                <IoArrowForward />
              </button>
            </div>

            {/* Payment method */}
            <div className="relative mt-20 w-full h-20">
              <Image
                src={MediosPago}
                fill
                alt="medios de pago"
                className="object-contain"
              />
            </div>

          </section>

          <section className="col-start-2 col-end-3 justify-between items-center">
            <p>Siguenos en nuestras redes sociales</p>
            <div className="flex flex-col gap-4 items-start justify-start mt-10">
              <button className="flex items-center justify-center gap-2 hover:underline cursor-pointer">
                <IoLogoInstagram
                  size={20}
                />
                <p>Instagram</p>
              </button>
              <button className="flex items-center justify-center gap-2 hover:underline cursor-pointer">
                <IoLogoFacebook
                  size={20}
                />
                <p>Facebook</p>
              </button>
            </div>
          </section>

          <section className="col-start-3 col-end-4">
            <form className="flex flex-col justify-center w-full gap-4 max-w-md">
              <p>Escribenos y uno de nuestros ejecutivos resolvera tus dudas</p>

              <input
                className="rounded h-10"
                type="text" />
              <input
                className="rounded h-10"
                type="text" />
              <textarea name="description"
                className="rounded h-40 "
                placeholder=""
                id="">
              </textarea>

              <button
                className="w-full p-3 bg-primaryPink-500 rounded mt-5">
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* Bottom section of footer */}
      <section className='bg-white text-center text-black py-4 border-t border-gray-300'>
        <p>©2019 - 2025 Garage Go. Todos los derechos reservados.</p>
      </section>
    </footer>
  )
}
