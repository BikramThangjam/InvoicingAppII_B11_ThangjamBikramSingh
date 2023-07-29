
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import ItemForm from "./components/ItemForm/ItemForm";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="App">     
      <Routes>
        <Route path='/' element={<ProtectedRoute Component={InvoiceList} isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>}>
        </Route>
        <Route path='newInvoice' element={<ProtectedRoute Component= {InvoiceForm} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
        </Route>
        <Route path='/:id' element={<InvoiceItems/>}>
        </Route>
        <Route path='/:id/newItem' element={<ItemForm/>}>
        </Route>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}>
        </Route>
        <Route path='/signup' element={<Signup />}>
        </Route>
      </Routes>          
    </div>
  );
}

export default App;
