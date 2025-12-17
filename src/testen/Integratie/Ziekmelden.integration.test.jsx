import { describe, it, expect, vi, beforeEach, afterEach  } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import moment from "moment";

//mocks
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('../firebase', () => ({
    db: {},
}));

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

afterEach(() => cleanup());

describe('Ziekmelden - integratietest', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('HAPPY: gebruiker meldt zich ziek en wordt genavigeerd', async () => {
        localStorage.setItem('rol', 'medewerker');

        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({ naam: 'Ziek' }),
        });

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
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({naam: 'Ziek'}),
        });

        render(<Ziekmelden />); //geen userId prop & niets in localStorage

        fireEvent.click(screen.getByRole('button', {name: 'Ziekmelden'}));

        await waitFor(()=> 
            expect(alertSpy).toHaveBeenCalledWith(
                'Geen gebruiker gevonden. Log opnieuw in.'
            )
        );

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

        setDoc.mockRejectedValueOnce(new Error('Firestore error'));

        render(<Ziekmelden userId = '123' />);

        fireEvent.click(screen.getByRole('button', {name: 'Ziekmelden'}));

        await waitFor(() => 
            expect(alertSpy).toHaveBeenCalledWith(
                'Er ging iets mis bij het ziekmelden.'
            )
        );

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

        await waitFor(() => expect(setDoc).toHaveBeenCalled());

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
    
    });

})