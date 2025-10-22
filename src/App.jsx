import { BrowserRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/nl';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OfficeManager from './pages/OfficeManager';
import Manager from './pages/Manager';
import Medewerker from './pages/Medewerker';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import './App.css';

import Login from './pages/Login'
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
        <Route path="/" element={<Login/>} />
        <Route path="/voorpagina" element={<Voorpagina />} />
        <Route path="/Ziekmelden" element={<Ziekmelden/>} />

        {/* Office Manager pagina */}
        <Route path="/office-manager" element={
          <ProtectedRoute allowedRoles={["office-manager"]}>
            {/* "childeren" */}
            <OfficeManager />
          </ProtectedRoute>
        }/>
    
        {/* Manager pagina */}
        <Route path="/manager" element={
          <ProtectedRoute allowedRoles={["manager"]}>
            {/* dit zijn de "childeren" */}
            <Manager />
          </ProtectedRoute>
        }/>

        {/* Medewerker pagina */}
        <Route path="/medewerker" element={
          <ProtectedRoute allowedRoles={["medewerker"]}>
            <Medewerker />
          </ProtectedRoute>
        }/>

        {/* Onbekende route → terug naar login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;