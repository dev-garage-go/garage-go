import dynamic from "next/dynamic"
import { ModalPortal, Loader } from "@/components"

export const LazyVehicleDataModal = dynamic(() =>
  import("@/components/general/ui/VehicleDataModal")
    .then(mod => mod.VehicleDataModal),
  {
    ssr: false,
    loading: () => (
      <ModalPortal>
        <Loader className="bg-primaryBlue-50" />
      </ModalPortal>
    )
  }
)
