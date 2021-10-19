import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PokemonCard } from './'
import { NamedAPIResource } from '@src/types/pokemon.type'

expect.extend(toHaveNoViolations)

const mockPokemonFetchProps: NamedAPIResource = {
  name: 'mockemon',
  url: 'https://www.example.com',
}

const TestParent: React.FC = () => {
  return (
    <div role="list">
      <PokemonCard
        name={mockPokemonFetchProps.name}
        url={mockPokemonFetchProps.url}
      />
    </div>
  )
}

it('Renders the PokemonCard component', () => {
  render(<TestParent />)
})

it('PokemonCard component should not have basic accessibility issues', async () => {
  const { container } = render(<TestParent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
