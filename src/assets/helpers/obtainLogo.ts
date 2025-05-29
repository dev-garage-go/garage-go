import { logos } from "../logos"

export type LogoCategory = keyof typeof logos
export type LogoKey<Category extends LogoCategory> = keyof typeof logos[Category]

// obtain the image with the 'category' and the 'key' of the asset object
export const obtainLogo = <
  C extends keyof typeof logos,
  K extends keyof (typeof logos)[C]
>(
  category: C,
  key: K
): (typeof logos)[C][K] => {
  return logos[category][key]
}