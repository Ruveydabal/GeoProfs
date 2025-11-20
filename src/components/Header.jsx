import GeoprofsLogoWit from '../media/GeoprofsLogoWit.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {
  const navigate = useNavigate();
  const [profielMenu, setProfielMenu] = useState(false);
  const [gebruiker, setGebruiker] = useState(null);

  useEffect(() => {
    const haalGebruikerOp = async () => {
      const gebruikerId = localStorage.getItem("userId");
      if (!gebruikerId) return;

      try {
        // Gebruiker ophalen
        const gebruikerDoc = await getDoc(doc(db, "user", String(gebruikerId)));
        if (!gebruikerDoc.exists()) return;

        const gebruikerData = gebruikerDoc.data();

        // Rol ophalen uit Firestore
        if (gebruikerData.rol_id !== undefined && gebruikerData.rol_id !== null) {
          const rolDoc = await getDoc(doc(db, "rol", String(gebruikerData.rol_id)));
          if (rolDoc.exists()) {
            rolNaam = rolDoc.data().rolNaam || "Onbekende rol";
          }
        }

        setGebruiker({
          ...gebruikerData,
          rol: rolNaam,
        });
      } catch (error) {
        console.error("Fout bij ophalen gebruiker:", error);
      }
    };

    haalGebruikerOp();
  }, []);

  const handleUitloggen = () => {
    localStorage.removeItem("userId");
    navigate("/login"); // of naar je startpagina
  };

  return (
    <>
      <header className="h-[10%] w-full bg-[#E8641C] flex items-center">
        <div className="w-[1%]" />
        <div className="w-[50%] h-[80%]">
          <a href="/voorpagina">
            <img src={GeoprofsLogoWit} alt="Geoprofs Logo" className="h-full w-auto" />
          </a>
        </div>
        <div className="flex justify-end w-[50%] h-[80%]">
          <button className="flex cursor-pointer" onClick={() => setProfielMenu(!profielMenu)}>
            <div className="h-full w-auto mr-5">
              <div className="flex w-full h-[55%] text-xl items-end justify-end text-[#fff]">
                <p>{gebruiker ? `${gebruiker.naam} ${gebruiker.achternaam}` : "Bezig met ophalen"}</p>
              </div>
              <div className="flex w-full h-[45%] text-sm justify-end text-[#fff]">
                <p>{gebruiker?.rol || "Onbekende rol"}</p> 
              </div>
            </div>
            <img 
              src={gebruiker?.profielfoto || "https://via.placeholder.com/40"} 
              alt="Profiel Foto" 
              className='h-full aspect-square bg-[#fff] rounded-full'
            />
          </button>
        </div>
        <div className="w-[1%]" />
      </header>

      {profielMenu && (
        <div className='h-[60%] absolute top-0 right-4 pointer-events-none'>
          <div className='h-[20%]'/>
          <div className="w-[200px] h-auto bg-[#fff] border-2 border-solid border-[#D0D0D0] p-[5px] pointer-events-auto">
            <button 
              className="h-[40px] w-full cursor-pointer border-2 border-solid border-[#D0D0D0] rounded-[15px] mb-[5px]"
              onClick={() => navigate(`/profiel/${localStorage.getItem("userId")}`)}
            >
              Profiel
            </button>
            
            {gebruiker?.rol === "office manager" && (
              <button 
                className="h-[40px] w-full cursor-pointer border-2 border-solid border-[#D0D0D0] rounded-[15px] mb-[5px]"
                onClick={() => navigate(`/audit-overzicht`)}
              >
                Audit Overzicht
              </button>
            )}

            <button 
              className="h-[40px] w-full cursor-pointer border-2 rounded-[15px] bg-[#DF121B] text-[#fff]"
              onClick={handleUitloggen}
            >
              Uitloggen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;