import {Plus, X} from 'phosphor-react'
import { useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import * as Avatar from '@radix-ui/react-avatar';
import defalutUserImg from '../assets/user.svg'


import logoImage from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm';
import { AuthContext } from './AuthContext';

export function Header() {  
  const auth = useContext(AuthContext)
  const {currentUser} = auth

  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
          <img src={logoImage} alt="habits"/>

          <div className='flex flex-row gap-10'>
            <Dialog.Root>
              <Dialog.Trigger 
                type='button'
                className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background'
              >
                <Plus size={20} className="text-violet-500"/>
                Novo Hábito
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>

                <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                    <X size={24} aria-label="Fechar"/>
                  </Dialog.Close>
                  <Dialog.Title className='text-3xl leading-tight font-extrabold'>
                    Criar hábito
                  </Dialog.Title>
                  <NewHabitForm/>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className='flex flex-row gap-3 items-center'>
              <Avatar.Root className='w-11 h-11 rounded-full overflow-hidden select-none bg-zinc-800'>
                <Avatar.Image src={currentUser?.photoURL || undefined}/>
                <Avatar.Fallback >
                  <img src={defalutUserImg} className="-mb-2"/>
                </Avatar.Fallback>
              </Avatar.Root>  
              <div>
                <h3>{currentUser?.displayName || currentUser?.email}</h3>  
                <h3 
                  className='p-1 hover:cursor-pointer text-xs text-violet-400'
                  onClick={() => auth.signOut()}
                >
                  Sair
                </h3>
              </div>   
            </div>
          </div>                  
        </div>
  )
}