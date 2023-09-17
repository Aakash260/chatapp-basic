import React from 'react'
import { signOut } from 'firebase/auth'
import {auth} from '../firebase'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
  const currentUser=useAuthContext();
  
  return (
    <div className='Navbar flex items-center h-[50px] p-[10px] justify-between text-sm bg-[#C6FFFF]'>
      <span className='logo'>ChatUp</span>
    <div className="user flex">
      <img className='h-[24px] w-[24px] rounded-md object-cover ' src={currentUser.currentuser.photoURL} alt="" />
      <span className='mr-1 text-xs'>{currentUser.currentuser.displayName}</span>
    <button className='text-xs border-0 rounded-md bg-gray-200 cursor-pointer'onClick={()=>signOut(auth)}>Logout</button>
    </div>
     
    </div>
  )
}

export default Navbar