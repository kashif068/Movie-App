import React, { useState} from 'react'; 
import './SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  } 

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  
  const token = localStorage.getItem('token');
  console.log(`Token ${token}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password })

    axios.post('http://localhost:4000/api/users/login', {
      email: email,
      password: password
    })
    .then(result => {
      console.log(result.data)
      alert('Welcome! You are logged in');
      localStorage.setItem('token', result.data.token)
      navigate('/empty-state');
    })
    .catch(error => {
      alert('service error! First Signup Please');
      console.log(error)
    })

  }

  return (
    <>
   <div className="main-signin">
    <div className="sign-in-form">
      <h1>Sign in</h1> 
      <form onSubmit={handleSubmit}>
        <div className="form-group4">
          <input type="email" className="labels" placeholder='Email' required value={email} onChange={handleEmail}/>
        </div> 
        <div className="form-group5">
          <input type="password" className="labels" placeholder='Password' required value={password} onChange={handlePassword}/>
        </div> 
        <div className="form-group6">
          <input type="checkbox" className="forminput"/>
          <label htmlFor="remember-me" className='text'>Remember me</label>
        </div>
        <button type="submit" className='button1'>Login</button>
      </form>
    </div>
  </div>
    </>
  );
}

export default SignIn;