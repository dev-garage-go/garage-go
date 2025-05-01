"use client"

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Getnet, MercadoPago, Webpay } from "@/assets";
import PaymentOption from "./PaymentOption";
import { detectCardType, formatCardNumber, formatExpiry } from "@/utils";
import { FaCcMastercard, FaCcVisa, FaCreditCard } from "react-icons/fa";

type PaymentMethods = '' | 'mercado-pago' | 'getnet' | 'webpay'

type FormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: string;
  paymentMethod: PaymentMethods;
}

interface PaymentOptions {
  method: PaymentMethods,
  name: string,
  description: string,
  imageSrc: string
}

const options: PaymentOptions[] = [
  {
    method: "webpay",
    name: "Webpay Plus",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: Webpay,
  },
  {
    method: "getnet",
    name: "Transferencia",
    description: "Botón de pago para transferencias bancarias",
    imageSrc: Getnet,
  },
  {
    method: "mercado-pago",
    name: "Billetera virtual",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: MercadoPago,
  },
];

export const PaymentForm = () => {
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

  const cardNumber = watch("cardNumber") || "";
  const expiry = watch("expiresIn") || "";
  const selectedPayment = watch("paymentMethod")

  const cardType = detectCardType(cardNumber);

  // Coloca un espacio luego de 4 numeros 1234 5678
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted);
  };

  // Coloca una / en el formato MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue("expiresIn", formatted);
  };

  // Renderiza un icono de card u otro en base a los numeros de tarjeta
  const renderCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa className="text-blue-600 text-2xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-600 text-2xl" />;
      default:
        return <FaCreditCard className="text-gray-400 text-2xl" />;
    }
  };

  // Permite que el usuario pueda deseleccionar un metodo de pago
  const handleSelect = (method: PaymentMethods) => {
    if (selectedPayment === method) {
      setValue("paymentMethod", ''); // Si ya está seleccionado, lo deselecciona
    } else {
      setValue("paymentMethod", method);
    }
  };

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
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={clsx("relative payment-input-form", { "border-red-400": errors.cardNumber })}
            {...register("cardNumber", {
              onChange: (e) => { handleCardNumberChange(e) },
              required: true
            })}
          />
          {/* Card icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {renderCardIcon()}
          </div>
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
              maxLength={5}
              placeholder="MM/YY"
              className={clsx("payment-input-form", { "border-red-400": errors.expiresIn })}
              {...register("expiresIn", {
                onChange: (e) => { handleExpiryChange(e) },
                required: true
              })}
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
      <section className="flex flex-col gap-4 mb-20">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">Otros medios de pago</h4>

        {/* Metodos de pago */}
        <div className="flex flex-col w-full gap-4">
          {options.map((option, index) => (
            <PaymentOption
              key={option.method + index}
              method={option.method}
              name={option.name}
              description={option.description}
              imageSrc={option.imageSrc}
              checked={selectedPayment === option.method}
              onClick={() => handleSelect(option.method)}
              register={register("paymentMethod", { required: true })}
            />
          ))}
        </div>
      </section>
    </form>
  )
}
