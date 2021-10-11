import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonDetailsStats } from './pokemon-details-stats'
import { PokemonStat } from '@src/types/pokemon.type'

expect.extend(toHaveNoViolations)

const mockStats: PokemonStat[] = [
  {
    base_stat: 10,
    effort: 0,
    stat: {
      name: 'Stat name',
      url: 'https://www.example.com'
    }
  }
]

it('PokemonDetailsStats the NameValuePair component', () => {
  render(<PokemonDetailsStats stats={mockStats} />)
})

it('PokemonDetailsStats component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonDetailsStats stats={mockStats} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
