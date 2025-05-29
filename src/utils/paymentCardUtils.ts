import { PaymentGatewayMethods, UserCard } from "@/features/payment";

type typeCards = "visa" | "mastercard" | "amex" | "unknown"

export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")            // delete no-numbers
    .replace(/(.{4})/g, "$1 ")     // every 4 digits leave a space
    .trim();
};

export const detectCardType = (number: string): typeCards => {
  const clean = number.replace(/\s+/g, "");

  if (/^4/.test(clean)) return "visa";
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";

  return "unknown";
};

export const formatExpiry = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) return cleaned;
  return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
};


// Validators
export const hasCardData = (card?: UserCard): boolean => {
  return !!card?.cardNumber || !!card?.expiresIn || !!card?.cvv || !!card?.ownerName
}

export const hasValidCardData = (card?: UserCard): boolean => {
  const validCard = card?.cardNumber && card.cardNumber.length === 19
  const validCVV = card?.cvv && card.cvv.length === 3
  const validExpiry = card?.expiresIn && card.expiresIn.length === 5
  const validOwnerName = card?.ownerName && card.ownerName.length >= 2

  if (validCard && validCVV && validExpiry && validOwnerName) { return true }
  else { return false }
}

export const hasValidPaymentGateway = (paymentGateway: PaymentGatewayMethods): boolean => {
  if (paymentGateway != undefined) {
    return ["getnet", "mercado-pago", "webpay"].includes(paymentGateway);
  } else { return false }
}

export const hasCompletedPaymentData = (paymentGateway: PaymentGatewayMethods, card?: UserCard): boolean => {
  // the user cant choose both payment methods
  if (hasValidCardData(card) && hasValidPaymentGateway(paymentGateway)) { return false }
  else if (hasValidCardData(card) || hasValidPaymentGateway(paymentGateway)) { return true }
  else { return false }
}
