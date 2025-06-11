'use client'

import clsx from "clsx"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage, Select } from "@/components"

import { useVehicleContext, VehicleDataInterface, VehicleTypeOptions, vehicleTypes } from "@/features/vehicle"
import { allowOnlyNumbers, formatNumberWithDots } from "@/utils"

import { addNewVehicle, getVehicleByLicensePlate } from "@/backend/actions"

export const VehicleDataModal = () => {
  const { register, formState: { errors }, watch, setValue, handleSubmit } = useForm<VehicleDataInterface>()
  const {
    setVehicleInStorage,
    setCreatingVehicleAnimation,
    setSearchingVehicleAnimation,
    searchingVehicleAnimation,
    creatingVehicleAnimation
  } = useVehicleContext()

  // states
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [showFormToCompleteData, setShowFormModalToCompleteData] = useState<boolean>(false) // if the backend not found a vehicle in database, open the form to fill fields with a new car

  // wathing
  const typeVehicle = watch("type")

  // delays the state change by a few ms, so that the DOM can load the css classes and generate an animation.
  useEffect(() => {
    setIsMounted(true)
    const timeout = setTimeout(() => setIsVisible(true), 20)
    return () => clearTimeout(timeout)
  }, [])

  // animates the close of modal
  const handleClose = () => {
    setIsMounted(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  const onSumbit = async (data: VehicleDataInterface) => {
    try {
      setSearchingVehicleAnimation(true)
      const response = await getVehicleByLicensePlate(data.licensePlate)
      if (!response.success) throw new Error(response.error)
      const vehicleFounded = response.data

      if (vehicleFounded) {
        // vehicle founded in database
        setVehicleInStorage(vehicleFounded)
        setSearchingVehicleAnimation(false)
        handleClose()
        return

      } else if (!vehicleFounded && !showFormToCompleteData) {
        // doesn't exist vehicle in database, show form modal
        setShowFormModalToCompleteData(true)
        return

      } else if (!vehicleFounded && showFormToCompleteData) {
        // doesn't exist vehicle in database, send the new car data to backend and set in storage
        setCreatingVehicleAnimation(true)
        const response = await addNewVehicle(data)

        if (!response.success) throw new Error(response.error)

        setVehicleInStorage(response.data!)
        setCreatingVehicleAnimation(false)
        handleClose()
        return
      }

    } catch (error) {
      console.error(error)
    }
  }


  // form formatters
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = allowOnlyNumbers(e.target.value)
    setValue("year", formatted)
  }

  const handleMileage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithDots(e.target.value)
    setValue("mileage", formatted)
  }

  if (!isMounted) return null

  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-black/20">
      <div className={clsx(
        "flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10 rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 mx-4 transition-all duration-300 ease-out",
        {
          "max-w-xl xl:max-w-3xl max-h-[600px]": showFormToCompleteData,
          "opacity-0 scale-50": !isVisible,
          "opacity-100 scale-100": isVisible
        }
      )}>

        {!showFormToCompleteData ? (
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
                  {
                    searchingVehicleAnimation ? (
                      <div className="flex justify-center items-center gap-2">
                        <div className="loader" />
                        Buscando...
                      </div>
                    ) : "Continuar"
                  }
                </button>
              </div>
            </div>

            <p className="hidden sm:block text-primaryBlue-500 w-full text-start text-xs ml-6 mt-1">Vehiculo y versión</p>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSumbit)}
            className="flex flex-col gap-6 justify-center items-center"              >
            <h4 className="title-h4 text-xl text-center">Ingresa los datos de tu vehiculo</h4>
            <p className="text-sm text-center">
              No hemos podido encontrar los datos de tu vehiculo, por favor ingresalos
              para que podamos realizar la cotización del servicio
            </p>

            <div className="flex flex-col justify-center items-center w-full gap-4">
              {/* License plate */}
              <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                <div className="flex gap-4 justify-center items-center w-full">
                  <div className="flex flex-col gap-1 w-full">
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
                        minLength: { value: 6, message: "Debe tener 6 digitos" },
                        maxLength: { value: 6, message: "Debe tener 6 digitos" }
                      })}
                    />
                    {errors.licensePlate && (
                      <ErrorMessage message={errors.licensePlate.message || 'Requerido'} />
                    )}
                  </div>
                </div>
              </div>

              {/* Brand and model */}
              <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                <div className="flex gap-4 justify-center items-center w-full">
                  <div className="flex flex-col gap-1 w-full">
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
                    {errors.brand && (
                      <ErrorMessage message={errors.brand.message || 'Requerido'} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full">
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
                    {errors.model && (
                      <ErrorMessage message={errors.model.message || 'Requerido'} />
                    )}
                  </div>
                </div>
              </div>

              {/* Year and mileage */}
              <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                <div className="flex gap-4 justify-center items-center w-full">

                  <div className="flex flex-col gap-1 w-full">
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
                    {errors.year && (
                      <ErrorMessage message={errors.year.message || 'Requerido'} />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-full">
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
                        maxLength: { value: 7, message: "El maximo son 7 cifras" },
                        onChange: handleMileage
                      })}
                    />
                    {errors.mileage && (
                      <ErrorMessage message={errors.mileage.message || 'Requerido'} />
                    )}
                  </div>

                </div>
              </div>

              {/* Type of vehicle */}
              <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full">
                <div className="flex gap-4 justify-center items-center w-full">

                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="year" className="text-sm text-customGray-500 w-full cursor-pointer" >
                      <p className="ml-2">Tipo</p>
                    </label>
                    <Select
                      value={typeVehicle}
                      defaultValue={"Seleccione"}
                      options={VehicleTypeOptions}
                      onChange={(value) => setValue("type", value as vehicleTypes)}
                    />
                    {errors.type && (
                      <ErrorMessage message={errors.type.message || 'Requerido'} />
                    )}
                  </div>

                  {/* Empty div */}
                  <div className="flex flex-col gap-1 w-full" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="primary-button sm:max-w-40 h-full">
              {
                creatingVehicleAnimation ? (
                  <div className="flex justify-center items-center gap-2">
                    <div className="loader" />
                    Procesando...
                  </div>
                ) : "Continuar"
              }
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
