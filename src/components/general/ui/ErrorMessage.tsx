import { IoAlertCircleSharp } from "react-icons/io5"

export const ErrorMessage = (message: string) => {
  return (
    <div className="flex justify-start items-center gap-2">
      <IoAlertCircleSharp size={14} className="text-red-400" />
      <p className='text-red-400 text-xs pb-2'>
        {message}
      </p>
    </div>
  )
}
