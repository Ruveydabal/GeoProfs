import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import VerlofAfkeurenPopup from "../components/VerlofAfkeurenPopup.jsx";
import VerlofOverzichtContainer from "../components/VerlofOverzichtContainer.jsx"

function Verlofoverzicht({gebruiker, idsZichtbaar}) {
  const navigate = useNavigate();
  
  const [popupWeergeven, setPopupWeergeven] = useState(false); 
  const [verlofData, setVerlofData] = useState(null); 
  const [herladen, setHerladen] = useState(false);

  const AfkeurenPopupWeergeven = (verlofData) => {
    setVerlofData(verlofData)
    setPopupWeergeven(true)
  };
  
  return (
    <>
      <div className="h-full w-full">
        <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
          <button className='h-[40px] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => navigate(`/${gebruiker?.rol?.toLowerCase().replaceAll(" ", "")}/voorpagina`)}>Home</button>
          <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => navigate("/VerlofAanvraag")}>Verlof aanvragen</button>
        </div>
          <div className='flex h-[calc(100%-120px)] w-full px-[40px]'>
            <VerlofOverzichtContainer AfkeurenPopupWeergeven={AfkeurenPopupWeergeven} herladen={herladen} idsZichtbaar={idsZichtbaar}/>
          </div>
      </div>
      {popupWeergeven ?
      <VerlofAfkeurenPopup setPopupWeergeven={setPopupWeergeven} verlofData={verlofData} setHerladen={setHerladen} gebruiker={gebruiker}/> :
      <></>
      }
      
  </>
  );
}

export default Verlofoverzicht;
