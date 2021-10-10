import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'

import { GetPokemonsResponse, PokemonFetchInfo } from '@src/types/pokemon.type'
// @TODO: Debug why '@src/' path fails in Jest test
import { REST_API } from '../../helpers/constants'
import { PokemonCard } from '../../components'
import { PokemonPagination } from '../pokemon-pagination/pokemon-pagination'

export const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonFetchInfo[]>()
  const [pokemonsCount, setPokemonsCount] = useState(0)
  const [{ data, loading, error }] = useAxios(`${REST_API.url}/${REST_API.endpoints.pokemon}`)

  useEffect(() => {
    const pokemonsResponse = data as GetPokemonsResponse

    if (pokemonsResponse?.results) {
      setPokemons(pokemonsResponse.results)
      setPokemonsCount(pokemonsResponse.count)
    }
  }, [data])

  return (
    <div data-name='PokemonList' className='max-w-screen-xl my-0 mx-auto'>
      {/* @TODO: Replace with a spinner or suspense */}
      {loading && <div>Loading...</div>}
      {/* @TODO: Replace with a better error handler */}
      {error && <div>Error: {error.message}</div>}
      {pokemons && (
        <>
          <PokemonPagination pokemonCount={pokemonsCount} />
          <div className='flex flex-wrap overflow-hidden'>
            {pokemons?.map(pokemon => (
              <PokemonCard key={pokemon.name} dataFetchProps={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}