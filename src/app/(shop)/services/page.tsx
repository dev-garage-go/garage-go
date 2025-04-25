import Image from "next/image";

import { HombreServicios, Services } from "@/assets";
import { TopBanner, ServicesGrid, BannerCard } from "@/components";

export default function ServicesPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <TopBanner
        title="agenda tu servicio ahora"
        description="Todo lo que necesita tu auto al precio más conveniente y un solo lugar."
      />

      {/* Main image */}
      <div className="hidden xl:block absolute top-20 right-72 w-[600px] h-[400px]">
        <Image
          src={Services}
          alt="persona feliz con los servicios"
          fill
          priority
          className="object-contain w-auto h-auto"
        />
      </div>

      <section className="container-section">
        {/* Title section */}
        <h2 className='title-h2 text-center text-primaryBlue-500'>
          Agenda, cotiza, reserva y
          <br />
          paga en linea. Asi de fácil es con Garage Go!
        </h2>

        {/* Grid */}
        <ServicesGrid />
        <div className="pb-from-footer">
          <BannerCard
            title="¿BUSCAS ALGO MÁS ESPECÍFICO?"
            description="Si no encontraste el servicio que requieres Puedes hablar con uno de nuestros ejecutivos Y solicitar una diagnóstico y cotizacion de Lo que estas buscando."
            image={HombreServicios}
            imageAlt="persona viendo su celular"
          />
        </div>
      </section>
    </div>
  );
}