import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'

import { GetPokemonsResponse, NamedAPIResource } from '@src/types/pokemon.type'
// @TODO: Debug why '@src/' path fails in Jest test
import { DEFAULTS, REST_API } from '../../helpers/constants'
import { PokemonCard } from '../../components'
import { PokemonPagination } from '../pokemon-pagination/pokemon-pagination'

export const PokemonList: React.FC = () => {
  const router = useRouter()
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>()
  const [pokemonsCount, setPokemonsCount] = useState(0)
  const [pokemonOffset, setPokemonOffset] = useState<number>()
  const [pokemonLimit, setPokemonLimit] = useState<number>()
  const [dataFetched, setDataFetched] = useState(false)
  const [dataFetchError, setDataFetchError] = useState<AxiosError | undefined>(undefined)

  const handlePaginationChange = (pageNumber: number) => {
    router.push(router.basePath.concat(`?offset=${(pokemonLimit || DEFAULTS.pokemon.pokemonsPerPage) * pageNumber}&limit=${pokemonLimit || DEFAULTS.pokemon.pokemonsPerPage}`))
  }

  /**
   * Upon router update, 
   * set offset and limit
   */
  useEffect(() => {
    if (router) {
      const { offset, limit } = router.query
  
      setPokemonOffset(Number(offset || DEFAULTS.pokemon.firstPokemon))
      setPokemonLimit(Number(limit || DEFAULTS.pokemon.pokemonsPerPage))
    }
  }, [router])

  /**
   * On offset or limit change, 
   * fetch required pokemons
   */
  useEffect(() => {
    axios
      .get(`${REST_API.url}/${REST_API.endpoints.pokemon}`, {
        params: {
          offset: pokemonOffset,
          limit: pokemonLimit
        }
      })
      .then(res => {
        if (res.data) {
          const pokemonsResponse: GetPokemonsResponse = res.data

          if (pokemonsResponse?.results) {
            setPokemons(pokemonsResponse.results)
            setPokemonsCount(pokemonsResponse.count)
          }
        }

      })
      .catch(err => {
        setDataFetchError(err)
      })
      .finally(() => {
        setDataFetched(true)
      })
  }, [pokemonOffset, pokemonLimit])

  return (
    <div data-name='PokemonList' className='max-w-screen-xl my-0 mx-auto'>
      {/* @TODO: Replace with a spinner or suspense */}
      {!dataFetched && <div>Loading...</div>}
      {/* @TODO: Replace with a better error handler */}
      {dataFetchError && <div>Error: {dataFetchError.message}</div>}
      {pokemons && (
        <>
          <PokemonPagination
            pokemonCount={pokemonsCount}
            pokemonPerPage={pokemonLimit}
            selectedPage={pokemonOffset && pokemonLimit ? pokemonOffset / pokemonLimit : 0}
            onPageChange={handlePaginationChange}
          />
          <div className='flex flex-wrap overflow-hidden'>
            {pokemons?.map(pokemon => (
              <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </div>
          <PokemonPagination
            pokemonCount={pokemonsCount}
            pokemonPerPage={pokemonLimit}
            selectedPage={pokemonOffset && pokemonLimit ? pokemonOffset / pokemonLimit : 0}
            onPageChange={handlePaginationChange}
          />
        </>
      )}
    </div>
  )
}