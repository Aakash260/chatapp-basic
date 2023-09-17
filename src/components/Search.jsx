import React,{ useState } from 'react'
import {db} from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { collection,where,query,getDocs,getDoc,serverTimestamp,doc,setDoc,updateDoc} from 'firebase/firestore'
const Search = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const currentUser=useAuthContext()
  const handleSelect=async()=>{
  //check wheater group exist,if not create new one
 
  const combineId=currentUser.currentuser.uid>user.id?currentUser.currentuser.uid+user.uid:user.uid+currentUser.currentuser.uid
   
 
try {

   const res= await getDoc(doc(db,'chats',combineId))
    
if(!res.exists()){
  await setDoc(doc(db,'chats',combineId),{messages:[]});
await updateDoc(doc(db,'userChats',currentUser.currentuser.uid),{
  [combineId+'.userInfo']:{
    uid:user.uid,
    displayName:user.displayName,
    photoURL:user.photoURL
  },
  [combineId+'.date']:serverTimestamp()
})
}
await updateDoc(doc(db,'userChats',user.uid),{
  [combineId+'.userInfo']:{
    uid:currentUser.uid,
    displayName:currentUser.displayName,
    photoURL:currentUser.photoURL
  },
  [combineId+'.date']:serverTimestamp()
})
  } catch (error) {
    setErr(true)
  console.log(error)
}
setUser(null)
setUsername('')
}

const handleSearch=async()=>{ 
  const q=query(collection(db,'users'),
  where('displayName','==',username))
  try {  
  const querySnapShot=await getDocs(q);
  querySnapShot.forEach((doc) => {
  setUser(doc.data())   
  });
} catch (error) {
  setErr(true)
}

}
const handleKey=(e)=>{
e.code==='Enter' && handleSearch()
  }
  return (
    <div className='search border-gray-300 border-1'>
      <div className="searchForm ">
        <input onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} className='border-0 bg-transparent outline-none' type="text" placeholder='find a user' value={username}/>
      </div>
      <hr className='h-1 bg-white' />

   { user &&   <div onClick={handleSelect} className="userChat flex items-center gap-5 white cursor-pointer hover:bg-gray-200 mb-2 ">
    <img className='h-[50px] w-[50px] rounded-md object-cover ' src={user.photoURL} alt="" />
  <div className="userChatInfo">
    <span className=''>{user.displayName}</span>
    <p className='text-[10px] text-gray-400 max-w-max'>hello</p>
  </div>
  </div>}
    </div>
  )
}

export default Search