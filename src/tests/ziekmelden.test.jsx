// tests/Ziekmelden.test.jsx
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Ziekmelden from '../src/pages/Ziekmelden'


// 🔧 Mock Firestore functies
vi.mock('firebase/firestore', async () => {
  return {
    doc: vi.fn(() => ({})),
    setDoc: vi.fn(() => Promise.resolve()),
    getDoc: vi.fn(() => Promise.resolve({ exists: () => true, data: () => ({ naam: 'Ziek' }) })),
    serverTimestamp: vi.fn(() => new Date()),
  }
})


vi.mock('../src/firebase', () => ({
  db: {},
}))

describe('Ziekmelden component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('toont standaard datums en verloftype in de UI', async () => {
    render(<Ziekmelden userId="medewerker1" />)

    // Check of de titel zichtbaar is
    expect(await screen.findByText('Ziekmelden')).toBeInTheDocument()

    // Check of het verloftype standaard 'Ziek' is
    const verlofInput = await screen.findByDisplayValue('Ziek')
    expect(verlofInput).toBeInTheDocument()
  })

  it('roept Firestore aan met juiste data bij ziekmelding', async () => {
    // Mock Firestore document
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ naam: 'Ziek' }) })
    setDoc.mockResolvedValueOnce()

    render(<Ziekmelden userId="medewerker1" />)

    // Wacht tot Firestore wordt opgeroepen
    await waitFor(() => expect(getDoc).toHaveBeenCalled())

    // Klik op de knop
    const button = await screen.findByRole('button', { name: /Ziekmelden/i })
    fireEvent.click(button)

    await waitFor(() => expect(setDoc).toHaveBeenCalled())

    // Controleer of juiste data naar Firestore gaat
    const args = setDoc.mock.calls[0]
    expect(args[1]).toMatchObject({
      userId: 'medewerker1',
      typeVerlof_id: '1',
      omschrijvingRedenVerlof: 'Ziekmelding gemaakt',
    })
  })
})
