import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Voorpagina from "./pages/Voorpagina"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Voorpagina/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


