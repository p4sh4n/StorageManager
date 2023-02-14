import { ToastContainer} from 'react-toastify';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import Suppliers from './pages/Suppliers';
import AddSupplier from './pages/AddSupplier';
import Materials from './pages/Materials';
import AddMaterial from './pages/AddMaterial';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import AddProductionProcess from './pages/AddProductionProcess';
import Employees from './pages/Employees';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
          <ToastContainer position='top-center' />
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route path='/employees' element={<Employees/>}/>
            <Route path='/addEmployee' element={<AddEmployee/>}/>
            <Route path='/editEmployee/:id' element={<AddEmployee/>}/>
            <Route path='/suppliers' element={<Suppliers/>} />
            <Route path='/addSupplier' element={<AddSupplier/>}/>
            <Route path='/editSupplier/:id' element={<AddSupplier/>}/>
            <Route path='/materials' element={<Materials/>} />
            <Route path='/addMaterial' element={<AddMaterial/>}/>
            <Route path='/editMaterial/:id' element={<AddMaterial/>}/>
            <Route path='/products' element={<Products/>} />
            <Route path='/addProduct' element={<AddProduct/>}/>
            <Route path='/editProduct/:id' element={<AddProduct/>}/>
            <Route path='/addProductionProcess' element={<AddProductionProcess/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
