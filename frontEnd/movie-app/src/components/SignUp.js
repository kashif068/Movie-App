import React, { useState } from 'react'
import axios from 'axios'
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', 
        { userName, email, password });
            console.log('User registered successfully:', response.data);
            alert('ThankYou! For SignUp');
            navigate('/SignIn');
          } catch (error) {
            console.error('Error registering user:', error);
          }     
    }

  return (
    <>
    <div className="main-signup">
    <div className="sign-up-form">
      <h1>Sign Up</h1> 
      <form onSubmit={handleSubmit}>
       <div className="form-group1">
         <input type="text" id="username" placeholder='UserName' name="username" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
       </div>
        <div className="form-group2">
          <input type="email" className="labels" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div> 
        <div className="form-group3">
          <input type="password" className="labels" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div> 
        <button type="submit" className='button1'>Register</button>
      </form>
      <p>Already have an account?<Link to={('/SignIn')} className="login-link">Login</Link></p>
    </div>
  </div>
  </>
  )
}

export default SignUp