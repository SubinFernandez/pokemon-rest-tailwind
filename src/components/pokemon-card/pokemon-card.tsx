import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'

// @TODO: Debug why '@src/' path fails in Jest test
import { PokemonImage } from '../../components'
import { Pokemon, PokemonFetchInfo } from '@src/types/pokemon.type'

interface PokemonCardProps {
  dataFetchProps: PokemonFetchInfo
}
export const PokemonCard: React.FC<PokemonCardProps> = ({ dataFetchProps }) => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [{ data, loading, error }] = useAxios(dataFetchProps.url)

  useEffect(() => {
    if (data) setPokemon(data as Pokemon)
  }, [data])

  return (
    <div
      data-name='PokemonCard'
      className='p-2 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
    >
      {loading && <div>Loading {dataFetchProps.name}...</div>}
      {error && <div>Error: {error.message}</div>}
      {pokemon && (
        <div
          className='bg-gray-100 p-2 rounded-lg h-full'
        >
          <PokemonImage
            url={pokemon.sprites.other['official-artwork'].front_default ?? ''}
          />
          <div className='flex flex-wrap justify-between items-end'>
            {/* Name */}
            <div className='font-bold capitalize'>{pokemon.name}</div>

            {/* Height & weight */}
            <div className='text-sm'>
              {/* Height is in decimetres. */}
              <span className='pl-2'>{pokemon.height * 10} cm,</span>
              {/* Weight is in hectograms */}
              <span className='pl-2'>{pokemon.weight / 10} kg</span>
            </div>
          </div>

          {/* Abilties */}
          <div className='flex flex-wrap -mx-1 my-1'>
            {pokemon.abilities.map(ability => (
              <span
                key={ability.ability.name}
                className='m-1 p-1 border border-solid border-gray-400 rounded uppercase text-xs whitespace-nowrap'
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}