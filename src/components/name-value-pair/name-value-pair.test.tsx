import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { NameValuePair } from './name-value-pair'

expect.extend(toHaveNoViolations)

it('Renders the NameValuePair component', () => {
  render(<NameValuePair name='Name' value='Value' />)
})

it('NameValuePair component should not have basic accessibility issues', async () => {
  const { container } = render(<NameValuePair name='Name' value='Value'/>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

