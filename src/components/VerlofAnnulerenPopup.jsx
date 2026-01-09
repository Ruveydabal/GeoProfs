import { doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from '../firebase.js';

function VerlofAnnulerenPopup({setVerlofAnnulerenPopupWeergeven, verlofData, setHerladen}) {

  //document verwijderen uit database.
  async function VerlofAanvraagVerwijderen(docId)
  {
    if (!docId)
      console.error("Geen document ID opgegeven voor verwijderen.");

    try {
      await deleteDoc(doc(db, "verlof", docId));
    } catch (error) {
      console.error("Kon demo data niet verwijderen:", error);
    }
  }

  const VerlofWelAnnuleren = async () => {
    await VerlofAanvraagVerwijderen(verlofData.id);
    setVerlofAnnulerenPopupWeergeven(false);
    setHerladen(prev => !prev);
  };

  function VerlofNietAnnuleren(){
    setVerlofAnnulerenPopupWeergeven(false);
  }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className='w-full text-center text-[25px] mb-[20px]'>Wilt U zeker deze verlof aanvraag annuleren?</p>
                <div className='w-full flex justify-between'>
                  <button className='h-[40px] w-[150px] bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0] cursor-pointer' onClick={() => (VerlofNietAnnuleren())}>Nee</button>
                  <button className='h-[40px] w-[150px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => (VerlofWelAnnuleren())}>Ja</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default VerlofAnnulerenPopup


