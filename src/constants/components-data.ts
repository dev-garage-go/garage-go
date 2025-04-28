import {
  Aceite,
  AgendaCotiza,
  BoshWideImg,
  Bridgestone,
  CambioNeumaticos,
  CambioParabrisas,
  ChequeoPreventivo,
  Dunlop,
  EntregaDomicilio,
  Falken,
  Garantia,
  Goodyear,
  Hankook,
  Keko,
  Mantencion,
  Mobil,
  PagaOnline,
  PickAndDelivery,
  PickDelivery,
  Playero,
  ProfilePic1,
  ProfilePic2,
  ProfilePic3,
  ProfilePic4,
  ProfilePic5,
  Repsol,
  RetiroDomicilio,
  Revision,
  SeleccionaTuServicio,
  ServicioDomicilio,
  SuperCheck,
  Thule
} from "@/assets";

const srvPath = '/services'

// Map the 'features' with their images
export const FeatureIconsMap: Record<string, string> = {
  'pick-delivery': PickDelivery,
  'super-check': SuperCheck,
  'garantia': Garantia,
};


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

export const ServicesData: ServicesInterface[] = [
  {
    title: "Mantencion por kilometraje",
    price: 189900,
    image: Mantencion,
    discount: "25% Dcto",
    features: ["pick-delivery", "super-check", "garantia"],
    path: `${srvPath}/mileage_maintenance`
  },
  {
    title: "Gestión de revisión técnica",
    price: 48990,
    image: Revision,
    features: ["pick-delivery"],
    path: `${srvPath}/technical_revision`
  },
  {
    title: "Cambio de aceite",
    price: 78990,
    image: Aceite,
    features: ["super-check", "garantia"],
    path: `${srvPath}/oil_change`
  },
  {
    title: "Cambio de neumáticos",
    image: CambioNeumaticos,
    discount: "3x4",
    features: ["pick-delivery", "super-check", "garantia"],
    buttons: [
      {
        text: "Revisa tu talla",
        variant: "primary"
      },
      {
        text: "Cotizar",
        variant: "secondary",
        icon: "→"
      }
    ],
    path: `${srvPath}/tire_change`
  },
  {
    title: "Servicio de frenos",
    price: 35990,
    image: Aceite,
    features: ["super-check", "garantia"],
    path: `${srvPath}/brake_services`
  },
  {
    title: "Cambio de batería",
    price: 65990,
    image: Revision,
    discount: "25% Dcto",
    features: ["pick-delivery", "super-check", "garantia"],
    path: `${srvPath}/battery_change`
  },
  {
    title: "Cambio de parabrisas",
    price: 125990,
    image: CambioParabrisas,
    features: ["pick-delivery"],
    path: `${srvPath}/windshield_replacement`
  },
  {
    title: "Checkeo preventivo",
    price: 149990,
    image: ChequeoPreventivo,
    features: ["super-check"],
    path: `${srvPath}/preventive_check`
  }
];

export const BenefitsData: BenefitsInterface[] = [
  {
    name: "30% en Mantencion por kilometraje",
    btnString: "Agenda ahora",
    image: Revision
  },
  {
    name: "15% en Cambio de aceita",
    btnString: "Agenda ahora",
    image: Revision
  },
  {
    name: "Gestion de Revision Tecnica",
    btnString: "Cotiza ahora",
    image: Revision
  },
  {
    name: "4x3 en Neumaticos",
    btnString: "Cotiza ahora",
    image: Revision
  },
  {
    name: "20% Cambio de bateria",
    btnString: "Cotiza ahora",
    image: Revision
  },
  {
    name: "15% Chequeo preventivo",
    btnString: "Cotiza ahora",
    image: Revision
  },
  {
    name: "10% Revision tecnica",
    btnString: "Cotiza ahora",
    image: Revision
  },
]

export const BannerInformation: BannerDisccountsInterface[] = [
  {
    title: "Agenda y cotiza en línea",
    description: "Todo en un mismo lugar, reserva y paga tu servicio de manera fácil y rápida. Nosotros nos encargamos del resto. ¿Quieres cotizar algo adicional? Claro que sí. Nuestro equipo se pondrá en contacto a la brevedad para resolver tus necesidades.",
    image: AgendaCotiza,
    imageAlt: "agenda y cotiza"
  },
  {
    title: "Pick&Delivery",
    description: "Mejor que un delivery! Al solicitar tu servicio elige Pick&delivery vamos a buscar y a retirar tu vehículo a domicilio. Al llegar a nuestro hub recibirás una llamada confirmando su llegada Y despacho de vuelta a casa",
    image: PickAndDelivery,
    imageAlt: "pick and delivery"
  },
  {
    title: "Paga en Línea",
    description: "Hacer más fácil el cuidado de tu auto, también es hacer más fácil y cómodo el pago de tus servicio, cancela directo al contratar Tu servicio en nuestra web",
    image: PagaOnline,
    imageAlt: "paga online"
  },
  {
    title: "Todo en un solo lugar",
    description: "En Garage Go! Contamos con un amplio Hub de más de 1.200 mt2 Equipado con todo lo necesario para entregar el mejor servicio. Conoce siempre la ubicación de tu auto, de casa a Garage y de garage a tu casa.",
    image: Playero,
    imageAlt: "imagen de un playero"
  },
]

