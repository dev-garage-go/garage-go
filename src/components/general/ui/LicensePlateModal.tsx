'use client'

import { useForm } from "react-hook-form"
import { ErrorMessage } from "./ErrorMessage"
import { useLicensePlateContext } from "@/contexts"
import { useState } from "react"
import { VehicleModalForm } from "@/interfaces"

interface Props {
  setClose: React.Dispatch<boolean>
}

export const LicensePlateModal = ({ setClose }: Props) => {
  const { register, watch, formState: { errors }, handleSubmit } = useForm<VehicleModalForm>()
  const licensePlate = watch("licensePlate")

  const [vehicleDataFounded, setVehicleDataFounded] = useState<boolean>(false)
  const { setLicensePlateInStorage, setVehicleDataInStorage } = useLicensePlateContext()

  const onSumbit = (data: VehicleModalForm) => {
    if (vehicleDataFounded && licensePlate) {
      setLicensePlateInStorage(licensePlate.toLocaleUpperCase())
      setClose(false)
      return
    } else if (!vehicleDataFounded) {
      console.log(data)
      setVehicleDataInStorage(data)
    }
  }


  return (
    <>
      {vehicleDataFounded ? (
        <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-90">
          <div className="flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10
       rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 shadow-lg shadow-customGray-400 mx-4">

            <form
              onSubmit={handleSubmit(onSumbit)}
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
      ) : (
        <div>
          <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-blue-200 bg-opacity-90">
            <div className="flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10
       rounded-2xl w-full h-full max-w-2xl max-h-[500px] bg-opacity-100 shadow-lg shadow-customGray-400 mx-4">

              <form
                onSubmit={handleSubmit(onSumbit)}
                className="flex flex-col gap-6 justify-center items-center"
              >
                <h4 className="title-h4 text-xl text-center">Ingresa los datos de tu vehiculo</h4>
                <p className="text-sm text-center">
                  No hemos podido encontrar los datos de tu vehiculo, por favor ingresalos
                  para que podamos realizar la cotización del servicio
                </p>

                <div className="flex flex-col justify-center items-center w-full gap-4">
                  {errors.licensePlate && (
                    <ErrorMessage message={"Escriba la patente de su vehiculo"} className="mb-1" />
                  )}

                  {/* License plate */}
                  <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                    <div className="flex gap-2 justify-center items-center bg-orange-100 w-full">
                      <label className="text-sm text-customGray-500 w-full">
                        Patente
                        <input
                          minLength={6}
                          maxLength={6}
                          type="text"
                          className="input-form uppercase"
                          {...register("licensePlate", { required: true, minLength: 6, maxLength: 6 })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Brand and model */}
                  <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                    <div className="flex gap-2 justify-center items-center bg-orange-100 w-full">
                      <label className="text-sm text-customGray-500 w-full">
                        Marca
                        <input
                          minLength={3}
                          type="text"
                          className="input-form uppercase"
                          {...register("brand", { required: true, minLength: 3 })}
                        />
                      </label>
                      <label className="text-sm text-customGray-500 w-full">
                        Modelo
                        <input
                          minLength={2}
                          type="text"
                          className="input-form uppercase"
                          {...register("model", { required: true, minLength: 2 })}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Year and mileage */}
                  <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                    <div className="flex gap-2 justify-center items-center bg-orange-100 w-full">
                      <label className="text-sm text-customGray-500 w-full">
                        Año
                        <input
                          min={1960}
                          max={2025}
                          minLength={4}
                          maxLength={4}
                          type="number"
                          className="input-form uppercase appearance-none"
                          {...register("year", { required: true, minLength: 4, maxLength: 4 })}
                        />
                      </label>
                      <label className="text-sm text-customGray-500 w-full">
                        Kilometros
                        <input
                          min={500}
                          max={1000000}
                          minLength={3}
                          maxLength={7}
                          type="number"
                          className="input-form uppercase appearance-none"
                          {...register("mileage", { required: true, minLength: 3, maxLength: 7 })}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="primary-button sm:max-w-40 h-full">
                  Continuar
                </button>

              </form>
            </div>
          </div>
        </div>
      )
      }
    </>

  )
}
