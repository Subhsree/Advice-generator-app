import patterndivider from './assets/images/pattern-divider-desktop.svg'
import icondice from './assets/images/icon-dice.svg'
import './App.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

// {
//   "slip": {
//     "slip_id": "2",
//      "advice": "Smile and the world smiles with you. Frown and you're on your own."
//   }
// }
function App() {
  const [advice ,setAdvice] = useState('Advice');
  const [adviceid,setAdviceid] = useState('0');

    async function fetchData() {
      try {
        const response = await axios.get(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);
        // const response = await axios.get('https://api.adviceslip.com/advice');
        const data = response.data;
        console.log(data.slip);
        setAdviceid(data.slip.id);
        setAdvice(data.slip.advice);
      } catch (error) {
        console.error('Error:', error);
      }
    }
      useEffect(
        () =>{
          fetchData();
        },[]
      )
  
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-darkblue '>
      <div className='sm:h-[35%] sm:w-[35%] h-[50%] w-[90%] bg-darkgrayishblue rounded-2xl p-5 relative'>
        <div className='text-neongreen font-semibold text-center '>
          ADVICE #{adviceid}
        </div>
        <div className='h-[70%] flex flex-col items-center justify-center'>
          <div className='text-lightcyan text-center manrope-800 text-xl'>
            "{advice}"
          </div> 
        </div>
        <div className='text-lightcyan w-full flex justify-center'>
          <img src={patterndivider} className=' bg-center'/>
        </div>

        <div className='bg-neongreen  dice w-14 h-14 rounded-full flex items-center justify-center absolute bottom-[-27px] left-1/2 transform -translate-x-1/2 cursor-pointer' onClick={fetchData}>
          <img src={icondice}/>
        </div>

      </div>
      
    </div>
  )
}

export default App
