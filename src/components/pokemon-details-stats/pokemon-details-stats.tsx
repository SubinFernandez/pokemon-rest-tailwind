import React from 'react'

import { PokemonStat } from '@src/types/pokemon.type'
import { NameValuePair } from '../../components'

interface PokemonDetailsStatsProps {
  stats: PokemonStat[]
}

export const PokemonDetailsStats: React.FC<PokemonDetailsStatsProps> = ({
  stats
}) => {
  const nameValuePairCSSClasses = 'w-full p-2 sm:w-1/2'

  return (
    <div data-name='PokemonDetailsStats' className='bg-gray-100 p-4 rounded-lg'>
      {stats && (
        <>
          <h2 className='text-xl font-bold my-2'>Stats</h2>
          <div className='flex flex-wrap -m-2'>
            {stats.map(stat => (
              <NameValuePair
                key={stat.stat.name}
                name={stat.stat.name.charAt(0).toUpperCase().concat(stat.stat.name.substr(1))}
                value={Math.round(stat.base_stat / 255 * 100).toString().concat('%')}
                cssClasses={nameValuePairCSSClasses}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}