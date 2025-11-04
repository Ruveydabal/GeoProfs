import React from 'react';
import Header from '../components/Header';
import moment from 'moment';
import 'moment/locale/nl';
moment.locale('nl');

function GebruikerToevoegen() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header blijft bovenaan */}
      <Header />

      {/* Scrollbaar content-gedeelte */}
      <div className="flex-1 bg-white flex justify-center p-4 overflow-y-auto">
        <div className="h-[850px] w-[50%] bg-[#DDE7F1] flex flex-col justify-start items-center rounded-[15px] p-6">

          {/* Titel */}
          <div className="w-full flex flex-col items-center justify-start text-3xl font-bold mb-6">
            Registreer Nieuwe Gebruiker
          </div>

          <div className="w-full max-w-[400px] p-6 rounded-lg mb-6">
            <h2 className="text-center text-lg mb-4 font-semibold">
              Persoonlijke Gegevens
            </h2>
            <form className="flex flex-col gap-4">

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Voornaam</label>
                <input type="text" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  placeholder="Voornaam"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Achternaam</label>
                <input type="text" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  placeholder="Achternaam"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">E-mail</label>
                <input type="email" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  placeholder="E-mail"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">BSN nummer</label>
                <input type="text" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  placeholder="BSN nummer"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Wachtwoord</label>
                <input type="password" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  placeholder="Wachtwoord"
                />
              </div>
            </form>
          </div>

          <div className="w-full max-w-[400px] p-6 rounded-lg mb-6">
            <h2 className="text-center text-lg mb-4 font-semibold">
              Werk Gegevens
            </h2>
            <form className="flex flex-col gap-4">

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Rol</label>
                <select className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                  defaultValue="Rol">
                  <option>Medewerker</option>
                  <option>Manager</option>
                  <option>Office Manager</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Afdeling</label>
                <select className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  defaultValue="Afdeling">
                  <option>Test</option>
                  <option>Test2</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">In dienst</label>
                <input type="date" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-sm font-medium">Verlof saldo:</label>
                <input type="number" 
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

            </form>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-[400px] flex justify-between mb-4">
            <button className="px-4 py-2 bg-[#E8641C] text-black rounded-[15px] bg-[#FFFFFF]">Annuleren</button>
            <button className="px-4 py-2 bg-[#1C64F2] text-white rounded-[15px] bg-[#2AAFF2]">Gebruiker Aanmaken</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GebruikerToevoegen;
