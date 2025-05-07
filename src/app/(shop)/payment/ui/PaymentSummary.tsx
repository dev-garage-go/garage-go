import { IoClose } from "react-icons/io5"

export const PaymentSummary = () => {
  return (
    <section className='flex flex-col lg:px-4 gap-5 lg:gap-4'>
      <h4 className="font-semibold ml-4 md:ml-6 text-primaryBlue-900">
        Resumen de tu servicio
      </h4>

      {/* Mileage maintenance */}
      <div className="summary-container">
        {/* Title and cross */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-primaryBlue-900">Mantencion por kilometraje</h4>
          <div className="text-xs text-gray-400 flex items-center gap-1 hover:font-medium hover:text-gray-500 duration-200 transition-all cursor-pointer">
            <p>Quitar</p>
            <IoClose
              size={16}
            />
          </div>
        </div>

        <p className="text-sm mt-2">
          Servicio por pauta segun fabricante incluye super check De 35 puntos, lavado express de cortesia en nuestro Hub Ubicado en cordillera S80, pudahuel.
        </p>

        <div className="flex justify-end items-center gap-3 mt-4">
          <p className="text-sm text-primaryBlue-400">Valor referencial 10.000 kms</p>
          <p className="font-semibold">$189.000</p>
        </div>
      </div>

      {/* Brake service */}
      <div className="summary-container">
        {/* Title and cross */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-primaryBlue-900">Servicio de frenos</h4>
          <div className="text-xs text-gray-400 flex items-center gap-1 hover:font-medium hover:text-gray-500 duration-200 transition-all cursor-pointer">
            <p>Quitar</p>
            <IoClose
              size={16}
            />
          </div>
        </div>

        <p className="text-sm mt-2">
          Revision y limpieza de ambos ejes
        </p>

        <div className="flex justify-end items-center gap-3 mt-4">
          <p className="font-semibold">$35.990</p>
        </div>
      </div>

      {/* Subtotal, total */}
      <div className="summary-container gap-2">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-900">Subtotal</p>
          <p className="font-semibold text-primaryBlue-900">$225.890</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-900">Dctos</p>
          <p className="font-semibold text-primaryBlue-900">$0</p>
        </div>

        <div className="flex justify-between items-center w-full mt-4 bg-primaryBlue-400 rounded-xl py-2 px-4">
          <p className="font-semibold text-white">Total a pagar</p>
          <p className="font-semibold text-white">$225.890</p>
        </div>
      </div>

      {/* Pay button */}
      <div className="flex justify-center items-center w-full mt-10">
        <button
          type="submit"
          className="block text-center w-full max-w-lg py-2 bg-primaryBlue-900 text-white font-semibold rounded-md
          hover:brightness-125 hover:scale-105 transition-all duration-200">
          Ir a pagar
        </button>
      </div>
    </section>
  )
}
