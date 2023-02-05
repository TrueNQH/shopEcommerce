import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ErrorForm from "../Member/ErrorForm"
function EditProduct(){
    const params = useParams()
    const [dataUser, setDataUser] = useState({})
    const [sale, setSale] = useState(0)
   
    const [avatarCheck, setAvatar] = useState([])
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
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
        } 
    }

        useEffect(() => {
            axios.get('https://localhost/laravel/public/api/user/product/' + params.id, config)
            .then(res => {
                
                if(res.data.response == "success") {
                setDataUser(res.data.data)
                console.log(res.data.data)
                }
            })
            .catch(error => console.log(error))
        },[])

        useEffect(() => {
        axios.get('https://localhost/laravel/public/api/category-brand')
        .then(res => {
            console.log(res);
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
        .catch(error => console.log(error))
    }, [])
    useEffect( () => {
        
       
    }, [])
    function renderCategory(n) {
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
    function renderSale() {
        if(sale == 0) {
            return < >
                <input name = 'sale' style={{width: '20%', display: 'inline'}} placeholder={dataUser.sale}  onChange={handleInput}/>
                <label>%</label> 
                </>
        }
    }
    function renderImg() {
        return (dataUser.image).map((value, i) => {
            return <div >
            <img width='100px' src={'https://localhost/laravel/public/upload/user/product/' + dataUser.id_user+'/' + value}/>
            <input style={{width:'100px'}} type='checkbox' onChange={handleCheck} id={value}/>
            </div>
        })
    }
    function handleCheck(e) {
        const name = e.target.id
        const checked = e.target.checked
        if(checked) {
            setAvatar(state=>[...state, name])
            
            
        } else {
          
            // - kiem tra bien co trong mang k : includes
            // - co: xoa value ra khoi mang 
            if(avatarCheck.includes(name)) {
                let result = avatarCheck.filter(function(elem){
                    return elem != name; 
                 });
                 setAvatar(result)
            }
            
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
            input.name = dataUser.name
            
        }
        if(input.price == '') {
            input.price = dataUser.price
            
        }
        if(input.category == '' ) {
            input.category = dataUser.id_category
            
        }
        if(input.brand ==  '') {
            input.brand = dataUser.id_brand
           
        }
        if(input.company == '') {
            input.company = dataUser.company_profile
            
        }
        if(input.detail == '') {
            input.detail = dataUser.detail
            
        }
        if(input.sale == '') {
            input.sale = dataUser.sale
            
        }
          if(file.length == 0) {
            mess.file = 'vui long upload hinh anh'
            flag = false
          }
            console.log(Number(file.length)  - Number(avatarCheck.length) + Number(dataUser.image.length));
            if(Number(file.length)  - Number(avatarCheck.length) + Number(dataUser.image.length)> 3 ) {
            mess.lengthFile = `chi upload toi da 3 file tinh ca hinh anh dang co`
            flag = false
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
        
        if(!flag) {
            setErr(mess)
        } else {
            
           console.log(input);
           console.log(avatarCheck)
            
            let formData1 = new FormData();
            
            formData1.append('name', input.name)
            formData1.append('price', input.price)
            formData1.append('category', input.category)
            formData1.append('brand', input.brand)
            formData1.append('company', input.company)
            formData1.append('detail', input.detail)
            formData1.append('status', input.status)
            formData1.append('sale', input.sale)
            formData1.append('avatarCheckBox[]', avatarCheck)
            Object.keys(file).map((item, i) => {
                
                formData1.append('file[]', file[item])
            })
            
           

                
                axios.post('https://localhost/laravel/public/api/user/edit-product/'+params.id, formData1, config)
                .then(res => {
                    console.log(res);
                    if(res.data.response=="success") {
                         mess.succ = 'thanh cong2'
                         setErr(mess)
                    }
                })
                .catch(error => console.log(error));
         }


    }
    if(Object.keys(dataUser).length > 0 ) {

        return (
            <div className="container">
                <div className="row">
                <ErrorForm error = {err}/>
            <div className="col-sm-9">
    
            <div className="signup-form">
                            <h2>Edit Product</h2>
                            <form  encType="multipart/form-data" onSubmit={handleSubmit}>
                                <input type="text"  name='name' placeholder={dataUser.name} onChange={handleInput}/>
                                <input type="number"   name="price" placeholder={dataUser.price} onChange={handleInput}/>
                                <select onChange={handleInput} name = 'category' value={dataUser.id_category}>
                                    <option>please choose category</option>
                                    {renderCategory()}
                                </select>
                                <select onChange={handleInput} name = 'brand' value={dataUser.id_brand}>
                                <option>please choose brand</option>
                                    {renderBrand()}
                                </select>
                                <select  name = 'status' onChange={handleSelect} value={dataUser.status}>
                                <option value={0} >sale</option>
                                <option value={1}>new</option>
                                    
                                </select>
                                {renderSale()}
                                <input placeholder={dataUser.company_profile} name = 'company' onChange={handleInput}/>
                                <input type='file' onChange={handleFile} multiple />
                                <div style={{display: 'flex', justifyContent:'space-around'}}>

                                {renderImg()}
                                </div>
                                <textarea placeholder={dataUser.detail} onChange={handleInput} name='detail'/>
                                <button type="submit" className="btn btn-default">Update</button>
                </form>
                        </div>
            </div>
                </div>
                </div>
        )
    }
}
export default EditProduct