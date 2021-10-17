import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'

import { NamedAPIResource, NamedAPIResourceList } from '@src/types/pokemon.type'
// @TODO: Debug why '@src/' path fails in Jest test
import { DEFAULTS, REST_API } from '../../helpers/constants'
import { PokemonCard, PokemonPagination, PokemonLimit } from '../../components'
import { makeQueryString, nextRouterQueryUpdate } from '../../helpers/next-router-query'
import { PokemonFilter } from '../pokemon-filter/pokemon-filter'

export const PokemonList: React.FC = () => {
  const router = useRouter()
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>()
  const [pokemonsCount, setPokemonsCount] = useState(0)
  const [pokemonOffset, setPokemonOffset] = useState<number>()
  const [pokemonLimit, setPokemonLimit] = useState<number>()
  const [dataFetched, setDataFetched] = useState(false)
  const [dataFetchError, setDataFetchError] = useState<AxiosError | undefined>(undefined)
  const [filteredPokemons, setFilteredPokemons] = useState<NamedAPIResource[]>()

  const handlePaginationChange = (pageNumber: number) => {
    // router.push(router.basePath.concat(`?offset=${pokemonLimit * pageNumber}&limit=${pokemonLimit}`))
    if (pokemonLimit) {
      let currentQuery = router.query
      currentQuery = nextRouterQueryUpdate(currentQuery, 'offset', (pokemonLimit * pageNumber).toString())
      currentQuery = nextRouterQueryUpdate(currentQuery, 'limit', pokemonLimit.toString())
      router.push(`${router.asPath.split('?')[0]}/?${makeQueryString(currentQuery)}`)
    }
  }

  const handlePokemonLimitChange = (limit: string) => {
    setPokemonLimit(Number(limit))
    router.push(
      `${router.asPath.split('?')[0]}/?${makeQueryString(nextRouterQueryUpdate(router.query, 'limit', limit))}`
    )
  }

  /**
   * Upon router update, 
   * set offset and limit
   */
  useEffect(() => {
    if (router?.isReady) {
      const { offset, limit } = router.query

      setPokemonOffset(Number(offset || DEFAULTS.pokemon.firstPokemon))
      setPokemonLimit(Number(limit || DEFAULTS.pokemon.pokemonsPerPage))

      if (offset) {
        const nOffset = Number(offset)
        if (!isNaN(nOffset) && nOffset !== pokemonOffset) {
          setPokemonOffset(nOffset)
        }
      }

      if (limit) {
        const nLimit = Number(limit)
        if (!isNaN(nLimit) && nLimit !== pokemonLimit) {
          setPokemonLimit(nLimit)
        }
      }
    }
  }, [router])

  /**
   * On offset or limit change, 
   * fetch required pokemons
   */
  useEffect(() => {
    if (pokemonOffset !== undefined && pokemonLimit !== undefined) {
      axios
        .get(`${REST_API.url}/${REST_API.endpoints.pokemon}`, {
          params: {
            offset: pokemonOffset,
            limit: pokemonLimit
          }
        })
        .then(res => {
          if (res.data) {
            const pokemonsResponse: NamedAPIResourceList = res.data

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
    }
  }, [pokemonOffset, pokemonLimit])

  return (
    <div data-name='PokemonList' className='max-w-screen-xl px-4 my-0 mx-auto'>
      {/* @TODO: Replace with a spinner or suspense */}
      {!dataFetched && <div>Loading...</div>}
      {/* @TODO: Replace with a better error handler */}
      {dataFetchError && <div>Error: {dataFetchError.message}</div>}
      {pokemons && (
        <>
          {!filteredPokemons && (
            <div className='flex flex-wrap justify-between items-center -mx-2'>
              <div className='p-2'>
                <PokemonPagination
                  pokemonCount={pokemonsCount}
                  pokemonPerPage={pokemonLimit}
                  selectedPage={pokemonOffset && pokemonLimit ? pokemonOffset / pokemonLimit : 0}
                  onPageChange={handlePaginationChange}
                />
              </div>
              <div className='p-2'>
                <PokemonLimit
                  currentLimit={pokemonLimit || DEFAULTS.pokemon.pokemonsPerPage}
                  limitOptions={DEFAULTS.pokemon.pokemonsPerPageOptions}
                  onLimitChange={handlePokemonLimitChange}
                />
              </div>
            </div>
          )}
          <PokemonFilter onFilter={setFilteredPokemons} />

          <div className='flex flex-wrap -mx-2 overflow-hidden'>
            {(filteredPokemons || pokemons)?.map(pokemon => (
              <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
            ))}
          </div>

          {!filteredPokemons && (
            <div className='flex flex-wrap justify-between items-center -mx-2'>
              <div className='p-2'>
                <PokemonPagination
                  pokemonCount={pokemonsCount}
                  pokemonPerPage={pokemonLimit}
                  selectedPage={pokemonOffset && pokemonLimit ? pokemonOffset / pokemonLimit : 0}
                  onPageChange={handlePaginationChange}
                />
              </div>
              <div className='p-2'>
                <PokemonLimit
                  currentLimit={pokemonLimit || DEFAULTS.pokemon.pokemonsPerPage}
                  limitOptions={DEFAULTS.pokemon.pokemonsPerPageOptions}
                  onLimitChange={handlePokemonLimitChange}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}