import { obtainImage } from "@/assets/helpers";
import {
  QuantityTires,
  ServicesCardsInterface,
  StepsServicesPagesInterface,
  VehicleMileagesOptions
} from "@/features/services";

const srvPath = '/services'

// Map the 'features' with their images
export const VehicleServicesFeaturesIconsMap: Record<string, string> = {
  'pick-delivery': obtainImage('services', 'pickDelivery'),
  'super-check': obtainImage('services', 'superCheck'),
  'garantia': obtainImage('services', 'garantia'),
};

export const ServicesCardsData: ServicesCardsInterface[] = [
  {
    title: "Mantencion por kilometraje",
    price: 189900,
    image: obtainImage('services', 'mantencion'),
    discount: "25% Dcto",
    features: ["pick-delivery", "super-check", "garantia"],
    path: `${srvPath}/mileage_maintenance`
  },
  {
    title: "Gestión de revisión técnica",
    price: 48990,
    image: obtainImage('services', 'revision'),
    features: ["pick-delivery"],
    path: `${srvPath}/technical_revision`
  },
  {
    title: "Cambio de aceite",
    price: 78990,
    image: obtainImage('services', 'aceite'),
    features: ["super-check", "garantia"],
    path: `${srvPath}/oil_and_filter_change`
  },
  {
    title: "Cambio de neumáticos",
    image: obtainImage('services', 'cambioNeumaticos'),
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
    path: `${srvPath}/tires_change`
  },
  {
    title: "Servicio de frenos",
    price: 35990,
    image: obtainImage('services', 'aceite'),
    features: ["super-check", "garantia"],
    path: `${srvPath}/brake_services`
  },
  {
    title: "Cambio de batería",
    price: 65990,
    image: obtainImage('services', 'revision'),
    discount: "25% Dcto",
    features: ["pick-delivery", "super-check", "garantia"],
    path: `${srvPath}/battery_change`
  },
  {
    title: "Cambio de parabrisas",
    price: 125990,
    image: obtainImage('services', 'cambioParabrisas'),
    features: ["pick-delivery"],
    path: `${srvPath}/windshield_replacement`
  },
  {
    title: "Checkeo preventivo",
    price: 149990,
    image: obtainImage('services', 'chequeoPreventivo'),
    features: ["super-check"],
    path: `${srvPath}/preventive_check`
  }
];

// Steps services pages
export const StepsMileageMaintenanceData: StepsServicesPagesInterface[] = [
  {
    title: '1. Selecciona tu servicio',
    description: 'Agenda, cotiza y reserva. Sigue los pasos y paga en línea.',
    imageUrl: obtainImage('services', 'seleccionaTuServicio'),
    imageAlt: 'persona seleccionando su servicio'
  },
  {
    title: '2. Retiro a domicilio',
    description: 'Una vez agendado, retiraremos tu vehículo a domicilio,',
    imageUrl: obtainImage('services', 'retiroDomicilio'),
    imageAlt: 'retiramos tu vehiculo a domicilio'
  },
  {
    title: '3. Servicio y seguimiento',
    description: 'Realizamos tu servicio directo en nuestro HUB.',
    imageUrl: obtainImage('services', 'servicioDomicilio'),
    imageAlt: 'taller de vehiculos'
  },
  {
    title: '4. Entrega a domicilio',
    description: 'Nuestro servicio de Pick&deliver Asegura el trayecto ida y vuelta.',
    imageUrl: obtainImage('services', 'entregaDomicilio'),
    imageAlt: 'entregamos el vehiculo a tu domicilio'
  },
]

