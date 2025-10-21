import React from 'react'
import Header from '../components/Header'


const Ziekmelden = () => {
  return (
    <>
      <Header/>
        <div className="h-[90%] w-full bg-white-500 flex items-center justify-center">
            <div className='h-[90%] w-[70%] flex items-center justify-center'>
                <div className='h-[80%] w-[50%] bg-[#DDE7F1] flex flex-col  justify-between  items-center rounded-[15px] p-4'>
                    <div className='h-[10%] w-[80%] flex flex-col items-center justify-start rounded-[15px] p-4 text-3xl font-bold'>
                      Ziekmelden
                    </div>
                    <div className='h-[20%] w-[80%]  flex flex-row itms-center justify-between'>
                      <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-1l font-bold'>
                        datum van ziekmelding
                      </div>
                      <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-1l font-bold'>
                        datum +1 van ziekmelding
                      </div>
                    </div>
                    <div className="bg-white w-[80%] h-[15%]  text-1l font-bold text-black  py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
                      Verlof type vast ziekmelden
                    </div>
                    <button className="bg-[#2AAFF2] w-[80%] h-[15%] hover:bg-[#1A8FD0] text-white  font-bold py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
                      Verzend
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Ziekmelden