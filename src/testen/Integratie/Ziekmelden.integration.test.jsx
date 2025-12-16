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

    it('gebruiker doorloopt volledige ziekmeld-flow' , async () =>{
        //arange
        localStorage.setItem('rol', 'medewerker');

        getDoc.mockResolvedValueOnce({
            exists: () => true,
            data: () => ({naam: 'Ziek'}),
        });

        getDoc.mockResolvedValueOnce();

        render(<Ziekmelden userId="123" />);

        // Assert: verloftype uit Firestore
        const verlofInput = await screen.findByDisplayValue('Ziek');
        expect(verlofInput).toBeInTheDocument();

        // Assert: datums zijn correct
        const dateInputs = screen.getAllByRole('textbox');
        expect(dateInputs[0].value).toBe(moment().format('D-MM-YYYY'));
        expect(dateInputs[1].value).toBe(moment().add( 1,'days').format('D-MM-YYYY'));

        // Act: klik ziekmelden
        const button = screen.getByRole('button', {name: 'Ziekmelden'});
        fireEvent.click(button);

        // wacht tot navigate is aangeroepen
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/medewerker/voorpagina');
        });

        // Assert: Firestore setDoc aangeroepen
        expect(setDoc).toHaveBeenCalledTimes(1);

        // Assert: navigatie op basis van rol
        expect(mockNavigate).toHaveBeenCalledWith('/medewerker/voorpagina')
    });
})