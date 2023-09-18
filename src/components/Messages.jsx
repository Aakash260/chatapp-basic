import React ,{useEffect,useState} from 'react'
import Message from './Message'
import { useChatContext } from '../context/ChatContext'
import { onSnapshot,doc } from 'firebase/firestore'
 import {db} from '../firebase'
const Messages = () => {
  const [messages,setMessages]=useState([])
  const {data}=useChatContext()

  useEffect(() => {
    
const unSub=onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
  doc.exists()&&setMessages(doc.data().messages)
})
return ()=>{
  unSub()
}

  }, [data.chatId])
 
  return (
    <div className='grid row-span-3'>
    <div className="messages overflow-y-scroll grid-rows-2 bg-gray-300  max-h-[350px] ">
      {
        messages.map((m)=>{
         return <Message message={m} key={m.id}/>
        })
      }
     
       
    </div>
     

     
    </div>
  )
}

export default Messages