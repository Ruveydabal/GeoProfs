import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Verlofoverzicht from '../../pages/Verlofoverzicht.jsx';
import '@testing-library/jest-dom/vitest';
import { doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase.js';
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
    it('toon alle aanvragen van ingelogde user in geschiedenis', async () => {
        //demo data toevoegen
        await DemoDataToevoegen("S3C1_testAanvraag_1", "7", "0", "2026-1-1", "2026-1-2", "1", "").then();
        await DemoDataToevoegen("S3C1_testAanvraag_2", "7", "0", "2026-1-1", "2026-1-2", "1", "").then();

        //test
        render(<Verlofoverzicht idsZichtbaar={true} />);
        expect(await screen.findByText(/S3C1_testAanvraag_1/)).toBeInTheDocument();
        expect(await screen.findByText(/S3C1_testAanvraag_2/)).toBeInTheDocument();

        //demo data verwijderen
        await DemoDataVerwijderen("S3C1_testAanvraag_1").then();
        await DemoDataVerwijderen("S3C1_testAanvraag_2").then();
    });

    it('toon geen aanvragen van andere user in geschiedenis', async () => {
        //demo data toevoegen
        await DemoDataToevoegen("S3C2_testAanvraag_1", "1", "0", "2026-1-1", "2026-1-2", "1", "").then();
        await DemoDataToevoegen("S3C2_testAanvraag_2", "1", "0", "2026-1-1", "2026-1-2", "1", "").then();

        //test
        render(<Verlofoverzicht idsZichtbaar={true} />);
        expect(screen.queryByText(/S3C2_testAanvraag_1/)).not.toBeInTheDocument();
        expect(screen.queryByText(/S3C2_testAanvraag_2/)).not.toBeInTheDocument();

        //demo data verwijderen
        await DemoDataVerwijderen("S3C2_testAanvraag_1").then();
        await DemoDataVerwijderen("S3C2_testAanvraag_2").then();
    });

    it('toon Goed- en afgekeurde verlof aanvragen in geschiedenis.', async () => {
        //demo data toevoegen
        await DemoDataToevoegen("S3C3_testAanvraag_1", "7", "0", "2026-1-1", "2026-1-2", "1", "").then();
        await DemoDataToevoegen("S3C3_testAanvraag_2", "7", "0", "2026-1-1", "2026-1-2", "2", "").then();

        //test
        render(<Verlofoverzicht/>);
        expect(await screen.findByText("Goedgekeurd")).toBeInTheDocument();
        expect(await screen.findByText("Afgekeurd")).toBeInTheDocument();

        //demo data verwijderen
        await DemoDataVerwijderen("S3C3_testAanvraag_1").then();
        await DemoDataVerwijderen("S3C3_testAanvraag_2").then();
    });

    it('toon geen verlof aanvragen met status In Afwachting of Gezien in geschiedenis.', async () => {
        //demo data toevoegen
        await DemoDataToevoegen("S3C4_testAanvraag_1", "7", "0", "2026-1-1", "2026-1-2", "3", "").then();
        await DemoDataToevoegen("S3C4_testAanvraag_2", "7", "0", "2026-1-1", "2026-1-2", "4", "").then();

        //test
        render(<Verlofoverzicht/>);
        expect(screen.queryByText("In Afwachting")).not.toBeInTheDocument();
        expect(screen.queryByText("Gezien")).not.toBeInTheDocument();

        //demo data verwijderen
        await DemoDataVerwijderen("S3C4_testAanvraag_1").then();
        await DemoDataVerwijderen("S3C4_testAanvraag_2").then();
    });

    it('Toon text waneer geschiedenis leeg is.', async () => {
        render(<Verlofoverzicht/>);
        expect(await screen.findByText("U heeft geen verleden verlof aanvragen.")).toBeInTheDocument();
    });
});

//document toevoegen aan database.
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

//document verwijderen uit database.
async function DemoDataVerwijderen(docId)
{
  if (!docId) return;

  try {
    await deleteDoc(doc(db, "verlof", docId));
  } catch (error) {
    console.error("Kon demo data niet verwijderen:", error);
  }
}