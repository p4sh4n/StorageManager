import { ToastContainer} from 'react-toastify';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
          <ToastContainer position='top-center' />
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/addEmployee' element={<AddEmployee/>}/>
            <Route path='/editEmployee/:id' element={<AddEmployee/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
