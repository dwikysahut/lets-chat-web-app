import React, { Component } from 'react'
import {FaUser, FaPowerOff} from 'react-icons/fa'

const UserList =({history,email,key,focus,onClick})=>  {
    // console.log(props)
 
    return(
      <div className={`chat-item ${focus && 'focus'}`} onClick={onClick}>
        <div className="chat-avatar">
          <FaUser />
        </div>
        <div className="chat-name">
          <span>{email}</span>
        </div>
      </div>
    )
  }
export default UserList
