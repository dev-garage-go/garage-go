import { BenefitsSlider } from './BenefitsSlider'

export const Benefits = () => {
  return (
    <section>
      <div className='container-section'>
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
