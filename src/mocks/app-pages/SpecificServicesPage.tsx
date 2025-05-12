import { getServiceBySlug } from "../backend-actions/getServiceBySlug";

// estas paginas estarian centralizadas en la carpeta 'custom-pages' o 'app-pages'
import OilChangePage from "./OilChangePage";
import BatteryChangePage from "./BatteryChangePage";
import { notFound } from "next/navigation";

interface Props {
  params: {
    service: string
  }
}

const mapServiceSlugAndPages: Record<string, React.FC> = {
  oil_change: OilChangePage,
  battery_change: BatteryChangePage
};

// path: app/(shop)/services/[service]/page.tsx
export default function SpecificServicesPage({ params }: Props) {
  const service = getServiceBySlug(params.service) // obtiene todos los datos del servicio en base a su slug

  const Component = mapServiceSlugAndPages[service.slug] // mapea el service.slug devolviendo su componente
  if (!Component) { return notFound() } // next lanza un NotFound 404 y redirige a dicha pagina 

  return <Component />
}