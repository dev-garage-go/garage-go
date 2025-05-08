import { PaymentMethods } from "@/interfaces";

export type PaymentMethodFormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: number;
  paymentMethod: PaymentMethods;
}