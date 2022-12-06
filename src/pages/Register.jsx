import React from "react"
import Add from "../assets/imgs/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage, db } from "../firebase-server/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"

export const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            const userData  = await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            const usersCollection =  await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

          const chatCollection =   await setDoc(doc(db,'userChats', res.user.uid),{})
          
          } catch (err) {
            const errorMessage = err.message
            console.log(errorMessage)
            throw err
          }
          
        })


      })
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
      throw error
    }
  }

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>WrightItDown</span>
        <span className='title'>Register</span>
        <form className='register-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='display name' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <label className='add-avatar-label' htmlFor='add-avatar'>
            <img className='add-avatar-label-img' src={Add} alt='' />
            <span>add An avatar</span>
          </label>
          <input style={{ display: "none" }} type='file' id='add-avatar' />
          <button className='sign-up-btn'>Sign Up</button>
        </form>
        <p className='form-finish-text'>Have an account? Login </p>
      </div>
    </div>
  )
}
