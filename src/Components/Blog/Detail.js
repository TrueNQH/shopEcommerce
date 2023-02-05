import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MenuLeft from "../Layout/MenuLeft"
import Comment from "./Comment"
import ListComment from "./ListComment"
import Rate from "./Rate"

function Detail() {
    let params = useParams()
    const [data, setData] = useState('')
    const [comment, setComment] = useState([])
    const [idCmt, setIdcmt] = useState(0)
    
    useEffect(() => {
        axios.get('https://localhost/laravel/public/api/blog/detail/' + params.id)
        .then(res => {
          
          setData(res.data.data)
          setComment(res.data.data.comment)
          
        })
        .catch(error => console.log(error))
    }, [])
    function getCmt(data) {
     
        setComment([
          ...comment,
           data
        ]) 
    }
    function getIdCmt(data) {
        setIdcmt(data)
    }
    
    function renderData() {
      if(data != '') {
          
        return (
          <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="single-blog-post">
            <h3>{data.title}</h3>
            <div className="post-meta">
              <ul>
                <li><i className="fa fa-user"></i> Mac Doe</li>
                <li><i className="fa fa-clock-o"></i> {data.updated_at.split(' ')[1]}</li>
                <li><i className="fa fa-calendar"></i> {data.updated_at.split(' ')[0]}</li>
              </ul>
            
            </div>
            <a href="">
              <img src={'https://localhost/laravel/public/upload/Blog/image/' + data.image} alt="" />
            </a>
            <p>
             {data.description}
            </p>
            
             {data.content}
            
            <br />
  
            
            <div className="pager-area">
              <ul className="pager pull-right">
                <li><a href="#">Pre</a></li>
                <li><a href="#">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
        )
      }
        
      
    }
    
    
    return (
      <div>
          
        <div className="col-sm-9">
            {renderData()}
        
            <div className="rating-area">
              <ul className="ratings">
               <Rate/>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li>
                  <a className="color" href="">Pink <span>/</span></a>
                </li>
                <li>
                  <a className="color" href="">T-Shirt <span>/</span></a>
                </li>
                <li><a className="color" href="">Girls</a></li>
              </ul>
            </div>
            
            <div className="socials-share">
              <a href=""><img src="../images/blog/socials.png" alt="" /></a>
            </div>
            <div className="response-area">
          
          <ul className="media-list">
            <ListComment data = {comment} getIdCmt= {getIdCmt}/>
            </ul>
          </div>
            <Comment getCmt={getCmt} idCmt = {idCmt}/>
            
           
            
        </div>
      </div>
      
    )
}
export default Detail