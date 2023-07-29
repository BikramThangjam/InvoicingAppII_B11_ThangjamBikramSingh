import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = ({setIsLoggedIn})=> {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value

            }
        })
    }


    const handleSubmit = async (e)=>{
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        
        const response = await fetch("http://127.0.0.1:8000/api/user/signin", requestOptions)
        const data = await response.json()
        
        if(data.state === true){
            localStorage.setItem("token", data.token.access_token)
            setIsLoggedIn(true)
            navigate("/")
        }
        if(data.state===false){
            alert(data.message)
        }
            
    }


    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <form onSubmit={handleSubmit} className="border border-3 rounded-5 p-5">
                    <h1 className="text-center mb-4">LOGIN</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email</label>
                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={handleChange} value={formData.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password}/>
                    </div>
                    <p className="text-center">
                        New user? <Link to="/signup">Click Here </Link>
                    </p>
                    <button type="submit" className="btn btn-dark">Login</button>
                </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Login


