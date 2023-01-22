import { GoogleAuthButton } from "./GoogleAuthButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import logoImage from '../assets/logo.svg'
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import clsx from "clsx";
import UseAnimations from "react-useanimations";
import loadingIcon from 'react-useanimations/lib/loading';

interface Props {
  setAuthScreen: (screen: string) => void
}

export function Login({setAuthScreen}: Props) {
  const auth = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleEmailLogin() {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-2xl px-6 flex flex-col items-center gap-5'>
        <img src={logoImage} alt="habits"/>
        <h3 className="mt-5">Faça login para começar</h3>
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='text' 
          placeholder="Email"
          className="p-4 w-full max-w-sm rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        />
        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password' 
          placeholder="Senha"
          className="p-4 w-full max-w-sm rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        />
        <button 
          type="submit"
          title="login"
          onClick={handleEmailLogin}
          disabled={loading}
          className={clsx('flex w-full max-w-sm mt-5 font-semibold justify-center', {
            'bg-zinc-800': loading,
            'bg-violet-700': !loading
          }
          )}
        > 
          {loading ? <UseAnimations strokeColor="#FFFFFF" animation={loadingIcon}  size={25}/> : 'Entrar'}
        </button>
        <h3 className="mt-2">
          Não possui uma conta?
          <span 
            onClick={() => setAuthScreen('register')}
            className="font-semibold cursor-pointer"
          >
            {' '}Cadastre-se
          </span>
        </h3>
        <GoogleAuthButton/>
      </div>
    </div>  
  )
}