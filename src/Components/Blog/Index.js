import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';
import MenuLeft from "../Layout/MenuLeft";

function Index() {
	const [Data, setData] = useState([])
	

	useEffect(() => {
		axios.get('https://localhost/laravel/public/api/blog')
		.then(res => {
			setData(res.data.blog.data)
		})
		.catch(error => {
			console.log(error)
		})
	}, [])
	
	function renderData() {
		if(Data.length > 0 ) {
			
			return  Data.map((value, index) => {
				
				return (
					
					<div className="single-blog-post">
							<h3>{value.title}</h3>	
							<div className="post-meta">
								<ul>
									<li key={value.id } className='a'><i className="fa fa-user"></i> Mac Doe</li>
									<li key={value.id+ 1}><i className="fa fa-clock-o"></i> {value.created_at}</li>
									<li key={value.id + 2}><i className="fa fa-calendar"></i>{value.updated_at}</li>
								</ul>
								<span>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star"></i>
										<i className="fa fa-star-half-o"></i>
								</span>
							</div>
							<a href="">
								<img src={'https://localhost/laravel/public/upload/Blog/image/' + value.image} alt=""/>
								

							</a>
							<p>{value.description}</p>
							<Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
						</div>
				)
			})
		} 
	}
	
    return (
		<div>
			
		<div className="col-sm-9">
               <div className="blog-post-area">
						<h2 className="title text-center">Latest From our Blog</h2>
						{renderData()}
						<div className="pagination-area">
							<ul className="pagination">
								<li><a href="" className="active">1</a></li>
								<li><a href="">2</a></li>
								<li><a href="">3</a></li>
								<li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
							</ul>
						</div>
					</div>
            </div>
		</div>
        
    )
}
export default Index;