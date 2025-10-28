import Header from "../components/Header.jsx";
import BevestigingsVenster from "../components/BevestigingsVenster.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Verlofoverzicht() {
  const navigate = useNavigate();
  const [toonVenster, stelToonVensterIn] = useState(false);
  const openVenster = () => stelToonVensterIn(true);
  const sluitVenster = () => stelToonVensterIn(false);
//Bevestigings venster
  const bevestigAnnulering = () => {
    console.log("Verzoek geannuleerd!");
    stelToonVensterIn(false);
  };

  //voorpagina knop
  const gaNaarVoorpagina = () => {
    navigate("/voorpagina");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={gaNaarVoorpagina}
            className="bg-blue-500  text-white font-medium px-4 py-2 rounded-[15px] "
          >
            Home
          </button>
          <button
            className="bg-blue-500  text-white font-medium px-4 py-2 rounded-[15px] "
          >
            Verlof Aanvragen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="border rounded-md bg-white shadow-sm p-4">
              <h3 className="font-semibold">Jezelf</h3>
              <p className="text-sm text-gray-600">Vakantie</p>
              <p className="text-sm text-gray-600">
                Van: 29-09-2025 t/m 25-09-2025
              </p>
              <p className="text-sm text-gray-600 mb-2">Opmerking: …</p>
              <p className="text-gray-600 font-medium">Goedgekeurd</p>
            </div>

            <div className="border rounded-md bg-white shadow-sm p-4">
              <h3 className="font-semibold">Jezelf</h3>
              <p className="text-sm text-gray-600">Vakantie</p>
              <p className="text-sm text-gray-600"></p>
              <p className="text-sm text-gray-600 mb-2">Opmerking: …</p>
              <p className="text-gray-600 font-medium">Afgekeurd</p>
            </div>
          </div>

          <div className="border rounded-md bg-white shadow-sm p-4">
            <h3 className="font-semibold">Jezelf</h3>
            <p className="text-sm text-gray-600">Vakantie</p>
            <p className="text-sm text-gray-600">
              Van: 29-09-2025 t/m 25-09-2025
            </p>
            <p className="text-sm text-gray-600 mb-2">Opmerking: …</p>

            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500  text-white px-3 py-1 rounded-[15px]  text-sm">
                Wijzig verlof
              </button>
              <button
                onClick={openVenster}
                className="bg-gray-200  text-gray-700 px-3 py-1 rounded-[15px] text-sm"
              >
                Annuleer Verzoek
              </button>
            </div>
          </div>
        </div>
      </div>

      <BevestigingsVenster
        zichtbaar={toonVenster}
        tekst="Weet u zeker dat u dit verzoek wilt annuleren?"
        onBevestig={bevestigAnnulering}
        onAnnuleer={sluitVenster}
      />

    </div>
  );
}

export default Verlofoverzicht;
