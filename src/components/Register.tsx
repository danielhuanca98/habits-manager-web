import { useContext, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import logoImage from '../assets/logo.svg'
import { AuthContext } from './AuthContext'
import UseAnimations from "react-useanimations";
import loadingIcon from 'react-useanimations/lib/loading';
import clsx from "clsx";

interface Props {
  setAuthScreen: (screen: string) => void
}

export function Register({setAuthScreen}: Props) {
  const auth = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleRegister() {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name
        })
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
        <h3 className='mt-5'>Cadastre-se com email e senha</h3>
        <input 
          value={name}
          onChange={e => setName(e.target.value)}
          type={'text'} 
          placeholder="Nome"
          className="p-4 w-full max-w-sm rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        />
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          type={'text'} 
          placeholder="Insira seu email"
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
          title="register"
          onClick={handleRegister}
          disabled={loading}
          className={clsx('flex w-full max-w-sm mt-5 font-semibold justify-center', {
            'bg-zinc-800': loading,
            'bg-violet-700': !loading
          }
          )}
        >
          {loading ? <UseAnimations strokeColor="#FFFFFF" animation={loadingIcon}  size={25}/> : 'Cadastrar'}
        </button>
        <h3 className='mt-2'>
          Já possui uma conta?
          <span
            onClick={() => setAuthScreen('login')}
            className="font-semibold cursor-pointer"
          >
            {' '}Entre
          </span>
        </h3>
      </div>
    </div>  
  )
}