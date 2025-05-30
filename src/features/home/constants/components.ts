import { obtainImage } from "@/assets/helpers";

import {
  HeaderOptionInterface,
  BannerDisccountsInterface,
  BenefitsInterface,
  ReviewsInterface,
  FAQsInterface
} from "@/features/home";

// Header options to navigate
export const HeaderLinksOptions: HeaderOptionInterface[] = [
  {
    title: "Inicio",
    path: "/"
  },
  {
    title: "Servicios",
    path: "/services"
  },
  {
    title: "Herramientas",
    path: "/tools"
  },
  {
    title: "Pick&delivery",
    path: "/pick_delivery"
  },
  {
    title: "Servicio empresas",
    path: "/corporates_service"
  },
  {
    title: "Blog",
    path: "/blog"
  },
]

export const BenefitsData: BenefitsInterface[] = [
  {
    name: "30% en Mantencion por kilometraje",
    btnString: "Agenda ahora",
    image: obtainImage('benefits', 'benefits30Percent')
  },
  {
    name: "15% en Cambio de aceita",
    btnString: "Agenda ahora",
    image: obtainImage('benefits', 'benefits15Percent')
  },
  {
    name: "Gestion de Revision Tecnica",
    btnString: "Cotiza ahora",
    image: obtainImage('benefits', 'benefitsTechnical')
  },
  {
    name: "4x3 en Neumaticos",
    btnString: "Cotiza ahora",
    image: obtainImage('benefits', 'benefits4x3Tires')
  },
]

export const BannerInformation: BannerDisccountsInterface[] = [
  {
    title: "Agenda y cotiza en línea",
    description: "Todo en un mismo lugar, reserva y paga tu servicio de manera fácil y rápida. Nosotros nos encargamos del resto. ¿Quieres cotizar algo adicional? Claro que sí. Nuestro equipo se pondrá en contacto a la brevedad para resolver tus necesidades.",
    image: obtainImage('banners', 'agendaCotiza'),
    imageAlt: "agenda y cotiza"
  },
  {
    title: "Pick&Delivery",
    description: "Mejor que un delivery! Al solicitar tu servicio elige Pick&delivery vamos a buscar y a retirar tu vehículo a domicilio. Al llegar a nuestro hub recibirás una llamada confirmando su llegada Y despacho de vuelta a casa",
    image: obtainImage('banners', 'pickAndDelivery'),
    imageAlt: "pick and delivery"
  },
  {
    title: "Paga en Línea",
    description: "Hacer más fácil el cuidado de tu auto, también es hacer más fácil y cómodo el pago de tus servicio, cancela directo al contratar Tu servicio en nuestra web",
    image: obtainImage('banners', 'pagaOnline'),
    imageAlt: "paga online"
  },
  {
    title: "Todo en un solo lugar",
    description: "En Garage Go! Contamos con un amplio Hub de más de 1.200 mt2 Equipado con todo lo necesario para entregar el mejor servicio. Conoce siempre la ubicación de tu auto, de casa a Garage y de garage a tu casa.",
    image: obtainImage('banners', 'playero'),
    imageAlt: "imagen de un playero"
  },
]

export const UserReviewsData: ReviewsInterface[] = [
  {
    name: "Valeria Avendaño",
    profilePicture: obtainImage('profiles', 'profilePic1'),
    score: 4.2,
    opinion: "Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos.Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos."
  },
  {
    name: "Valeria Avendaño",
    profilePicture: obtainImage('profiles', 'profilePic1'),
    score: 4.2,
    opinion: "Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos."
  },
  {
    name: "Alejandro Cisera",
    profilePicture: obtainImage('profiles', 'profilePic2'),
    score: 4,
    opinion: "Excelente, recomendado, puntuales y responsables, es primera vez que hago la mantención con retiro y entrega de mi vehiculo y aunque estaba asustada todo fue muy profesional."
  },
  {
    name: "Carlos Aventura",
    profilePicture: obtainImage('profiles', 'profilePic3'),
    score: 4.5,
    opinion: "excelente atención, servicio entregado en el tiempo y forma acordado, totalmente recomendado"
  },
  {
    name: "Eric Zambrano",
    profilePicture: obtainImage('profiles', 'profilePic4'),
    score: 4,
    opinion: "Retiraron y vinieron a dejar mi auto a la casa, sin costo Lo entregaron limpio por dentro y por fuera, siempre fueron transparentes con los procedimientos que requeria mi vehiculo"
  },
  {
    name: "Elias Maldonado",
    profilePicture: obtainImage('profiles', 'profilePic5'),
    score: 5,
    opinion: "Recomiendo mucho esta empresa y servicio"
  },
]

export const FAQsData: FAQsInterface[] = [
  {
    question: '¿Cómo funciona Garage Go?',
    answer: 'Puedes agendar, cotizar y reservar directo a través de nuestra web o chateando con nuestros ejecutivos por WhatsApp. Elegí la modalidad de retiro o presencial, ¡y listo!',
  },
  {
    question: '¿Cuánto es la garantía del servicio?',
    answer: 'Todos nuestros servicios cuentan con un período de garantía de 10.000 kms a partir de la fecha de entrega del vehículo.',
  },
  {
    question: '¿Pick&delivery tiene garantía?',
    answer: 'Sí, contamos con seguro de accidentes personales y cobertura para tu vehículo de ida y vuelta.',
  },
  {
    question: '¿Cómo cancelar un servicio?',
    answer: 'Una vez agendado y cancelado el servicio, contás con un período previo al retiro o entrega de la unidad para solicitar un reembolso.',
  },
  {
    question: '¿Qué medios de pago aceptan?',
    answer: 'Aceptamos todo tipo de pagos. Podés pagar tu servicio contra entrega con débito, crédito, link de pago o POS Getnet.',
  },
]
