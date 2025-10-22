import { BrowserRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/nl';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App