import { obtainImage } from "@/assets/helpers"
import { ServicePageFAQsInterface } from "@/features/services"

// FAQs services pages
export const TechnicalRevisionFAQsData: ServicePageFAQsInterface[] = [
  {
    question: '¿Que es la Gestión de RT?',
    answer: 'La Revisión técnica es un control obligatorio y pre requisito para acceder a los permisos municipales de circulación. En Chile es de carácter obligatorio para asegurar el correcto funcionamiento al momento de circular.'
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

export const MileageMaintenanceFAQsData: ServicePageFAQsInterface[] = [
  {
    question: 'Servicios incluidos',
    hasAnswerItems: true,
    answersItems: ['Cambio aceite.', 'Cambio filtro de aceite.', 'Cambios filtro de polen.', 'Cambio filtro de aire.', 'Aseo de frenos.', 'Rotación de neumáticos.', 'Relleno de fluidos.', 'Lavado express de cortesía.', 'Super check de 35 puntos.', 'Retiro y entrega a domicilio.']
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

export const OildAndFilterChangeFAQsData: ServicePageFAQsInterface[] = [
  {
    question: '¿Por qué debo realizarlo?',
    answer: 'El aceite es el corazón del motor, y su cambio regular es clave para mantenerlo en óptimas condiciones. Lubrica las piezas internas, reduce el desgaste, disipa el calor y prolonga la vida útil del motor mejorándotelas su desempeño y evitando fallas costosas a futuro.'
  },
  {
    question: '¿Cada cuanto tiempo se realiza?',
    answer: 'La frecuencia del cambio de aceite y filtro depende del tipo de aceite y el uso del vehículo. En general, se recomienda hacerlo cada 10,000 km o cada 6 meses, según las indicaciones del fabricante.'
  },
  {
    question: '¿Que medios de pago aceptan?',
    answer: 'Aceptamos todo medio de pagos, transferencia electrónica, débito, credito, contamos con link de pago y pagos vía POS Getnet.'
  },
]

export const TiresChangeFAQsData: ServicePageFAQsInterface[] = [
  {
    question: '¿Qué datos necesito para cotizar?',
    answer: 'Para poder cotizar tus neumáticos es necesario contar con las medidas de ancho, perfil y aro. Esta información esta al costado de tus neumáticostico.',
    imageSrc: obtainImage('promotions', 'infoRuedas'),
    imageAlt: 'informacion de cubiertas'
  },
  {
    question: '¿Qué incluye el servicio?',
    hasAnswerItems: true,
    answersItems: ["Instalación y balanceo de los neumáticos.", "Servicio de Pick & delivery, retiro y entrega a domicilio.", "Super Check de 35 puntos.", "Lavado express."]
  },
  {
    question: '¿Cuando debo cambiarlos?',
    answer: "Regularmente cada 60 mil kilómetros es recomendable cambiarlos, aunque depende mucho del uso y el terreno que recorras. fíjate en en el ruido que hagan sobre terrenos planos o con calor, si rechinan contra el asfalto, si notas que las huellas se han borrado o si los surcos son de menos 0,5 cm, deberías cambiarlos."
  },
  {
    question: '¿Que medios de pago aceptan?',
    answer: 'Aceptamos todo medio de pagos, transferencia electrónica, débito, credito, contamos con link de pago y pagos vía POS Getnet.'
  },
]