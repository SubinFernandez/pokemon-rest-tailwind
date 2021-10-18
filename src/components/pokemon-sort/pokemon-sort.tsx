import React, { memo, useEffect } from 'react'

import { SortByType, SortOptions } from '@src/types/data.types'
import { LOCAL_STORAGE_KYES } from '@src/helpers/constants'

interface PokemonSortProps {
  sortBy: SortByType
  onSortChange: (newSortBy: SortByType) => void
}

const PokemonSort: React.FC<PokemonSortProps> = ({
  sortBy,
  onSortChange
}) => {
  const sortOptions: SortOptions[] = [
    {
      id: 0,
      label: 'None',
      type: 'none'
    },
    {
      id: 1,
      label: 'Name',
      type: 'name'
    }
  ]

  const handleSortChange = (newSortBy: SortByType) => {
    localStorage?.setItem(LOCAL_STORAGE_KYES.gallery.sort, newSortBy)
    onSortChange(newSortBy)
  }

  useEffect(() => {
    onSortChange(localStorage?.getItem(LOCAL_STORAGE_KYES.gallery.sort) as SortByType)
  }, [onSortChange])

  return (
    <label data-name='PokemonSort' className='whitespace-nowrap'>
      <span className='inline-block align-middle pr-2'>Sort by</span>
      <div className='select'>
        <select
          value={sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value as SortByType)}
        >
          {sortOptions.map(option => (
            <option
              key={option.id}
              value={option.type}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

export default memo(PokemonSort)
