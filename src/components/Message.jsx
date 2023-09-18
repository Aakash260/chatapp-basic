import React from 'react'
import { useChatContext } from '../context/ChatContext'
import { useAuthContext } from '../context/AuthContext'
const Message = ({message}) => {
   console.log(message)
   const currentUser=useAuthContext()
   const {data}=useChatContext()
  console.log(message.senderId===currentUser.currentuser.uid)
  return (
     <div className={`message flex ${ message.senderId===currentUser.currentuser.uid ?'flex-row-reverse':''}  mb-4`}>
      <div className="messageInfo ">
        <img className='w-[40px] h-[40px] rounded-md object-cover' src= { message.senderId===currentUser.currentuser.uid?currentUser.currentuser.photoURL:data.user.photoURL} alt="" />
<span className='text-[10px] text-gray-400'>Just Now</span>
      </div>
        <div className="messageContent max-w-[80%] flex flex-col ">
       <p className=' border-2 rounded-md border-t-0 border-l-0 border-gray-600' >{message.text}</p>
       { message.img && <img className='w-[50%]' src={message.img} alt="" />}
        </div>
     </div>
  )
}

export default Message