'use client'

import { Hour, SchedulesOptions } from "@/interfaces"
import { useState } from "react"

interface Props {
}

export const SchedulePicker = ({ }: Props) => {
  const [hourSelected, setHourSelected] = useState<Hour>('9:00')
  return (
    <div className="w-full max-w-sm border rounded-2xl p-4 bg-white shadow-md">
      <h4 className="text-sm font-medium text-primaryBlue-900">Horarios disponibles</h4>

      <div className="grid grid-cols-2 w-full gap-4 mt-4">
        {SchedulesOptions.map((item, index) => (
          <button
            key={item.hour + index}
            onClick={() => setHourSelected(item.hour)}
            className={`py-3 w-full max-w-42 rounded-xl ${hourSelected === item.hour ?
              'bg-primaryBlue-900 border-none text-white' :
              'bg-white border border-primaryBlue-900 text-primaryBlue-900'}`}
          >
            <p className="text-center font-light">{item.hour + " " + item.type}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
