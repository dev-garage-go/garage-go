import { FAQsDisclosure, ServicePageButtons, StepsCard, TopBanner } from '@/components';
import { MileageMaintenanceFAQs, StepsMileageMaintenance } from '@/constants';
import { Mantencion } from '@/assets';

export default function MileageMaintenancePage() {
  return (
    <div className='min-h-screen'>
      {/* Top banner */}
      <TopBanner
        title='MANTENCIÓN POR KILOMETRAJE'
        description='Mantencion por pauta según el fabricante, tu sevicio incluye retiro y entrega a domicilio, Super check y lavado de cortesía.'
        withImage
        imageSrc={Mantencion}
        imageAlt='playero'
        featuresImages={['pick-delivery', 'super-check', 'garantia']}
      />

      <div className='flex flex-col justify-center gap-10 items-center w-full mt-20'>
        <h3 className='title-h3 text-center'>
          Reserva tu mantención por kilometraje desde los $189.990
          <br />
          Y obtén un 25% De descuento.
        </h3>

        {/* Buttons */}
        <ServicePageButtons />

        <section className='container-section'>
          <h2 className='title-h2'>¿Como funciona?</h2>
          <p className='description-of-title-h2'>Darle el mejor cuidado a tu auto es muy facil</p>

          <div className='max-w-page padding-central-page grid-steps-central-page'>
            {StepsMileageMaintenance.map((item, index) => (
              <StepsCard {...item} key={index} />
            ))}
          </div>
        </section>

        {/* Title and FAQs section */}
        <section className='container-section max-w-page w-full'>
          <h2 className='title-h2 text-center'>
            ¿Qué debes saber sobre tu
            <br />
            Mantencion por Kilometraje?
          </h2>

          <div className='space-y-4 w-full sm:w-2/4 mt-6'>
            {MileageMaintenanceFAQs.map((faq, index) => (
              <FAQsDisclosure {...faq} key={index} />
            ))}

          </div>

          <div className='flex justify-center items-center w-full mb-10'>
            <button className='bg-primaryBlue-900 rounded-md px-20 py-2 text-center text-white'>
              Agenda Ahora
            </button>
          </div>
        </section>

        {/* Gray section */}
        <section className='container-section pb-from-footer w-full bg-gray-200'>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full bg-red-100 max-w-page'>
            <div>
              <h2>Estos servicios te pueden interesar</h2>
              <button>
                Ver todos
              </button>

              <div>
                {/* Service card */}
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}