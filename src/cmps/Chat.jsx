import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faVideo, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import MessageList from "./MessageList"
import SendMsg from "./SendMsg"

export const Chat = () => {
  return (
    <div className='chat-container'>
      <div className='chat-info'>
        <span>Jane</span>
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
