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

import { PayStatusDetailType, PayStatusType } from "../schemas/orders"

export const OrderStatusMap: Record<PayStatusType, string> = {
  "approved": "Aprobado",
  "rejected": "Rechazado",
  "cancelled": "Cancelado",
  "in_process": "En proceso",
  "pending": "Pendiente",
  "refunded": "Reembolsado",
  "charged_back": "Contracargo",
  "soft-delete": "Pendiente de eliminación",
  "expired": "Expirada",
  "authorized": "Autorizado"
}

export const OrderStatusDetailMap: Record<PayStatusDetailType, string> = {
  "accredited": "Acreditado",
  "bank_error": "Error bancario",
  "cc_rejected_blacklist": "Tarjeta rechazada (lista negra)",
  "expired": "Expirada",
  "in_process": "En proceso",
  "partially_refunded": "Reembolsada parcialmente",
  "pending_capture": "Pendiente de captura",
};
