import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonDetailsSpecies } from './pokemon-details-species'

expect.extend(toHaveNoViolations)

it('PokemonDetailsSpecies the NameValuePair component', () => {
  render(<PokemonDetailsSpecies name='Name' url='' />)
})

it('PokemonDetailsSpecies component should not have basic accessibility issues', async () => {
  const { container } = render(<PokemonDetailsSpecies name='Name' url=''/>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
