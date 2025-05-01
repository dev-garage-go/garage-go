"use client"

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Getnet, MercadoPago, Webpay } from "@/assets";

type paymentMethods = 'mercado-page' | 'getnet' | 'webpay'

type FormInputs = {
  cardNumber: number;
  ownerName: string;
  expiresIn: number;
  cvv: string;
  paymentMethod: paymentMethods;
}

const options = [
  {
    id: "webpay",
    name: "Webpay Plus",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: Webpay,
  },
  {
    id: "getnet",
    name: "Transferencia",
    description: "Botón de pago para transferencias bancarias",
    imageSrc: Getnet,
  },
  {
    id: "mercadopago",
    name: "Billetera virtual",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: MercadoPago,
  },
];

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
        <div className="flex flex-col justify-center items-start gap-6 mb-4">
          <h4 className="font-medium text-primaryBlue-900">Selecciona el metodo de pago</h4>
          <p className="text-sm font-medium text-primaryBlue-900">Pago con tarjeta de credito</p>
        </div>

        {/* Numero de tarjeta y titular */}
        <div className="flex w-full flex-col mb-2">
          <label className="text-sm mb-1 text-primaryBlue-900">
            Número de tarjeta
          </label>
          <input
            type="text"
            autoFocus
            className={clsx("payment-input-form", { "border-red-400": errors.cardNumber })}
            {...register("cardNumber", { required: true })}
          />
        </div>

        <div className="flex w-full flex-col mb-2">
          <label className="text-sm mb-1 text-primaryBlue-900">
            Titular
          </label>
          <input
            type="text"
            autoFocus
            className={clsx("payment-input-form", { "border-red-400": errors.ownerName })}
            {...register("ownerName", { required: true })}
          />
        </div>

        {/* Expiracion y cvv de tarjeta  */}
        <div className="flex w-full justify-start items-center gap-4">
          <div className="flex w-32 flex-col mb-2">
            <label className="text-sm mb-1 text-primaryBlue-900">
              Expira
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("payment-input-form", { "border-red-400": errors.expiresIn })}
              {...register("expiresIn", { required: true })}
            />
          </div>

          <div className="flex w-32 flex-col mb-2">
            <label className="text-sm mb-1 text-primaryBlue-900">
              CVV
            </label>
            <input
              type="text"
              autoFocus
              className={clsx("payment-input-form", { "border-red-400": errors.cvv })}
              {...register("cvv", { required: true })}
            />
          </div>
        </div>
      </section>

      {/* Otros medios de pago */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 md:mb-6 text-primaryBlue-900">Otros medios de pago</h4>

        {/* TODO: Metodos de pago */}

      </section>
    </form>
  )
}
