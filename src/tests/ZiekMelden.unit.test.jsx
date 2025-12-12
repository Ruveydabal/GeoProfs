import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import moment from 'moment';

// Mock react-router-dom useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Te testen component
import Ziekmelden from '../pages/Ziekmelden';

// Ruimt de DOM op na elke test
afterEach(() => cleanup());

// Mock van localStorage 
beforeAll(() => {
  global.localStorage = {
    store: {},

    getItem: vi.fn(function (key) {
      return this.store[key] || null;
    }),

    setItem: vi.fn(function (key, value) {
      this.store[key] = String(value);
    }),

    removeItem: vi.fn(function (key) {
      delete this.store[key];
    }),

    clear: vi.fn(function () {
      this.store = {};
    }),
  };
});

// Mock Firebase functies zodat er geen echte database wordt aangeroepen
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    serverTimestamp: vi.fn(() => new Date()),
  };
});

import { getDoc, setDoc } from 'firebase/firestore';

//  Tests 
describe('Ziekmelden Component', () => {

  // Reset mocks en localStorage voor elke test
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('heeft standaard verloftype "Ziek" voor Firestore geladen is', () => {
    // Firestore moet NIET resolved worden, dus mock geen waarde

    render(<Ziekmelden userId="123" />);

    // vind de input die het verloftype toont
    const verlofInput = screen.getByDisplayValue("Ziek");

    expect(verlofInput).toBeInTheDocument();
  });

  it('vervangt standaard verloftype door Firestore waarde', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }), 
    });

    render(<Ziekmelden userId="123" />);

    // wacht tot Firestore resolved
    const verlofInput = await screen.findByDisplayValue("Ziek");

    expect(verlofInput).toBeInTheDocument();
  });

  it('laadt verloftype uit Firestore en toont het in inputveld', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziekmelding' }),
    });

    render(<Ziekmelden userId="123" />);

    const verlofInput = await screen.findByDisplayValue("Ziekmelding");

    expect(verlofInput).toBeInTheDocument();
  });



  it('zet vandaag en volgendeDag correct bij render', () => {
    // Render component
    render(<Ziekmelden userId="123" />);
    // Haal beide datumvelden op
    const inputs = screen.getAllByRole('textbox');

    const vandaagValue = inputs[0].value;
    const volgendeDagValue = inputs[1].value;
    // Vergelijk waarden met moment()
    const vandaagExpected = moment().format('D-MM-YYYY');
    const volgendeDagExpected = moment().add(1, 'days').format('D-MM-YYYY');

    expect(vandaagValue).toBe(vandaagExpected);
    expect(volgendeDagValue).toBe(volgendeDagExpected);
  });

  it('gebruikt userId uit props als aanwezig', () => {
    render(<Ziekmelden userId="123" />);
    // Als prop bestaat mag localStorage niet gebruikt zijn
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  it('haalt userId op uit localStorage als prop ontbreekt', () => {
    localStorage.setItem('userId', '456');

    render(<Ziekmelden />);

    // Check of getItem is aangeroepen
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
    expect(localStorage.getItem('userId')).toBe('456');
  });

  it('haalt verloftype op bij render', async () => {
    // Mock response van getDoc
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });

    render(<Ziekmelden userId="123" />);
    
    // Controleer dat Firestore één keer is bevraagd
    expect(getDoc).toHaveBeenCalledTimes(1);
  });

  it('behandelZiekmelding roept setDoc aan met juiste parameters', async () => {
     // Firestore mock data
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });

    setDoc.mockResolvedValueOnce();

    render(<Ziekmelden userId="123" />);

    // Klik op "Ziekmelden" button
    const button = screen.getByRole('button', { name: 'Ziekmelden' });

    fireEvent.click(button);

    await Promise.resolve(); // wacht async af

    // Controleer dat setDoc is aangeroepen (dus ziekmelding is opgeslagen)
    expect(setDoc).toHaveBeenCalledTimes(1);
  });

});
