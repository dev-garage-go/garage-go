'use client'

interface Props {
}

export const LicensePlateModal = ({ }: Props) => {
  return (
    <div className="absolute z-10 top-0 left-0 flex justify-center items-center w-full bg-orange-300">
      <div className="bg-blue-400 rounded-md w-[500px] h-[300px]">
        Algo en el modal
      </div>
    </div>
  )
}
