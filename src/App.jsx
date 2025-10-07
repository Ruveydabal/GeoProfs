import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import './App.css'
import 'moment/dist/locale/nl';
import moment from 'moment';

import Voorpagina from './pages/Voorpagina'

function App() {
  moment.locale('nl'); //zet de taal van momentJS op nederlands
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/voorpagina" element={<Voorpagina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App