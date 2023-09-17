import React from 'react'

const Message = () => {
  return (
     <div className="message flex owner mb-4">
      <div className="messageInfo ">
        <img className='w-[40px] h-[40px] rounded-md object-cover' src="https://tse1.mm.bing.net/th?id=OIP.s5sf5kkPb45R6qnzaL123QHaH9&pid=Api&P=0&h=180" alt="" />
<span className='text-[10px] text-gray-400'>Just Now</span>
      </div>
        <div className="messageContent max-w-[80%] flex flex-col ">
       <p className=' border-2 rounded-md border-t-0 border-l-0 border-gray-600' >Hello</p>
       <img className='w-[50%]' src="https://tse1.mm.bing.net/th?id=OIP.s5sf5kkPb45R6qnzaL123QHaH9&pid=Api&P=0&h=180" alt="" />
        </div>
     </div>
  )
}

export default Message