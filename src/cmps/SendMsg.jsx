import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons"
export default function SendMsg() {
  return (
    <div className='send-msg-container'>
      <input className='send-msg-input' type='text' placeholder='Type someting...' />
      <div className='send-features'>
        <input className='upload-file' type='file' style={{ display: "none" }} id='upload-file' />
        <label htmlFor='upload-file'>
          <FontAwesomeIcon className="icon" icon={faPaperclip} />
        </label>
        <input className='upload-img ' type='file' style={{ display: "none" }} id='upload-img' />
        <label htmlFor='upload-img '>
          <FontAwesomeIcon className="icon" icon={faUpload} />
        </label>

        <button className="send-btn">Send</button>
      </div>
    </div>
  )
}
