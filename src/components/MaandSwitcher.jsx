import moment from 'moment';
import { useState } from 'react';

import Arrow from '../media/Arrow.png'

function MaandSwitcher({datum, SetDatum}) {

    const [jaar, SetJaar] = useState(new Date().getFullYear())
    const [maand, SetMaand] = useState(new Date().getMonth())

    function MaandVerhogen(){
        if(maand == 11){
            SetJaar(jaar+1)
            SetMaand(0)
        }
        else{
           SetMaand(maand+1) 
        }
    }

    function MaandVerlagen(){
        if(maand == 0){
            SetJaar(jaar-1)
            SetMaand(11)
        }
        else{
           SetMaand(maand-1) 
        }
    }

  return (
    <div className='flex h-auto w-[280px] items-center'>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => MaandVerlagen()}>
        <img src={Arrow} alt="" />
        </button>
        <div className='flex w-[120px] mx-[40px] flex-col items-center'>
            <p className='text-[20px] h-auto max-w-fit'>{moment().month(maand).format("MMMM")}</p>
            <p className='text-[15px] h-auto max-w-fit'>{jaar}</p>
        </div>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => MaandVerhogen()}>
        <img src={Arrow} alt="" className='rotate-180'/>
        </button>
    </div>
  );
}

export default MaandSwitcher;