export const UserReviewsData: ReviewsInterface[] = [
  {
    name: "Valeria Avendaño",
    profilePicture: ProfilePic1,
    score: 4.2,
    opinion: "Muy profesional el servicio entregado, recomienda hacer las mantenciones con ellos."
  },
  {
    name: "Alejandro Cisera",
    profilePicture: ProfilePic2,
    score: 4,
    opinion: "Excelente, recomendado, puntuales y responsables, es primera vez que hago la mantención con retiro y entrega de mi vehiculo y aunque estaba asustada todo fue muy profesional."
  },
  {
    name: "Carlos Aventura",
    profilePicture: ProfilePic3,
    score: 4.5,
    opinion: "excelente atención, servicio entregado en el tiempo y forma acordado, totalmente recomendado"
  },
  {
    name: "Eric Zambrano",
    profilePicture: ProfilePic4,
    score: 4,
    opinion: "Retiraron y vinieron a dejar mi auto a la casa, sin costo Lo entregaron limpio por dentro y por fuera, siempre fueron transparentes con los procedimientos que requeria mi vehiculo"
  },
  {
    name: "Elias Maldonado",
    profilePicture: ProfilePic5,
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

export const CompanySuppliersImages: CompanySuppliersImagesInterface[] = [
  {
    name: "Bridgestone",
    image: Bridgestone
  },
  {
    name: "Dunlop",
    image: Dunlop
  },
  {
    name: "Falken",
    image: Falken
  },
  {
    name: "Goodyear",
    image: Goodyear
  },
  {
    name: "Bosh",
    image: BoshWideImg
  },
  {
    name: "Hankook",
    image: Hankook
  },
  {
    name: "Keko",
    image: Keko
  },
  {
    name: "Mobil",
    image: Mobil
  },
  {
    name: "Repsol",
    image: Repsol
  },
  {
    name: "Thule",
    image: Thule
  },
]

// Steps services pages
export const StepsMileageMaintenance: StepsMileageMaintenceInterface[] = [
  {
    title: '1. Selecciona tu servicio',
    description: 'Agenda, cotiza y reserva. Sigue los pasos y paga en línea.',
    imageUrl: SeleccionaTuServicio,
    imageAlt: 'persona seleccionando su servicio'
  },
  {
    title: '2. Retiro a domicilio',
    description: 'Una vez agendado, retiraremos tu vehículo a domicilio,',
    imageUrl: RetiroDomicilio,
    imageAlt: 'retiramos tu vehiculo a domicilio'
  },
  {
    title: '3. Servicio y seguimiento',
    description: 'Realizamos tu servicio directo en nuestro HUB.',
    imageUrl: ServicioDomicilio,
    imageAlt: 'taller de vehiculos'
  },
  {
    title: '4. Entrega a domicilio',
    description: 'Nuestro servicio de Pick&deliver Asegura el trayecto ida y vuelta.',
    imageUrl: EntregaDomicilio,
    imageAlt: 'entregamos el vehiculo a tu domicilio'
  },
]

// FAQs services pages
export const TechnicalRevisionFAQs: ServicesPagesFAQs[] = [
  {
    question: '¿Que es la Gestión de RT?',
    answer: 'La Revisión técnica es un control obligatorio y pre requisito para acceder a los permisos municipales de circulación. En Chile es de carácter obligatorio para asegurar el correcto funcionamiento al momento de circular'
  },
  {
    question: '¿Cómo evitar el rechazo?',
    answer: 'Antes de presentarlo realizaremos un super check de 35 puntos, en este diagnóstico nos aseguramos de que el vehículo cumpla con los estándares mínimos para circular.'
  },
  {
    question: '¿Qué pasa si el vehículo no aprueba?',
    answer: 'Con el diagnóstico presentado por la PRT, te presentaremos un presupuesto para solucionar los desperfectos y presentarlo nuevamente.'
  },
  {
    question: '¿Que medios de pago aceptan?',
    answer: 'Aceptamos todo medio de pagos, transferencia electrónica, débito, credito, contamos con link de pago y pagos via POS Getnet.'
  },
]
export const MileageMaintenanceFAQs: ServicesPagesFAQs[] = [
  {
    question: 'Servicios incluidos',
    hasAnswerItems: true,
    answersItems: ['Cambio aceite', 'Cambio filtro de aceite', 'Cambios filtro de polen', 'Cambio filtro de aire', 'Aseo de frenos', 'Rotación de neumáticos', 'Relleno de fluidos', 'Lavado express de cortesía', 'Super check de 35 puntos', 'Retiro y entrega a domicilio']
  },
  {
    question: '¿Cuanto es la garantía del servicio?',
    answer: 'Todos nuestros servicios cuentan con un periódo de garantía de 6 meses o 10.000 kms. A partir de la fecha de la entrega del vehículo.'
  },
  {
    question: '¿Cómo cancelar un servicio?',
    answer: 'Una vez agendado y cancelado el servicio cuentas con un periodo de 2 horas previas al retiro o entrega de la unidad para solicitar un reembolso o re agendar tu servicio.'
  },
  {
    question: '¿Que medios de pago aceptan?',
    answer: 'Aceptamos todo medio de pagos, transferencia electrónica, débito, credito, contamos con link de pago y pagos vía POS Getnet.'
  },
]