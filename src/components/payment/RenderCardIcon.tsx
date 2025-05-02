import { FaCreditCard } from "react-icons/fa";
import { SiMastercard, SiVisa } from "react-icons/si";

interface Props {
  cardType: string
}

// Renderiza un icono de card u otro en base a los numeros de tarjeta
export const RenderCardIcon = ({ cardType }: Props) => {
  switch (cardType) {
    case "visa":
      return <SiVisa className="text-primaryBlue-400 text-3xl" />;
    case "mastercard":
      return <SiMastercard className="text-orange-500 text-2xl" />;
    default:
      return <FaCreditCard className="text-gray-400 text-2xl" />;
  }
};