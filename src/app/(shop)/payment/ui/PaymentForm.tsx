"use client"

import { useFormContext } from "react-hook-form";

import { RenderCardIcon, PaymentOption, ErrorMessage } from '@/components';
import { detectCardType, formatCardNumber, formatExpiry } from "@/utils";
import { PaymentMethodsOptions } from "@/constants";
import { PaymentFormSchema, PaymentGatewayMethods } from "@/interfaces";


export const PaymentForm = () => {
  const { watch, setValue, register, trigger, formState: { errors } } = useFormContext<PaymentFormSchema>()

  const cardNumber = watch("userCard.cardNumber") || "";
  const paymentGatewayOption = watch("paymentGateway")
  const paymentMethodSelected = watch("methodSelected")

  const useCardMethodSelected = paymentMethodSelected === "user-card"

  // Payment utils funcs
  // Detect the type of card - ex: visa or mastercard
  const cardType = detectCardType(cardNumber);

  // Every 4 digits leave a spaces - ex: 1234 5678
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("userCard.cardNumber", formatted);
  };

  // Write a slash / in the MM/YY format - ex: 04/28
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue("userCard.expiresIn", formatted);
  };

  // Allows that user can diselect a payment method
  const handleSelect = (method: PaymentGatewayMethods) => {
    if (paymentGatewayOption === method) {
      setValue("paymentGateway", undefined); // If it is already selected, deselect it
    } else {
      setValue("paymentGateway", method);
    }
  };

  return (
    <div className="border border-customGray-600 rounded-3xl w-full py-4 px-4 md:px-6 lg:px-10">
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
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`${useCardMethodSelected && errors.userCard?.cardNumber ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.cardNumber", {
                onChange: handleCardNumberChange,
                required: useCardMethodSelected ? true : false
              })}
            />

            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <RenderCardIcon cardType={cardType} />
            </div>
          </div>
          {useCardMethodSelected && errors.userCard?.cardNumber && (
            <ErrorMessage message={'Requerido'} className="mt-1 ml-2" />
          )}
        </div>

        <div className="flex w-full flex-col mb-2">
          <label className="text-sm mb-1 text-primaryBlue-900">
            Titular
          </label>
          <input
            type="text"
            placeholder='John Doe'
            className={`${useCardMethodSelected && errors.userCard?.ownerName ? 'payment-input-error-form' : 'payment-input-form'}`}
            {...register("userCard.ownerName", {
              required: useCardMethodSelected ? true : false
            })}
          />
          {useCardMethodSelected && errors.userCard?.ownerName && (
            <ErrorMessage message={'Requerido'} className="mt-1 ml-2" />
          )}
        </div>

        {/* Expiry and CVV card  */}
        <div className="flex w-full justify-start items-center gap-4">
          <div className="flex w-32 flex-col mb-2">
            <label className="text-sm mb-1 text-primaryBlue-900">
              Expira
            </label>
            <input
              type="text"
              maxLength={5}
              placeholder="04/28"
              className={`${useCardMethodSelected && errors.userCard?.expiresIn ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.expiresIn", {
                onChange: handleExpiryChange,
                required: useCardMethodSelected ? true : false
              })}
            />
            {useCardMethodSelected && errors.userCard?.expiresIn && (
              <ErrorMessage message={'Requerido'} className="mt-1 ml-2" />
            )}
          </div>

          <div className="flex w-32 flex-col mb-2">
            <label className="text-sm mb-1 text-primaryBlue-900">
              CVV
            </label>
            <input
              maxLength={3}
              type="text"
              placeholder='323'
              className={`${useCardMethodSelected && errors.userCard?.cvv ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.cvv", {
                required: useCardMethodSelected ? true : false
              })}
            />
            {useCardMethodSelected && errors.userCard?.cvv && (
              <ErrorMessage message={'Requerido'} className="mt-1 ml-2" />
            )}
          </div>
        </div>
      </section>

      {/* Other payment methods */}
      <section className="flex flex-col gap-4">
        <h4 className="font-medium mt-14 md:mt-10 mb-4 text-primaryBlue-900">Otros medios de pago</h4>

        {/* Payment methods options */}
        <div className="flex flex-col w-full gap-4">
          {PaymentMethodsOptions.map((option, index) => (
            <PaymentOption
              key={option.method! + index}
              method={option.method!}
              name={option.name}
              description={option.description}
              imageSrc={option.imageSrc}
              checked={paymentGatewayOption === option.method}
              onClick={() => handleSelect(option.method)}
              register={register("paymentGateway")}
            />
          ))}
        </div>

        {/* Terms and conditions */}
        <div className="flex justify-center items-start w-full gap-2 mt-4 mb-10">
          <input
            type="checkbox"
            className="h-4 w-4 accent-primaryBlue-500"
          />
          <p className=" text-xs font-normal text-primaryBlue-900">
            Acepto los términos y condiciones y políticas de privacidad de Garage Go.
          </p>
        </div>
      </section>
    </div>
  )
}
