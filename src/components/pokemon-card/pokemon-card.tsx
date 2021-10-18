import React, { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import useAxios from 'axios-hooks'

// @TODO: Debug why '@src/' path fails in Jest test
import { PokemonImage } from '../../components'
import { Pokemon, NamedAPIResource } from '@src/types/pokemon.type'

const PokemonCard: React.FC<NamedAPIResource> = ({
  name,
  url
}) => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [{ data, loading, error }] = useAxios(url)

  useEffect(() => {
    if (data) setPokemon(data as Pokemon)
  }, [data])

  return (
    <div
      data-name='PokemonCard'
      className='p-2 w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
      role='listitem'
    >
      {loading && <div>Loading {name}...</div>}
      {error && <div>Error: {error.message}</div>}
      {pokemon && (
        <Link href={`/pokemons/${name}`} >
          <a>
            <div
              className='bg-gray-100 hover:bg-blue-100 p-2 rounded-lg h-full'
            >
              <PokemonImage
                url={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || ''}
              />
              <div className='flex flex-wrap justify-between items-end'>
                {/* Name */}
                <h2 className='font-bold capitalize mt-2'>{pokemon.name}</h2>

                {/* Height & weight */}
                <div className='text-sm'>
                  {/* Height is in decimetres. */}
                  <span className='pl-2'>{pokemon.height / 10} m,</span>
                  {/* Weight is in hectograms */}
                  <span className='pl-2'>{pokemon.weight / 10} kg</span>
                </div>
              </div>

              {/* Abilties */}
              <div className='flex flex-wrap -mx-1 my-1'>
                {pokemon.abilities
                  .sort((e1, e2) => {
                    // Sort abilities by name
                    return e1.ability.name > e2.ability.name ? 1 : -1
                  })
                  .map(ability => (
                    <span
                      key={ability.ability.name}
                      className='m-1 p-1 border border-solid border-gray-400 rounded uppercase text-xs whitespace-nowrap'
                    >
                      {ability.ability.name}
                    </span>
                  ))}
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default memo(PokemonCard)