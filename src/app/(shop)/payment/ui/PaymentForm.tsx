"use client"

import { RenderCardIcon } from './RenderCardIcon';
import { PaymentOption } from "./PaymentOption";

import clsx from "clsx";
import { useForm } from "react-hook-form";

import { detectCardType, formatCardNumber, formatExpiry } from "@/utils";
import { PaymentMethodsOptions } from "@/constants";

type FormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: number;
  paymentMethod: PaymentMethods;
}

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
  const selectedPayment = watch("paymentMethod")

  // Payment utils funcs
  // Detect the type of card - ex: visa or mastercard
  const cardType = detectCardType(cardNumber);

  // Every 4 digits leave a spaces - ex: 1234 5678
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted);
  };

  // Write a slash / in the MM/YY format - ex: 04/28
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue("expiresIn", formatted);
  };

  // Allows that user can diselect a payment method
  const handleSelect = (method: PaymentMethods) => {
    if (selectedPayment === method) {
      setValue("paymentMethod", ''); // If it is already selected, deselect it
    } else {
      setValue("paymentMethod", method);
    }
  };

  // Function that will be executed when the form is submitted
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

        {/* Card number and Owner */}
        <div className="flex w-full flex-col mb-2">
          <label className="text-sm mb-1 text-primaryBlue-900">
            Número de tarjeta
          </label>

          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={clsx("payment-input-form", { "border-red-400": errors.cardNumber })}
              {...register("cardNumber", {
                onChange: (e) => { handleCardNumberChange(e) },
                required: true
              })}
            />

            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <RenderCardIcon cardType={cardType} />
            </div>
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

        {/* Expiry and CVV card  */}
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
              maxLength={3}
              type="text"
              autoFocus
              className={clsx("payment-input-form", { "border-red-400": errors.cvv })}
              {...register("cvv", { required: true })}
            />
          </div>
        </div>
      </section>

      {/* Other payment methods */}
      <section className="flex flex-col gap-4 mb-20">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">Otros medios de pago</h4>

        {/* Payment methods options */}
        <div className="flex flex-col w-full gap-4">
          {PaymentMethodsOptions.map((option, index) => (
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
