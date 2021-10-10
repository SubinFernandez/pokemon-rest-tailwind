import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonPagination } from './pokemon-pagination'

expect.extend(toHaveNoViolations)

it('Renders the PokemonPagination component', () => {
  render(<PokemonPagination pokemonCount={200} />)
})

it('PokemonPagination component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonPagination pokemonCount={200} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

