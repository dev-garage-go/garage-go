import { BenefitsSlider } from './BenefitsSlider'

export const Benefits = () => {
  return (
    <section>
      <div className='mt-32 flex flex-col items-center justify-center gap-4 md:gap-6 xl:gap-10'>
        <h2 className='title-h2'>Beneficios y promociones</h2>
        <p className='description-of-title-h2'>
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
