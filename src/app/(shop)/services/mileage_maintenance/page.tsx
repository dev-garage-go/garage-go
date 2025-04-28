import { Mantencion } from '@/assets';
import { ServicePageButtons, TopBanner } from '@/components';

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

        <h2 className='title-h2 mt-20'>¿Como funciona?</h2>
        <p className='description-of-title-h2'>Darle el mejor cuidado a tu auto es muy facil</p>
      </div>
    </div>
  );
}