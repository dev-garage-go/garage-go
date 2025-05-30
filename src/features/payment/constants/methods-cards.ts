import { obtainImage } from "@/assets/helpers";
import { PaymentGatewayMethodsOptionsInterface } from "@/features/payment";

export const PaymentMethodsOptions: PaymentGatewayMethodsOptionsInterface[] = [
  {
    method: "webpay",
    name: "Webpay Plus",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: obtainImage('payment', 'webpay'),
  },
  {
    method: "getnet",
    name: "Transferencia",
    description: "Botón de pago para transferencias bancarias",
    imageSrc: obtainImage('payment', 'getnet'),
  },
  {
    method: "mercado-pago",
    name: "Billetera virtual",
    description: "Tarjetas de débito, crédito y prepago.",
    imageSrc: obtainImage('payment', 'mercadoPago'),
  },
];