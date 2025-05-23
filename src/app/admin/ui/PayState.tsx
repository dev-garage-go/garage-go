import clsx from 'clsx'
import React from 'react'

/*
State	          Description

pending	        ->    El pago está iniciado pero aún no fue procesado por el medio de pago.
approved	      ->    El pago fue aprobado correctamente. ✅
in_process	    ->    El pago está en proceso de validación (por ejemplo, revisión manual).
rejected	      ->    El pago fue rechazado. Puede ser por fondos insuficientes, datos erróneos, etc. ❌
refunded	      ->    El pago fue devuelto al usuario.
cancelled	      ->    El pago fue cancelado antes de completarse.
in_mediation	  ->    El pago está en disputa, el comprador abrió un reclamo.
charged_back	  ->    El banco del comprador hizo un contracargo.
*/

type States = (
  'pending' | 'approved' | 'in_process' | 'rejected' |
  'refunded' | 'cancelled' | 'in_mediation' | 'charged_back'
)

interface Props {
  state: States
}

const StateMap: Record<States, string> = {
  "approved": "Aprobado",
  "rejected": "Rechazado",
  "cancelled": "Cancelado",
  "in_process": "En proceso",
  "pending": "Pendiente",
  "in_mediation": "En disputa",
  "refunded": "Reembolsado",
  "charged_back": "Contracargo",
}

export const PayState = ({ state }: Props) => {
  return (
    <div className={clsx("p-2 rounded-xl", {
      "bg-secundaryGreen-600": state === 'approved',
      "bg-red-700": state === 'rejected' || state === 'cancelled',
      "bg-amber-500": state === 'in_process' || state === 'pending',
      "bg-gray-600": state === 'in_mediation' || state === 'refunded' || state === 'charged_back',
    })}>
      <p className='text-white font-medium'>{StateMap[state]}</p>
    </div>
  )
}
