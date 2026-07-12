import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import {auth, googleProvider} from '../utils/firebase.js'
import api from '../utils/axios.js'
function App() {
  const handleLogin = async (token) => {
    try{
      const data = await api.post("/auth/login", { token });
      console.log(data);
    }
    catch(error){

    }

  }

  const googleLogin = async()=>{
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    console.log(token);
    await handleLogin(token);
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={googleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
        Continue with Google
      </button>
    </div>
  )
}

export default App
