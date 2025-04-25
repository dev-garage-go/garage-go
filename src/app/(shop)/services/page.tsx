import Image from "next/image";
import { Services } from "@/assets";
import { TopBanner } from "@/components";

export default function ServicesPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <TopBanner
        title="agenda tu servicio ahora"
        description="Todo lo que necesita tu auto al precio más conveniente y un solo lugar."
      />

      <div className="hidden xl:block absolute top-20 right-72 z-20 w-[600px] h-[400px]">
        <Image
          src={Services}
          alt="persona feliz con los servicios"
          fill
          priority
          className="object-contain w-auto h-auto"
        />
      </div>
    </div>
  );
}