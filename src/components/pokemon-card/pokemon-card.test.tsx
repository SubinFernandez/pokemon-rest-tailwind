import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonCard } from './pokemon-card'
import { NamedAPIResource } from '@src/types/pokemon.type'

expect.extend(toHaveNoViolations)

const mockPokemonFetchProps: NamedAPIResource = {
  name: 'mockemon',
  url: 'https://www.example.com'
}

it('Renders the PokemonCard component', () => {
  render(<PokemonCard dataFetchProps={mockPokemonFetchProps} />)
})

it('PokemonCard component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonCard dataFetchProps={mockPokemonFetchProps} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

