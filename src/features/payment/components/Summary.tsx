"use client"

import { useEffect, useState } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5"

import { formatNumberWithDots } from '@/utils';

import { ErrorMessage, Skeleton } from "@/components";
import { SummaryProps, usePaymentContext } from "@/features/payment";
import { useBookingContext } from "@/features/bookings";

export const Summary = ({ mainService, secundaryService, coupon, button, payment }: SummaryProps) => {
  const [billIsLoading, setBillIsLoading] = useState(true)

  const { creatingBookingAnimation } = useBookingContext()
  const { amountInCookie } = usePaymentContext()

  // when the bill is loaded, ending skeleton animation
  useEffect(() => {
    if (amountInCookie.subtotal !== 0 || amountInCookie.total !== 0) {
      setBillIsLoading(false)
    }
  }, [amountInCookie.subtotal, amountInCookie.total])


  return (
    <section className='flex flex-col lg:px-4 gap-5 lg:gap-4'>
      <h4 className="font-semibold ml-4 md:ml-6 text-primaryBlue-900">
        Resumen de tu servicio
      </h4>

      {/* Main service */}
      <div className="summary-container">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-primaryBlue-900">
            {mainService.name}
          </h4>
          <div className="text-xs text-gray-400 flex items-center gap-1 hover:font-medium hover:text-gray-500 duration-200 transition-all cursor-pointer">
            <p>Quitar</p>
            <IoClose
              size={16}
            />
          </div>
        </div>

        <p className="text-sm mt-2">
          {mainService.description}
        </p>

        <div className="flex justify-end items-center gap-3 mt-4">
          <p className="text-sm text-primaryBlue-400">
            {mainService.referenceValue}
          </p>
          <p className="font-semibold">
            {mainService.hasPrice ? "$" + formatNumberWithDots(mainService.price) : ''}
          </p>
        </div>
      </div>

      {/* Secundary Service */}
      {secundaryService && (
        <div className="summary-container">
          {/* Title */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-primaryBlue-900">
              {secundaryService.name}
            </h4>
            <div className="text-xs text-gray-400 flex items-center gap-1 hover:font-medium hover:text-gray-500 duration-200 transition-all cursor-pointer">
              <p>Quitar</p>
              <IoClose
                size={16}
              />
            </div>
          </div>

          <p className="text-sm mt-2">
            {secundaryService.description}
          </p>

          <div className="flex justify-end items-center gap-3 mt-4">
            <p className="font-semibold">
              ${formatNumberWithDots(secundaryService.price)}
            </p>
          </div>
        </div>
      )}

      {/* Coupon */}
      {
        coupon.hasCoupon && (
          <div className="flex flex-col">
            <h4 className="font-semibold ml-4 text-primaryBlue-900">
              Tengo un cupon
            </h4>
            <div className="flex justify-center items-center gap-2 p-2 rounded-xl shadow-lg bg-white">
              <input
                value={coupon.number}
                className="py-2 px-4 border w-full rounded-md bg-gray-100 placeholder-primaryBlue-400 placeholder:font-semibold"
                placeholder="N°"
                type="text"
              />

              <button className="py-2 px-6 lg:px-10 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
                Canjear
              </button>
            </div>
          </div>
        )
      }

      {/* Summary - dctos, subtotal, total */}
      <div className="summary-container gap-2 pb-20">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-900">
            Subtotal
          </p>
          <p className="font-semibold text-primaryBlue-900">
            {
              billIsLoading ? (
                <Skeleton inline color="light-gray" className="w-32 h-6" />
              ) : (
                <>
                  <span className="font-normal">Desde: </span>
                  <span>${formatNumberWithDots(amountInCookie.subtotal)}</span>
                </>
              )
            }
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-900">
            Dctos
          </p>
          <p className="font-semibold text-primaryBlue-900">
            {
              billIsLoading ? (
                <Skeleton inline color="light-gray" className="w-32 h-6" />
              ) : (
                <span>${formatNumberWithDots(amountInCookie.disscount)}</span>
              )
            }
          </p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-400">
            Total a pagar
          </p>
          <p className="font-semibold text-primaryBlue-400">
            {
              billIsLoading ? (
                <Skeleton inline color="light-gray" className="w-32 h-6" />
              ) : (
                <span>${formatNumberWithDots(amountInCookie.total)}</span>
              )
            }
          </p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}

        <div className="flex justify-center items-center w-full mt-10">
          <button
            disabled={creatingBookingAnimation}
            type="submit"
            className={clsx("px-10 py-2 bg-primaryBlue-900 text-white font-semibold rounded-xl", {
              "hover:scale-100 hover:brightness-100": creatingBookingAnimation,
              "hover:scale-105 hover:brightness-125 transition-all duration-200": !creatingBookingAnimation,
              "hidden": payment   // if it's payment summary, hidden this button and show the bottom button
            })}>
            {
              creatingBookingAnimation ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="loader" />
                  Procesando...
                </div>
              ) : button.text
            }
          </button>
        </div>
      </div>

      {/* button to pay */}
      {payment && (
        <div className="flex flex-col justify-center items-center gap-2 mt-10 w-full">
          <div className="flex justify-center items-center w-full ">
            <button
              disabled={!payment.hasCompletedPaymentData}
              type="submit"
              className="payment-form-button">
              Ir a pagar
            </button>
          </div>
          {
            payment.errorBothMethods && (
              <div className="flex justify-center items-center w-full max-w-md bg-red-100 rounded-md py-4 mt-5">
                <ErrorMessage message={'Solo puede seleccionar un metodo de pago'} className="w-fit" />
              </div>
            )
          }
        </div>
      )}
    </section >
  )
}
