import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = ()=> {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
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

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(formData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch("http://127.0.0.1:8000/api/user/signup", requestOptions)
        .then(res => res.json())
        .then(data => {

            if (data.state === true){
                alert("Sign up successful. Redirecting to login page...");
                setTimeout(()=>{
                    navigate("/login")
                },1200)
            }

            if(data.state === false){
                alert(data.message)
            }
        })
        .catch(err=>console.log(err))

    }

    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <form className="border border-3 rounded-5 p-5">
                    <h1 className="text-center mb-4">SIGN UP</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" onChange={handleChange} value={formData.name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" onChange={handleChange} value={formData.username}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" aria-describedby="emailHelp" onChange={handleChange} value={formData.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password}/>
                    </div>
                    <p className="text-center">
                        Already have an account? <Link to="/login">Click Here </Link>
                    </p>
                    <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Sign Up</button>
                </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Signup