import { pathImages } from "../paths";
import { profilesImages } from "./profiles";
import { servicesImages } from "./services";
import { suppliersImages } from "./suppliers";
import { vehicleBrandsImages, vehicleImags } from "./vehicles";

export const assets = {
  hero: {
    mujer: `${pathImages}/chica_1.png`
  },
  services: servicesImages,
  benefits: {
    benefits30Percent: `${pathImages}/benefits-30.png`,
    benefits15Percent: `${pathImages}/benefits-15.png`,
    benefits4x3Tires: `${pathImages}/benefits-4x3.png`,
    benefitsTechnical: `${pathImages}/benefits-technical.png`,
  },
  vehicle: vehicleImags,
  vehicleBrands: vehicleBrandsImages,
  banners: {
    agendaCotiza: `${pathImages}/agenda_cotiza.png`,
    pickAndDelivery: `${pathImages}/pick-and-delivery.png`,
    pagaOnline: `${pathImages}/paga_en_linea.png`,
    playero: `${pathImages}/playero.png`,
    personaCelular: `${pathImages}/persona-celular.jpg`,
    hombreServicios: `${pathImages}/hombre_servicios.png`,
  },
  profiles: profilesImages,
  suppliers: suppliersImages,
  footer: {
    location: `${pathImages}/company-location.png`,
  },
  payment: {
    mercadoPago: `${pathImages}/mercado-pago.svg`,
    getnet: `${pathImages}/getnet.webp`,
    webpay: `${pathImages}/webpay.webp`,
  },
  promotions: {
    promotion4x3Tires: `${pathImages}/promotion-4x3-tires.jpg`,
    changeTiresPromotion: `${pathImages}/change-tires-promotion.jpg`,
    infoRuedas: `${pathImages}/info-ruedas.jpg`,
  }
}