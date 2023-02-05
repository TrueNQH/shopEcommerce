import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home'
import ProductDetail from './ProductDetail'
import Blog from './Components/Blog/Index'
import Detail from './Components/Blog/Detail'
import reportWebVitals from './reportWebVitals';

import Login from './Components/Member/Index';
import Update from './Components/Member/Update';
import MyProduct from './Components/Product/MyProduct';
import CreaterProduct from './Components/Product/CreaterProduct';
import EditProduct from './Components/Product/EditProduct';
import Cart from './Components/Cart/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
   <Router>
   
    
    
   <App>

   <Routes>
      
      
      <Route path='/account/update' element={<Update/>}/>
      <Route path='/account/product/edit/:id' element={<EditProduct/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/productdetail/:id' element={<ProductDetail/>}/>
      <Route path='/account/product/list' element={<MyProduct/>}/>
      <Route path='/account/product/add' element={<CreaterProduct/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/blog/list' element={<Blog/>}/>
      <Route path='/blog/detail/:id' element={<Detail/>}/>
   </Routes>
   </App>
   </Router>
   
  </React.StrictMode>
);


reportWebVitals();
