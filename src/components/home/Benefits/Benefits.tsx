import { Revision } from '@/assets'
import Image from 'next/image'
import { BenefitsCard } from './BenefitsCard'
import { BenefitsSlider } from './BenefitsSlider'


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

        {/* Slider benefits cards */}
        <div className='w-full h-full'>
          <BenefitsSlider />
        </div>
      </div>
    </section>
  )
}
