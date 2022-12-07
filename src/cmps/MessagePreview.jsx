import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";

export default function MessagePreview({message}) {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
console.log(message)
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div 
    ref={ref}

    className={`message-preview-container ${message.senderId === currentUser.uid && "owner"} ` }>
      <div className='msg-info'>
        <img
          className='user-img'
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }          alt=''
        />
        <span className='msg-time'>Just now</span>
      </div>
      <div className='msg-content '>
        <p className='msg-text owner'>{message?.text}</p>
        {message.img && <img className="sended-img" src={message.img} alt="" />}


      </div>
    </div>
  )
}
