import React, { memo, useCallback, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import debounce from 'lodash/debounce'
import { FilterIcon } from '@heroicons/react/outline'

import {
  Ability,
  NamedAPIResource,
  NamedAPIResourceList,
} from '@src/types/pokemon.type'
import { LOCAL_STORAGE_KYES, REST_API } from '../../helpers/constants'

interface PokemonFilterProps {
  onFilter: (pokemons: NamedAPIResource[] | undefined) => void
}

export const PokemonFilter: React.FC<PokemonFilterProps> = memo(
  ({ onFilter }) => {
    const [pokemons, setPokemons] = useState<NamedAPIResource[]>()
    const [abilities, setAbilities] = useState<NamedAPIResource[]>()
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const [selectedAbility, setSelectedAbility] = useState('')
    const [filteredPokemons, setFilteredPokemons] = useState<
      NamedAPIResource[]
    >([])
    const [{ data: dataPokemons }] = useAxios(
      `${REST_API.url}/${REST_API.endpoints.pokemon}?limit=-1`,
    )
    const [{ data: dataAbilities }] = useAxios(
      `${REST_API.url}/${REST_API.endpoints.ability}?limit=-1`,
    )
    const [{ data: dataPokemonsOfAbility }, fetchPokemonsWithAbility] =
      useAxios(
        `${REST_API.url}/${REST_API.endpoints.ability}/${selectedAbility}`,
        { manual: true },
      )

    const applyFilter = useCallback(
      debounce(() => {
        if (selectedPokemon.length && pokemons) {
          setFilteredPokemons(
            pokemons.filter((pokemon) =>
              pokemon.name
                .toLowerCase()
                .includes(selectedPokemon.toLowerCase()),
            ),
          )
        } else if (selectedAbility.length && abilities) {
          if (
            abilities.find(
              (ability) =>
                ability.name.toLowerCase() === selectedAbility.toLowerCase(),
            )
          ) {
            fetchPokemonsWithAbility()
          }
        } else {
          setFilteredPokemons([])
        }
      }, 200),
      [selectedPokemon, selectedAbility, pokemons, abilities],
    )

    const resetFilter = () => {
      setSelectedPokemon('')
      setSelectedAbility('')
    }

    useEffect(() => {
      const lsFilterByName = localStorage?.getItem(
        LOCAL_STORAGE_KYES.gallery.filter.byName,
      )
      const lsFilterByAbility = localStorage?.getItem(
        LOCAL_STORAGE_KYES.gallery.filter.byAbility,
      )
      if (lsFilterByName) setSelectedPokemon(lsFilterByName)
      if (lsFilterByAbility) setSelectedAbility(lsFilterByAbility)
    }, [])

    useEffect(() => {
      localStorage?.setItem(
        LOCAL_STORAGE_KYES.gallery.filter.byName,
        selectedPokemon,
      )
    }, [selectedPokemon])

    useEffect(() => {
      localStorage?.setItem(
        LOCAL_STORAGE_KYES.gallery.filter.byAbility,
        selectedAbility,
      )
    }, [selectedAbility])

    useEffect(() => {
      applyFilter()
    }, [selectedPokemon, selectedAbility, pokemons, abilities, applyFilter])

    useEffect(() => {
      const data: NamedAPIResourceList = dataPokemons
      if (data?.results) setPokemons(data.results)
    }, [dataPokemons])

    useEffect(() => {
      const data: NamedAPIResourceList = dataAbilities
      if (data?.results) setAbilities(data.results)
    }, [dataAbilities])

    useEffect(() => {
      const data: Ability = dataPokemonsOfAbility

      if (data?.pokemon) {
        setFilteredPokemons(data.pokemon.map((item) => item.pokemon))
      }
    }, [dataPokemonsOfAbility, setFilteredPokemons])

    useEffect(() => {
      onFilter(filteredPokemons.length ? filteredPokemons : undefined)
    }, [filteredPokemons, onFilter])

    return (
      <div
        data-name="PokemonFilter"
        className="flex flex-wrap justify-between px-2 my-2 bg-gray-100 rounded"
      >
        <div className="flex items-center -mx-2">
          {(pokemons || abilities) && (
            <FilterIcon className="inline-block m-2 w-5 h-5 flex-grow sm:flex-grow-0" />
          )}
          <div className="flex flex-wrap">
            {pokemons && (
              <label className="inline-block m-2">
                <span className="sr-only">
                  Filter by name{' '}
                  <span className="text-sm italic text-gray-400">
                    ({pokemons.length})
                  </span>
                </span>

                <div className="select">
                  <select
                    value={selectedPokemon}
                    className="capitalize"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedPokemon(e.target.value)
                      setSelectedAbility('')
                    }}
                  >
                    <option value="" className="capitalize">
                      Filter by name
                    </option>
                    {pokemons.map((pokemon) => (
                      <option
                        key={pokemon.url}
                        value={pokemon.name}
                        className="capitalize"
                      >
                        {pokemon.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            )}
            {abilities && (
              <label className="inline-block m-2">
                <span className="sr-only">
                  Filter by ability{' '}
                  <span className="text-sm italic text-gray-400">
                    ({abilities.length})
                  </span>
                </span>

                <div className="select">
                  <select
                    value={selectedAbility}
                    className="capitalize"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedPokemon('')
                      setSelectedAbility(e.target.value)
                    }}
                  >
                    <option value="" className="capitalize">
                      Filter by ability
                    </option>
                    {abilities.map((ability) => (
                      <option
                        key={ability.url}
                        value={ability.name}
                        className="capitalize"
                      >
                        {ability.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            )}
          </div>
        </div>
        {filteredPokemons.length > 0 && (
          <div className="flex items-center -mx-2">
            <div className="p-2">
              {filteredPokemons.length}{' '}
              {filteredPokemons.length > 1 ? 'Pokemons' : 'Pokemon'} found
            </div>
            <button className="link p-2" onClick={resetFilter}>
              Reset
            </button>
          </div>
        )}
      </div>
    )
  },
)
