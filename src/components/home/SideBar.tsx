import { IoCloseCircle } from "react-icons/io5"
import { HeaderOption } from "./HeaderOption"
import { WhatsAppButton } from "./WhatsAppButton"
import { BookingButton } from "./BookingButton"
import { HeaderLinksOptions } from "@/constants"

interface SideBarProps {
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}

export const SideBar = ({ menuOpen, setMenuOpen }: SideBarProps) => {
  return (
    <div
      className={`
        fixed inset-0 z-40 sm:hidden bg-black bg-opacity-40
        transition-opacity duration-300
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setMenuOpen(false)}
    >
      {/* Sidebar en sí */}
      <aside
        className={`
          fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // evita cerrar al clickear adentro
      >
        <button
          className='absolute right-4 top-4'
          onClick={() => setMenuOpen(false)}
        >
          <IoCloseCircle size={30} className='text-neutral-800' />
        </button>

        <ul className="flex-col mt-20 px-4">
          <HeaderOption mobile options={HeaderLinksOptions} />
        </ul>

        <div className='flex gap-3 justify-center items-center mt-20'>
          <WhatsAppButton />
          <BookingButton />
        </div>
      </aside>
    </div>
  )
}
