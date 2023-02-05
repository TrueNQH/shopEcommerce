import axios from "axios"
import { useEffect, useState } from "react"

function Cart() {

    const [data, setData] = useState([])
    const [qty, setQty] = useState(0)
    const cartLocal = JSON.parse(localStorage.getItem('cart'))
    useEffect(() => {
        axios.post('https://localhost/laravel/public/api/product/cart', cartLocal)
        .then(res => {
          
            if(res.data.response=="success") {
                setData(res.data.data)
            }
        })
        .catch(error => console.log(error))
    }, [])
    function handleUp(e) {
        
      let value = Number(e.target.getAttribute('value')) + 1
      
      let id = e.target.id
      
      let data = {
        ...cartLocal,
        [id]:value

      }
      
      localStorage.setItem('cart', JSON.stringify(data))
      axios.post('https://localhost/laravel/public/api/product/cart', data)
      .then(res => {
         
          if(res.data.response=="success") {
              setData(res.data.data)
          }
      })
      .catch(error => console.log(error))
        
            
        
        
    }
    function handleDown(e) {
          
      let value = Number(e.target.getAttribute('value')) -1
      if(value>0){
      let id = e.target.id
      
      let data = {
        ...cartLocal,
        [id]:value

      }
    
      localStorage.setItem('cart', JSON.stringify(data))
      axios.post('https://localhost/laravel/public/api/product/cart', data)
      .then(res => {
         
          if(res.data.response=="success") {
              setData(res.data.data)
          }
      })
      .catch(error => console.log(error))
      }
      
    }
    function handleRemove(e) {
        let id = e.target.id
        delete cartLocal[id]
      localStorage.setItem('cart', JSON.stringify(cartLocal))
      

      axios.post('https://localhost/laravel/public/api/product/cart', cartLocal)
      .then(res => {
         
          if(res.data.response=="success") {
              setData(res.data.data)
          }
      })
      .catch(error => console.log(error))
    }

    
    function renderData() {
        
        return data.map((i, index)=> {
          
            let img = i.image.slice(2, i.image.length-2).split('","')
            let src = 'https://localhost/laravel/public/upload/user/product/' + i.id_user +'/'
            return(
                <tr>
                <td class="cart_product">
                    <a href=""><img width='100px' src={src + img[0]} alt=""/></a>
                </td>
                <td class="cart_description">
                    <h4><a href="">{i.name}</a></h4>
                    
                </td>
                <td class="cart_price">
                    <p>${i.price}</p>
                </td>
                <td class="cart_quantity">
                    <div class="cart_quantity_button">
                        <a class="cart_quantity_up" onClick={handleUp} id={i.id} value = {i.qty}> + </a>
                        <input class="cart_quantity_input" type="text" name="quantity" value={i.qty} autocomplete="off" size="2"/>
                        <a class="cart_quantity_down" onClick={handleDown} id={i.id} value = {i.qty}> - </a>
                    </div>
                </td>
                <td class="cart_total">
                    <p class="cart_total_price">${Number(i.qty) * Number(i.price)}</p>
                </td>
                <td class="cart_delete">
                    <a class="cart_quantity_delete" onClick={handleRemove} id={i.id}><i class="fa fa-times"></i></a>
                </td>
            </tr>
            )
        })
    }
    if(Object.keys(data).length > 0 ) {

        return (
            <section id="cart_items">
            <div class="container">
                <div class="breadcrumbs">
                    <ol class="breadcrumb">
                      <li><a href="#">Home</a></li>
                      <li class="active">Shopping Cart</li>
                    </ol>
                </div>
                <div class="table-responsive cart_info">
                    <table class="table table-condensed">
                        <thead>
                            <tr class="cart_menu">
                                <td class="image">Item</td>
                                <td class="description"></td>
                                <td class="price">Price</td>
                                <td class="quantity">Quantity</td>
                                <td class="total">Total</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                           {renderData()}
    
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </section> 
        )
    }
}
export default Cart 