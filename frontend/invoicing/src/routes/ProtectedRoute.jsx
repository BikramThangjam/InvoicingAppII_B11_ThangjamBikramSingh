import {useEffect } from "react"
import Login from "../components/Login/Login"

const ProtectedRoute = ({Component, isLoggedIn, setIsLoggedIn}) => {

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token){
            setIsLoggedIn(true)
        }
    },[isLoggedIn])

    if(!isLoggedIn){
        return <Login setIsLoggedIn={setIsLoggedIn}/>
    }

    return <Component/>

}

export default ProtectedRoute;