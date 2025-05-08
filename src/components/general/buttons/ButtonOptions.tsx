'use client'

interface Props {
  item: any
  current: string
  selected: string
  className?: string
  onClick: () => void
}

export const ButtonOptions = ({ item, onClick, selected, className, current }: Props) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`
          ${className}
          ${selected === current ? 'button-option-selected' : 'button-option'}
        `}
      >
        <p className="text-center font-light">{item}</p>
      </button>
    </>
  )
}
