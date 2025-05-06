import { IoAlertCircleSharp } from "react-icons/io5"

interface Props {
  message: string
  className?: string
}

export const ErrorMessage = ({ message, className }: Props) => {
  return (
    <div className={`flex justify-start items-center gap-1 w-full ${className}`}>
      <IoAlertCircleSharp size={14} className="text-red-400" />
      <p className='text-red-400 text-xs'>
        {message}
      </p>
    </div>
  )
}
