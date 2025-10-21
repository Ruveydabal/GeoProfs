import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Profiel from './pages/Profiel'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profiel/:id" element={<Profiel/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App