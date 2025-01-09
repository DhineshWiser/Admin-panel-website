import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProducts from './Pages/AddProducts';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Products from './Pages/Products';
import Update from './Pages/Update';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/products" element={<Products />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Addproducts" element={<AddProducts />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
