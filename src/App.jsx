import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'

import Voorpagina from './pages/Voorpagina'
import Test from './pages/test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Voorpagina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


