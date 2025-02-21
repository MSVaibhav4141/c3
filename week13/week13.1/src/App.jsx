import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { OtpInput } from './components/OtpInput'

function App() {
  const [isDisabed, setState] = useState(true)

  return (
    <>
    {/* using grid  */}
     {/* <div className='grid grid-cols-12'>
      <div className='bg-green-200 col-span-12 sm:col-span-4'>Hi from the first div</div>
      <div className='bg-red-400 col-span-12 sm:col-span-4'>Hi from the second div</div>
      <div className='bg-pink-200 col-span-12 sm:col-span-4'>Hi from the third div</div>
     </div> */}
     {/* using flex  */}
     {/* <div className='flex flex-col sm:flex-row'>
      <div className='bg-green-200 flex-1'>Hi from the first div</div>
      <div className='bg-red-400 flex-1'>Hi from the second div</div>
      <div className='bg-pink-200 flex-1'>Hi from the third div</div>
     </div> */}
     <div className='h-screen w-full bg-blue-900 flex flex-col items-center'>
        <h2 className='text-teal-400 my-10 font-semibold'>Webinar<span className='text-white'>.gg</span></h2>
        <p className='text-white my-8'>Verify Your Age</p>
        <p className='text-gray-400 my-3'>Please confirm your birth year.This data won't be stored</p>
        <input type="text" placeholder='Your Birth Year' className='bg-blue-400 rounded px-3 py-2 w-50 my-4' onChange={(e) => setState((e.target.value).length ? false : true)}/>
        <button disabled={isDisabed} className='text-white font-bold disabled:bg-blue-200 bg-blue-400 transition  rounded-sm px-4 py-2 mt-2 w-50'>Continue</button>

        <OtpInput numbers={6}/>
     </div>
    </>
  )
}

export default App
