import React, { useState } from "react";

function VerlofAanvraagVenster({ zichtbaar, opSluiten, opVersturen }) {
  const [verlofType, setVerlofType] = useState("");
  const [startDatum, setStartDatum] = useState("");
  const [eindDatum, setEindDatum] = useState("");
  const [redenering, setRedenering] = useState("");
  const [foutmelding, setFoutmelding] = useState("");
  const [succesMelding, setSuccesMelding] = useState("");

  if (!zichtbaar) return null;

  const verstuurFormulier = () => {
    setFoutmelding("");
    setSuccesMelding("");


    if (!verlofType || !startDatum || !eindDatum) {
      setFoutmelding("Vul alle verplichte velden in.");
      return;
    }

    if (new Date(eindDatum) < new Date(startDatum)) {
      setFoutmelding("De einddatum mag niet vóór de startdatum liggen.");
      return;
    }

   
    const data = { verlofType, startDatum, eindDatum, redenering };

  
    opVersturen(data);


    setSuccesMelding("Verzoek succesvol verzonden!");

    setVerlofType("");
    setStartDatum("");
    setEindDatum("");
    setRedenering("");

    setTimeout(() => {
      setSuccesMelding("");
      opSluiten();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Verlof Aanvragen
        </h2>

        {foutmelding && (
          <p className="text-red-500 text-sm mb-3">{foutmelding}</p>
        )}

     
        {succesMelding && (
          <p className="text-green-600 text-sm mb-3">{succesMelding}</p>
        )}

        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={verlofType}
          onChange={(e) => setVerlofType(e.target.value)}
        >
          <option value="">Verlof Type *</option>
          <option value="vakantie">Vakantie</option>
          <option value="ziekteverlof">Ziekteverlof</option>
          <option value="ander">Ander</option>
        </select>

        <div className="flex gap-2 mb-4">
          <input
            type="date"
            className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={startDatum}
            onChange={(e) => setStartDatum(e.target.value)}
          />
          <input
            type="date"
            className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={eindDatum}
            onChange={(e) => setEindDatum(e.target.value)}
          />
        </div>

        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Redenering..."
          rows="3"
          value={redenering}
          onChange={(e) => setRedenering(e.target.value)}
        />

        <p className="text-sm text-gray-600 mb-4">
          U heeft nog <span className="font-semibold">24 vrije uren</span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={opSluiten}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-[15px] hover:bg-gray-100"
          >
            Annuleren
          </button>
          <button
            onClick={verstuurFormulier}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-[15px]"
          >
            Opsturen
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerlofAanvraagVenster;