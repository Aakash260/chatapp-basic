import React from 'react'
import addAvatar from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from '../../src/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import {doc,setDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [err, setErr] = useState(false)
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
e.preventDefault();
const displayName= e.target[0].value;
const email=e.target[1].value;
const password=e.target[2].value;
const file=e.target[3].files[0];

try {    
    const res=await createUserWithEmailAndPassword(auth, email, password);
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);
     
    uploadTask.on( 

      (error) => {
        setErr(true)
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log('File available at', downloadURL);
          await updateProfile(res.user,{
            displayName,
            photoURL:downloadURL
          })
          await setDoc(doc(db,"users",res.user.uid),{
            uid:res.user.uid,
            displayName,
            email,
            photoURL:downloadURL,
          })
         await setDoc(doc(db,'userChats',res.user.uid),{});
         navigate('/home');
        });
      }
    );
} catch (error) {
    setErr(true)
}
  
    }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mt-12 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
           ChatUp
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Register
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    
                    <div className="flex ">
                        <div className="relative">
                        <input className='text-gray-600 absolute opacity-0' type="file" name="" id="" />
                        <img className='' src={addAvatar}  alt=""/>
                        </div>
                        <div className="">
                           <p className='text-gray-600'>Add Avatar</p>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    {err && <span>Something went wrong</span> }
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default Register