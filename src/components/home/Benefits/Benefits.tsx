import { Revision } from '@/assets'
import Image from 'next/image'
import { BenefitsCard } from './BenefitsCard'

interface BenefitsInterface {
  name: string,
  btnString: string,
  image: string
}

const BenefitsData: BenefitsInterface[] = [
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
]

export const Benefits = () => {
  return (
    <section>
      <div className='mt-32 flex flex-col items-center justify-center gap-10'>
        <h2 className='text-3xl font-medium'>Beneficios y promociones</h2>
        <p className='text-lg text-center'>
          Siempre tenemos algo mas para ti, accede
          <br />
          a descuentos y a los servicios mas convenientes
        </p>

        {/* Card */}
        <div className='grid grid-cols-4 gap-44'>
          {BenefitsData.map((benefit, index) => (
            <BenefitsCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}
