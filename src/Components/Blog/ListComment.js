import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ListComment(props) {
  let dataCmt = props.data  
  let [idCmt, setIdCmt] = useState(0)
  
  const auth = JSON.parse(localStorage.getItem('auth'))
  

  function reply(e) {
   
    idCmt = e.target.attributes.getNamedItem('data-tag').value
    props.getIdCmt(idCmt)
   
  }


  return (dataCmt).map((value, index) => {
      if(value.id_comment == 0){

        return (
          
            <li key={index} className="media">
              <a className="pull-left" href="#">
                <img
                  className="media-object"
                  src={'https://localhost/laravel/public/upload/user/avatar/'+value.image_user}
                  alt=""
                  style={{width: '100px'}}
                />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user"></i>{value.name_user}</li>
                  <li><i className="fa fa-clock-o"></i> {value.created_at.split(' ')[1]}</li>
                  <li><i className="fa fa-calendar"></i> {value.created_at.split(' ')[0]}</li>
                </ul>
                <p>
                  {value.comment}
                </p>
              
                <a className="btn btn-primary" data-tag={value.id} onClick={reply} ><i className="fa fa-reply"></i>Replay</a>
                
    
               
              </div>
            </li>
           
            
            
          
          )
      } else {
       return dataCmt.map((vl,i) => {
          
          if(value.id_comment == vl.id) {
            
            return(
             <>

               <li key={index + 11} className="media">
                 <a className="pull-left" href="#">
                   <img
                     className="media-object"
                     src={'https://localhost/laravel/public/upload/user/avatar/'+vl.image_user}
                     alt=""
                     style={{width: '100px'}}
                   />
                 </a>
                 <div className="media-body">
                   <ul className="sinlge-post-meta">
                     <li><i className="fa fa-user"></i>{vl.name_user}</li>
                     <li><i className="fa fa-clock-o"></i> {vl.created_at.split(' ')[1]}</li>
                     <li><i className="fa fa-calendar"></i> {vl.created_at.split(' ')[0]}</li>
                   </ul>
                   <p>
                     {vl.comment}
                   </p>
                   <label for = 'message_cmt'>
                   <a className="btn btn-primary" data-tag={vl.id} onClick={reply} href="#rl" ><i className="fa fa-reply"></i>Replay</a>
                   </label>
       
                  
                 </div>
               </li>
               <li key={index} className="media second-media">
                 <a className="pull-left" href="#">
                   <img
                     className="media-object"
                     src={'https://localhost/laravel/public/upload/user/avatar/'+value.image_user}
                     alt=""
                     style={{width: '100px'}}
                   />
                 </a>
                 <div className="media-body">
                   <ul className="sinlge-post-meta">
                     <li><i className="fa fa-user"></i>{value.name_user}</li>
                     <li><i className="fa fa-clock-o"></i> {value.created_at.split(' ')[1]}</li>
                     <li><i className="fa fa-calendar"></i> {value.created_at.split(' ')[0]}</li>
                   </ul>
                   <p>
                     {value.comment}
                   </p>
                   <label for = 'message_cmt'>
                   <a className="btn btn-primary" data-tag={value.id} onClick={reply} ><i className="fa fa-reply"></i>Replay</a>
                   </label>
       
                  
                 </div>
               </li>
              
             </>
           
            
            
         
            )
          }
        })
      }
      
      
  })
  
    
   
    
    
}
export default ListComment