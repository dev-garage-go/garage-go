import { MultiAgentWhatsAppLink } from "@/features/home";
import { IoCalendarOutline } from "react-icons/io5";

export const BookingHeaderButton = () => {
  return (
    <a
      href={MultiAgentWhatsAppLink}
      target="_blank"
      rel="noreferrer nofollow"
      className="btn-base-style bg-primaryBlue-500 hover:bg-primaryBlue-600 duration-300 shadow-sm"
    >
      <IoCalendarOutline
        size={20}
        className="text-white"
      />
      Agenda en línea
    </a>
  )
}
