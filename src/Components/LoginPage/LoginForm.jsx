import React, { useContext, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function LoginForm({setTab}) {
  const {login}=useContext(AuthContext);
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [Error,setError]=useState("");

    //Handle login request logic
    const handleLogin= async(e)=>{
        e.preventDefault();

        try 
        {
            const response = await axios.post("http://localhost:5115/api/Users/Login",{
                username,
                password
            }); // sends the response to backend

            const {token}=response.data;
            login(token);
            
        } 
        catch (error) {
            setError(error.response.data.Message);
            
        }
    }

  return (
    <div className="login-form-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} value={username} required />
        <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
        <button type="submit">Login</button>
        <p>Forgot Password?</p>
        <p>
          Don't have an account? <span className="switch-tab" onClick={()=>setTab("Signup")}> Signup</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
