import dynamic from "next/dynamic"
import { Loader } from "@/components"

export const LazyConfirmationBookingModal = dynamic(() =>
  import("../ConfirmationBookingModal").then(mod => mod.ConfirmationBookingModal),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0">
        <Loader
          bgModal="bg-primaryBlue-50/80"
          bgLoader={false}
          txtColor="text-black"
        />
      </div>
    )
  }
)
