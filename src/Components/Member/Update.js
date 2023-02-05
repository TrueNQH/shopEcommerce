
import axios from "axios"
import ErrorForm from "./ErrorForm"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function Update() {
    

    const [input, setInput] = useState({
        name:'',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: 0
        


    })
    const navigate = useNavigate()
    const [err, setErr] = useState({})
    const [avatar, setAvatar] = useState()
    const [file, setFile] = useState()
    const token = JSON.parse(localStorage.getItem('token'))
    const login = JSON.parse(localStorage.getItem('login'))
    const auth = JSON.parse(localStorage.getItem('auth'))
    useEffect( () => {
        
        setInput({
            'name': auth.name,
            'email': auth.email,
            'password': '',
            'phone': auth.phone,
            'address':auth.address,
            'level': 0

        })
    }, [])
    function handleSubmit(e) {
        e.preventDefault() ;
        let mess = {}
        let flag = true
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const regexPhone =/^\d{10}$/
        let arrEndFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
        

        
        if(file == undefined) {
            
            mess.file = 'vui long upload file'
            flag = false
        } else {
            const fileName = file.name.split('.')
           
            if(!arrEndFile.includes(fileName[1])){
                mess.endFile = 'khong dung dinh dang hinh anh'
            }
            if(file.size >= 1024*1024) {
                mess.size = 'khich thuoc file qua lon, yeu cau < 1mb'
            }
         }
        
        if(!flag) {
            setErr(mess)
        }else{
           
            const data = {
                ...input,
                'avatar': avatar
            }
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            
            axios.post('https://localhost/laravel/public/api/user/update/' + auth.id, data, config)
            .then(res => {
            
                if(res.data.response == 'success') {
                    mess.succ = 'update thanh cong'
                    setErr(mess)
                }
                
            })
            .catch(error => console.log(error))
        }
    }
    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        setInput(state => ({...state, [name]:value}))
    }
    function handleFile(e) {
        const files = e.target.files
        //send to api 
        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result);
           
            setFile(files[0]);
          
        }
        reader.readAsDataURL(files[0]);
    
      

    }
    if(login) {
       
    
    return (
        <div className="container">
			<div className="row">
            <ErrorForm error = {err}/>
        <div class="col-sm-4 ">

        <div class="signup-form">
						<h2>New User Update!</h2>
						<form  encType="multipart/form-data" onSubmit={handleSubmit}>
							<input type="text" placeholder={input.name}  name='name' onChange={handleInput}/>
							<input type="email" readOnly placeholder={input.email}  name="email" onChange={handleInput}/>
							<input type="password"  placeholder='password' name="password" onChange={handleInput}/>
                            <input type = 'text' placeholder={input.phone}  name="phone" onChange={handleInput}/>
							<input type="text" placeholder={input.address}  name="address" onChange={handleInput}/>
                            <input type='file' onChange={handleFile} />
                            <input type="number"   onChange={handleInput} min="0" max="5" value='0'/>
							<button type="submit" class="btn btn-default">Update</button>
			</form>
					</div>
        </div>
            </div>
            </div>
    )
    } else {
        navigate('/login')
    }
}
export default Update