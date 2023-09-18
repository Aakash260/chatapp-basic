import React from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
 import Input from './Input'
import { useChatContext } from '../context/ChatContext'
const Chat = () => {
    const {data}=useChatContext();
    
 
  return (
    <div className='col-span-2'>
      <div className="chatInfo h-[50px] flex items-center justify-between ">
        <span>{data?.user?.displayName}</span>
        <div className="chatIcons flex gap-[8px] h-[24px] cursor-pointer">
          <img src={Cam} alt="" /><img src={Add} alt="" /><img src={More} alt="" />
        </div>
      </div>
      <div className=''>
        <Messages/>
      </div>
        <Input/> 
    </div>
  )
}

export default Chat