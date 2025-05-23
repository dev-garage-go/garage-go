'use client'

import Link from "next/link"
import { IoCheckmarkCircle, IoWarning } from "react-icons/io5"

interface Props {
  success: boolean
}

export const ConfirmationBookingModal = ({ success }: Props) => {
  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-primaryBlue-50 bg-opacity-90">
      <div className="flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10 rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 shadow-lg shadow-customGray-400 mx-4">

        {success ? (
          <>
            <div className="flex justify-start items-center">
              <IoCheckmarkCircle className="text-secundaryGreen-500 w-8 h-8" />
              <h2 className="title-h2 font-medium">¡Tu reserva ha sido confirmada!</h2>
            </div>

            <div className="w-full max-w-lg mt-6">
              <p className="text-center">Te mandamos un email a tu correo electronico confirmando todos los datos del servicio que contrataste
              </p>
              <p className="text-center mt-4 font-medium text-primaryBlue-300">¡Gracias por confiar en nosotros!
              </p>

              <div className="flex justify-center items-center w-full mt-6">
                <Link
                  href={"/services"}
                  className="primary-button max-w-40 text-center"
                >
                  Continuar
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-start items-center">
              <IoWarning className="text-yellow-600 w-8 h-8" />
              <h2 className="title-h2 font-medium">Oops... Algo salió mal</h2>
            </div>

            <div className="w-full max-w-lg mt-6">
              <p className="text-center">Lamentamos los inconvenientes, le recomendamos que vuelva a intentar hacer su reserva o pongase en contacto con nosotros
              </p>


              <div className="flex justify-center items-center w-full mt-6">
                <Link
                  href={"/services"}
                  className="primary-button max-w-40 text-center"
                >
                  Continuar
                </Link>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
