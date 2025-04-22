"use client"

import { useState } from "react"
import { HeaderLinksOptions } from "@/constants"
import { IoCloseCircle, IoReorderThreeOutline } from "react-icons/io5"
import { HeaderOption, BookingButton, WhatsAppButton } from "@/components"

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <nav className="bg-primaryBlue-500">
      {/* Mobile - Hamburger btn */}
      <button
        onClick={() => setMenuOpen(true)}
        className='block sm:hidden px-4 py-3  items-center'
      >
        <IoReorderThreeOutline
          size={26}
          className='text-white'
        />
      </button>

      {/* Sidebar - mobile */}
      {menuOpen && (
        <aside className='absolute top-0 w-full min-h-screen z-20 bg-white'>
          <button
            className='w-full h-full bg-blue-200'
            onClick={() => setMenuOpen(false)}
          >
            <IoCloseCircle
              size={30}
              className='absolute right-4 top-4 text-neutral-800'
            />
          </button>

          <ul className="flex-col sm:hidden mt-20">
            <HeaderOption
              mobile
              options={HeaderLinksOptions}
            />
          </ul>

          {/* Whatsapp and booking buttons */}
          <div className='flex gap-3 justify-center items-center h-fit mt-20'>
            <WhatsAppButton />
            <BookingButton />
          </div>
        </aside>
      )}


      {/* Desktop - Links menu */}
      <div className="hidden sm:flex justify-between items-center">
        <ul className="w-full bg-primaryBlue-500 flex justify-center items-center">
          <HeaderOption
            options={HeaderLinksOptions}
          />
        </ul>
      </div>
    </nav>
  )
}
