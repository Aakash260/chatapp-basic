 import Register from './components/Register'
 import Login from './components/Login'
 import Home from './components/Home'
 import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
 import {useAuthContext} from './context/AuthContext'
 const App = () => {
  const isuser=useAuthContext();
   const ProtectedRoute=({children})=>{
    if(isuser.currentuser===null){
      return <Navigate to="/login"/>
    }
    else{
      return <Home/>
    }
   }
   return (
     <BrowserRouter>
     <Routes>
       <Route path="/">
       <Route index element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/home' element={
        <ProtectedRoute>
         <Home/>
        </ProtectedRoute>
       }/>
       </Route>
     </Routes>
     </BrowserRouter>
   )
 }
 export default App