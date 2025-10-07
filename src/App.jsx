import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import 'moment/dist/locale/nl';
import moment from 'moment';

import Voorpagina from './pages/Voorpagina'

function App() {
  moment.locale('nl'); //zet de taal van momentJS op nederlands
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Voorpagina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


