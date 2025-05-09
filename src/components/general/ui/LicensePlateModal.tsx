'use client'

interface Props {
}

export const LicensePlateModal = ({ }: Props) => {
  return (
    <div className="fixed z-10 top-0 left-0 flex justify-center items-center w-screen h-full min-h-screen bg-white bg-opacity-85">
      <div className="bg-blue-400 rounded-md w-[500px] h-[300px] bg-opacity-100">
        Algo en el modal
      </div>
    </div>
  )
}
