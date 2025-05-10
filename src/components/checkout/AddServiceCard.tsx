'use client'

import { DetailServiceOptions } from '@/interfaces'
import { formatNumberWithDots } from '@/utils'
import { useState } from 'react'
import { ButtonOptions, SwitchButton } from '@/components';


interface Props {
  name: string
  price: number
  details?: {
    mainOptions: DetailServiceOptions[]
    switchOptions: DetailServiceOptions[]
  }
}

export const AddServiceCard = ({ name, price, details }: Props) => {
  const baseBtnStyle = "text-sm text-center bg-transparent border border-primaryBlue-500 text-primaryBlue-500 rounded-xl w-full md:w-auto md:px-6 py-2 hover:bg-primaryBlue-500 hover:text-white duration-200 transition-all"
  const [showDetails, setShowDetails] = useState<boolean>(true)
  const [mainOptSelected, setMainOptSelected] = useState<string>('')
  const [switchOptSelected, setSwitchOptSelected] = useState<string>('')

  let mainOptions
  let switchOptions

  if (details) {
    mainOptions = details.mainOptions
    switchOptions = details.switchOptions
  }

  const isEven = (index: number) => {
    if (index % 2 === 0) { return true }
    else { return false }
  }

  return (
    <div className='flex flex-col w-full'>

      <div className={`flex justify-between items-center w-full bg-gray-100 py-4 px-6 ${showDetails ? 'rounded-t-xl' : 'rounded-xl'}`}>
        <div className="flex flex-col w-full">
          <h4 className="font-semibold text-primaryBlue-500">
            {name}
          </h4>
          <p className="font-semibold text-primaryBlue-900">
            ${formatNumberWithDots(price)}
          </p>

          <button className={`${baseBtnStyle} md:hidden mt-4`}>
            Agregar
          </button>
        </div>
        <button
          onClick={() => setShowDetails(true)}
          className={`${baseBtnStyle} hidden md:block`}>
          Agregar
        </button>
      </div>
      {showDetails && (
        <div className='flex w-full flex-col bg-red-200'>
          <div className='flex flex-col justify-start items-center w-full bg-gray-100 py-4 px-6'>
            <h4 className="font-semibold text-primaryBlue-500">
              Detalla tu servicio
            </h4>
            <div className='flex w-full gap-4'>
              {mainOptions?.map((item, index) => (
                <ButtonOptions
                  key={item.detailName + index}
                  current={item.detailName}
                  item={item.detailName}
                  onClick={() => setMainOptSelected(item.detailName)}
                  selected={mainOptSelected}
                />
              ))}
            </div>
          </div>

          {/* Switch options */}
          <div className='flex flex-col justify-start items-center w-full'>
            {switchOptions?.map((item, index) => (
              <div
                key={item.detailName + index}
                className={`flex w-full px-6 py-4 h-full justify-between items-center
                  ${isEven(index) ? 'bg-white' : 'bg-gray-100'}`}
              >
                <p>{item.detailName}</p>
                <SwitchButton
                  value={item.detailName}
                  setValueSelected={() => setSwitchOptSelected(item.detailName)}
                  valueSelected={switchOptSelected}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
