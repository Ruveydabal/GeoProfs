import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/nl';
import './App.css'

import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Voorpagina from './pages/Voorpagina'
import Ziekmelden from './pages/Ziekmelden';

function App() {
  // Extra beveiliging: als iemand handmatig /medewerker intypt zonder login
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const rol = localStorage.getItem("rol");

  // Als niet ingelogd en niet op loginpagina → terug naar login
  if (!isLoggedIn && window.location.pathname !== "/") {
    window.location.href = "/";
  }

  // Als er geen rol bekend is, verwijder foutieve status
  if (isLoggedIn && !rol) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  }

  moment.locale('nl'); //zet de taal van momentJS op nederlands
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ziekmelden" element={<Ziekmelden />} />

        {/* Voorpagina voor alle rollen, beschermd */}
        <Route path="/office-manager/voorpagina" element={
          <ProtectedRoute allowedRoles={["office-manager"]}>
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

        {/* Onbekende route → terug naar login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;