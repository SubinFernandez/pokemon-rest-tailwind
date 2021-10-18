import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import Autocomplete from 'react-autocomplete'
import debounce from 'lodash/debounce'
import classnames from 'classnames'
import { FilterIcon } from '@heroicons/react/outline'

import { Ability, NamedAPIResource, NamedAPIResourceList } from '@src/types/pokemon.type'
import { LOCAL_STORAGE_KYES, REST_API } from '../../helpers/constants'

interface PokemonFilterProps {
  onFilter: (pokemons: NamedAPIResource[] | undefined) => void
}

export const PokemonFilter: React.FC<PokemonFilterProps> = ({ onFilter }) => {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>()
  const [abilities, setAbilities] = useState<NamedAPIResource[]>()
  const [selectedPokemon, setSelectedPokemon] = useState('')
  const [selectedAbility, setSelectedAbility] = useState('')
  const [{ data: dataPokemons }] = useAxios(`${REST_API.url}/${REST_API.endpoints.pokemon}?limit=-1`)
  const [{ data: dataAbilities }] = useAxios(`${REST_API.url}/${REST_API.endpoints.ability}?limit=-1`)
  const [{ data: dataPokemonsOfAbility }, fetchPokemonsWithAbility] = useAxios(`${REST_API.url}/${REST_API.endpoints.ability}/${selectedAbility}`, { manual: true })

  const applyFilter = debounce(() => {
    if (selectedPokemon.length && pokemons) {
      onFilter(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(selectedPokemon.toLowerCase())))
    } else if (selectedAbility.length && abilities) {
      if (abilities.find(ability => ability.name.toLowerCase() === selectedAbility.toLowerCase())) {
        fetchPokemonsWithAbility()
      }
    } else {
      onFilter(undefined)
    }
  }, 300)

  useEffect(() => {
    const lsFilterByName = localStorage?.getItem(LOCAL_STORAGE_KYES.filter.byName)
    const lsFilterByAbility = localStorage?.getItem(LOCAL_STORAGE_KYES.filter.byAbility)
    if (lsFilterByName) setSelectedPokemon(lsFilterByName)
    if (lsFilterByAbility) setSelectedAbility(lsFilterByAbility)
  }, [])

  useEffect(() => {
    localStorage?.setItem(LOCAL_STORAGE_KYES.filter.byName, selectedPokemon)
  }, [selectedPokemon])

  useEffect(() => {
    localStorage?.setItem(LOCAL_STORAGE_KYES.filter.byAbility, selectedAbility)
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
      onFilter(data.pokemon.map(item => item.pokemon))
    }
  }, [dataPokemonsOfAbility, onFilter])

  return (
    <div data-name='PokemonFilter' className='flex items-center -mx-2'>
      {(pokemons || abilities) && <FilterIcon className='inline-block m-2 w-5 h-5 flex-grow sm:flex-grow-0' />}
      {pokemons && (
        <label className='inline-block m-2 w-1/2 sm:w-auto'>
          <span className='sr-only'>Filter by name <span className='text-sm italic text-gray-400'>({pokemons.length})</span></span>
          <Autocomplete
            items={pokemons}
            getItemValue={(item: NamedAPIResource) => item.name}
            inputProps={{
              className: 'input w-full',
              placeholder: 'Filter by name'
            }}
            renderItem={(item: NamedAPIResource, isHighlighted) => (
              <div
                key={item.url}
                className={classnames('dropdown-list-item', isHighlighted ? 'dropdown-list-item-selected' : undefined)}
              >
                <span className='capitalize'>{item.name}</span>
              </div>
            )}
            shouldItemRender={(item: NamedAPIResource, value: string) => item.name.toLowerCase().includes(value.toLowerCase())}
            value={selectedPokemon}
            onChange={(e) => {
              setSelectedPokemon(e.target.value)
              setSelectedAbility('')
            }}
            onSelect={val => {
              setSelectedPokemon(val)
              setSelectedAbility('')
            }}
            wrapperProps={{
              className: 'w-full'
            }}
          />
        </label>
      )}
      {abilities && (
        <label className='inline-block m-2 w-1/2 sm:w-auto'>
          <span className='sr-only'>Filter by ability <span className='text-sm italic text-gray-400'>({abilities.length})</span></span>
          <Autocomplete
            items={abilities}
            getItemValue={(item: NamedAPIResource) => item.name}
            inputProps={{
              className: 'input w-full',
              placeholder: 'Filter by ability'
            }}
            renderItem={(item: NamedAPIResource, isHighlighted) => (
              <div
                key={item.url}
                className={classnames('dropdown-list-item', isHighlighted ? 'dropdown-list-item-selected' : undefined)}
              >
                <span className='capitalize'>{item.name}</span>
              </div>
            )}
            shouldItemRender={(item: NamedAPIResource, value: string) => item.name.toLowerCase().includes(value.toLowerCase())}
            value={selectedAbility}
            onChange={(e) => {
              setSelectedPokemon('')
              setSelectedAbility(e.target.value)
            }}
            onSelect={val => {
              setSelectedPokemon('')
              setSelectedAbility(val)
            }}
            wrapperProps={{
              className: 'w-full'
            }}
          />
        </label>
      )}
    </div>
  )
}
