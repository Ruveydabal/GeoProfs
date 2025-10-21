import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import './App.css'
import Ziekmelden from './pages/Ziekmelden';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App