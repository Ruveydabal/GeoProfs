import React from 'react'
import Header from '../components/Header'


const Ziekmelden = () => {
  return (
    <>
      <Header/>
        <div className="h-[90%] w-full bg-white-500 flex items-center justify-center">
            <div className='h-[90%] w-[80%] bg-yellow-200 flex items-center justify-center'>
                <div className='h-[80%] w-[50%] bg-[#DDE7F1] flex flex-col  justify-between  items-center rounded-[15px] p-4'>
                    <div className='h-[15%] w-[80%] flex flex-col items-center justify-start rounded-[15px] p-4 text-2xl font-bold'>
                        Ziekmelden
                    </div>
                    <div className='h-[15%] w-[20%] bg-white flex flex-row items-center justify-center'>
                        test
                    </div>
                     <div className='h-[20%] w-[50%] bg-[#2AAFF2] flex flex-row items-center justify-center rounded-[15px]'>
                        Verzend
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Ziekmelden