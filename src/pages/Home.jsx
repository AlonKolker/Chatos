import React from "react"
import { Chat } from "../cmps/Chat"
import { Sidebar } from "../cmps/Sidebar"

export const Home = () => {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat/>
      </div>
    </div>
  )
}
