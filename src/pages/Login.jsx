import React from "react"
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-server/firebase"

export const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    console.log(email,password);

    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
      throw error
    }
  }

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>Chatos</span>
        <span className='title'>Register</span>
        <form className='register-form' onSubmit={handleSubmit}>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button className='sign-up-btn'>Sign in</button>
        </form>
        <p className='form-finish-text'>Have an account? <Link to={"/register"}>Register</Link> </p>
      </div>
    </div>
  )
}
