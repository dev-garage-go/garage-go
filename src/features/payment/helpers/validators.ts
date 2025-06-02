import { PaymentGatewayMethodsType, UserCardInterface } from "@/features/payment";

export const hasCardData = (card?: UserCardInterface): boolean => {
  return !!card?.cardNumber || !!card?.expiresIn || !!card?.cvv || !!card?.ownerName
}

export const hasValidCardData = (card?: UserCardInterface): boolean => {
  const validCard = card?.cardNumber && card.cardNumber.length === 19
  const validCVV = card?.cvv && card.cvv.length === 3
  const validExpiry = card?.expiresIn && card.expiresIn.length === 5
  const validOwnerName = card?.ownerName && card.ownerName.length >= 2

  if (validCard && validCVV && validExpiry && validOwnerName) { return true }
  else { return false }
}

export const hasValidPaymentGateway = (paymentGateway: PaymentGatewayMethodsType): boolean => {
  if (paymentGateway != undefined) {
    return ["getnet", "mercado-pago", "webpay"].includes(paymentGateway);
  } else { return false }
}

export const hasCompletedPaymentData = (paymentGateway: PaymentGatewayMethodsType, card?: UserCardInterface): boolean => {
  // the user cant choose both payment methods
  if (hasValidCardData(card) && hasValidPaymentGateway(paymentGateway)) { return false }
  else if (hasValidCardData(card) || hasValidPaymentGateway(paymentGateway)) { return true }
  else { return false }
}
