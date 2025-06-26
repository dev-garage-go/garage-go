import { toast } from "sonner"

interface Props {
  message: string,
  importantMessage?: string
}

export const ConfirmEventToast = ({ message, importantMessage }: Props) => {
  return new Promise<boolean>((resolve) => {
    toast(
      <div className='flex flex-col justify-center m-2 gap-6 w-full h-full'>
        <p className='text-sm text-center text-neutral-900 font-normal w-full px-4'>
          <span>{message}</span>
          <span className="font-semibold">{importantMessage}</span>
        </p>
        <div className='flex gap-2 h-fit'>
          <button
            className='bg-red-100 hover:bg-red-400 active:bg-red-400 w-full h-fit rounded-md py-2 text-sm font-medium'
            onClick={() => {
              resolve(false)
              toast.dismiss()
            }}>
            Cancelar
          </button>
          <button
            className='bg-emerald-100 hover:bg-emerald-400 active:bg-emerald-400 w-full h-fit rounded-md py-2 text-sm font-medium'
            onClick={() => {
              resolve(true)
              toast.dismiss()
            }}>
            Confirmar
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        style: {
          backgroundColor: '#F9F9F9',
        },
      }
    )
  })
}