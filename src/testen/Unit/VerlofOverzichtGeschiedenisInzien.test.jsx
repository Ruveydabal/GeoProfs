import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Verlofoverzicht from '../../../src/pages/Verlofoverzicht.jsx';
import '@testing-library/jest-dom/vitest';
import { doc, setDoc, getDocs, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import moment from 'moment';

//Mock navigate van React Router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

//Mock inloggen
localStorage.setItem("userId", 7);
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("rol", "manager");

//Ruimt de DOM op na elke test
afterEach(() => cleanup());

describe('Verlof Overzicht Geschiedenis Component', () => {
    it('geschiedenis toont alle aanvragen van ingelogde user in geschiedenis', async () => {
        await DemoDataToevoegen("S3C1_testAanvraag_1", "7", "0", "2026-1-1", "2026-1-2", "1", "").then();
        await DemoDataToevoegen("S3C1_testAanvraag_2", "7", "0", "2026-1-1", "2026-1-2", "1", "").then();

        render(<Verlofoverzicht idsZichtbaar={true} />);
        expect(await screen.findByText(/S3C1_testAanvraag_1/)).toBeInTheDocument();
        expect(await screen.findByText(/S3C1_testAanvraag_2/)).toBeInTheDocument();
    });
});

async function DemoDataToevoegen(docId, userId, verlofType, startDatum, eindDatum, statusVerlofId, reden)
{
  try {
    const verlofRef = doc(db, "verlof", docId);
    await setDoc(verlofRef, {
        user_id: doc(db, "user", userId),
        typeVerlof_id: doc(db, "typeVerlof", verlofType),
        startDatum: moment(startDatum, 'YYYY-MM-DD').toDate(),
        eindDatum: moment(eindDatum, 'YYYY-MM-DD').toDate(),
        statusVerlof_id: doc(db, "statusVerlof", statusVerlofId),
        omschrijvingRedenVerlof: reden || "Geen reden opgegeven",
        createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Kon demo data niet toevoegen:", error);
  }
}