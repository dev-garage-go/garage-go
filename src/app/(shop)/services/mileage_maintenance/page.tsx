import { ServicePageButtons, StepsCard, TopBanner } from '@/components';
import { StepsMileageMaintenance } from '@/constants';
import { Mantencion } from '@/assets';

export default function MileageMaintenancePage() {
  return (
    <div className='min-h-screen'>
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
        <section className='container-section'>
          <h2 className='title-h2 text-center'>
            ¿Qué debes saber sobre tu
            <br />
            Mantencion por Kilometraje?
          </h2>

        </section>
      </div>
    </div>
  );
}