import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => cleanup());

// Mock assets correct voor Vitest
vi.mock('../media/AchtergrondLogin.jpg', () => ({ default: '' }));
vi.mock('../media/GeoprofsLogo.png', () => ({ default: '' }));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

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

// Mock Firebase db import
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

import Login from '../pages/Login.jsx';

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('toont invoervelden en de inlogknop', () => {
    render(<Login setTrigger={() => {}} />);
    expect(screen.getByPlaceholderText('E-mail...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wachtwoord...')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('toont foutmelding als e-mail en wachtwoord velden leeg zijn', async () => {
    render(<Login setTrigger={() => {}} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Log in'));
    expect(await screen.findByText('Vul zowel e-mailadres als wachtwoord in.')).toBeInTheDocument();
  });

  it('toont foutmelding als gebruiker niet bestaat in de database', async () => {
    const { getDocs } = await import('firebase/firestore');
    getDocs.mockResolvedValueOnce({ empty: true });

    render(<Login setTrigger={() => {}} />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('E-mail...'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Wachtwoord...'), 'medewerker');
    await user.click(screen.getByText('Log in'));

    expect(await screen.findByText('Gebruiker niet gevonden.')).toBeInTheDocument();
  });

  it('toont foutmelding bij verkeerd wachtwoord', async () => {
    const { getDocs } = await import('firebase/firestore');

    getDocs
      .mockResolvedValueOnce({
        empty: false,
        docs: [{ id: '1', data: () => ({ rol_id: { id: '3' } }), ref: 'ref' }],
      })
      .mockResolvedValueOnce({
        empty: false,
        docs: [{ data: () => ({ wachtwoord: 'anders' }) }],
      });

    render(<Login setTrigger={() => {}} />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('E-mail...'), 'medewerker@gmail.com');
    await user.type(screen.getByPlaceholderText('Wachtwoord...'), '1234');
    await user.click(screen.getByText('Log in'));

    expect(await screen.findByText('Onjuist wachtwoord.')).toBeInTheDocument();
  });

  // Succesvolle login met navigatie
  const gebruikers = [
    { email: 'officemanager@gmail.com', wachtwoord: 'officemanager', rolId: '1', rol: 'officemanager', pad: '/officemanager/voorpagina' },
    { email: 'manager@gmail.com', wachtwoord: 'manager', rolId: '2', rol: 'manager', pad: '/manager/voorpagina' },
    { email: 'medewerker@gmail.com', wachtwoord: 'medewerker', rolId: '3', rol: 'medewerker', pad: '/medewerker/voorpagina' },
  ];

  gebruikers.forEach(({ email, wachtwoord, rolId, rol, pad }) => {
    it(`logt succesvol in en navigeert naar juiste pagina voor ${rol}`, async () => {
      const { getDocs } = await import('firebase/firestore');

      getDocs
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ id: '1', data: () => ({ rol_id: { id: rolId } }), ref: 'ref' }],
        })
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ data: () => ({ wachtwoord }) }],
        });

      render(<Login setTrigger={() => {}} />);
      const user = userEvent.setup();
      await user.type(screen.getByPlaceholderText('E-mail...'), email);
      await user.type(screen.getByPlaceholderText('Wachtwoord...'), wachtwoord);
      await user.click(screen.getByText('Log in'));

      await screen.findByText('Log in');

      expect(localStorage.getItem('isLoggedIn')).toBe('true');
      expect(localStorage.getItem('rol')).toBe(rol);
      expect(mockNavigate).toHaveBeenCalledWith(pad);
    });
  });
});