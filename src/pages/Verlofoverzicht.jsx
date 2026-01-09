import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import VerlofAfkeurenPopup from "../components/VerlofAfkeurenPopup.jsx";
import VerlofAnnulerenPopup from "../components/VerlofAnnulerenPopup.jsx";
import VerlofOverzichtContainer from "../components/VerlofOverzichtContainer.jsx"

function Verlofoverzicht({gebruiker, idsZichtbaar}) {
  const navigate = useNavigate();
  
  const [verlofAfkeurenPopupWeergeven, setVerlofAfkeurenPopupWeergeven] = useState(false); 
  const [verlofAnnulerenPopupWeergeven, setVerlofAnnulerenPopupWeergeven] = useState(false); 
  const [verlofData, setVerlofData] = useState(null); 
  const [herladen, setHerladen] = useState(false);

  //open afkeur popup wanneer een manager op afkeuren drukt op een verlof kaart
  const VerlofAfkeurenPopupWeergeven = (verlofData) => {
    setVerlofData(verlofData)
    setVerlofAfkeurenPopupWeergeven(true)
  };

  const VerlofAnnulerenPopupWeergeven = (verlofData) => {
    setVerlofData(verlofData)
    setVerlofAnnulerenPopupWeergeven(true)
  };
  
  return (
    <>
      <div className="h-full w-full">
        <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
          <button className='h-[40px] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => navigate(`/${gebruiker?.rol?.toLowerCase().replaceAll(" ", "")}/voorpagina`)}>Home</button>
          <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => navigate("/VerlofAanvraag")}>Verlof aanvragen</button>
        </div>
          <div className='flex h-[calc(100%-120px)] w-full px-[40px]'>
            <VerlofOverzichtContainer VerlofAfkeurenPopupWeergeven={VerlofAfkeurenPopupWeergeven} VerlofAnnulerenPopupWeergeven={VerlofAnnulerenPopupWeergeven} herladen={herladen} idsZichtbaar={idsZichtbaar}/>
          </div>
      </div>
      {verlofAfkeurenPopupWeergeven ?
      <VerlofAfkeurenPopup setPopupWeergeven={setVerlofAfkeurenPopupWeergeven} verlofData={verlofData} setHerladen={setHerladen} gebruiker={gebruiker}/> :
      <></>
      }
      {verlofAnnulerenPopupWeergeven ?
      <VerlofAnnulerenPopup setVerlofAnnulerenPopupWeergeven={setVerlofAnnulerenPopupWeergeven} verlofData={verlofData} setHerladen={setHerladen} gebruiker={gebruiker}/> :
      <></>
      }
      
  </>
  );
}

export default Verlofoverzicht;
