import React, {useContext} from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase-server/firebase"
import { AuthContext } from "../context/authContext"
import Img from '../assets/imgs/alon.jpg'
export const Navbar = () => {
  
  const { currentUser } = useContext(AuthContext)
  const avatar = currentUser.photoURL || Img
  return (
    <div className='nav-bar'>
      <span className='logo'>WrightItDown</span>
      <div className='user'>
        <img
          className='user-img'
          src={avatar}
            alt=''
        />
        <span>{currentUser.displayName}</span>
        <button
          className='logout-btn'
          onClick={() => {
            signOut(auth)
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
