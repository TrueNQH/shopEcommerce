import axios from "axios"

import { useEffect, useState } from "react"
import ErrorForm from "../Member/ErrorForm"
function CreaterProduct(){
    const [sale, setSale] = useState(0)
    const [input, setInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        sale: '',
        company: '',
        detail: '',
        status: sale
    })
    const [err, setErr] = useState({})
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    
    const [file, setFile] = useState([])
    let arrEndFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
    
    const token = JSON.parse(localStorage.getItem('token'))
 
        useEffect(() => {
        axios.get('https://localhost/laravel/public/api/category-brand')
        .then(res => {
          
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
        .catch(error => console.log(error))
    }, [])
    function renderCategory() {
        if(category.length > 0) {
            return category.map((value) => {
                return <option key={value.id} value={value.id}>{value.category}</option>
            })
        }
    }
    function renderBrand() {
        if(brand.length > 0) {
            return brand.map((value) => {
                return <option key={value.id} value={value.id}>{value.brand}</option>
            })
        }
    }
    function renderSale(e) {
        if(sale == 0) {
            return < >
                <input name = 'sale' style={{width: '20%', display: 'inline'}} placeholder="0"  onChange={handleInput}/>
                <label>%</label> 
                </>
        }
    }
    function handleSelect(e) {
        let value = e.target.value
        if(value == 0) {
            setSale(0)
            
        } else {
            setSale(1)
        }
    }
    function handleFile(e) {
        const files = e.target.files
        setFile(files)
       

    }
    function handleInput(e) {
        let value = e.target.value
        let name = e.target.name
        setInput(state => ({...state, [name]:value}))
    }
    function handleSubmit(e) {
        e.preventDefault()
        let mess = {}
        let flag = true
        if(input.name == '') {
            mess.name = 'vui long nhap ten'
            flag = false
        }
        if(input.price == '') {
            mess.price = 'vui long nhap gia'
            flag = false
        }
        if(input.category == '' ) {
            mess.category = 'vui long chon category'
            flag = false
        }
        if(input.brand ==  '') {
            mess.brand = 'vui long chon brand'
            flag = false
        }
        if(input.company == '') {
            mess.brand = 'vui long nhap company '
            flag = false
        }
        if(input.detail == '') {
            mess.detail = 'vui long nhap detail'
            flag = false
        }
        if(input.sale == '') {
            mess.sale = 'vui long nhap sale'
            flag = false
        }
        if(file.length == 0 ) {
            mess.nofile = 'vui long chon file upload'
            flag = false
        }  else
        {
            if(file.length >3 ) {
            mess.lengthFile = 'chi upload toi da 3 file'
        } else {
            if(file.lengh != 0) {
                

                Object.keys(file).map((value, index) => {
                    
                    let text = file[value]['name'].split('.')[1]
                    
                    if(!arrEndFile.includes(text) ){
                        mess[index] = `file ${index + 1} khong dung dinh dang hinh anh`
                    }
                    if(file[value]['size'] > 1024*1024 ) {
                        mess[index] = `kich thuoc file ${index + 1} qua lon, yeu cau duoi 1mb`
                    }
                })
            }
        }
        }
        if(!flag) {
            setErr(mess)
        } else {
            
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
                } 
            }
            let formData = new FormData();
            formData.append('name', input.name)
            formData.append('price', input.price)
            formData.append('category', input.category)
            formData.append('brand', input.brand)
            formData.append('company', input.company)
            formData.append('detail', input.detail)
            formData.append('status', input.status)
            formData.append('sale', input.sale)
            Object.keys(file).map((item, i) => {
                formData.append('file[]', file[item])
            })
            
                axios.post('https://localhost/laravel/public/api/user/add-product', formData, config)
                .then(res => {
                    if(res.data.response=="success") {
                         mess.succ = 'thanh cong'
                         setErr(mess)
                    }
                })
                .catch(error => console.log(error));
        }


    }

    return (
        <div className="container">
			<div className="row">
            <ErrorForm error = {err}/>
        <div className="col-sm-9">

        <div className="signup-form">
						<h2>Create Product</h2>
						<form  encType="multipart/form-data" onSubmit={handleSubmit}>
							<input type="text"  name='name' placeholder="name" onChange={handleInput}/>
							<input type="number"   name="price" placeholder='price' onChange={handleInput}/>
							<select onChange={handleInput} name = 'category'>
                                <option>please choose category</option>
                                {renderCategory()}
                            </select>
                            <select onChange={handleInput} name = 'brand'>
                            <option>please choose brand</option>
                                {renderBrand()}
                            </select>
                            <select  name = 'status' onChange={handleSelect}>
                            <option value={0} >sale</option>
                            <option value={1}>new</option>
                                
                            </select>
                            {renderSale()}
                            <input placeholder="company profile" name = 'company' onChange={handleInput}/>
                            <input type='file' onChange={handleFile} multiple />
                            <textarea placeholder="detail" onChange={handleInput} name='detail'/>
							<button type="submit" className="btn btn-default">Create</button>
			</form>
					</div>
        </div>
            </div>
            </div>
    )
}
export default CreaterProduct