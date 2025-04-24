interface ButtonProps {
  text: string;
  variant: string;
  icon?: string;
}

interface ServicesInterface {
  title: string,
  price?: number,
  image: string,
  discount?: string,
  features: string[],
  buttons?: ButtonProps[]
}