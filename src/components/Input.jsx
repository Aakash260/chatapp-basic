import React from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
const Input = () => {
  return (
    <div className='h-[20px] flex'>
 
        <input className='' type="text" placeholder='Type something...' />
        <div className="send grid grid-flow-col ">
            <input type="file" className='opacity-0' id='file'/>
            <img src={Attach} alt="" />
            <label htmlFor="file">
                <img src={Img} alt="" />
            </label>
            <button className='rounded-md bg-[#C6FFFF]'>Send</button>
        </div>
        
    </div>
  )
}

export default Input