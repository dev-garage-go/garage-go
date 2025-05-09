'use client'

interface Props {
}

export const LicensePlateModal = ({ }: Props) => {
  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-85">
      <div className="flex flex-col justify-center items-center bg-customGray-100 p-10
       rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 shadow-lg shadow-customGray-400">

        <div className="flex flex-col gap-6 justify-center items-center">
          <h4 className="title-h4 text-xl">Ingresa tu patente</h4>
          <p className="text-sm text-center">
            Con tu patente definimos modelo, versión y pauta de servicio según fabricante.
          </p>

          <div className="flex justify-center items-center gap-4 w-full">
            <input
              type="text"
              className="input-form"
            />
            <button className="primary-button max-w-40 h-full">
              Continuar
            </button>
          </div>
        </div>
        <p className="text-primaryBlue-500 w-full text-start text-xs ml-6 mt-1">Vehiculo y versión</p>

      </div>
    </div>
  )
}
