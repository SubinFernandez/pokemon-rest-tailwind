import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonImage } from './pokemon-image'

expect.extend(toHaveNoViolations)

it('Renders the PokemonImage component', () => {
  render(<PokemonImage url="" />)
})

it('PokemonImage component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonImage url="" />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
