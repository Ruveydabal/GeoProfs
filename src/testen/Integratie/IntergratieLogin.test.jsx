import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login.jsx';

afterEach(() => cleanup());

// Mock assets correct voor Vitest
vi.mock('../media/AchtergrondLogin.jpg', () => ({ default: '' }));
vi.mock('../media/GeoprofsLogo.png', () => ({ default: '' }));

// Mock alleen useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate, 
  };
});

// Mock Firebase Firestore 
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getFirestore: vi.fn(() => ({ mockDb: true })),
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(),
  };
});

// Mock Firebase database import
vi.mock('../firebase', () => ({
  db: {},
}));

// Mock localstorage
beforeAll(() => {
  global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; },
  };
});

import { getDocs } from 'firebase/firestore';

// --- Mock localStorage ---
beforeAll(() => {
  global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; },
  };
});

describe('Login Component Integratie', () => {
  const setTrigger = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Login setTrigger={setTrigger} />
      </MemoryRouter>
    );

  it('toont foutmelding als velden leeg zijn', async () => {
    renderComponent();
    const user = userEvent.setup();
    await user.click(screen.getByText('Log in'));
    expect(await screen.findByText('Vul zowel e-mailadres als wachtwoord in.')).toBeInTheDocument();
  });

  it('toont foutmelding als gebruiker niet bestaat', async () => {
    getDocs.mockResolvedValueOnce({ empty: true });

    renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('E-mail...'), 'nietbestaand@gmail.com');
    await user.type(screen.getByPlaceholderText('Wachtwoord...'), 'iets');
    await user.click(screen.getByText('Log in'));

    expect(await screen.findByText('Gebruiker niet gevonden.')).toBeInTheDocument();
  });

  it('toont foutmelding bij verkeerd wachtwoord', async () => {
    getDocs
      .mockResolvedValueOnce({ empty: false, docs: [{ id: '1', data: () => ({ rol_id: { id: '3' } }), ref: 'ref' }] })
      .mockResolvedValueOnce({ empty: false, docs: [{ data: () => ({ wachtwoord: 'anders' }) }] });

    renderComponent();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('E-mail...'), 'medewerker@gmail.com');
    await user.type(screen.getByPlaceholderText('Wachtwoord...'), 'verkeerd');
    await user.click(screen.getByText('Log in'));

    expect(await screen.findByText('Onjuist wachtwoord.')).toBeInTheDocument();
  });

  // --- Succesvolle login scenario's ---
  const gebruikers = [
    { email: 'medewerker@gmail.com', wachtwoord: 'medewerker', rolId: '3', rol: 'medewerker', pad: '/medewerker/voorpagina' },
    { email: 'officemanager@gmail.com', wachtwoord: 'officemanager', rolId: '1', rol: 'officemanager', pad: '/officemanager/voorpagina' },
    { email: 'manager@gmail.com', wachtwoord: 'manager', rolId: '2', rol: 'manager', pad: '/manager/voorpagina' },
  ];

  gebruikers.forEach(({ email, wachtwoord, rolId, rol, pad }) => {
    it(`logt succesvol in en navigeert naar juiste pagina voor ${rol}`, async () => {
      getDocs
        .mockResolvedValueOnce({ empty: false, docs: [{ id: '1', data: () => ({ rol_id: { id: rolId } }), ref: 'ref' }] })
        .mockResolvedValueOnce({ empty: false, docs: [{ data: () => ({ wachtwoord }) }] });

      renderComponent();
      const user = userEvent.setup();
      await user.type(screen.getByPlaceholderText('E-mail...'), email);
      await user.type(screen.getByPlaceholderText('Wachtwoord...'), wachtwoord);
      await user.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(localStorage.getItem('rol')).toBe(rol);
        expect(mockNavigate).toHaveBeenCalledWith(pad);
        expect(setTrigger).toHaveBeenCalled();
      });
    });
  });
});