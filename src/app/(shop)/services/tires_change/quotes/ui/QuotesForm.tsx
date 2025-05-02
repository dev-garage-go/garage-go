"use client"

import { Promotion4x3 } from "@/assets";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";

type FormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: number;
  paymentMethod: PaymentMethods;
}

type TireUsage = 'ciudad' | 'offroad' | 'intermedio'

const TypesTiresOptions: { label: string; value: TireUsage }[] = [
  { label: 'Ciudad', value: 'ciudad' },
  { label: 'Offroad', value: 'offroad' },
  { label: 'Intermedio', value: 'intermedio' }
]

export const QuotesForm = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      paymentMethod: '' // El metodo de pago comienza siendo ''
    }
  })

  const [typeTireSelected, setTypeTireSelected] = useState<TireUsage>('ciudad')

  const checked = false

  // Function that will be executed when the form is submitted
  const onSumbit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <form
      className="border border-customGray-600 rounded-3xl w-full py-4 px-4 md:px-6 lg:px-10"
      onSubmit={handleSubmit(onSumbit)}
    >
      <section className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-start mb-4">

          {/* Title and subtitle */}
          <div>
            <h4 className="font-semibold text-primaryBlue-900">Cambio de neumaticos</h4>
            <p className="text-sm text-primaryBlue-900">Configura tu servicio antes de continuar</p>
          </div>

          {/* Promotion 4x3 */}
          <div className="flex items-center justify-start gap-4 w-full bg-customGray-100 rounded-xl py-2 px-4 mt-4">

            <div>
              <div className={`w-5 h-5 rounded-full border-4 
                ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
              />

              <input
                id={"4x3"}
                type="radio"
                value={"4x3"}
                {...register}
                className="sr-only"
              />
            </div>

            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <p>Promocion 4x3</p>
                <div className="flex w-full items-center justify-start gap-1">
                  <IoAlertCircleOutline
                    className="text-primaryBlue-500"
                  />
                  <p className="text-xs text-primaryBlue-500">Bases y condiciones de la promocion</p>
                </div>
              </div>

              <div className="relative h-14 w-14">
                <Image
                  src={Promotion4x3}
                  alt="promotion 4x3"
                  fill
                  className="object-contain w-auto h-auto"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Container - Choose tires quantity and types  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          {/* Quantity */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primaryBlue-900 font-semibold">Cantidad de neumaticos</h4>

            {/* Selects quantity of tires - inputs radios */}
            <div className="flex w-full justify-start gap-8 items-center px-2">
              {/* 1 Tire */}
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className={`w-5 h-5 rounded-full border-4 
                ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
                />

                <input
                  id={"4x3"}
                  type="radio"
                  value={"4x3"}
                  {...register}
                  className="sr-only"
                />

                <p className="font-semibold text-primaryBlue-900">1</p>
              </div>

              {/* 2 Tire */}
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className={`w-5 h-5 rounded-full border-4 
                ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
                />

                <input
                  id={"4x3"}
                  type="radio"
                  value={"4x3"}
                  {...register}
                  className="sr-only"
                />

                <p className="font-semibold text-primaryBlue-900">2</p>
              </div>

              {/* 3 Tire */}
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className={`w-5 h-5 rounded-full border-4 
                ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
                />

                <input
                  id={"4x3"}
                  type="radio"
                  value={"4x3"}
                  {...register}
                  className="sr-only"
                />

                <p className="font-semibold text-primaryBlue-900">3</p>
              </div>

              {/* 4 Tire */}
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className={`w-5 h-5 rounded-full border-4 
                ${checked ? "bg-primaryBlue-400 border-primaryBlue-400" : "border-primaryBlue-900"}`}
                />

                <input
                  id={"4x3"}
                  type="radio"
                  value={"4x3"}
                  {...register}
                  className="sr-only"
                />

                <p className="font-semibold text-primaryBlue-900">4</p>
              </div>

            </div>
          </div>

          {/* Select tires types - switches buttons */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primaryBlue-900 font-semibold">Uso de los neumaticos</h4>
            {/* Switches */}
            {TypesTiresOptions.map(({ label, value }) => (
              <div key={value} className="flex items-center justify-between w-full">
                <span className="text-md">{label}</span>
                <button
                  onClick={() => setTypeTireSelected(value)}
                  className={clsx(
                    'relative w-12 h-6 rounded-full transition-colors duration-300',
                    typeTireSelected === value ? 'bg-primaryBlue-900' : 'bg-customGray-400'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300',
                      typeTireSelected === value ? 'translate-x-6' : ''
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>
    </form>
  )
}
