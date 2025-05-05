import { IoCalendarOutline } from "react-icons/io5";

export const BookingHeaderButton = () => {
  return (
    <button
      className="btn-base-style bg-primaryBlue-500 hover:opacity-90 shadow-sm"
    >
      <IoCalendarOutline
        size={20}
        className="text-white"
      />
      Agenda en línea
    </button>
  )
}
