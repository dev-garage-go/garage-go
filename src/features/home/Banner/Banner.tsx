import { BannerSlider } from '@/features'

export const Banner = () => {
  return (
    <section className='relative padding-central-page container-section'>
      <h2 className='title-h2 text-center'>
        En Garage Go, encuentra la mejor
        <br />
        alternativa al consecionario
      </h2>

      {/* Bg gray */}
      <div className='absolute bottom-0 bg-gray-100 w-full h-full max-h-40' />

      <BannerSlider />
    </section>
  )
}
