import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

import GoogleLogo from '../assets/google.svg'

const provider = new GoogleAuthProvider();

export function GoogleAuthButton () {  
  const auth = useContext(AuthContext)
  const [user, setUser] = useState<User | null>(null)

  function handleGoogleAuthentication() {    
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      setUser(user)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);  

        console.log(errorCode, errorMessage, email, credential)
    });
  }

  return (
    <div className='w-full max-w-sm'>
      <button
        className="w-full mt-5 flex flex-row justify-center items-center gap-3 bg-gray-100 text-black font-semibold"
        onClick={handleGoogleAuthentication}>
          <img src={GoogleLogo} style={{width: '30px'}} alt="google"/>
          Entrar com Google
      </button>
    </div>
  )
}