import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login.jsx";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from 'vitest';

// -------------------
// Mock Firebase direct in vi.mock
// -------------------
vi.mock("../../firebase", () => ({
  db: {}, // dummy db object
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
}));

// Import hierna pas, zodat de mocks actief zijn
import { getDocs } from "../../firebase";

// -------------------
// Tests
// -------------------
describe("Login component", () => {
  const setTrigger = vi.fn();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Login setTrigger={setTrigger} />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("Toont foutmelding als velden leeg zijn", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Vul zowel e-mailadres als wachtwoord in.")).toBeInTheDocument();
  });

  it("Toont foutmelding als gebruiker niet bestaat", async () => {
    getDocs.mockResolvedValueOnce({ empty: true }); // gebruiker bestaat niet

    renderComponent();

    userEvent.type(screen.getByPlaceholderText(/e-mail/i), "test@test.com");
    userEvent.type(screen.getByPlaceholderText(/wachtwoord/i), "123456");

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Gebruiker niet gevonden.")).toBeInTheDocument();
  });

  it("Logt succesvol in met juiste credentials", async () => {
    const fakeUserDoc = {
      id: "user123",
      data: () => ({ rol_id: { id: "3" } }),
      ref: "ref123",
    };

    const fakePasswordDoc = {
      data: () => ({ wachtwoord: "123456" }),
    };

    getDocs
      .mockResolvedValueOnce({ empty: false, docs: [fakeUserDoc] }) // gebruiker zoeken
      .mockResolvedValueOnce({ empty: false, docs: [fakePasswordDoc] }); // wachtwoord zoeken

    renderComponent();

    userEvent.type(screen.getByPlaceholderText(/e-mail/i), "test@test.com");
    userEvent.type(screen.getByPlaceholderText(/wachtwoord/i), "123456");

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("userId")).toBe("user123");
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
      expect(localStorage.getItem("rol")).toBe("medewerker");
      expect(setTrigger).toHaveBeenCalled();
    });
  });
});