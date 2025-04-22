"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  mobile?: boolean
  options: HeaderOption[]
}

export const HeaderOption = ({ mobile, options }: Props) => {
  const pathname = usePathname()

  return (
    <>
      {mobile ? options.map((opt) => (
        <li
          key={opt.title}
          className='grid grid-cols-1 gap-8 bg-primaryBlue-500 m-4 rounded-md'
        >
          <Link
            href={opt.path}
            className={clsx(
              "block px-4 py-3 text-sm font-light transition-colors rounded-md",
              pathname === opt.path
                ? "bg-white text-primaryBlue-500 border border-primaryBlue-500"
                : "text-white hover:bg-primaryBlue-700"
            )}
          >
            {opt.title}
          </Link>
        </li>
      )
      ) : (
        options.map((opt) => (
          <li key={opt.title}>
            <Link
              href={opt.path}
              className={clsx(
                "hidden sm:block px-4 py-3 text-center transition-colors text-sm font-light",
                pathname === opt.path
                  ? "bg-white text-primaryBlue-500 border border-primaryBlue-500"
                  : "text-white hover:bg-primaryBlue-700"
              )}
            >
              {opt.title}
            </Link>
          </li>
        ))
      )}
    </>
  )
}
