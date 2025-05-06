// Cans receive numbers or string and set by putting points every 3 numbers. Instead 10000, return 10.000
export const formatNumberWithDots = (value: string | number): string => {
  const str = typeof value === 'number' ? value.toString() : value;
  const cleaned = str.replace(/\D/g, '');
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
