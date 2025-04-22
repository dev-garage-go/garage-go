"use client"

import { useState } from "react"
import { HeaderLinksOptions } from "@/constants"
import { IoReorderThreeOutline } from "react-icons/io5"
import { HeaderOption } from "@/components"
import { SideBar } from "./SideBar"

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

      {/* Mobile - Sidebar */}
      <SideBar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

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
