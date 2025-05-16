'use client'

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "./ErrorMessage"

import { useLicensePlateContext } from "@/contexts"
import { VehicleModalForm } from "@/interfaces"
import { allowOnlyNumbers, formatNumberWithDots } from "@/utils"

interface Props {
  setClose: React.Dispatch<boolean>
}

export const LicensePlateModal = ({ setClose }: Props) => {
  const { register, watch, formState: { errors }, setValue, handleSubmit } = useForm<VehicleModalForm>()
  const licensePlate = watch("licensePlate")

  const [vehicleDataFounded, setVehicleDataFounded] = useState<boolean>(true)
  const [showModalToCompleteData, setShowModalToCompleteData] = useState<boolean>(true) // default value must be: false
  const { setLicensePlateInStorage, setVehicleDataInStorage } = useLicensePlateContext()

  /* TODO:
    const getVehicleDataByLicensePlate = (value: string) => {
    try{
      setVehicleDataInStorage(data)
    } catch (error) {
      mostrar algo al usuario en la UI
      console.log(error)
      setVehicleDataFounded(false)
     }
    }
  */

  useEffect(() => {
    if (!vehicleDataFounded) {
      setShowModalToCompleteData(true)
    }
  }, [vehicleDataFounded])


  const onSumbit = (data: VehicleModalForm) => {
    if (vehicleDataFounded && licensePlate) {
      setLicensePlateInStorage(licensePlate.toLocaleUpperCase())
      setClose(false)
      return
    } else if (!vehicleDataFounded) {
      setVehicleDataInStorage(data)
      setClose(false)
    }
  }

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = allowOnlyNumbers(e.target.value)
    setValue("year", formatted)
  }

  const handleMileage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithDots(e.target.value)
    setValue("mileage", formatted)
  }

  return (
    <>
      {!showModalToCompleteData ? (
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
          <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-90">
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
                    <div className="flex gap-4 justify-center items-center w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="licensePlate" className="text-sm text-customGray-500 w-full cursor-pointer">
                          <p className="ml-2">Patente</p>
                        </label>
                        <input
                          id="licensePlate"
                          minLength={6}
                          maxLength={6}
                          type="text"
                          className="input-form uppercase"
                          {...register("licensePlate", {
                            required: true,
                            minLength: { value: 4, message: "Debe tener 6 digitos" },
                            maxLength: { value: 6, message: "Debe tener 6 digitos" }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Brand and model */}
                  <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                    <div className="flex gap-4 justify-center items-center w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="brand" className="text-sm text-customGray-500 w-full cursor-pointer" >
                          <p className="ml-2">Marca</p>
                        </label>
                        <input
                          id="brand"
                          minLength={3}
                          type="text"
                          className="input-form uppercase"
                          {...register("brand", {
                            required: true,
                            minLength: { value: 3, message: "Debe tener 3 cifras" }
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="model" className="text-sm text-customGray-500 w-full cursor-pointer">
                          <p className="ml-2">Modelo</p>
                        </label>
                        <input
                          id="model"
                          minLength={2}
                          type="text"
                          className="input-form uppercase"
                          {...register("model", {
                            required: true,
                            minLength: { value: 2, message: "Debe tener 2 cifras" }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Year and mileage */}
                  <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                    <div className="flex gap-4 justify-center items-center w-full">

                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="year" className="text-sm text-customGray-500 w-full cursor-pointer" >
                          <p className="ml-2">Año</p>
                        </label>
                        <input
                          id="year"
                          inputMode="numeric"
                          minLength={4}
                          maxLength={4}
                          type="text"
                          className="input-form uppercase appearance-none"
                          {...register("year", {
                            required: true,
                            minLength: { value: 4, message: "Debe tener 4 cifras" },
                            maxLength: { value: 4, message: "Debe tener 4 cifras" },
                            onChange: handleYear
                          })}
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="mileage" className="text-sm text-customGray-500 w-full cursor-pointer">
                          <p>Kilometros</p>
                        </label>
                        <input
                          id="mileage"
                          inputMode="numeric"
                          minLength={3}
                          maxLength={7}
                          type="text"
                          className="input-form uppercase appearance-none"
                          {...register("mileage", {
                            required: true,
                            minLength: { value: 3, message: "Debe tener 3 cifras" },
                            maxLength: { value: 4, message: "El maximo son 7 cifras" },
                            onChange: handleMileage
                          })}
                        />
                      </div>

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
