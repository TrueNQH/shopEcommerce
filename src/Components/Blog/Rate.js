import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function Rate() {

 
  
        const [rating, setRating] = useState(0)
        const params = useParams()
        const login = JSON.parse(localStorage.getItem('login'))
        const dataUser = JSON.parse(localStorage.getItem('auth'))
        const token = JSON.parse(localStorage.getItem('token'))
        
        useEffect(() => {
          axios.get('https://localhost/laravel/public/api/blog/rate/' + params.id)
          .then(res => {
            
            if(res.data.response == 'success') {
             
              const dataRate = res.data.data
              
              let kq = 0
              Object.keys(dataRate).map((value) => {
               return  kq += dataRate[value]['rate']
              }) 
              kq /= Object.keys(dataRate).length
              setRating(kq)
              
             
              }
          })
          .catch(error => console.log(error))
        }, [])
        
        function changeRating( newRating, name ) {
          if(!login) {
            alert('vui long dang nhap')
          } else {
              setRating(newRating)
              const data = {
                'user_id': dataUser.id,
                'blog_id': params.id,
                'rate': newRating
              }
              let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            
              axios.post('https://localhost/laravel/public/api/blog/rate/' + params.id, data, config)
              .then(res => {
                
              })
              .catch(error => console.log(error))
          }

          
        }
     
        
          // rating = 2;
          return (
            <StarRatings
              rating={rating}
              starRatedColor="#FE980F"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          );
        
    
}
export default Rate