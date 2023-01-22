import '../lib/dayjs'

import { Header } from './Header'
import { SummaryTable } from './SummaryTable'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react'
import { AuthContext } from './AuthContext'
//import { Habit } from './Habits'

export function Home() {
  const auth = useContext(AuthContext)
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header/>
        <SummaryTable/>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  )
}
