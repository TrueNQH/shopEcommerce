import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function MyProduct() {
    const token = JSON.parse(localStorage.getItem('token'))
    const [data, setData] = useState({})
	let config = { 
		headers: { 
		'Authorization': 'Bearer '+ token,
		'Content-Type': 'multipart/form-data',
		'Accept': 'application/json'
		} 
	};
	useEffect(() => {
		axios.get('https://localhost/laravel/public/api/user/my-product' , config)
		.then(res => {
			setData(res.data.data)
			
		})
		.catch(error => console.log(error))
	}, [])

	function deleteProduct(e){
		
		let id = e.currentTarget.id
	
		axios.get('https://localhost/laravel/public/api/user/delete-product/' + id, config)
		.then(res => {
			
			setData(res.data.data)
		})
		.catch(error => console.log(error))
	}
	function renderImg(img,image) {
		return image.map((i)=> {
			return <img style={{width: '100px', height: '100px'}} src={img + i}/>
		})
		
		
	}
	function renderData() {
		
		if(Object.keys(data).length > 0) {
			
		   return Object.keys(data).map((item, index) => {
			let img ='https://localhost/laravel/public/upload/user/product/' + data[item]['id_user']+'/'
			let image = data[item]['image'].slice(2, data[item]['image'].length-2).split('","')
			
			
				  
			return (
				   
							
								   <tr>
									   <td className="cart_product">
										   {data[item]['id']}
									   </td>
									   <td className="cart_description">
										   <h4><a href="">{data[item]['name']}</a></h4>
										   
									   </td>
									   	<td>

										   {renderImg(img, image)}
										</td>
									   
									   <td >
									   <p className="cart_total_price">{'$'+data[item]['price']}</p>
									   </td>
									   
									   <td className="cart_delete">
									   <a style={{marginRight: '40px'}} id={data[item]['id']} className="cart_quantity_delete" onClick={deleteProduct}><i className="fa fa-times"></i></a>
									   <Link to={'/account/product/edit/' + data[item]['id']}  className="cart_quantity_delete" href=""><i class="fa fa-pencil"></i></Link>
									   </td>
								   </tr>
		   
							   
						   
				   
			   
			   )
		   })
		}
	}
	return (
		<section id="cart_items">
			   <div className="container">
			   <div className="table-responsive cart_info col-sm-9" style={{padding: '0'}}>
						   <table className="table table-condensed">
							   <thead>
								   <tr className="cart_menu">
									   <td>ID</td>
									   <td className="description">Name</td>
									   <td className="image">Image</td>
									   <td className="price">price</td>
									   <td className="quantity">Action</td>
									   
									   
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
export default MyProduct