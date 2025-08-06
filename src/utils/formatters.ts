export const firstLetterUppercase = (value: string): string => {
  const formatted = value.at(0)?.toUpperCase() + value.slice(1)
  return formatted
}

export const allowOnlyLetters = (value: string): string => {
  const formatted = value.replace(/[0-9]/g, '')
  return formatted
}

export const allowOnlyNumbers = (value: string): string => {
  const formatted = value.replace(/[^0-9]/g, '')
  return formatted
}

// Cans receive numbers or string and set by putting points every 3 numbers. Instead 10000, return 10.000
export const formatNumberWithDots = (value: string | number): string => {
  const str = typeof value === 'number' ? value.toString() : value;
  const cleaned = str.replace(/\D/g, '');
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function removeDotsFromNumber(input: string | number): string {
  return input.toString().replace(/\./g, "");
}

export const roundedDecimals = (num: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.ceil(num * factor) / factor
}

// Validate ISO string
export const validISOString = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/
  return regex.test(date) && !isNaN(Date.parse(date))
}