'use client'

import { DetailServiceOptionInterface } from '@/features/services'
import { firstLetterUppercase, formatNumberWithDots } from '@/utils'
import { useState } from 'react'
import { ButtonOptions, SwitchButton } from '@/components';

interface Props {
  name: string
  price: number
  details?: {
    mainOptions: DetailServiceOptionInterface[]
    switchOptions: DetailServiceOptionInterface[]
  }
}

export const AddServiceCard = ({ name, price, details }: Props) => {
  const { mainOptions = [], switchOptions = [] } = details || {}
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [mainOptSelected, setMainOptSelected] = useState<string>('')
  const [switchOptSelected, setSwitchOptSelected] = useState<string[]>([])


  const getLastArrayItem = (arr: any[]) => {
    const result = arr.length - 1;
    return result
  }

  const isEven = (index: number) => {
    if (index % 2 === 0) { return true }
    else { return false }
  }

  return (
    <div className='flex flex-col w-full'>

      <div className={`flex justify-between items-center w-full bg-customGray-200 py-4 px-6 ${showDetails ? 'rounded-t-xl' : 'rounded-xl'}`}>
        <div className="flex flex-col w-full">
          <h4 className="font-semibold text-primaryBlue-500">
            {name}
          </h4>
          <p className="font-semibold text-primaryBlue-900">
            ${formatNumberWithDots(price)}
          </p>

          {/* Mobile button */}
          <button
            type='button'
            onClick={() => setShowDetails(!showDetails)}
            className={`button-option-bg-transparent py-1 max-w-32 md:hidden mt-4`}>
            Agregar
          </button>
        </div>
        {/* Desktop button */}
        <button
          type='button'
          onClick={() => setShowDetails(!showDetails)}
          className={`button-option-bg-transparent py-1 max-w-32 hidden md:block`}>
          Agregar
        </button>
      </div>
      {showDetails && (
        <div className='flex w-full flex-col'>
          <div className='flex flex-col justify-center items-start w-full bg-customGray-200 py-4 px-6'>
            <h4 className="font-semibold text-primaryBlue-500">
              Detalla tu servicio
            </h4>
            <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
              {mainOptions?.map((item, index) => (
                <ButtonOptions
                  withBgColor={false}
                  className='h-10 max-w-none'
                  key={item.detailName + index}
                  current={item.detailName}
                  item={firstLetterUppercase(item.detailName)}
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
                  ${index === getLastArrayItem(switchOptions) ? 'rounded-b-xl' : 'rounded-none'}
                  ${isEven(index) ? 'bg-customGray-50' : 'bg-customGray-200'}`}
              >
                <p className='font-normal text-primaryBlue-900'>{item.detailName}</p>
                <SwitchButton
                  multiSelect
                  value={item.detailName}
                  valueSelected={switchOptSelected}
                  setValueSelected={(value: string) => {
                    setSwitchOptSelected((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value) // si el valor ya estaba en el array lo quitamos (desactivamos el btn)
                        : [...prev, value]  // si no estaba, lo agregamos junto con los otros
                    )
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
