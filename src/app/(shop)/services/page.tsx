import Image from "next/image";

import { obtainImage } from "@/assets/helpers";
import { TopBanner, BannerCard } from "@/features/home";
import { ServicesGrid } from "@/features/services";

export default function ServicesPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <TopBanner
        title="agenda tu servicio ahora"
        description="Todo lo que necesita tu auto al precio más conveniente y un solo lugar."
      />

      {/* Main image */}
      <div className="hidden xl:block absolute top-20 xl:right-16 2xl:right-64 w-[600px] h-[400px]">
        <Image
          fill
          priority
          src={obtainImage('services', 'services')}
          alt="persona feliz con los servicios"
          sizes="600px"
          className="object-cover w-auto h-auto"
        />
      </div>

      <section className="container-section">
        {/* Title section */}
        <h2 className='title-h2 font-semibold text-center text-primaryBlue-500'>
          Agenda, cotiza, reserva y
          <br />
          paga en linea. Asi de fácil es con Garage Go!
        </h2>

        {/* Grid */}
        <ServicesGrid />
        <div className="pb-from-footer padding-banner mt-10 md:mt-28 xl:mt-36">
          <BannerCard
            title="¿BUSCAS ALGO MÁS ESPECÍFICO?"
            description="Si no encontraste el servicio que requieres Puedes hablar con uno de nuestros ejecutivos Y solicitar una diagnóstico y cotizacion de Lo que estas buscando."
            image={obtainImage('banners', 'hombreServicios')}
            imageAlt="persona viendo su celular"
            hasButton
            buttonStyle="bg-secundaryGreen-500 hover:bg-secundaryGreen-600 duration-200"
            buttonString="Chatea con nosotros"
          />
        </div>
      </section>
    </div>
  );
}