import { onAuthStateChanged } from "firebase/auth";
import { createContext,useState,useEffect,useContext, useReducer } from "react";
import {auth} from '../firebase'
import { useAuthContext } from "./AuthContext";
export const ChatContext=createContext();
export const ChatContextProvider=({children})=>{
    const currentUser=useAuthContext()
     const Initial_State={
        chatId:'null',
        user:{}
     }
     const chatReducer=(state,action)=>{
        switch(action.type){
            case 'CHANGE_USER':
                return {
                    user:action.payload,
                   chatId:currentUser.currentuser.uid>action.payload.id?currentUser.currentuser.uid+action.payload.uid:action.payload.uid+currentUser.currentuser.uid 
                };
                default:
                    return state
        }
     }
     const [state,dispatch]=useReducer(chatReducer,Initial_State)
   return <ChatContext.Provider value={{data:state,dispatch}}>
    {children}
   </ChatContext.Provider>
}
export const useChatContext=()=>{
 return useContext(ChatContext)
}