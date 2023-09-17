import { onAuthStateChanged } from "firebase/auth";
import { createContext,useState,useEffect,useContext } from "react";
import {auth} from '../firebase'
export const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
    const [currentuser,SetCurrentUser]=useState({})
    useEffect(() => {
     const unsub= onAuthStateChanged(auth,(user)=>{
        SetCurrentUser(user)
      })
      return ()=>{
        unsub();
      }
    }, [])
   return <AuthContext.Provider value={{currentuser}}>
    {children}
   </AuthContext.Provider>
}
export const useAuthContext=()=>{
 return useContext(AuthContext)
}