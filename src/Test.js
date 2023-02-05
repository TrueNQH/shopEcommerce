import axios from "axios"
import { useEffect, useState } from "react"

function Test() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://localhost/laravel/public/api/blog')
        .then(res => {
            setData(res.data)
            console.log(data)
        })
    }, [])
    function renderData() {
        
    }
    return 
}
export default Test