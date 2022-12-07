import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-server/firebase";

import MessagePreview from "./MessagePreview"
import { ChatContext } from "../context/chatContext"

export default function Messages() {
  const { data } = useContext(ChatContext)
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  return (
    <div className='message-list-container'>
      {messages.map((msg) => (
        <MessagePreview message={msg} key={msg.id} />
      ))}
    </div>
  )
}
