interface BannerDisccountsInterface {
  title: string,
  description: string,
  image: string,
  imageAlt: string,
  hasButton?: boolean,
  buttonString?: string,
  buttonStyle?: string
  buttonFunc?: () => void
}