export const StepsTechnicalRevisionData: StepsServicesPagesInterface[] = [
  {
    title: '1. Selecciona tu servicio',
    description: 'Agenda, cotiza y reserva. Sigue los pasos y paga en línea.',
    imageUrl: obtainImage('services', 'seleccionaTuServicio'),
    imageAlt: 'persona seleccionando su servicio'
  },
  {
    title: '2. Retiro a domicilio',
    description: 'Una vez agendado, retiraremos tu vehículo a domicilio,',
    imageUrl: obtainImage('services', 'retiroDomicilio'),
    imageAlt: 'retiramos tu vehiculo a domicilio'
  },
  {
    title: '3. Lo llevamos a la planta',
    description: 'Antes realizaremos un super check Y si no pasa, te presentaremos una cotizacion para resolverlo.',
    imageUrl: obtainImage('services', 'revisionTecnica'),
    imageAlt: 'taller de vehiculos'
  },
  {
    title: '4. Entrega a domicilio',
    description: 'Nuestro servicio de Pick&deliver Asegura el trayecto ida y vuelta.',
    imageUrl: obtainImage('services', 'entregaDomicilio'),
    imageAlt: 'entregamos el vehiculo a tu domicilio'
  },
]

export const StepsOilAndFilterChangeData: StepsServicesPagesInterface[] = [
  {
    title: '1. Selecciona tu servicio',
    description: 'Agenda, cotiza y reserva. Sigue los pasos y paga en línea.',
    imageUrl: obtainImage('services', 'seleccionaTuServicio'),
    imageAlt: 'persona seleccionando su servicio'
  },
  {
    title: '2. Preséntate con tu vehiculo',
    description: 'Te esperamos directo en nuestro HUB. Consulta por Pick&delivery',
    imageUrl: obtainImage('services', 'retiroDomicilio'),
    imageAlt: 'retiramos tu vehiculo a domicilio'
  },
  {
    title: '3. Realizamos el servicio',
    description: 'Tu cambio de aceite y filtro según los requerimientos del fabricante.',
    imageUrl: obtainImage('services', 'revisionTecnica'),
    imageAlt: 'taller de vehiculos'
  },
  {
    title: '4. Entrega de la unidad',
    description: 'Te avisaremos cuando tu auto este listo para que lo retires.',
    imageUrl: obtainImage('services', 'entregaDomicilio'),
    imageAlt: 'entregamos el vehiculo a tu domicilio'
  },
]

export const StepsTiresChangeData: StepsServicesPagesInterface[] = [
  {
    title: '1. Ingresa a nuestro cotizador',
    description: 'Completa los datos de ancho, perfil y aro de tus neumáticosticos',
    imageUrl: obtainImage('services', 'seleccionaTuServicio'),
    imageAlt: 'persona seleccionando su servicio'
  },
  {
    title: '2. Retiro a domicilio',
    description: 'Una vez agendado, retiraremos tu vehículo a domicilio.',
    imageUrl: obtainImage('services', 'retiroDomicilio'),
    imageAlt: 'retiramos tu vehiculo a domicilio'
  },
  {
    title: '3. Cambio y balanceo',
    description: 'Tus cambio incluye instalación, balanceo y servicios adicionales.',
    imageUrl: obtainImage('services', 'revisionTecnica'),
    imageAlt: 'taller de vehiculos'
  },
  {
    title: '4. Entrega a domicilio',
    description: 'Nuestro servicio de Pick&deliver Asegura el trayecto ida y vuelta.',
    imageUrl: obtainImage('services', 'entregaDomicilio'),
    imageAlt: 'entregamos el vehiculo a tu domicilio'
  },
]

export const QuantityTiresOptionsData: { label: string, value: QuantityTires }[] = [
  { label: "Una cubierta", value: 1 },
  { label: "Dos cubiertas", value: 2 },
  { label: "Tres cubiertas", value: 3 },
  { label: "Cuatro cubiertas", value: 4 },
]

export const AddMoreServicesData: { name: string, price: number }[] = [
  { name: "Gestión de revisión técnica", price: 48990 },
  { name: "Diagnostico automotriz", price: 65990 },
  { name: "Servicio de frenos", price: 35990 }
]

export const MileagesOptionsData: VehicleMileagesOptions[] = [
  { quantity: "10.000 kms" },
  { quantity: "20.000 kms" },
  { quantity: "30.000 kms" },
  { quantity: "40.000 kms" },
  { quantity: "50.000 kms" },
  { quantity: "60.000 kms" },
  { quantity: "70.000 kms" },
  { quantity: "80.000 kms" },
  { quantity: "90.000 kms" },
  { quantity: "Otro" }
]