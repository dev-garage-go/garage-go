export const firstLetterUppercase = (value: string) => {
  const formatted = value.at(0)?.toUpperCase() + value.slice(1)
  return formatted
}