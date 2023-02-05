function ErrorForm(props) {
    let error = props.error
    function renderErr() {
        if(Object.keys(error).length > 0) {
            return Object.keys(error).map((key, index) => {
                return <li key={index}>{error[key]}</li>
            }) 
        }
    }
    
    return <ul>{renderErr()}</ul>
}
export default ErrorForm