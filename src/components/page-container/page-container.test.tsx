import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PageContainer, PageContainerItem } from './page-container'

expect.extend(toHaveNoViolations)

it('Renders the PageContainer component', () => {
  render(<PageContainer />)
})

it('PageContainer component should not have basic accessibility issues', async () => {
  const { container } = render(<PageContainer />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

it('Renders the PageContainerItem component', () => {
  render(<PageContainerItem />)
})

it('PageContainerItem component should not have basic accessibility issues', async () => {
  const { container } = render(<PageContainerItem />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
