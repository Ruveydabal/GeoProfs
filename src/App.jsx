import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Verlofoverzicht from './pages/Verlofoverzicht';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/verlofoverzicht" element={<Verlofoverzicht/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App