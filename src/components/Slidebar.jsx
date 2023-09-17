import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
const Slidebar = () => {

  return (
    <div className='sidebar col-span-1 bg-blue-100'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Slidebar