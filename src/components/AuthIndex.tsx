import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";


export function AuthIndex() {
  const [authScreen, setAuthScreen] = useState('login')

  if (authScreen === 'login') {
    return <Login setAuthScreen ={setAuthScreen}/>
  } else {
    return <Register setAuthScreen ={setAuthScreen}/>
  }
}