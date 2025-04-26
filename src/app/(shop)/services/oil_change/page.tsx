import { redirect } from "next/navigation";
import { TopBanner } from '@/components';

export default function OilChangePage() {
  // redirect() is a guardian to protect the page, 
  // deletes this when the page or section is built.
  redirect("/")

  return (
    <div className="relative bg-white min-h-screen">
      <TopBanner
        title="MANTENCIÓN POR KILOMETRAJE"
        description="Mantencion por pauta según el fabricante, tu sevicio incluye retiro y entrega a domicilio, Super check y lavado de cortesia."
      />
    </div>
  );
}