import { TopBanner } from '@/components';

export default function MileageMaintenancePage() {
  return (
    <div className='min-h-screen'>
      <TopBanner
        title='MANTENCIÓN POR KILOMETRAJE'
        description='Mantencion por pauta según el fabricante, tu sevicio incluye retiro y entrega a domicilio, Super check y lavado de cortesía.'
        withImage
        imageSrc=''
        imageAlt=''
        featuresImages={['']}
      />
    </div>
  );
}