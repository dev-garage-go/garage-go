"use client"

import clsx from "clsx";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  carBrand: string;
  carModel: string;
  carKm: number;
  carYear: number;
}

export const MileageMaintenanceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  // Funcion que se ejecuta al enviar el formulario
  const onSumbit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <form
      className="border border-gray-900 rounded-3xl w-full py-4 px-10"
      onSubmit={handleSubmit(onSumbit)}
    >
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mb-6">1. Datos personales</h4>

        {/* Nombre y apellido */}
        <div className="flex w-full justify-between items-start gap-4">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Nombre
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.name
                }
              )}
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Apellido
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.lastName
                }
              )}
              {...register("lastName", { required: true })}
            />
          </div>
        </div>

        {/* Telefono y correo  */}
        <div className="flex w-full justify-between items-start gap-4">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Telefono
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.phone
                }
              )}
              {...register("phone", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Email
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.email
                }
              )}
              {...register("email", { required: true })}
            />
          </div>
        </div>
      </section>

      {/* Formulario del vehiculo */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-10 mb-6">2. Datos del vehiculo</h4>

        {/* Marca y modelo del auto  */}
        <div className="flex w-full justify-between items-start gap-4">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Marca
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.carBrand
                }
              )}
              {...register("carBrand", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Modelo
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.carBrand
                }
              )}
              {...register("carModel", { required: true })}
            />
          </div>
        </div>

        {/* Año y kilometraje  */}
        <div className="flex w-full justify-between items-start gap-4">
          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Año
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.carYear
                }
              )}
              {...register("carYear", { required: true })}
            />
          </div>

          <div className="flex w-full flex-col mb-2">
            <label className="text-sm ml-6">
              Kilometraje
            </label>
            <input
              type="text"
              autoFocus
              className={clsx(
                "py-2 px-4 border w-full rounded-2xl bg-white border-gray-300",
                {
                  "border-red-400": errors.carKm
                }
              )}
              {...register("carKm", { required: true })}
            />
          </div>
        </div>
      </section>

      {/* Vehicle data */}
      <div className="grid grid-cols-3 items-end w-full bg-gray-100 rounded-2xl p-4 mt-10 mb-20">
        <div className="flex flex-col">
          <p className="font-medium">TGPL67</p>
          <p className="text-gray-500">Haval H6 GT</p>
        </div>
        <div className="text-primaryBlue-500">
          <p>10.000 kms.</p>
        </div>
        <div>
          <button className="text-sm text-primaryBlue-500 hover:text-primaryBlue-600 hover:font-medium duration-200 transition-all">
            Ingresar otra patente
          </button>
        </div>
      </div>
    </form>
  )
}
