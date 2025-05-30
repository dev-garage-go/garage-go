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
