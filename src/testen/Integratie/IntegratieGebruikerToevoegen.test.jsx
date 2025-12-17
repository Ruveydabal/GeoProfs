import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import GebruikerToevoegen from "../../pages/GebruikerToevoegen";

// Router mock (écht navigatiegedrag)
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Firebase / Firestore mock
const mockGetDocs = vi.fn();
const mockSetDoc = vi.fn();
const mockAddDoc = vi.fn();
const mockDoc = vi.fn();
const mockCollection = vi.fn();

vi.mock("../../firebase", () => ({
  db: {},
  Timestamp: {
    fromDate: vi.fn((date) => date),
  },
}));

vi.mock("firebase/firestore", () => ({
  collection: (...args) => mockCollection(...args),
  doc: (...args) => mockDoc(...args),
  getDocs: (...args) => mockGetDocs(...args),
  setDoc: (...args) => mockSetDoc(...args),
  addDoc: (...args) => mockAddDoc(...args),
}));

// Global alert mock
global.alert = vi.fn();

describe("GebruikerToevoegen - integratie test", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Simuleer bestaande gebruikers (ID = "1")
    mockGetDocs.mockResolvedValue({
      forEach: (cb) => cb({ id: "1" }),
    });

    mockDoc.mockReturnValue({ id: "2" });
    mockSetDoc.mockResolvedValue();
    mockAddDoc.mockResolvedValue();
  });

  it("doorloopt het volledige registratieproces succesvol", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <GebruikerToevoegen />
      </MemoryRouter>
    );

    /* -------- Form invullen -------- */
    await user.type(screen.getByPlaceholderText("Voornaam"), "Tim");
    await user.type(screen.getByPlaceholderText("Achternaam"), "Tom");
    await user.type(screen.getByPlaceholderText("E-mail"), "tim@gmail.com");
    await user.type(screen.getByPlaceholderText("BSN nummer"), "123456789");
    await user.type(screen.getByPlaceholderText("Wachtwoord"), "tim123");

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

    /* -------- Submit -------- */
    await user.click(
      screen.getByRole("button", { name: /Gebruiker Aanmaken/i })
    );

    /* -------- Verwachtingen -------- */
    await waitFor(() => {
      expect(mockSetDoc).toHaveBeenCalledTimes(1);
      expect(mockAddDoc).toHaveBeenCalledTimes(1);
    });

    expect(mockSetDoc).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        voornaam: "Tim",
        achternaam: "Tom",
        email: "tim@gmail.com",
        bsnNummer: "123456789",
        afdeling: "ICT",
        verlofSaldo: 50,
      })
    );

    expect(global.alert).toHaveBeenCalledWith(
      "Gebruiker succesvol aangemaakt!"
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/office-manager/voorpagina"
    );
  });
});