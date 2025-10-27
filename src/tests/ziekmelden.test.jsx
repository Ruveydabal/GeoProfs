import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Ziekmelden from '../pages/Ziekmelden.jsx'

describe('Ziekmelden - velden niet aanpasbaar', () => {
  it('laat niet toe dat datumvelden aangepast worden', async () => {
    render(<Ziekmelden userId="medewerker1" />)

    const vandaagInput = await screen.findByDisplayValue(/\d{1,2}-\d{2}-\d{4}/)
    const volgendeDagInput = screen.getAllByDisplayValue(/\d{1,2}-\d{2}-\d{4}/)[1]

    fireEvent.change(vandaagInput, { target: { value: '01-01-2000' } })
    fireEvent.change(volgendeDagInput, { target: { value: '02-01-2000' } })

    expect(vandaagInput.value).not.toBe('01-01-2000')
    expect(volgendeDagInput.value).not.toBe('02-01-2000')
    expect(vandaagInput).toHaveAttribute('readonly')
    expect(volgendeDagInput).toHaveAttribute('readonly')
  })

  it('laat niet toe dat verloftype aangepast wordt', async () => {
    render(<Ziekmelden userId="medewerker1" />)

    const verlofInput = await screen.findByDisplayValue('Ziek')

    // Probeert waarde te veranderen
    fireEvent.change(verlofInput, { target: { value: 'Vakantie' } })

    // Controleert dat waarde zelfde blijft
    expect(verlofInput.value).toBe('Ziek')

    //   checkt of veld readOnly is
    expect(verlofInput).toHaveAttribute('readonly')
  })
})
