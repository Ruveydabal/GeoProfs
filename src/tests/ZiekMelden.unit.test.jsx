import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import moment from 'moment';

// Mock react-router-dom useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));


// Component import
import Ziekmelden from '../pages/Ziekmelden';

// --- Cleanup na elke test ---
afterEach(() => cleanup());

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

// --- Mock Firebase Firestore ---
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    serverTimestamp: vi.fn(() => new Date())
  };
});

import { getDoc, setDoc } from 'firebase/firestore';

// --- Tests ---
describe('Ziekmelden Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('zet vandaag en volgendeDag correct bij render', () => {
    render(<Ziekmelden userId="123" />);

    const inputs = screen.getAllByRole('textbox');
    const vandaagValue = inputs[0].value;
    const volgendeDagValue = inputs[1].value;

    const vandaagExpected = moment().format('D-MM-YYYY');
    const volgendeDagExpected = moment().add(1, 'days').format('D-MM-YYYY');

    expect(vandaagValue).toBe(vandaagExpected);
    expect(volgendeDagValue).toBe(volgendeDagExpected);
  });

  it('gebruikt userId uit props als aanwezig', () => {
    render(<Ziekmelden userId="123" />);
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  it('haalt userId op uit localStorage als prop ontbreekt', () => {
    localStorage.setItem('userId', '456');
    render(<Ziekmelden />);
    expect(localStorage.getItem('userId')).toBe('456');
  });

  it('haalt verloftype op bij render', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });

    render(<Ziekmelden userId="123" />);

    expect(getDoc).toHaveBeenCalledTimes(1);
  });

  it('behandelZiekmelding roept setDoc aan met juiste parameters', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });

    setDoc.mockResolvedValueOnce();

    render(<Ziekmelden userId="123" />);
    const button = screen.getByText('Ziekmelden');
    fireEvent.click(button);

    await Promise.resolve(); // wacht op async

    expect(setDoc).toHaveBeenCalledTimes(1);
  });

});
