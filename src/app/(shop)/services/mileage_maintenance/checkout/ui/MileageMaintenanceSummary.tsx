import { IoClose } from "react-icons/io5"

export const MileageMaintenanceSummary = () => {
  return (
    <section className='flex flex-col px-4 gap-4'>
      <h4 className="font-semibold ml-6">Resumen de tu servicio</h4>

      {/* Mantencion por kilometraje */}
      <div className="flex flex-col py-3 px-6 shadow-lg bg-white rounded-2xl border border-gray-100">
        {/* Title and cross */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Mantencion por kilometraje</h4>
          <div className="text-xs text-gray-300 flex items-center gap-1 hover:font-medium hover:text-gray-400 duration-200 transition-all cursor-pointer">
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
          <p className="text-sm text-primaryBlue-500">Valor referencial 10.000 kms</p>
          <p className="font-semibold">$189.000</p>
        </div>
      </div>

      {/* Servicio de frenos */}
      <div className="flex flex-col py-3 px-6 shadow-lg bg-white rounded-2xl border border-gray-100">
        {/* Title and cross */}
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Servicio de frenos</h4>
          <div className="text-xs text-gray-300 flex items-center gap-1 hover:font-medium hover:text-gray-400 duration-200 transition-all cursor-pointer">
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

      {/* Cupon */}
      <div className="flex flex-col">
        <h4 className="font-semibold ml-4">Tengo un cupon</h4>
        <div className="flex justify-center items-center gap-2 p-2 rounded-xl shadow-lg bg-white">
          <input
            className="py-2 px-4 border w-full rounded-md bg-gray-100 placeholder-primaryBlue-500 placeholder:font-semibold"
            placeholder="N°"
            type="text"
          />

          <button className="py-2 px-10 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
            Canjear
          </button>
        </div>
      </div>

      {/* Subtotal, total */}
      <div className="flex flex-col py-3 px-6 shadow-lg gap-2 bg-white rounded-2xl pb-20 border border-gray-100">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold">Subtotal</p>
          <p className="font-semibold">$225.890</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold">Dctos</p>
          <p className="font-semibold">$0</p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-primaryBlue-500">Total a pagar</p>
          <p className="font-semibold text-primaryBlue-500">$225.890</p>
        </div>
        <div className="h-0.5 rounded bg-black w-full opacity-5" />  {/* Divisor */}

        <div className="flex justify-center items-center w-full mt-10">
          <button className="px-10 py-2 bg-primaryBlue-900 text-white font-semibold rounded-xl hover:scale-105 hover:brightness-125 transition-all duration-200">
            Continuar
          </button>
        </div>
      </div>
    </section>
  )
}
