import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/nl';
import './App.css'

import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Voorpagina from './pages/Voorpagina'
import Ziekmelden from './pages/Ziekmelden';
import GebruikerToevoegen from './pages/GebruikerToevoegen';
import VerlofAanvraag from './pages/VerlofAanvraag';
import Profiel from './pages/Profiel'
import AuditOverzicht from './pages/AuditOverzicht'

function App() {
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
        <Route path="/" element={<Login />} />
        <Route path="/ziekmelden" element={<Ziekmelden />} />
        <Route path="/verlofaanvraag" element={<VerlofAanvraag />} />
        <Route path="/audit-overzicht" element={<AuditOverzicht />} />
        <Route path="/gebruiker-registratie" element={<GebruikerToevoegen />} />

        {/* Voorpagina's beschermd per rol */}
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

        <Route path="/profiel/:userId" element={<Profiel />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;