import React,{useState} from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { useChatContext } from '../context/ChatContext'
import { useAuthContext } from '../context/AuthContext'
import { arrayUnion, updateDoc,doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuid} from 'uuid'
import {db} from '../firebase'
import { Timestamp } from 'firebase/firestore';
import {auth,storage} from '../firebase'
const Input = () => {

const [text, setText] = useState('')
const [image, setImage] = useState('')
  const currentUser=useAuthContext()
  const {data}=useChatContext()

const handleSend=async()=>{
if(image){
  const storageRef = ref(storage, uuid());
  const uploadTask = uploadBytesResumable(storageRef,image );

  uploadTask.on( 

    (error) => {
      console.log(error)
    }, 
    () => {
      
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db,'chats',data.chatId),{
          messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.currentuser.uid,
            date:Timestamp.now(),
            img:downloadURL
          })
        }) 
      });
    }
  );
}else{
await updateDoc(doc(db,'chats',data.chatId),{
  messages:arrayUnion({
    id:uuid(),
    text,
    senderId:currentUser.currentuser.uid,
    date:Timestamp.now()
  })
})
}
await updateDoc(doc(db,'userChats',currentUser.currentuser.uid),{
  [data.chatId+'.lastMessage']:{
    text,
  },
  [data.chatId+'.date']:serverTimestamp(),
})
await updateDoc(doc(db,'userChats',data.user.uid),{
  [data.chatId+'.lastMessage']:{
    text,
  },
  [data.chatId+'.date']:serverTimestamp(),
})


setText('')
setImage('')
}

  return (
    <div className='h-[20px] flex'>
 
        <input className='' type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text} />
        <div className="send grid grid-flow-col ">
            <input type="file" className='opacity-0' id='file' onChange={(e)=>setImage(e.target.files[0])}/>
            <img src={Attach} alt="" />
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            <button className='rounded-md bg-[#C6FFFF]' onClick={handleSend}>Send</button>
        </div>
        
    </div>
  )
}

export default Input