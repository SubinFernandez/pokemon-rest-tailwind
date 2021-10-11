import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonDetails } from './pokemon-details'

expect.extend(toHaveNoViolations)

it('Renders the PokemonDetails component', () => {
  render(<PokemonDetails name='Name' />)
})

it('PokemonDetails component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonDetails name='Name' />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

