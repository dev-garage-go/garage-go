import Image from "next/image"

interface Props {
  title?: string
  description?: string,
  imageSrc?: string,
  imageAlt?: string
}

export const InformationModal = ({ imageAlt, imageSrc, description, title }: Props) => {
  return (
    <div className="xl:w-[600px] xl:p-8 bg-white border border-gray-200 rounded-xl shadow-lg text-sm text-gray-800">
      <div className="flex flex-col justify-start items-start gap-4">
        <p className="text-xs font-medium text-primaryBlue-900">{title}</p>
        <p className="text-xs text-start text-wrap">{description}</p>

        {imageSrc && (
          <div className="relative w-64 h-40">
            <Image
              fill
              src={imageSrc}
              alt={imageAlt ?? ""}
              className="object-contain w-auto h-auto"
            />
          </div>
        )}
      </div>
    </div>
  )
}
