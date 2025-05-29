import { assets } from "../images/index"

export type AssetCategory = keyof typeof assets
export type AssetKey<Category extends AssetCategory> = keyof typeof assets[Category]

// obtain the image with the 'category' and the 'key' of the asset object
export const obtainImage = <
  C extends keyof typeof assets,
  K extends keyof (typeof assets)[C]
>(
  category: C,
  key: K
): (typeof assets)[C][K] => {
  return assets[category][key]
}