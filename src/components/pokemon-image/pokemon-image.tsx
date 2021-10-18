import React from 'react'
import Image from 'next/image'

interface PokemonImageProps {
  url: string
  altText?: string
  width?: number
  height?: number
  eagerLoad?: boolean
}

export const PokemonImage: React.FC<PokemonImageProps> = ({
  url,
  altText = '',
  width = 475,
  height = 475,
  eagerLoad
}) => {
  return (
    <div data-name='PokemonImage' className='bg-gray-100 p-2 rounded-lg text-center'>
      <Image
        src={url}
        alt={altText || url?.length ? '' : 'No artwork found for this Pokemon'}
        width={width}
        height={height}
        loading={eagerLoad ? 'eager' : 'lazy'}
        className='inline-flex justify-center items-center'
      />
    </div>
  )
}