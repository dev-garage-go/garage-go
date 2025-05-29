"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { IoReorderThreeOutline } from "react-icons/io5"

import { HeaderOption, SideBar } from "@/features"
import { HeaderLinksOptions } from "@/constants"

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const pathname = usePathname();

  // If the path changes the sidebar will close.
  useEffect(() => {
    setMenuOpen(false)
  },[pathname])

  return (
    <nav className="bg-primaryBlue-500">
      {/* Mobile - Hamburger btn */}
      <button
        onClick={() => setMenuOpen(true)}
        className='block sm:hidden px-4 py-3 items-center'
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
          {
            HeaderLinksOptions.map((opt, index) => (
              <HeaderOption key={index + opt.title} {...opt}
              />
            ))
          }
        </ul>
      </div>
    </nav>
  )
}
