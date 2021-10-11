import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'

import { NamedAPIResource, PokemonSpecies } from '@src/types/pokemon.type'
import { NameValuePair } from '../../components'

export const PokemonDetailsSpecies: React.FC<NamedAPIResource> = ({
  name,
  url
}) => {
  const [species, setSpecies] = useState<PokemonSpecies>()
  const [{ data, loading, error }] = useAxios(url)
  const nameValuePairCSSClasses = 'w-full p-2 sm:w-1/2'

  useEffect(() => {
    if (data) setSpecies(data as PokemonSpecies)
  }, [data])

  return (
    <div data-name='PokemonDetailsSpecies' className='bg-gray-100 p-4 rounded-lg'>
      {loading && <div>Loading {name}...</div>}
      {error && <div>Error: {error.message}</div>}
      {species && (
        <>
          <h2 className='text-xl font-bold my-2'>Species</h2>
          <div className='flex flex-wrap -m-2'>
            <NameValuePair
              name='Colour'
              value={species.color.name}
              cssClasses={nameValuePairCSSClasses}
            />
            {species.habitat &&
              <NameValuePair
                name='Habitat'
                value={species.habitat?.name}
                cssClasses={nameValuePairCSSClasses}
              />
            }
            <NameValuePair
              name='Spape'
              value={species.shape.name}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Growth rate'
              value={species.growth_rate.name}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Happiness'
              value={Math.round(species.base_happiness / 255 * 100).toString().concat('%')}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Ease of capture'
              value={Math.round(species.capture_rate / 255 * 100).toString().concat('%')}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Is baby?'
              value={species.is_baby ? 'Yes' : 'No'}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Is legendary?'
              value={species.is_legendary ? 'Yes' : 'No'}
              cssClasses={nameValuePairCSSClasses}
            />
            <NameValuePair
              name='Is mythical?'
              value={species.is_mythical ? 'Yes' : 'No'}
              cssClasses={nameValuePairCSSClasses}
            />
          </div>
        </>
      )}
    </div>
  )
}