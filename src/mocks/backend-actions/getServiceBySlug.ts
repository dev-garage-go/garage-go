interface Service {
  name: string,
  slug: string,
}

export const getServiceBySlug = (serviceSlug: string): Service => {
  return { slug: "algo", name: "nombre de servicio" }
}