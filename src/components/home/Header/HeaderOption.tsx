"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  mobile?: boolean,
  title: string,
  path: string
}

export const HeaderOption = ({ mobile = false, title, path }: Props) => {
  const pathname = usePathname()

  return (
    <>
      {mobile ? (
        <li
          key={title}
          className='grid grid-cols-1 gap-8 bg-primaryBlue-500 m-4 rounded-md'
        >
          <Link
            href={path}
            className={clsx(
              "block px-4 py-3 text-sm font-light transition-colors rounded-md",
              pathname === path
                ? "bg-white text-primaryBlue-500 border border-primaryBlue-500"
                : "text-white hover:bg-primaryBlue-700 duration-300"
            )}
          >
            {title}
          </Link>
        </li>
      ) : (
        (
          <li key={title}>
            <Link
              href={path}
              className={clsx(
                "hidden sm:block px-4 py-2 text-center transition-colors text-sm font-light",
                pathname === path
                  ? "bg-white text-primaryBlue-500 border border-primaryBlue-500"
                  : "text-white hover:bg-primaryBlue-700 duration-300"
              )}
            >
              {title}
            </Link>
          </li>
        )
      )}
    </>
  )
}
