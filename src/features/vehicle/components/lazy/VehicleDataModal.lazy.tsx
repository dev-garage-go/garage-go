import dynamic from "next/dynamic"
import { Loader, ModalPortal } from "@/components"

export const LazyVehicleDataModal = dynamic(() =>
  import("@/features/vehicle/components/VehicleDataModal")
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
