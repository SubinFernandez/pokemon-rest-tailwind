import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Header } from './header'

expect.extend(toHaveNoViolations)

it('Renders the Header component', () => {
  render(<Header />)
})

it('Header component should not have basic accessibility issues', async () => {
  const { container } = render(<Header />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
