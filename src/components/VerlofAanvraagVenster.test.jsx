import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import VerlofAanvraagVenster from "./VerlofAanvraagVenster.jsx";
`1`;
describe("verlofaanvraag", () => {
  render(
    <VerlofAanvraagVenster
      zichtbaar={vi.fn()}
      opSluiten={vi.fn()}
      opVersturen={vi.fn()}
    />
  );
 

  it("Controleert of de component alle belangrijke elemnten renderd wanneer deze wordt geopend", () => {
    // Assert that the main elements are in the document
    expect(
      screen.getByRole("heading", { text: /Verlof Aanvragen/i })
    ).toBeInTheDocument();
 // Opzoek naar element doormiddel van de labels
 // Opzoek naar input velden doormiddel van de labels

    expect(screen.getByLabelText('Verloftype')).toBeInTheDocument();
    expect(screen.getByLabelText('Startdatum')).toBeInTheDocument();
    expect(screen.getByLabelText('Einddatum')).toBeInTheDocument();
    expect(screen.getByLabelText('Redenering')).toBeInTheDocument();
    expect(screen.getByLabelText('Uren')).toBeInTheDocument();
    expect(screen.getByLabelText('Annuleren')).toBeInTheDocument();
    expect(screen.getByLabelText('Versturen')).toBeInTheDocument();
    
   
  });

  //test 2 

  it("Medewerkers kunnen data invoeren ", () => {
    const redeneringInput = screen.getByPlaceholderText(/redenering.../i);
    // Opzoek naar element waar placeholdertext "redenering..." instaat

    fireEvent.change(redeneringInput, { target: { value: "test test test" } });
    // De input wordt veranderd naar "test test test"

    expect(redeneringInput).toHaveValue("test test test");
    // er wordt gecontroleerd of de input daadwerlijk veranderd is naar "test test test"
  });
});
