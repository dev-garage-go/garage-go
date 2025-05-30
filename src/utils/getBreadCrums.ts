import { SegmentNameMap } from "@/features/home"
import { firstLetterUppercase } from "./inputs-utils"

export interface Breadcrumb {
  name: string
  href: string | null
  isEllipsis?: boolean
  isLast: boolean
}

export function getBreadcrumbs(pathname: string, maxVisible = 3): Breadcrumb[] {
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length <= maxVisible) {
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      const name = SegmentNameMap[segment] || decodeURIComponent(segment)
      return {
        name: firstLetterUppercase(name),
        href,
        isLast: index === segments.length - 1,
      }
    })
  }

  const first = segments[0]
  const last = segments[segments.length - 1]

  return [
    {
      name: SegmentNameMap[first] || firstLetterUppercase(first),
      href: "/" + first,
      isLast: false,
    },
    {
      name: "...",
      href: null,
      isEllipsis: true,
      isLast: false,
    },
    {
      name: SegmentNameMap[last] || firstLetterUppercase(last),
      href: "/" + segments.join("/"),
      isLast: true,
    }
  ]
}

