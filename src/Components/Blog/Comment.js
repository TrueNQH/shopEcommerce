import { useEffect, useState } from "react"
import ErrorForm from '../Member/ErrorForm'
import { useParams } from "react-router-dom"
import axios from "axios"

function Comment(props){
    let params = useParams()
    let idCmt = props.idCmt
    const login = JSON.parse(localStorage.getItem('login'))
    const auth = JSON.parse(localStorage.getItem('auth'))
    const token = JSON.parse(localStorage.getItem('token'))

    const [textarea, setTextArea] = useState('')
    const [error, setError] = useState({})
    

    function handleClick(e) {
      e.preventDefault()
      let mess = {}
      let flag = true
      if(!login) {
        alert('vui long dang nhap')
        return false
      }
      
      if(textarea == '') {
        mess.err = 'vui long nhap binh luan vao o'
        flag = false
      }
      if(!flag) {
        setError(mess)
        
      } else {
        setError({})
        
        const formData = new FormData()
        const url = 'https://localhost/laravel/public/api/blog/comment/' + params.id
        formData.append('id_blog', params.id);
        formData.append('id_user', auth.id );
        formData.append('id_comment', idCmt);
        formData.append('comment', textarea);
        formData.append('image_user', auth.avatar);
        formData.append('name_user', auth.name);
        axios.post(url , formData, config)
        .then(res => {
          console.log(res.data.data)
          props.getCmt(res.data.data)
        })
        .catch(error => console.log(error))
        
       
      }
    }
    function handleChange(e){
     
      setTextArea(e.target.value) 

    }
    // api 

    //config 
    let config = { 
      headers: { 
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
      } 
  };

    
    return (
        <div>
            <h2>response</h2>
            
            <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                    <ErrorForm error = {error}/>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <form onSubmit={handleClick} target="_blank" id="rl">

                    <textarea autoFocus type = 'text'name="message" rows="11" onChange={handleChange} ></textarea>
                    <button type='submit' className="btn btn-primary">post comment</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}
export default Comment