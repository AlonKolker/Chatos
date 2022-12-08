import React, { useContext, useState } from "react"

import { AuthContext } from "../context/authContext"
import { ChatContext } from "../context/chatContext"

import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase-server/firebase"
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons"

export default function SendMsg() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (img) {
      console.log("img")
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        }
      )
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }

    setText("")
    setImg(null)

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='send-msg-container'>
      <input
        type='text'
        className='send-msg-input'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send-features'>
        <input type='file' style={{ display: "none" }} id='file' onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor='file'>
          <FontAwesomeIcon className='icon' icon={faUpload} />
        </label>

        <button className='send-btn' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}
