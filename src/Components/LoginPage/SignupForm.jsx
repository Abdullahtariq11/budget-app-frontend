import React from 'react';
import "./SignupForm.css";

function SignupForm({setTab}) {
  return (
    <div className="signup-form-container">
    <h2>Signup</h2>
    <form className="signup-form">
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="text" placeholder="username" required />
      <input type="text" placeholder="Password" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Phone Number" required />
      <button>Signup</button>
      <p>
        Already have an account? <span className="switch-tab" onClick={()=>setTab("Login")}> Login</span>
      </p>
    </form>
  </div>
  )
}

export default SignupForm