import Image from "next/image";

import { Services } from "@/assets";
import { TopBanner, ServicesGrid } from "@/components";

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

        </div>
      </section>
    </div>
  );
}