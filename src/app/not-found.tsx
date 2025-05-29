import Image from "next/image";
import { GarageGoLogo } from "@/assets/logos";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex justify-center items-center w-full min-h-screen bg-primaryBlue-50">

      <div className="flex flex-col md:flex-row justify-center items-center
      w-full max-w-4xl gap-6 md:gap-20 bg-gray-50 shadow-2xl px-4 md:px-6 mx-4 sm:mx-6 py-10 md:py-24 rounded-xl">
        <div className="w-full max-w-xs">
          <h1 className="text-7xl md:text-8xl font-bold text-center">404</h1>
          <p className="text-base md:text-xl text-center">
            Whoops! <br /> Lo sentimos, la pagina no existe
          </p>
          <Link
            href={"/"}
            className="text-sm md:text-base flex justify-center items-center text-center w-full py-2 mt-6
            rounded-md bg-primaryBlue-500 hover:scale-110 hover:bg-primaryBlue-700 transition-all 
            duration-300 text-white"
          >
            Volver al inicio
          </Link>
        </div>
        <div className="relative w-40 h-28 md:w-56 md:h-28">
          <Image
            fill
            src={GarageGoLogo}
            alt="logo de garage go"
            className="object-contain w-auto h-auto"
          />
        </div>
      </div>

    </section>
  );
}