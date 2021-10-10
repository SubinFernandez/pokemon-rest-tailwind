import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'

import { GetPokemonsResponse, PokemonFetchInfo } from '@src/types/pokemon.type'
// @TODO: Debug why '@src/' path fails in Jest test
import { REST_API } from '../../helpers/constants'

export const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonFetchInfo[]>()
  const [{ data, loading, error }] = useAxios(`${REST_API.url}/${REST_API.endpoints.pokemon}`)

  useEffect(() => {
    const pokemonsResponse = data as GetPokemonsResponse

    if (pokemonsResponse?.results) setPokemons(pokemonsResponse.results)
  }, [data])

  return (
    <div data-name='PokemonList'>
      {/* @TODO: Replace with a spinner or suspense */}
      {loading && <div>Loading...</div>}
      {/* @TODO: Replace with a better error handler */}
      {error && <div>Error: {error.message}</div>}
      {pokemons?.map(pokemon => (
        // @TODO: Replace with the PokemonCard component
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  )
}