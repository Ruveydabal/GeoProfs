import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GebruikerToevoegen from "../pages/GebruikerToevoegen";

// Mock navigate van React Router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock Firestore functies
const mockGetDocs = vi.fn(() => ({
  forEach: (cb) => cb({ id: "1" }),  
}));

const mockSetDoc = vi.fn();
const mockAddDoc = vi.fn();
const mockDoc = vi.fn(() => ({}));
const mockCollection = vi.fn();

// Mock firebase
vi.mock("../firebase", () => ({
  db: {},
  Timestamp: {
    fromDate: vi.fn(() => new Date()),
  },
}));

// Mock Firebase Firestore 
vi.mock("firebase/firestore", () => ({
  getDocs: (...args) => mockGetDocs(...args),
  setDoc: (...args) => mockSetDoc(...args),
  addDoc: (...args) => mockAddDoc(...args),
  doc: (...args) => mockDoc(...args),
  collection: (...args) => mockCollection(...args),
}));

// Mock alert voor wanneer het gelukt is om de gebruiker aan te maken
global.alert = vi.fn();

describe("Gebruiker Toevoegen Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maakt succesvol een gebruiker aan wanneer alle velden zijn ingevuld", async () => {
    render(<GebruikerToevoegen />);
    const user = userEvent.setup();

    // invullen velden
    await user.type(screen.getByPlaceholderText("Voornaam"), "Tim");
    await user.type(screen.getByPlaceholderText("Achternaam"), "Tom");
    await user.type(screen.getByPlaceholderText("E-mail"), "tim@gmail.com");
    await user.type(screen.getByPlaceholderText("BSN nummer"), "123456789");
    await user.type(screen.getByPlaceholderText("Wachtwoord"), "tim");

    await user.selectOptions(
      screen.getByRole("combobox", { name: /Rol/i }),
      "Medewerker"
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: /Afdeling/i }),
      "ICT"
    );

    await user.type(screen.getByLabelText("In dienst"), "2025-12-09");
    await user.type(screen.getByPlaceholderText("Saldo"), "50");

    // submit
    await user.click(screen.getByRole("button", { name: "Gebruiker Aanmaken" }));

    // Verwachte Firestore interacties
    expect(mockSetDoc).toHaveBeenCalled();
    expect(mockAddDoc).toHaveBeenCalled();

    // Alert
    expect(global.alert).toHaveBeenCalledWith("Gebruiker succesvol aangemaakt!");

    // Navigatie is uitgevoerd
    expect(mockNavigate).toHaveBeenCalled();
  });

  // Verplichten invoervelden
  const verplichteVelden = [
    { label: "Voornaam", placeholder: "Voornaam" },
    { label: "Achternaam", placeholder: "Achternaam" },
    { label: "E-mail", placeholder: "E-mail" },
    { label: "BSN nummer", placeholder: "BSN nummer" },
    { label: "Wachtwoord", placeholder: "Wachtwoord" },
    { label: "Rol", role: /Rol/i },
    { label: "Afdeling", role: /Afdeling/i },
    { label: "In dienst", labelText: "In dienst" },
    { label: "Verlof saldo", placeholder: "Saldo" },
  ];

    // Unhappy Flows (verplicht veld niet ingevuld)
    verplichteVelden.forEach((veld) => {
    it(`verzendt niet als ${veld.label} niet is ingevuld`, async () => {
        render(<GebruikerToevoegen />);
        const user = userEvent.setup();

        // Vul alles in behalve het veld dat we testen
        if (veld.placeholder && veld.placeholder !== "Voornaam") {
            const inputs = screen.getAllByPlaceholderText("Voornaam");
            await user.type(inputs[0], "Tim");
        }
        if (veld.placeholder && veld.placeholder !== "Achternaam") {
            const inputs = screen.getAllByPlaceholderText("Achternaam");
            await user.type(inputs[0], "Tom");
        }
        if (veld.placeholder && veld.placeholder !== "E-mail") {
            const inputs = screen.getAllByPlaceholderText("E-mail");
            await user.type(inputs[0], "tim@gmail.com");
        }
        if (veld.placeholder && veld.placeholder !== "BSN nummer") {
            const inputs = screen.getAllByPlaceholderText("BSN nummer");
            await user.type(inputs[0], "123456789");
        }
        if (veld.placeholder && veld.placeholder !== "Wachtwoord") {
            const inputs = screen.getAllByPlaceholderText("Wachtwoord");
            await user.type(inputs[0], "tim");
        }
        if (veld.role && veld.role.source !== /Rol/i.source) {
            const rolSelects = screen.getAllByRole("combobox", { name: /Rol/i });
            await user.selectOptions(rolSelects[0], "Medewerker");
        }
        if (veld.role && veld.role.source !== /Afdeling/i.source) {
            const afdelingSelects = screen.getAllByRole("combobox", { name: /Afdeling/i });
            await user.selectOptions(afdelingSelects[0], "ICT");
        }
        if (veld.labelText && veld.labelText !== "In dienst") {
            const inDienstInputs = screen.getAllByLabelText("In dienst");
            await user.type(inDienstInputs[0], "2025-12-09");
        }
        if (veld.placeholder && veld.placeholder !== "Saldo") {
            const saldoInputs = screen.getAllByPlaceholderText("Saldo");
            await user.type(saldoInputs[0], "50");
        }

        // Klik aanmaken - gebruik de eerste knop als er meerdere zijn
        const buttons = screen.getAllByRole("button", { name: "Gebruiker Aanmaken" });
        await user.click(buttons[0]);

        // Verwachte Firestore interacties mogen niet worden uitgevoerd
        expect(mockSetDoc).not.toHaveBeenCalled();
        expect(mockAddDoc).not.toHaveBeenCalled();
        expect(global.alert).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    })});
});