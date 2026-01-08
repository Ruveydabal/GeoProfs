import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Login from '../../pages/Login.jsx';
import { db } from '../../firebase';

import { collection, addDoc, getDocs, deleteDoc,} from 'firebase/firestore';

// alleen de router mock
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

//plaatjes 
vi.mock('../media/AchtergrondLogin.jpg', () => ({ default: '' }));
vi.mock('../media/GeoprofsLogo.png', () => ({ default: '' }));

// local storage
beforeAll(() => {
  global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; },
  };
});

// test helpers
const seedGebruiker = async ({ email, wachtwoord, rolId }) => {
  await addDoc(collection(db, 'gebruikers'), {
    email,
    rol_id: { id: rolId },
  });

  await addDoc(collection(db, 'accounts'), {
    email,
    wachtwoord,
  });
};

const clearFirestore = async () => {
  const collections = ['gebruikers', 'accounts'];

  for (const col of collections) {
    const snap = await getDocs(collection(db, col));
    await Promise.all(snap.docs.map(doc => deleteDoc(doc.ref)));
  }
};

describe('Login integratietest (Firestore Emulator)', () => {
  const setTrigger = vi.fn();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Login setTrigger={setTrigger} />
      </MemoryRouter>
    );

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();
    await clearFirestore();
  });

  afterEach(() => cleanup());

  it('toont foutmelding als velden leeg zijn', async () => {
    renderComponent();

    await userEvent.click(screen.getByText('Log in'));

    expect(
      await screen.findByText('Vul zowel e-mailadres als wachtwoord in.')
    ).toBeInTheDocument();
  });

  it('toont foutmelding als gebruiker niet bestaat', async () => {
    renderComponent();

    await userEvent.type(
      screen.getByPlaceholderText('E-mail...'),
      'niet@bestaand.nl'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Wachtwoord...'),
      'test'
    );
    await userEvent.click(screen.getByText('Log in'));

    expect(
      await screen.findByText('Gebruiker niet gevonden.')
    ).toBeInTheDocument();
  });

  it('toont foutmelding bij verkeerd wachtwoord', async () => {
    await seedGebruiker({
      email: 'medewerker@gmail.com',
      wachtwoord: 'correct',
      rolId: '3',
    });

    renderComponent();

    await userEvent.type(
      screen.getByPlaceholderText('E-mail...'),
      'medewerker@gmail.com'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Wachtwoord...'),
      'fout'
    );
    await userEvent.click(screen.getByText('Log in'));

    expect(
      await screen.findByText('Onjuist wachtwoord.')
    ).toBeInTheDocument();
  });

  const gebruikers = [
    {
      email: 'medewerker@gmail.com',
      wachtwoord: 'medewerker',
      rolId: '3',
      rol: 'medewerker',
      pad: '/medewerker/voorpagina',
    },
    {
      email: 'officemanager@gmail.com',
      wachtwoord: 'officemanager',
      rolId: '1',
      rol: 'officemanager',
      pad: '/officemanager/voorpagina',
    },
    {
      email: 'manager@gmail.com',
      wachtwoord: 'manager',
      rolId: '2',
      rol: 'manager',
      pad: '/manager/voorpagina',
    },
  ];

  gebruikers.forEach(({ email, wachtwoord, rolId, rol, pad }) => {
    it(`logt succesvol in als ${rol}`, async () => {
      await seedGebruiker({ email, wachtwoord, rolId });

      renderComponent();

      await userEvent.type(
        screen.getByPlaceholderText('E-mail...'),
        email
      );
      await userEvent.type(
        screen.getByPlaceholderText('Wachtwoord...'),
        wachtwoord
      );
      await userEvent.click(screen.getByText('Log in'));

      await waitFor(() => {
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(localStorage.getItem('rol')).toBe(rol);
        expect(mockNavigate).toHaveBeenCalledWith(pad);
        expect(setTrigger).toHaveBeenCalled();
      });
    });
  });
});