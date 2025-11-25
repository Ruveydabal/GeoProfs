import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import Header from './components/Header';
import Login from './pages/Login';
import Voorpagina from './pages/Voorpagina';
import Profiel from './pages/Profiel';
import Ziekmelden from './pages/Ziekmelden';
import VerlofAanvraag from './pages/VerlofAanvraag';
import GebruikerToevoegen from './pages/GebruikerToevoegen';
import AuditOverzicht from './pages/AuditOverzicht';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const gebruikerId = localStorage.getItem("userId");
    if (!gebruikerId) return;

    try {
      const gebruikerDoc = await getDoc(doc(db, "user", gebruikerId));
      if (!gebruikerDoc.exists()) return;

      const gebruikerData = gebruikerDoc.data();

      let rolNaam = "Onbekende rol";
      if (gebruikerData.rol_id) {
        const rolDoc = await getDoc(gebruikerData.rol_id);
        if (rolDoc.exists()) rolNaam = rolDoc.data().rolNaam || "Onbekende rol";
      }

      setUser({ ...gebruikerData, rol: rolNaam });

    } catch (error) {
      console.error("Fout bij ophalen gebruiker:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logica
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const rol = localStorage.getItem("rol");
  if (!isLoggedIn && window.location.pathname !== "/") window.location.href = "/";
  if (isLoggedIn && !rol) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  }

  return (
    <BrowserRouter>
      <Header user={user} refreshUser={fetchUser} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ziekmelden" element={<Ziekmelden />} />
        <Route path="/verlofaanvraag" element={<VerlofAanvraag />} />
        <Route path="/audit-overzicht" element={<AuditOverzicht />} />
        <Route path="/gebruiker-registratie" element={<GebruikerToevoegen />} />
        <Route path="/profiel/:userId" element={<Profiel refreshUser={fetchUser} />} />

        <Route path="/officemanager/voorpagina" element={
          <ProtectedRoute allowedRoles={["officemanager"]}>
            <Voorpagina />
          </ProtectedRoute>
        }/>

        <Route path="/manager/voorpagina" element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <Voorpagina />
          </ProtectedRoute>
        }/>

        <Route path="/medewerker/voorpagina" element={
          <ProtectedRoute allowedRoles={["medewerker"]}>
            <Voorpagina />
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;