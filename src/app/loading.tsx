import { GarageGoLogo } from "@/assets"
import Image from "next/image"

export default function LoadingPage() {
  return (
    <section className="h-screen w-screen flex justify-center items-center gap-3 bg-white bg-opacity-60">

      <div className="flex flex-col items-center justify-center max-w-xl gap-10 mx-8">
        <div className="relative w-full h-10">
          <Image
            src={GarageGoLogo}
            alt="logo garage go"
            fill
            className="object-contain w-auto h-auto"
          />
        </div>

        <p className='text-lg xl:text-2xl font-medium text-primaryBlue-900'>
          Cargando
          <span className="inline-block animate-bounce-dot1">.</span>
          <span className="inline-block animate-bounce-dot2">.</span>
          <span className="inline-block animate-bounce-dot3">.</span>
        </p>
      </div>

    </section>
  )
}