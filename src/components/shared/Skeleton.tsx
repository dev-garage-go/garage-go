import clsx from 'clsx'
import React from 'react'

type SkeletonColors = 'light-gray' | 'dark-gray' | 'light-blue' | 'dark-blue'

const colorMap: Record<SkeletonColors, string> = {
  'light-gray': 'bg-gray-200',
  'dark-gray': 'bg-gray-700',
  'light-blue': 'bg-blue-200',
  'dark-blue': 'bg-blue-700',
}

interface Props {
  color: SkeletonColors
  className?: string
}

export const Skeleton = ({ className, color }: Props) => {
  return (
    <div className={clsx(
      className ?? 'min-w-3 min-h-3',
      'bg-gray-300 animate-pulse rounded-md', colorMap[color]
    )}
    />
  )
}
