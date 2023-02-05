import './App.css';
import { useState } from "react";
import Header from './Components/Layout/Header'
import MenuLeft from './Components/Layout/MenuLeft'
import Footer from './Components/Layout/Footer'
import Index from './Components/Blog/Index'
import { useLocation } from 'react-router-dom';
import MenuAcc from './Components/Layout/MenuAcc';
import Slider from './Components/Layout/Slider'
import { CartContext } from './Components/Cart/CartContext';


function App(props) {
  let location = useLocation()
  
  // location['pathname']
  function renderSlide() {
    if(location['pathname'] == '/') {
      return <Slider/>
    } 

  }
  function renderMenu(){
    if(location['pathname'] != '/login' && location['pathname'] != '/cart') {
      return  location['pathname'].includes('account') ?  <MenuAcc/> :  <MenuLeft/>
    }
  
  }
  const [obj, setObj] = useState({})
  function getValue(data) {
    setObj(data)
    localStorage.setItem('amountCart', JSON.stringify(Object.keys(data).length))
  }
  const data = {
    obj,
    getValue
 }
  return (
    <CartContext.Provider value={data} >
        <Header/>
        {renderSlide()}
        <section>
          <div className='container'>
            <div className='row'>
            
            {renderMenu()}
            {props.children}
            
            </div>
          </div>
        </section>
       
        <Footer/>

    </CartContext.Provider>
  );
}

export default App;
