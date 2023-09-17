import React,{useState,useEffect} from 'react'
import {doc,onSnapshot} from 'firebase/firestore'
import { useAuthContext } from '../context/AuthContext'
import {db} from '../firebase'
const Chats = () => {
  const currentUser=useAuthContext()
  const [chats, setChats] = useState([])
  useEffect(() => {
    const getChats=()=>{
      const unsub=onSnapshot(doc(db,'userChats',currentUser.currentuser.uid),(doc)=>{
        setChats(doc.data())
      })
  return ()=>{
    unsub()
  }
    }
    {currentUser.currentuser.uid && getChats()}
  }, [currentUser.currentuser.uid])
  console.log(Object.entries(chats))
  return (
    <div>
      {Object.entries(chats)?.map((chat)=>{
     return  <div key={chat[0]} className="userChat flex items-center gap-5 white cursor-pointer hover:bg-gray-200 mb-2 ">
    <img className='h-[50px] w-[50px] rounded-md object-cover ' src={chat[1].userInfo.photoURL} alt="photo" />
  <div className="userChatInfo">
    <span className=''>{chat[1].userInfo.displayName}</span>
    <p className='text-[10px] text-gray-400 max-w-max'>{chat[1].userInfo.lastMessage?.text}</p>
  </div>
  </div>
      })}
     
    </div>
 
  )
}

export default Chats