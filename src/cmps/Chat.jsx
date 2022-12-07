import React,  { useContext } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faVideo, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import MessageList from "./MessageList"
import SendMsg from "./SendMsg"
import { ChatContext } from "../context/chatContext";


export const Chat = () => {

  const { data } = useContext(ChatContext)
  return (
    <div className='chat-container'>
      <div className='chat-info'>
        <span>{ data.user?.displayName}</span>
        <div className='chat-icons'>
          <FontAwesomeIcon icon={faVideo} />
          <FontAwesomeIcon icon={faUserPlus} />
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <MessageList />

      <SendMsg />
    </div>
  )
}
