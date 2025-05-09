'use client'

import { useForm } from "react-hook-form"
import { ErrorMessage } from "./ErrorMessage"

interface ModalInputs {
  licensePlate: string
}
interface Props {
  isOpen: boolean
  setClose: React.Dispatch<boolean>
}

export const LicensePlateModal = ({ isOpen, setClose }: Props) => {
  const { register, watch, formState: { errors }, handleSubmit } = useForm<ModalInputs>()
  const licensePlate = watch("licensePlate")

  const onCloseModal = () => {
    if (licensePlate != '') {
      sessionStorage.setItem("licensePlate", licensePlate.toLocaleUpperCase())
      setClose(false)
      return
    }
  }

  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-90">
      <div className="flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10
       rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 shadow-lg shadow-customGray-400 mx-4">

        <form
          onSubmit={handleSubmit(onCloseModal)}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <h4 className="title-h4 text-xl">Ingresa tu patente</h4>
          <p className="text-sm text-center">
            Con tu patente definimos modelo, versión y pauta de servicio según fabricante.
          </p>

          <div className="w-full">
            {errors.licensePlate && (
              <ErrorMessage message={"Escriba la patente de su vehiculo"} className="mb-1" />
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <input
                minLength={6}
                maxLength={6}
                type="text"
                className="input-form uppercase"
                {...register("licensePlate", { required: true, minLength: 6, maxLength: 6 })}
              />
              <button
                type="submit"
                className="primary-button sm:max-w-40 h-full">
                Continuar
              </button>
            </div>
          </div>

        </form>
        <p className="hidden sm:block text-primaryBlue-500 w-full text-start text-xs ml-6 mt-1">Vehiculo y versión</p>
      </div>
    </div>
  )
}
