import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAxios from 'axios-hooks'

import { Pokemon } from '@src/types/pokemon.type'
import { REST_API } from '../../helpers/constants'
import { PokemonImage, PokemonDetailsSpecies, PokemonDetailsStats } from '../../components'

interface PokemonDetailsProps {
  name: string
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name }) => {
  const router = useRouter()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [{ data, loading, error }, execute] = useAxios(`${REST_API.url}/${REST_API.endpoints.pokemon}/${name}`, {
    manual: true
  })

  /**
   * Wait for name to become ready,
   * to manually execute the fetch request
   */
  useEffect(() => {
    if (name) execute()
  }, [name, execute])

  /**
   * Upon data response from fetch request,
   * save it to state
   */
  useEffect(() => {
    if (data) setPokemon(data as Pokemon)
  }, [data])

  return (
    <div data-name='PokemonDetails' className='max-w-screen-xl mt-0 mb-20 mx-auto px-2'>
      {loading && <div>Loading {name}...</div>}
      {error && <div>Error: {error.message}</div>}
      {pokemon && (
        <>
          <h1 className='text-3xl text-center font-bold capitalize my-8'>{name}</h1>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 p-2'>
              <PokemonImage url={pokemon.sprites.other['official-artwork'].front_default || ''} />
            </div>
            <div className='w-full md:w-1/2 p-2'>
              <PokemonDetailsSpecies name={pokemon.species.name} url={pokemon.species.url} />
            </div>
            <div className='w-full md:w-1/2 p-2'>
              <PokemonDetailsStats stats={pokemon.stats} />
            </div>
          </div>
          <button className='link-button ml-2 mt-4' onClick={() => router.back()}>Back to Pokemon list</button>
        </>
      )}
    </div>
  )
}