'use client'

import { useState } from "react"
import { ConfirmEventToast, Select } from "@/components"
import { SelectOptions } from "@/types"
import { toast } from "sonner";

import { BookingAdmin } from '@/backend/database';
import { sendNewServiceState } from "@/backend/actions";

import { ServiceNamesMap } from '@/features/services';
import { DataServiceStateChanged, ServiceStates } from "@/features/admin";


const ServiceStatesOptions: SelectOptions<ServiceStates>[] = [
  { id: 1, value: "a ingresar" },
  { id: 2, value: "mantenimiento" },
  { id: 3, value: "finalizado" },
]

interface Props {
  booking: BookingAdmin
}

export const ServiceState = ({ booking }: Props) => {
  const [state, setState] = useState<ServiceStates>("a ingresar")
  const { service, user, vehicle, appointment } = booking;

  const { _id, ...restVehicle } = vehicle;
  const { typeAddress, additionalInfo, ...restUser } = user;

  const handleOnChange = async (newState: ServiceStates) => {
    const confirm = await ConfirmEventToast({
      message: 'Confirme que quiere actualizar el estado a ',
      importantMessage: newState
    })

    if (confirm) {
      const data: DataServiceStateChanged = {
        appointment,
        user: restUser,
        vehicle: restVehicle,
        service: {
          name: ServiceNamesMap[service.name].toLowerCase(),
          state: newState,
        },
      }

      const response = await sendNewServiceState(data)

      if (!response.success) {
        toast.error('Error actualizando el estado')
        return
      };

      setState(newState)
      toast.success('Estado actualizado correctamente')
    }
  }

  return (
    <div className="w-full min-w-36">
      <Select
        defaultValue={"-"}
        options={ServiceStatesOptions}
        value={state}
        onChange={(value) => handleOnChange(value)}
      />
    </div>
  )
}
