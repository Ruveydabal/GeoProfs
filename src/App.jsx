import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/dist/locale/nl';
import './App.css'

import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import HeaderZonderRefresh from './components/HeaderZonderRefresh';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Voorpagina from './pages/Voorpagina'
import Ziekmelden from './pages/Ziekmelden';
import GebruikerToevoegen from './pages/GebruikerToevoegen';
import VerlofAanvraag from './pages/VerlofAanvraag';
import Profiel from './pages/Profiel'
import AuditOverzicht from './pages/AuditOverzicht'
import Verlofoverzicht from './pages/Verlofoverzicht';

function App() {
  const [gebruiker, setGebruiker] = useState(null);

  useEffect(() => {
    const haalGebruikerOp = async () => {
      const gebruikerId = localStorage.getItem("userId");
      if (!gebruikerId) return;

      try {
        const gebruikerDoc = await getDoc(doc(db, "user", gebruikerId));
        if (!gebruikerDoc.exists()) return;

        const gebruikerData = gebruikerDoc.data();

        let rolNaam = "Onbekende rol";
        if (gebruikerData.rol_id) {
          const rolDoc = await getDoc(gebruikerData.rol_id);
          if (rolDoc.exists()) {
            rolNaam = rolDoc.data().rolNaam || "Onbekende rol";
          }
        }

        setGebruiker({ ...gebruikerData, rol: rolNaam });
      } catch (error) {
        console.error("Fout bij ophalen gebruiker:", error);
      }
    };

    haalGebruikerOp();
  }, []);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const rol = localStorage.getItem("rol");

  if (!isLoggedIn && window.location.pathname !== "/") {
    window.location.href = "/";
  }

  if (isLoggedIn && !rol) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  }

  moment.locale('nl');

  return (
    <BrowserRouter>
      <Routes>

        {/* Loginpagina krijgt geen header */}
        <Route path="/" element={<Login />} />

        {/* Pagina's met header */}
        <Route path="/ziekmelden" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <Ziekmelden />
          </HeaderZonderRefresh>
        }/>

        <Route path="/verlofaanvraag" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <VerlofAanvraag />
          </HeaderZonderRefresh>
        }/>

        <Route path="/audit-overzicht" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <AuditOverzicht />
          </HeaderZonderRefresh>
        }/>

        <Route path="/gebruiker-registratie" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <GebruikerToevoegen />
          </HeaderZonderRefresh>
        }/>

        <Route path="/profiel/:userId" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <Profiel />
          </HeaderZonderRefresh>
        }/>

        <Route path="/verlofoverzicht" element={
          <HeaderZonderRefresh gebruiker={gebruiker}>
            <Verlofoverzicht gebruiker={gebruiker}/>
          </HeaderZonderRefresh>
        }/>

        {/* Voorpagina's beschermd per rol */}
        <Route path="/officemanager/voorpagina" element={
          <ProtectedRoute allowedRoles={["officemanager"]}>
            <HeaderZonderRefresh gebruiker={gebruiker}>
              <Voorpagina />
            </HeaderZonderRefresh>
          </ProtectedRoute>
        }/>

        <Route path="/manager/voorpagina" element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <HeaderZonderRefresh gebruiker={gebruiker}>
              <Voorpagina />
            </HeaderZonderRefresh>
          </ProtectedRoute>
        }/>

        <Route path="/medewerker/voorpagina" element={
          <ProtectedRoute allowedRoles={["medewerker"]}>
            <HeaderZonderRefresh gebruiker={gebruiker}>
              <Voorpagina />
            </HeaderZonderRefresh>
          </ProtectedRoute>
        }/>

        {/* Alle overige routes gaan naar login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;