import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OfficeManager from './pages/OfficeManager'
import Manager from './pages/Manager'
import Medewerker from './pages/Medewerker'
import Login from './pages/Login'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />

        {/* testen of dit klopt */}
        <Route path="/office-manager" element={<OfficeManager />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/medewerker" element={<Medewerker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App