import { Aceite, CambioNeumaticos, CambioParabrisas, ChequeoPreventivo, Mantencion, Revision } from "@/assets";

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
    features: ["pick-delivery", "super-check", "garantia"]
  },
  {
    title: "Gestión de revisión técnica",
    price: 48990,
    image: Revision,
    features: ["pick-delivery"]
  },
  {
    title: "Cambio de aceite",
    price: 78990,
    image: Aceite,
    features: ["super-check", "garantia"]
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
    ]
  },
  {
    title: "Servicio de frenos",
    price: 35990,
    image: Aceite,
    features: ["super-check", "garantia"]
  },
  {
    title: "Cambio de batería",
    price: 65990,
    image: Revision,
    discount: "25% Dcto",
    features: ["pick-delivery", "super-check", "garantia"]
  },
  {
    title: "Cambio de parabrisas",
    price: 125990,
    image: CambioParabrisas,
    features: ["pick-delivery"]
  },
  {
    title: "Checkeo preventivo",
    price: 149990,
    image: ChequeoPreventivo,
    features: ["super-check"]
  }
];