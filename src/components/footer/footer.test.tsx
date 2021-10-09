import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Footer } from './footer'

expect.extend(toHaveNoViolations)

it('Renders the Footer component', () => {
  render(<Footer />)
})

it('Footer component should not have basic accessibility issues', async () => {
  const { container } = render(<Footer />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
