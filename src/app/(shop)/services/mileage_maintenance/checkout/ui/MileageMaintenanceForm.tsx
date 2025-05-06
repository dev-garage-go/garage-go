"use client"

import { useFormContext } from "react-hook-form";
import { formatNumberWithDots } from '@/utils';
import { MileageMaintenanceFormInputs } from "@/interfaces";
import { ErrorMessage } from "@/components";

export const MileageMaintenanceForm = () => {
  const { register, setValue, formState: { errors } } = useFormContext<MileageMaintenanceFormInputs>()

  return (
    <div className="border border-customGray-600 rounded-3xl w-full py-4 px-4 md:px-6 lg:px-10">
      <section className="flex flex-col gap-4">
        <h4 className="font-medium text-primaryBlue-900">1. Datos personales</h4>

        {/* Nombre y apellido */}
        <div className="input-form-container mt-4 md:mt-6">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Nombre
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.name ? "input-form-error" : "input-form"}`}
              {...register("name", { required: true })}
            />
            {errors.name && <ErrorMessage message="Se requiere su nombre" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Apellido
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.lastName ? "input-form-error" : "input-form"}`}
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <ErrorMessage message="Se requiere su apellido" className="mt-1 ml-2" />}
          </div>
        </div>

        {/* Telefono y correo  */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Telefono
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.phone ? "input-form-error" : "input-form"}`}
              {...register("phone", { required: true })}
            />
            {errors.phone && <ErrorMessage message="Se requiere su telefono" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Email
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.email ? "input-form-error" : "input-form"}`}
              {...register("email", { required: true })}
            />
            {errors.email && <ErrorMessage message="Se requiere su email" className="mt-1 ml-2" />}
          </div>
        </div>
      </section>

      {/* Formulario del vehiculo */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 md:mb-6 text-primaryBlue-900">2. Datos del vehiculo</h4>

        {/* Marca y modelo del auto  */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Marca
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.carBrand ? "input-form-error" : "input-form"}`}
              {...register("carBrand", { required: true })}
            />
            {errors.carBrand && <ErrorMessage message="Detalle la marca del vehiculo" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Modelo
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.carModel ? "input-form-error" : "input-form"}`}
              {...register("carModel", { required: true })}
            />
            {errors.carModel && <ErrorMessage message="Detalle el modelo del vehiculo" className="mt-1 ml-2" />}
          </div>
        </div>

        {/* Año y kilometraje  */}
        <div className="input-form-container">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Año
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.carYear ? "input-form-error" : "input-form"}`}
              {...register("carYear", { required: true })}
            />
            {errors.carYear && <ErrorMessage message="Detalle el año del vehiculo" className="mt-1 ml-2" />}
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Kilometraje
            </label>
            <input
              type="text"
              autoFocus
              className={`${errors.carKm ? "input-form-error" : "input-form"}`}
              {...register("carKm", {
                required: true,
                onChange: (e) => {
                  const raw = e.target.value;
                  const formatted = formatNumberWithDots(raw); // Set the value by putting points instead of 1200km put 1.200km.
                  setValue("carKm", formatted); // Update the value of input
                }
              })}
            />
            {errors.carKm && <ErrorMessage message="Detalle el kilometraje del vehiculo" className="mt-1 ml-2" />}
          </div>
        </div>
      </section>

      {/* Vehicle data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-end w-full bg-gray-100 rounded-2xl p-4 mt-10 mb-10 md:mb-20">
        <div className="flex flex-col">
          <p className="font-medium text-primaryBlue-900">TGPL67</p>
          <div className="flex justify-between w-full lg:hidden text-primaryBlue-500">
            <p className="text-gray-500">Haval H6 GT</p>
            <p>10.000 kms.</p>
          </div>

        </div>
        <div className="hidden lg:block">
          <p className="font-medium text-primaryBlue-500">10.000 kms.</p>
        </div>
        <div>
          <button className="text-xs mt-4 lg:mt-0 text-primaryBlue-500 hover:font-medium duration-200 transition-all">
            Ingresar otra patente
          </button>
        </div>
      </div>
    </div>
  )
}
