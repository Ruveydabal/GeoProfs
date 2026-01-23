import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import GebruikerToevoegen from "../../pages/GebruikerToevoegen";

// Cleanup (verplicht bij Vitest + React 18)
afterEach(() => {
  cleanup();
});

// React Router mock
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Firebase / Firestore mocks
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

// Browser API mocks
global.alert = vi.fn();

// Test helpers
const renderPagina = () =>
  render(
    <MemoryRouter>
      <GebruikerToevoegen />
    </MemoryRouter>
  );

const klikSubmit = async (user) => {
  const buttons = screen.getAllByRole("button", {
    name: /Gebruiker Aanmaken/i,
  });
  await user.click(buttons[0]);
};

const vulFormulierIn = async (user) => {
  await user.type(screen.getByLabelText("Voornaam"), "Tim");
  await user.type(screen.getByLabelText("Achternaam"), "Tom");
  await user.type(screen.getByLabelText("E-mail"), "tim@gmail.com");
  await user.type(screen.getByLabelText("BSN nummer"), "123456789");
  await user.type(screen.getByLabelText("Wachtwoord"), "tim123");

  await user.selectOptions(
    screen.getByRole("combobox", { name: /Rol/i }),
    "Medewerker"
  );

  await user.selectOptions(
    screen.getByRole("combobox", { name: /Afdeling/i }),
    "ICT"
  );

  await user.type(screen.getByLabelText("In dienst"), "2025-12-09");
  await user.type(screen.getByLabelText("Verlof saldo"), "50");
};

describe("GebruikerToevoegen – integratie test", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetDocs.mockResolvedValue({
      forEach: (cb) => cb({ id: "1" }),
    });

    mockDoc.mockReturnValue({ id: "2" });
    mockSetDoc.mockResolvedValue();
    mockAddDoc.mockResolvedValue();
  });

    // HAPPY FLOW
  it("maakt succesvol een gebruiker aan", async () => {
    const user = userEvent.setup();
    renderPagina();

    await vulFormulierIn(user);
    await klikSubmit(user);

    await waitFor(() => {
      expect(mockSetDoc).toHaveBeenCalledTimes(1);
      expect(mockAddDoc).toHaveBeenCalledTimes(1);
    });

    expect(global.alert).toHaveBeenCalledWith(
      "Gebruiker succesvol aangemaakt!"
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/office-manager/voorpagina"
    );
  });

    // UNHAPPY FLOW – VALIDATIE
  it("verstuurt niet als verplichte velden ontbreken", async () => {
    const user = userEvent.setup();
    renderPagina();

    await user.type(screen.getByLabelText("Voornaam"), "Tim");
    await klikSubmit(user);

    await waitFor(() => {
      expect(mockSetDoc).not.toHaveBeenCalled();
      expect(mockAddDoc).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

    // UNHAPPY FLOW – setDoc faalt
  it("toont foutmelding als Firestore faalt bij opslaan gebruiker", async () => {
    mockSetDoc.mockRejectedValueOnce(
      new Error("Firestore setDoc error")
    );

    const user = userEvent.setup();
    renderPagina();

    await vulFormulierIn(user);
    await klikSubmit(user);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining("Fout bij aanmaken gebruiker")
      );
    });

    expect(mockAddDoc).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

    // UNHAPPY FLOW – addDoc faalt
  it("toont foutmelding als wachtwoord niet kan worden opgeslagen", async () => {
    mockAddDoc.mockRejectedValueOnce(
      new Error("addDoc error")
    );

    const user = userEvent.setup();
    renderPagina();

    await vulFormulierIn(user);
    await klikSubmit(user);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining("Fout bij aanmaken gebruiker")
      );
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});