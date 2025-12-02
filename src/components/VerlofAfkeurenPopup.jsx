import { useState } from 'react';
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function VerlofAfkeurenPopup({SetPopupWeergeven, verlofData}) {

  const [afkeurReden, setAfkeurReden] = useState("");

  const verlofAfkeurenBevestigen = async () => {
    const verlofRef = doc(db, "verlof", verlofData.id);
    var statusVerlofRef = doc(db, "statusVerlof", "2");

    await setDoc(verlofRef, {
      statusVerlof_id: statusVerlofRef,
      afkeurReden: afkeurReden
    }, { merge: true });

    //audit aanmaken

    setAfkeurReden("");
    SetPopupWeergeven(false);
  }

  function verlofAfkeurenAnnuleren(){
    setAfkeurReden("");
    SetPopupWeergeven(false);
  }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className='w-full text-center text-[25px] mb-[20px]'>Verlof Afkeuren</p>
                <p className='w-full text-center'>Wat is de reden van afkeuring?</p>
                <textarea name="" id=""
                  className='w-full h-[200px] resize-none mb-[20px] border-1 border-solid border-[#D0D0D0] rounded-[15px] bg-[#F4F4F4] p-[10px]'
                  value={afkeurReden}
                  placeholder="test"
                  onChange={e => {setAfkeurReden(e.target.value)}}

                />
                <div className='w-full flex justify-between'>
                  <button className='h-[40px] w-[150px] bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0] cursor-pointer' onClick={() => (verlofAfkeurenAnnuleren())}>Annuleren</button>
                  <button className='h-[40px] w-[150px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => (verlofAfkeurenBevestigen())}>Bevestigen</button>
                  
                </div>
            </div>
        </div>
    </div>
  );
}

export default VerlofAfkeurenPopup


