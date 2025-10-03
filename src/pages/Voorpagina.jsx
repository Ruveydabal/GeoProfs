import { useState } from 'react';
import Header from '../components/Header'
import MaandKalender from '../components/MaandKalender'
import WeekKalender from '../components/WeekKalender'
import MaandSwitcher from '../components/MaandSwitcher'
import WeekSwitcher from '../components/WeekSwitcher'

function Voorpagina() {
    const [MaandofWeekKalender, SetMaandofWeekKalender] = useState(false) //maand = false, week = true
    // const [datum, SetDatum] = useState(new Date());

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
    <>
      <Header/>
      <div className='flex w-full h-[90%] flex-col'>
        <div className='h-[120px] w-full flex'>
          <div className='flex h-[120px] w-[20%] justify-center items-center'>
            <button className='h-[40px] w-[250px] bg-[#2AAFF2] text-white rounded-[15px]'>Verlof Aanvragen</button>
          </div>
          <div className='flex h-full w-[80%] items-center'>

            {MaandofWeekKalender ?
            <WeekSwitcher SetDatum={SetDatum} datum={datum}/>
            :
            <MaandSwitcher MaandVerhogen={MaandVerhogen} MaandVerlagen={MaandVerlagen} maand={maand} jaar={jaar}/>}



            <div className='h-[40px] w-[150px] ml-[40px] divide-solid'>
              <button className={`${MaandofWeekKalender ? 'bg-[#ffffff]' : 'bg-[#C9EDFF]'} w-[50%] h-full rounded-l-[15px] border-1 border-solid ${MaandofWeekKalender ? 'border-[#D0D0D0]' : 'border-[#2AAFF2]'}`}
              onClick={() => SetMaandofWeekKalender(false)}
              >Maand</button>
              <button className={`${MaandofWeekKalender ? 'bg-[#C9EDFF]' : 'bg-[#ffffff]'} w-[50%] h-full rounded-r-[15px] border-1 border-solid ${MaandofWeekKalender ? 'border-[#2AAFF2]' : 'border-[#D0D0D0]'}`}
              onClick={() => SetMaandofWeekKalender(true)}
              >Week</button>
            </div>

            <div className='flex-1'></div>

            <button className='h-[40px] w-[250px] bg-[#2AAFF2] text-white rounded-[15px] mr-[50px]'>Aanvraag overzicht →</button>
          </div>
        </div>
        <div className='flex-1 w-full flex'>
          <div className='flex h-full w-[20%] justify-center'>
            <button className='h-[40px] w-[250px] bg-[#2AAFF2] text-white rounded-[15px]'>Ziek Melden</button>
          </div>
          <div className='h-full w-[80%] bg-[#f0f0f0]'>
            {MaandofWeekKalender ?
              <WeekKalender/>
              :
              <MaandKalender maand={maand} jaar={jaar}/>}
          </div>
        </div>
      </div>

    </>
  )
}

export default Voorpagina
