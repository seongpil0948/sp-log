import '@testing-library/jest-dom'
import React from 'react'

import { render, screen } from '@testing-library/react'

import Page from '../TestPage'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
  
  it('renders homepage unchanged', () => {
    const { container } = render(<Page />)
    expect(container).toMatchSnapshot()
  })  
})