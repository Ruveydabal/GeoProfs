import { useState } from 'react';
import { db } from "../firebase";
import { collection, doc, setDoc, addDoc, serverTimestamp  } from "firebase/firestore";

function VerlofAfkeurenPopup({VerlofAfkeurenPopupWeergeven, verlofData, setHerladen, gebruiker}) {

  const [afkeurReden, setAfkeurReden] = useState("");
  const [foutMelding, setFoutMelding] = useState("");

  const verlofAfkeurenBevestigen = async () => {
    if (!afkeurReden) {
      setFoutMelding("Reden mag niet leeg zijn.");
      return;
    }

    try {
      const verlofRef = doc(db, "verlof", verlofData.id);
      const statusVerlofRef = doc(db, "statusVerlof", "2");

      // Verlof updaten
      await setDoc(
        verlofRef,
        {
          statusVerlof_id: statusVerlofRef,
          laatstGeupdate: serverTimestamp(),
          afkeurReden: afkeurReden,
        },
        { merge: true }
      );

      // Audit toevoegen
      await addDoc(collection(db, "auditTrail"), {
        actie: { id: 2, titel: "aanpassen" },
        tabel: { id: 2, tabelNaam: "verlof" },
        uitgevoerdDoorUser: {
          id: localStorage.getItem("userId"),
          naam: gebruiker.voornaam,
          achternaam: gebruiker.achternaam,
        },
        typeUitvoering: { id: 3, titel: "Afgekeurd" },
        uitgevoerdOp: {
          id: verlofData.id,
          tabel: { id: 2, tabelNaam: "verlof" },
        },
        laatstGeupdate: serverTimestamp(),
      });

      VerlofAfkeurenPopupWeergeven(false);
      setAfkeurReden("");
      setHerladen(prev => !prev);

    } catch (error) {
      setFoutMelding("Er is een fout opgetreden bij het opslaan.");
      console.error(error)
    }
  };

  function verlofAfkeurenAnnuleren(){
    setAfkeurReden("");
    VerlofAfkeurenPopupWeergeven(false);
  }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className='w-full text-center text-[25px] mb-[20px]'>Verlof Afkeuren</p>
                <p className='w-full text-center'>Wat is de reden van afkeuring?</p>
                <p className='w-full text-center text-[#DF121B]'>{foutMelding}</p>
                <textarea name="" id=""
                  className='w-full h-[200px] resize-none mb-[20px] border-1 border-solid border-[#D0D0D0] rounded-[15px] bg-[#F4F4F4] p-[10px]'
                  value={afkeurReden}
                  placeholder="test"
                  onChange={e => {setAfkeurReden(e.target.value), setFoutMelding("")}}

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


