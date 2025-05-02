"use client"

import { useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";

type FormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: number;
  paymentMethod: PaymentMethods;
}

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

          <div>
            <h4 className="font-medium text-primaryBlue-900">Cambio de neumaticos</h4>
            <p className="text-sm text-primaryBlue-900">Configura tu servicio antes de continuar</p>
          </div>

          {/* Promotion 4x3 */}
          <div className="flex w-full bg-customGray-400 rounded-xl py-2 px-4 mt-4">

            <div>
              <div className={`hidden md:w-5 md:h-5 rounded-full border-4 
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

            <div className="flex flex-col bg-red-100">
              <p>Promocion 4x3</p>
              <div className="flex w-full items-center justify-start gap-1">
                <IoAlertCircleOutline />
                <p className="text-xs">Bases y condiciones de la promocion</p>
              </div>
            </div>

          </div>
        </div>


      </section>
    </form>
  )
}
