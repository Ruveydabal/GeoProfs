import { describe, it, expect, vi, beforeEach, afterEach  } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import moment from "moment";

// Mock voor navigatie (react-router)
const mockNavigate = vi.fn();


// Mock useNavigate zodat echte routing niet wordt uitgevoerd
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock Firebase config (geen echte database)
vi.mock('../firebase', () => ({
    db: {},
}));

// Mock Firestore functies die in de component gebruikt worden
vi.mock('firebase/firestore', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        doc: vi.fn(() => ({})),
        getDoc: vi.fn(),
        setDoc: vi.fn(),
        serverTimestamp: vi.fn(() => new Date()),
    };
});

import {getDoc, setDoc} from 'firebase/firestore';
import Ziekmelden from "../../pages/Ziekmelden";

// DOM opruimen na elke test
afterEach(() => cleanup());

describe('Ziekmelden - integratietest', () => {
      // Reset mocks en localStorage voor elke test
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('HAPPY: gebruiker meldt zich ziek en wordt genavigeerd', async () => {
        // Arrange: gebruiker heeft rol
        localStorage.setItem('rol', 'medewerker');

        // Firestore retourneert verloftype
        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({ naam: 'Ziek' }),
        });

        // Firestore opslaan slaagt
        setDoc.mockResolvedValueOnce();

        render(<Ziekmelden userId="123" />);

        // verloftype uit Firestore
        expect(await screen.findByDisplayValue('Ziek')).toBeInTheDocument();

        // klik ziekmelden
        fireEvent.click(screen.getByRole('button', { name: 'Ziekmelden' }));

        // Firestore wordt aangeroepen
        await waitFor(() => expect(setDoc).toHaveBeenCalledTimes(1));

        // Navigatie op basis van rol
        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/medewerker/voorpagina')
        );
    });

    it('UNHAPPY: geen userid  toont alert en doet geen firestore call', async () => {
        // Spy op browser alert
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({naam: 'Ziek'}),
        });

        render(<Ziekmelden />); //geen userId prop & niets in localStorage

        fireEvent.click(screen.getByRole('button', {name: 'Ziekmelden'}));

        // Assert: foutmelding voor gebruiker
        await waitFor(()=> 
            expect(alertSpy).toHaveBeenCalledWith(
                'Geen gebruiker gevonden. Log opnieuw in.'
            )
        );

        // Assert: geen databaseactie en geen navigatie
        expect(setDoc).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();

        alertSpy.mockRestore();
    });

    it('UNHAPPY: Firestore fout  toont foutmelding en navigeert niet', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        localStorage.setItem('rol', 'medewerker');

        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({naam: 'Ziek'}),
        });

        // Simuleer Firestore error
        setDoc.mockRejectedValueOnce(new Error('Firestore error'));

        render(<Ziekmelden userId = '123' />);

        fireEvent.click(screen.getByRole('button', {name: 'Ziekmelden'}));

        // Assert: foutmelding bij mislukte opslag
        await waitFor(() => 
            expect(alertSpy).toHaveBeenCalledWith(
                'Er ging iets mis bij het ziekmelden.'
            )
        );

        // Assert: geen navigatie bij fout
        expect(mockNavigate).not.toHaveBeenCalled();

        alertSpy.mockRestore();

    });

    it('UNHAPPY: geen rol  navigeer naar /' ,async() => {
        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({naam: 'Ziek'}),
        });

        setDoc.mockResolvedValueOnce();

        render(<Ziekmelden userId='123' />);

        fireEvent.click(screen.getByRole('button', {name: 'Ziekmelden'}));

        // Ziekmelding wordt opgeslagen
        await waitFor(() => expect(setDoc).toHaveBeenCalled());

        // Zonder rol wordt gebruiker naar home gestuurd
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
    
    });

});