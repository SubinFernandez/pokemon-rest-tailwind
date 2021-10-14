import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonList } from './pokemon-list'

expect.extend(toHaveNoViolations)

it('Renders the PokemonList component', () => {
  render(<PokemonList />)
})

it('PokemonList component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonList />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

