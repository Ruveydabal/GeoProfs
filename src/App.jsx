import { BrowserRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/nl';
import Login from './pages/Login'
import Profiel from './pages/Profiel'
import './App.css'

import Login from './pages/Login'
import Voorpagina from './pages/Voorpagina'
import Ziekmelden from './pages/Ziekmelden';

function App() {
  moment.locale('nl'); //zet de taal van momentJS op nederlands
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/voorpagina" element={<Voorpagina />} />
        <Route path="/Ziekmelden" element={<Ziekmelden/>} />
        <Route path="/profiel/:id" element={<Profiel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App