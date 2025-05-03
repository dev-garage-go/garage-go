"use client"

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Promotion4x3 } from "@/assets";
import { InformationButton, SwitchButton } from "@/components";
import { formatNumberWithDots } from '@/utils';

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

const AddMoreServices: { name: string, price: number }[] = [
  { name: "Gestión de revisión técnica", price: 48990 },
  { name: "Diagnostico automotriz", price: 65990 },
  { name: "Servicio de frenos", price: 35990 }
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
            <h4 className="title-h4">Cambio de neumaticos</h4>
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
                <InformationButton
                  text="Bases y condiciones de la promocion"
                  onClick={() => console.log("Promotion info")}
                />
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

                <p className="title-h4">1</p>
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

                <p className="title-h4">2</p>
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

                <p className="title-h4">3</p>
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

                <p className="title-h4">4</p>
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
                <SwitchButton
                  value={value}
                  valueSelected={typeTireSelected}
                  setValueSelected={setTypeTireSelected}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tires size input */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <h4 className="title-h4">Ingresa tu medida</h4>
          <div className="flex justify-center items-center gap-2 p-2 rounded-xl shadow-lg bg-white w-full ">
            <input
              className="py-2 px-4 border w-full rounded-md bg-gray-100 placeholder-primaryBlue-400 placeholder:font-light placeholder:text-customGray-400"
              placeholder="Ancho / Perfil / Aro"
              type="text"
            />

            <button className="py-2 px-6 lg:px-10 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
              Aceptar
            </button>
          </div>
          <div className="mt-2">
            <InformationButton
              text="Medida de tus neumaticos"
              onClick={() => console.log("Tires sizes info")}
            />
          </div>
        </div>

        {/* Add more services */}
        <div className="flex flex-col gap-4 my-10">
          <h4 className="title-h4">¿Quieres agregar algo mas?</h4>

          <div className="flex flex-col gap-4 w-full">
            {AddMoreServices.map((service, index) => (
              <div
                key={service.name + index}
                className="flex justify-between items-center bg-gray-100 py-4 px-6 rounded-xl"
              >
                <div className="flex flex-col">
                  <h4 className="font-semibold text-primaryBlue-500">
                    {service.name}
                  </h4>
                  <p className="font-semibold text-primaryBlue-900">
                    ${formatNumberWithDots(service.price)}
                  </p>
                </div>
                <button className="text-sm text-center bg-transparent border border-primaryBlue-500 text-primaryBlue-500
                 rounded-xl px-6 py-2 hover:bg-primaryBlue-500 hover:text-white duration-200 transition-all">
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </form>
  )
}
