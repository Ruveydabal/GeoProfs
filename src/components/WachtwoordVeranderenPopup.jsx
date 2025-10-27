function WachtwoordVeranderenPopup({SetWachtwoordPopup}) {

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className="text-[25px]">Wachtwoord veranderen</p>

                <div className="h-auto w-[70%] mt-[20px]">
                    <p>Nieuw wachtwoord</p>
                    <input className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" type="password" /> 
                </div>
                
                <div className="h-auto w-[70%] mt-[20px]">
                    <p>Wachtwoord herhalen</p>
                    <input className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" type="password" /> 
                </div>
                

                <p></p>

                <div className="w-full flex justify-between mt-[20px]">
                    <button className='h-[40px] max-w-[90%] w-[150px] bg-[#fff] border-1 border-solid border-[#D0D0D0] rounded-[15px] cursor-pointer' onClick={() => SetWachtwoordPopup(false)}>Annuleren</button>
                    <button className='h-[40px] max-w-[90%] w-[150px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer'>Bevestigen</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default WachtwoordVeranderenPopup


