import React from "react"

export default function MessagePreview() {
  return (
    <div className='message-preview-container '>
      <div className='msg-info'>
        <img
          className='user-img'
          src='https://cdn.britannica.com/20/217720-050-857D712B/American-novelist-Stephen-King-2004.jpg'
          alt=''
        />
        <span className='msg-time'>Just now</span>
      </div>
      <div className='msg-content '>
        <p className='msg-text owner'>Hello</p>
        {/* <img
          className='sended-img'
          src='https://cdn.britannica.com/20/217720-050-857D712B/American-novelist-Stephen-King-2004.jpg'
          alt=''
        /> */}
      </div>
    </div>
  )
}
