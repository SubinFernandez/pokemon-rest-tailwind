import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Hero } from './hero'

expect.extend(toHaveNoViolations)

it('Renders the Hero component', () => {
  render(<Hero />)
})

it('Hero component should not have basic accessibility issues', async () => {
  const { container } = render(<Hero />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
