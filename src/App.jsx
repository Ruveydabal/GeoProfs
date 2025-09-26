import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import HeaderTest from './pages/HeaderTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderTest/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


