import React from 'react'

interface PokemonLimitProps {
  currentLimit: number
  limitOptions: number[]
  onLimitChange: (limit: string) => void
}

export const PokemonLimit: React.FC<PokemonLimitProps> = ({
  currentLimit,
  limitOptions,
  onLimitChange
}) => {
  return (
    <label data-name='PokemonLimit' className='whitespace-nowrap'>
      <span className='inline-block align-middle pr-2'>Show per page</span>
      <div className='select'>
        <select
          value={currentLimit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onLimitChange(e.target.value)}
        >
          {limitOptions.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}{' pokemons'}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}