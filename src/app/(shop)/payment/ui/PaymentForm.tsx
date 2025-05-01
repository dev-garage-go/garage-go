"use client"

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { formatNumberWithDots } from '@/utils';

type FormInputs = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  carBrand: string;
  carModel: string;
  carKm: string;
  carYear: number;
}

export const PaymentForm = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  // Funcion que se ejecuta al enviar el formulario
  const onSumbit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <form
      className="border border-gray-900 rounded-3xl w-full py-4 px-4 md:px-6 lg:px-10"
      onSubmit={handleSubmit(onSumbit)}
    >
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
              className={clsx("input-form", { "border-red-400": errors.name })}
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Apellido
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("input-form", { "border-red-400": errors.lastName })}
              {...register("lastName", { required: true })}
            />
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
              className={clsx("input-form", { "border-red-400": errors.phone })}
              {...register("phone", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Email
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("input-form", { "border-red-400": errors.email })}
              {...register("email", { required: true })}
            />
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
              className={clsx("input-form", { "border-red-400": errors.carBrand })}
              {...register("carBrand", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Modelo
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("input-form", { "border-red-400": errors.carBrand })}
              {...register("carModel", { required: true })}
            />
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
              className={clsx("input-form", { "border-red-400": errors.carYear })}
              {...register("carYear", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-4 lg:ml-6">
              Kilometraje
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("input-form", { "border-red-400": errors.carKm })}
              {...register("carKm", {
                required: true,
                onChange: (e) => {
                  const raw = e.target.value;
                  const formatted = formatNumberWithDots(raw); // Set the value by putting points instead of 1200km put 1.200km.
                  setValue("carKm", formatted); // Update the value of input
                }
              })}
            />
          </div>
        </div>
      </section>

      {/* Vehicle data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-end w-full bg-gray-100 rounded-2xl p-4 mt-10 mb-20">
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
    </form>
  )
}
