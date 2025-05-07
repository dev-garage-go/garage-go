import { PaymentMethods } from "@/interfaces";

export type PaymentFormInputs = {
  cardNumber: string;
  ownerName: string;
  expiresIn: string;
  cvv: number;
  paymentMethod: PaymentMethods;
}