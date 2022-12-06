import React from "react"

export const Login = () => {
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>WrightItDown</span>
        <span className='title'>Register</span>
        <form className='register-form'>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button className='sign-up-btn'>Sign in</button>
        </form>
        <p className='form-finish-text'>Have an account? Register </p>
      </div>
    </div>
  )
}
