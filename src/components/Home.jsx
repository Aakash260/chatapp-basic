import React from 'react'
import Slidebar from './Slidebar'
import Chat from './Chat'
const Home = () => {
  return (
    <div className='home h-screen flex justify-center items-center'>
      <div className="container border-blue-100 border-2 rounded-md w-[65%] h-[80%] grid grid-cols-3 overflow-hidden">
        <Slidebar/>
        <Chat/>
      </div>
      </div>
  )
}

export default Home