import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  
  const {
    seconds,
    minutes,
    hours,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center'}} >
      <div style={{fontSize: '80px'}} className='flex justify-center items-center '>
        <div className=' flex justify-center items-center p-1 rounded-lg text-primary border border-blue-500'>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>

    </div>
  );
}

export default MyTimer