import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorForm from "./ErrorForm"

function Login() {
	const navigate = useNavigate()
	const [success, setSuccess] = useState(false)

	const [input, setInput] = useState({
		email: '',
		password: '',
		level: 0
	})
	const [err, setErr] = useState({})

	function handleSubmit(e) {
		
		e.preventDefault()
		let mess = {}
		let flag = true
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if(input.email == '')  {
            mess.email = 'vui long nhap dia  chi email'
            flag = false
        } else {
            if(!regex.test(input.email)) {
                mess.emailFormat = 'khong dung dinh dang email'
            flag = false

            }

        }
      
        if(input.password == '') {
            mess.password = 'vui long nhap password'
            flag = false

        }
		if(!flag) {
			setErr(mess)
		}
		if(flag) {
			axios.post('https://localhost/laravel/public/api/login', input)
			.then(res => {
				if(res.data.response == 'success') {
					
				localStorage.setItem('auth', JSON.stringify(res.data.Auth));
				localStorage.setItem('token', JSON.stringify(res.data.success.token));
				localStorage.setItem('login', true);
				navigate('/')
					 
				} else {
					mess.error = 'tai khoan mat khau khong dung'
					
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
    return (
		<div>
			<ErrorForm error = {err}/>
        <form  onSubmit={handleSubmit}>
							<input type="text" placeholder="Email Address" name = 'email' onChange={handleInput}/>
							<input type="password" placeholder="password" name="password" onChange={handleInput} />
							<span>
								<input type="checkbox" class="checkbox"/> 
								Keep me signed in
							</span>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
		</div>
    )
}
export default Login