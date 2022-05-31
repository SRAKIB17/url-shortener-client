import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Add from './Component/Add';
import GotoUrl from './Component/GotoUrl';
import Customize from './Component/Customize';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Component/Header';
import CustomizeExisting from './Component/CustomizeExisting';
import ForgatCode from './Component/ForgatCode';

function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Add />} />
        <Route path='/go/:getShortId' element={<GotoUrl />} />
        <Route path='/custom/:getEditAbleId' element={<Customize />} />
        <Route path='/custom/' element={<CustomizeExisting />} />
        <Route path='/custom/forgat' element={<ForgatCode />} />
        {/* <Route path='/custom/forgat' element={<ForgatCode />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
