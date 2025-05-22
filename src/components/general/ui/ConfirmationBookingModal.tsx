'use client'

interface Props {
  success: boolean
}

export const ConfirmationBookingModal = ({ success }: Props) => {
  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-90">
      <div className="flex flex-col justify-center items-center bg-customGray-100 p-4 md:p-6 xl:p-10 rounded-2xl w-full h-full max-w-xl max-h-72 bg-opacity-100 shadow-lg shadow-customGray-400 mx-4">
        Probando modal
      </div>
    </div>
  )
}
