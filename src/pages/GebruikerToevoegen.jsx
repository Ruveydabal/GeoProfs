import { useState } from 'react';
import Header from '../components/Header';
import { db } from "../firebase";
import { collection, addDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function GebruikerToevoegen() {
  const navigate = useNavigate();

  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [bsnNummer, setBsnNummer] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [rol, setRol] = useState("");
  const [afdeling, setAfdeling] = useState("");
  const [inDienst, setInDienst] = useState("");
  const [verlofSaldo, setVerlofSaldo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // voorkomt dat de pagina herlaadt

    try {
      // Bepaal rol-documentreferentie
      let rolRef;
      switch (rol) {
        case "Office Manager":
          rolRef = doc(db, "rol", "1");
          break;
        case "Manager":
          rolRef = doc(db, "rol", "2");
          break;
        case "Medewerker":
        default:
          rolRef = doc(db, "rol", "3");
          break;
      }
      
      // Bepaal het hoogste bestaande nummer voor de document-ID
      const userSnapshot = await getDocs(collection(db, "user"));
      let maxNummer = 0;
      userSnapshot.forEach((doc) => {
        const id = doc.id;
        const num = parseInt(id);
        if (!isNaN(num) && num > maxNummer) maxNummer = num;
      });
      const nieuweGebruikersNummer = maxNummer + 1;


      // Gebruiker opslaan in de database tabel "user"
      const userRef = doc(db, "user", nieuweGebruikersNummer.toString());
      await setDoc(userRef, {
        voornaam,
        achternaam,
        email,
        bsnNummer,
        rol_id: rolRef,
        afdeling,
        inDienst: moment(inDienst).format("YYYY-MM-DD"),
        verlofSaldo: Number(verlofSaldo),
        laatstGeupdate: new Date().toISOString(),
      });

      // Wachtwoord opslaan in collectie "userPassword"
      await addDoc(collection(db, "userPassword"), {
        user_id: doc(db, "user", userRef.id),
        wachtwoord,
      });

      alert("Gebruiker succesvol aangemaakt!");
      navigate("/office-manager/voorpagina"); // automatisch terug na succesvol toevoegen, moet nog veranderd worden naar goede pagina, voor nu deze

    } catch (error) {
      console.error("Fout bij registratie:", error);
      alert("Fout bij aanmaken gebruiker: " + error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-white flex justify-center p-4 overflow-y-auto">
        <div className="h-[850px] w-[50%] bg-[#DDE7F1] flex flex-col justify-start items-center rounded-[15px] p-6">
          <div className="w-full flex flex-col items-center justify-start text-3xl font-bold mb-6">
            Registreer Nieuwe Gebruiker
          </div>

          {/* Persoonlijke gegevens */}
          <div className="w-full max-w-[400px] p-6 rounded-lg mb-6">
            <h2 className="text-center text-lg mb-4 font-semibold">
              Persoonlijke Gegevens
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Voornaam</label>
                <input
                  type="text"
                  value={voornaam}
                  onChange={(e) => setVoornaam(e.target.value)}
                  required
                  placeholder="Voornaam"
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Achternaam</label>
                <input
                  type="text"
                  value={achternaam}
                  onChange={(e) => setAchternaam(e.target.value)}
                  required
                  placeholder="Achternaam"
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="E-mail"
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">BSN nummer</label>
                <input
                  type="text"
                  value={bsnNummer}
                  onChange={(e) => setBsnNummer(e.target.value)}
                  required
                  placeholder="BSN nummer"
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Wachtwoord</label>
                <input
                  type="password"
                  value={wachtwoord}
                  onChange={(e) => setWachtwoord(e.target.value)}
                  required
                  placeholder="Wachtwoord"
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Werkgegevens */}
              <h2 className="text-center text-lg mt-8 mb-4 font-semibold">
                Werk Gegevens
              </h2>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Rol</label>
                <select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Selecteer rol</option>
                  <option>Medewerker</option>
                  <option>Manager</option>
                  <option>Office Manager</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Afdeling</label>
                <select
                  value={afdeling}
                  onChange={(e) => setAfdeling(e.target.value)}
                  required
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Selecteer afdeling</option>
                  <option>Test</option>
                  <option>Test2</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">In dienst</label>
                <input
                  type="date"
                  value={inDienst}
                  onChange={(e) => setInDienst(e.target.value)}
                  required
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Verlof saldo</label>
                <input
                  type="number"
                  value={verlofSaldo}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) setVerlofSaldo(value);
                  }}
                  required
                  placeholder="Bijv. 25"
                  min={0}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Buttons */}
              <div className="w-full flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/office-manager/voorpagina")} 
                  className="px-4 py-2 bg-[#FFFFFF] text-black rounded-[15px]"
                >
                  Annuleren
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2AAFF2] text-white rounded-[15px]"
                >
                  Gebruiker Aanmaken
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GebruikerToevoegen;