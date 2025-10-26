import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import VerlofoverzichtMedewerker from './pages/VerlofoverzichtMedewerker';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/verlofoverzicht" element={<VerlofoverzichtMedewerker/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App