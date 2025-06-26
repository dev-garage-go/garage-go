'use client'

import { useState } from "react"
import { ConfirmEventToast, Select } from "@/components"
import { SelectOptions } from "@/types"

import { BookingAdmin } from '@/backend/database';
import { ServiceNamesMap } from '@/features/services';
import { toast } from "sonner";

type ServiceStates = "a ingresar" | "mantenimiento" | "finalizado"

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
      setState(newState)

      const data = {
        appointment,
        user: restUser,
        vehicle: restVehicle,
        service: {
          name: ServiceNamesMap[service.name].toLowerCase(),
          state: newState + "?",
        },
      }

      const path = process.env.NEXT_PUBLIC_SERVICE_STATE_AGENT_PATH
      if (!path) throw new Error("enviroment variable SERVICE_STATE_AGENT_PATH not found");

      const responseWebHook = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
      })

      if (!responseWebHook.ok) {
        toast.error('Error actualizando el estado')
        throw new Error("unexpected error sending service state data to agent webhook")
      };

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
