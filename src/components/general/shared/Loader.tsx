interface Props {
  className: string
}

export const Loader = ({ className }: Props) => {
  return (
    <div className={`${className} flex justify-center items-center min-h-screen w-screen gap-3`}>
      <div className="loader" />
      <p className='text-lg xl:text-2xl font-medium text-primaryBlue-900'>
        Cargando
        <span className="inline-block animate-bounce-dot1">.</span>
        <span className="inline-block animate-bounce-dot2">.</span>
        <span className="inline-block animate-bounce-dot3">.</span>
      </p>
    </div>
  )
}
