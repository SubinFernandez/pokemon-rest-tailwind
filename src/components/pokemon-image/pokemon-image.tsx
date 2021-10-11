import React from 'react'

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
      <img
        src={url}
        alt={altText}
        width={width}
        height={height}
        loading={eagerLoad ? 'eager' : 'lazy'}
        className='inline-block'
      />
    </div>
  )
}