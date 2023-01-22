import './lib/dayjs'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './components/Home'
import { useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'

import { AuthContext } from './components/AuthContext'
import { AuthIndex } from './components/AuthIndex'

export function App() {
  const auth = useContext(AuthContext)
  const [user, setUser] = useState<User|null>(auth.currentUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  if (user) {
    return (
      <Home/>
    )
  } else {
    return (
      <AuthIndex/>
    )
  }
}
