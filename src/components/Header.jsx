import GeoprofsLogoWit from '../media/GeoprofsLogoWit.png'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Header() {
  let navigate = useNavigate();
  const [profielMenu, setProfielMenu] = useState(false)

  //tijdelijke variabelen
  const gebruikersNaam = "Gebruikers Naam";
  const gebruikersRol = "Gebruikers Rol";
  const Admin = true;
  const userId = 1;
  
  return (
    <>
    <header className="h-[10%] w-full bg-[#E8641C] flex items-center">
      <div className='w-[1%]'/>
      <div className="w-[50%] h-[80%]">
        <a href="/voorpagina">
          <img src={GeoprofsLogoWit} alt="Geoprofs Logo" className='h-full w-auto'/>
        </a>
      </div>
      <div className="flex justify-end w-[50%] h-[80%]">
        <button className='flex cursor-pointer' onClick={() => setProfielMenu(!profielMenu)}>
          <div className=' h-full w-auto mr-5'>
            <div className='flex w-full h-[55%] text-xl items-end justify-end text-[#fff]'><p className=''>{gebruikersNaam}</p></div>
            <div className='flex w-full h-[45%] text-sm justify-end text-[#fff]'>{gebruikersRol}</div>
          </div>
          <img src="" alt="Profiel Foto" className='h-full aspect-square bg-[#fff] rounded-full'/>
        </button>
      </div>
      <div className='w-[1%]'/>
    </header>

    {profielMenu ?
      <div className='h-[60%] absolute top-0 right-4 pointer-events-none'>
        <div className='h-[20%]'/>
        <div className="w-[200px] h-auto bg-[#fff] border-2 border-solid border-[#D0D0D0] p-[5px] pointer-events-auto">
          <button className="h-[40px] w-full cursor-pointer border-2 border-solid border-[#D0D0D0] rounded-[15px] mb-[5px]"
          onClick={() => navigate(`/profiel/${userId}`)}>Profiel</button>
          {Admin ?
            <button className="h-[40px] w-full cursor-pointer border-2 border-solid border-[#D0D0D0] rounded-[15px] mb-[5px]"
            onClick={() => navigate(`/audit-overzicht`)}>Audit Overzicht</button>
            : <></>
          }
          <button className="h-[40px] w-full cursor-pointer border-2 rounded-[15px] bg-[#DF121B] text-[#fff]">Uitloggen</button>
        </div>
      </div> : <></>
    }
    </>
  );
}

export default Header


