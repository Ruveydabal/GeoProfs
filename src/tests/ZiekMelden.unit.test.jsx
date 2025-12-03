import { render, screen, fireEvent } from '@testing-library/react';
import Ziekmelden from '../components/Ziekmelden';
import { getDoc, setDoc } from 'firebase/firestore';
import '@testing-library/jest-dom';
import moment from 'moment';

// --- Mock Firebase Firestore ---
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => new Date()),
}));

// --- Mock localStorage ---
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Unit tests ---
describe('Ziekmelden Component - Unit Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks voor elke test
  });

  test('zet vandaag en volgendeDag correct bij render', () => {
    render(<Ziekmelden userId="123" />);

    const inputs = screen.getAllByRole('textbox');
    const vandaagValue = inputs[0].value;
    const volgendeDagValue = inputs[1].value;

    const vandaagExpected = moment().format('D-MM-YYYY');
    const volgendeDagExpected = moment().add(1, 'days').format('D-MM-YYYY');

    expect(vandaagValue).toBe(vandaagExpected);
    expect(volgendeDagValue).toBe(volgendeDagExpected);
  });

  test('gebruikt userId uit props als aanwezig', () => {
    render(<Ziekmelden userId="123" />);
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  test('haalt userId op uit localStorage als prop ontbreekt', () => {
    localStorage.getItem.mockReturnValueOnce('456');
    render(<Ziekmelden />);
    expect(localStorage.getItem).toHaveBeenCalledWith('userId');
  });

  test('haalt verloftype op bij render', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });

    render(<Ziekmelden userId="123" />);
    expect(getDoc).toHaveBeenCalledTimes(1);
  });

  test('behandelZiekmelding roept setDoc aan met juiste parameters', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ naam: 'Ziek' }),
    });
    setDoc.mockResolvedValueOnce();

    render(<Ziekmelden userId="123" />);
    const button = screen.getByText('Ziekmelden');
    fireEvent.click(button);

    // wacht voor async functie
    await new Promise((r) => setTimeout(r, 0));

    expect(setDoc).toHaveBeenCalledTimes(1);
  });

});
