import React, { useContext, useState } from "react"
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, ref } from "firebase/firestore"
import { db } from "../firebase-server/firebase"
import { AuthContext } from "../context/authContext"

export const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })

      if (querySnapshot.empty == true) setErr(true)
      setTimeout(() => {
        setErr(false)
      }, 3000)
    } catch (HandleError) {
      console.log("err")
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
      }
    } catch (err) {}

    setUser(null)
    setUsername("")
  }
  return (
    <div className='search-container'>
      <div className='search-form'>
        <input
          className='search-input'
          type='text'
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Find a user'
          value={username}
        />
      </div>
      {err && <span> User does not found</span>}
      {user && (
        <div className='user-chat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className='user-chat-info'>
            <span className='user-name'>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}
