import {FormEvent, useState, useContext} from 'react'
import { Check } from "phosphor-react";
import * as Checkbox  from '@radix-ui/react-checkbox'
import { api } from '../lib/axios';
import { toast } from 'react-toastify';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function NewHabitForm() {  
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    
    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])
    toast.success('hábito criado com sucesso!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }
  function handleToggleWeekDay (weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithRemovedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithRemovedOne)
    }
  }
  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input 
        type={'text'} 
        id="title" 
        onChange={event => setTitle(event.target.value)}
        placeholder="ex.: Exercícios, dormir bem, etc..." 
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col mt-3">
        {
          availableWeekDays.map((weekDay, index) => (
            <Checkbox.Root 
              key={weekDay} 
              className='flex items-center gap-3 group focus:outline-none'
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                <Checkbox.Indicator>
                  <Check size={20} className="text-white"/>
                </Checkbox.Indicator>
              </div>
              
              <span className='text-white leading-tight'>
                {weekDay}
              </span>
            </Checkbox.Root>
          ))
        }        
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <Check size={20} weight="bold"/>
        Confirmar
      </button>
    </form>
  )
}