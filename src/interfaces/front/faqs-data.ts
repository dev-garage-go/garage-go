export interface FAQsInterface {
  question: string,
  answer: string,
}

export interface ServicesPagesFAQs {
  hasAnswerItems?: boolean,
  answersItems?: string[]
  question: string
  answer?: string
  imageSrc?: string
  imageAlt?: string
}