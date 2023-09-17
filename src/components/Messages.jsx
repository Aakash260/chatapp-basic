import React from 'react'
import Message from './Message'
 
const Messages = () => {
  return (
    <div className='grid row-span-3'>

   
    <div className="messages overflow-y-scroll grid-rows-2 bg-gray-300  max-h-[350px] ">
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      
       
    </div>
     

     
    </div>
  )
}

export default Messages