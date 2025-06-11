import { ModalColorsType } from "@/types"
import clsx from "clsx"

interface Props {
  bgModal: ModalColorsType
  bgLoader: boolean
  txtColor?: string
}

export const Loader = ({ bgLoader, bgModal, txtColor }: Props) => {
  return (
    <div className={`${bgModal} flex justify-center items-center min-h-screen w-screen`}>
      <div className={clsx('flex justify-center items-center gap-3', {
        'p-6 bg-white rounded-xl': bgLoader
      })}>
        <div className="loader" />
        <p className={`text-lg xl:text-2xl font-medium ${txtColor ?? 'text-primaryBlue-900'}`}>
          Cargando
          <span className="inline-block animate-bounce-dot1">.</span>
          <span className="inline-block animate-bounce-dot2">.</span>
          <span className="inline-block animate-bounce-dot3">.</span>
        </p>
      </div>
    </div>
  )
}
