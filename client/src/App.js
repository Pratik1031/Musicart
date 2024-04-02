import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/RegisterPage/Register';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Invoice from './pages/Invoice/Invoice';
import Checkout from './pages/Checkout/Checkout';
import ProductDetails from './pages/Product/ProductDetails';
import SucessPage from './pages/SucessPage/SucessPage';
import { useCart } from './context/CartContext';
import Main from './components/Home/Main';
import ListView from './components/Home/ListView';
import InvoiceList from './pages/Invoice/InvoiceList';

function App() {
  const [cart] = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/invoice'
          element={<Invoice totalAmount={totalAmount} />}
        />
        <Route
          path='/invoiceList'
          element={<InvoiceList totalAmount={totalAmount} />}
        />
        {cart?.length ? (
          <Route
            path='/cart'
            element={<Cart setTotalAmount={setTotalAmount} />}
          />
        ) : (
          <Route path='/cart' element={<Navigate to='/' />} />
        )}
        <Route path='/productDetails/:id' element={<ProductDetails />} />
        <Route
          path='/checkout'
          element={<Checkout totalAmount={totalAmount} />}
        />
        <Route path='/success' element={<SucessPage />} />
        <Route path='/grid' element={<Main />} />
        <Route path='/list' element={<ListView />} />
      </Routes>
    </>
  );
}

export default App;
