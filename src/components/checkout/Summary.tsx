import { IoClose } from "react-icons/io5"
import { formatNumberWithDots } from '@/utils';

interface Props {
  mainService: {
    name: string,
    description: string,
    hasPrice: boolean,
    price: number,
    referenceValue: string,
  }
  secundaryService: {
    name: string,
    description: string,
    price: number,
  }
  coupon: {
    hasCoupon: boolean,
    number?: string,
  }
  summary: {
    subtotal: number,
    dctos: number,
    total: number,
    btnString: string,
    btnAction?: () => void
  }
}

export const Summary = ({ mainService, secundaryService, coupon, summary }: Props) => {
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
            ${formatNumberWithDots(summary.subtotal)}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-900">
            Dctos</p>
          <p className="font-semibold text-primaryBlue-900">
            ${formatNumberWithDots(summary.dctos)}          </p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-400">
            Total a pagar
          </p>
          <p className="font-semibold text-primaryBlue-400">
            ${formatNumberWithDots(summary.total)}
          </p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}

        <div className="flex justify-center items-center w-full mt-10">
          <button
            onClick={summary.btnAction}
            className="px-10 py-2 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
            {summary.btnString}
          </button>
        </div>
      </div>
    </section>
  )
}
