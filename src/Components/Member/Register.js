
import { useEffect, useState } from "react"
import axios from "axios"
import ErrorForm from "./ErrorForm"

function Register() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address:'',
        
        level: 0
        


    })
    const [err, setErr] = useState({})
    const [avatar, setAvatar] = useState()
    const [file, setFile] = useState()
    function handleSubmit(e) {
        e.preventDefault() ;
        let mess = {}
        let flag = true
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const regexPhone =/^\d{10}$/
        let arrEndFile = ['png', 'jpg', 'jpeg', 'PNG', 'JPG']
        if(input.email == '')  {
            mess.email = 'vui long nhap dia  chi email'
            flag = false
        } else {
            if(!regex.test(input.email)) {
                mess.emailFormat = 'khong dung dinh dang email'
            flag = false

            }

        }
        if(input.name =='') {
            mess.name = 'vui long nhap ten'
            flag = false

        }
        if(input.password == '') {
            mess.password = 'vui long nhap password'
            flag = false

        }
        if(input.phone == '') {
            mess.phone = 'vui long nhap phone'
            flag = false

            
        } else {
            if(!regexPhone.test(input.phone)) {
                mess.phone = 'day khong phai la so dien thoai'
            } 
        }
        if(input.address == '') {
            mess.address = 'vui long nhap address'
            flag = false

        }
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
            axios.post('https://localhost/laravel/public/api/register', data)
            .then(res => {
               
                if(res.data.message == 'success') {
                    mess.succ = 'dang ky thanh cong'
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

    return(
        
        <div>
            
            <ErrorForm error={err}/>
            <form  encType="multipart/form-data" onSubmit={handleSubmit}>
							<input type="text" placeholder="Name" name='name' onChange={handleInput}/>
							<input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
							<input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                            <input type = 'text' placeholder="phone" name="phone" onChange={handleInput}/>
							<input type="text" placeholder="address" name="address" onChange={handleInput}/>
                            <input type='file' onChange={handleFile}/>
                            <input type="number"   onChange={handleInput} min="0" max="5" value='0'/>
							<button type="submit" class="btn btn-default">Signup</button>
			</form>
        </div>
       
    )
}
export default Register