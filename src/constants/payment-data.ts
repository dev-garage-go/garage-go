import { Getnet, MercadoPago, Webpay } from "@/assets";
import { PaymentGatewayMethodsOptionsInterface } from "@/interfaces";

export const PaymentMethodsOptions: PaymentGatewayMethodsOptionsInterface[] = [
  {
    method: "webpay",
    name: "Webpay Plus",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: Webpay,
  },
  {
    method: "getnet",
    name: "Transferencia",
    description: "Botón de pago para transferencias bancarias",
    imageSrc: Getnet,
  },
  {
    method: "mercado-pago",
    name: "Billetera virtual",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: MercadoPago,
  },
];