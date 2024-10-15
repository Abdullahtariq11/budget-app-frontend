import React from "react";
import "./LoginForm.css";

function LoginForm({setTab}) {
  return (
    <div className="login-form-container">
      <h2>Log In</h2>
      <form className="login-form">
        <input type="text" placeholder="username" required />
        <input type="text" placeholder="Password" required />
        <button>Login</button>
        <p>Forgot Password?</p>
        <p>
          Don't have an account? <span className="switch-tab" onClick={()=>setTab("Signup")}> Signup</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
