"use client"

import { useFormContext } from "react-hook-form";
import { allowOnlyLetters } from "@/utils";
import { ErrorMessage } from '@/components';

import {
  PaymentFormSchema,
  PaymentGatewayMethods,
  RenderCardIcon,
  PaymentOption,
  PaymentMethodsOptions,
  formatCardNumber,
  detectCardType,
  formatExpiry
} from "@/features/payment";



export const PaymentForm = () => {
  const { watch, setValue, register, formState: { errors } } = useFormContext<PaymentFormSchema>()

  const cardNumber = watch("userCard.cardNumber") || "";
  const paymentGatewaySelected = watch("paymentGateway")
  const paymentMethodSelected = watch("methodSelected")

  const shouldValidateCardFields = paymentMethodSelected === "user-card"

  // Payment utils funcs
  // Detect the type of card - ex: visa or mastercard
  const cardType = detectCardType(cardNumber);

  // Every 4 digits leave a spaces - ex: 1234 5678
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("userCard.cardNumber", formatted);
  };

  // Delete numbers if exist
  const handleOwnerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = allowOnlyLetters(e.target.value)
    setValue("userCard.ownerName", formatted)
  }

  // Write a slash / in the MM/YY format - ex: 04/28
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setValue("userCard.expiresIn", formatted);
  };


  const handleCardCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setValue("userCard.cvv", onlyDigits)
  }

  // Allows that user can diselect a payment gateway option
  const toggleGateway = (method: PaymentGatewayMethods) => {
    setValue("paymentGateway", paymentGatewaySelected === method ? undefined : method);
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
              minLength={19}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={`${shouldValidateCardFields && errors.userCard?.cardNumber ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.cardNumber", {
                onChange: handleCardNumberChange,
                required: shouldValidateCardFields ? true : false,
                minLength: {
                  value: 19,
                  message: 'Formato invalido'
                },
                maxLength: {
                  value: 19,
                  message: 'Formato invalido'
                },
              })}
            />

            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <RenderCardIcon cardType={cardType} />
            </div>
          </div>
          {shouldValidateCardFields && errors.userCard?.cardNumber && (
            <ErrorMessage
              message={errors.userCard?.cardNumber.type === "minLength" ? errors.userCard.cardNumber.message! : 'Requerido'}
              className="mt-1 ml-2"
            />
          )}
        </div>

        <div className="flex w-full flex-col mb-2">
          <label className="text-sm mb-1 text-primaryBlue-900">
            Titular
          </label>
          <input
            type="text"
            placeholder='John Doe'
            minLength={2}
            className={`${shouldValidateCardFields && errors.userCard?.ownerName ? 'payment-input-error-form' : 'payment-input-form'}`}
            {...register("userCard.ownerName", {
              required: shouldValidateCardFields ? true : false,
              onChange: handleOwnerNameChange,
              minLength: {
                value: 2,
                message: 'Debe tener al menos 2 caracteres'
              },
            })}
          />
          {shouldValidateCardFields && errors.userCard?.ownerName && (
            <ErrorMessage
              message={errors.userCard?.ownerName.type === "minLength" ? errors.userCard.ownerName.message! : 'Requerido'}
              className="mt-1 ml-2"
            />
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
              placeholder="04/28"
              minLength={5}
              maxLength={5}
              className={`${shouldValidateCardFields && errors.userCard?.expiresIn ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.expiresIn", {
                onChange: handleExpiryChange,
                required: shouldValidateCardFields ? true : false,
                minLength: {
                  value: 5,
                  message: 'Formato invalido'
                },
                maxLength: {
                  value: 5,
                  message: 'Formato invalido'
                },
              })}
            />
            {shouldValidateCardFields && errors.userCard?.expiresIn && (
              <ErrorMessage
                message={errors.userCard?.expiresIn.type === "minLength" ? errors.userCard.expiresIn.message! : 'Requerido'}
                className="mt-1 ml-2"
              />
            )}
          </div>

          <div className="flex w-32 flex-col mb-2">
            <label className="text-sm mb-1 text-primaryBlue-900">
              CVV
            </label>
            <input
              type="text"
              minLength={3}
              maxLength={3}
              placeholder='323'
              className={`${shouldValidateCardFields && errors.userCard?.cvv ? 'payment-input-error-form' : 'payment-input-form'}`}
              {...register("userCard.cvv", {
                required: shouldValidateCardFields ? true : false,
                onChange: handleCardCVV,
                minLength: {
                  value: 3,
                  message: 'Formato invalido'
                },
                maxLength: {
                  value: 3,
                  message: 'Formato invalido'
                },
              })}
            />
            {shouldValidateCardFields && errors.userCard?.cvv && (
              <ErrorMessage
                message={errors.userCard?.cvv.type === "minLength" ? errors.userCard.cvv.message! : 'Requerido'}
                className="mt-1 ml-2"
              />
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
              checked={paymentGatewaySelected === option.method}
              onClick={() => toggleGateway(option.method)}
              register={register("paymentGateway")}
            />
          ))}
        </div>

        {/* Terms and conditions */}
        <div className="flex flex-col justify-start items-start mt-4 mb-10">
          {errors.checkTermsAndConditions && (<ErrorMessage message='Se requiere que acepte los terminos' className="mb-2 ml-2" />)}
          <label className="flex justify-center items-start w-full gap-2 text-xs font-normal text-primaryBlue-900 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primaryBlue-500"
              {...register("checkTermsAndConditions", { required: true })}
            />
            Acepto los términos y condiciones y políticas de privacidad de Garage Go.
          </label>
        </div>
      </section>
    </div>
  )
}
