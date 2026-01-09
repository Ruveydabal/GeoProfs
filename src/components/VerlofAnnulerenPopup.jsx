function VerlofAnnulerenPopup({VerlofAnnulerenPopupWeergeven, setHerladen}) {




  const VerlofWelAnnuleren = async () => {
      VerlofAnnulerenPopupWeergeven(false);
      setHerladen(prev => !prev);
  };

  function VerlofNietAnnuleren(){
    VerlofAnnulerenPopupWeergeven(false);
  }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className='w-full text-center text-[25px] mb-[20px]'>Verlof Afkeuren</p>
                <div className='w-full flex justify-between'>
                  <button className='h-[40px] w-[150px] bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0] cursor-pointer' onClick={() => (VerlofNietAnnuleren())}>Annuleren</button>
                  <button className='h-[40px] w-[150px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => (VerlofWelAnnuleren())}>Bevestigen</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default VerlofAnnulerenPopup


