import {useNavigate, useParams} from "react-router-dom";
import { useEffect } from 'react';

import Header from '../components/Header.jsx'
import ProfielLijstItem from '../components/ProfielLijstItem.jsx'

function Profiel() {
    let { id } = useParams();
    let navigate = useNavigate();

    //temp variables
    var rol = "medewerker";
    const jouwId = 2;
    const data = {
        voornaam: "John",
        achternaam: "Doe",
        email: "johndoe@geoprofs.com",
        BSNNummer: "123456789",
        datumInDienst: "10-10-2015",
        afdeling: "geo-ICT",
        rol: "medewerker"
    };
    //

    useEffect(() => {
        if(id != jouwId && rol != "manager"){
            navigate("/");
            return
        }
    }, []);

    if(id != jouwId && rol != "manager"){
        navigate("/");
        return
    }

  return (
    <>
        <Header/>
        <div className='h-[90%] w-full'>
            <div className='h-[120px] w-full flex items-center'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] ml-[50px]'>Home</button>
            </div>
            <div className='flex h-[calc(100%-120px)] flex-1 mx-[50px]'>
                <div className='h-full w-[300px]'>
                    <img src="" alt="Profiel Foto" className='h-[300px] aspect-square bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0]'/>
                </div>
                <div className='h-full w-auto ml-[50px] overflow-y-auto'>
                    <p className='text-[20px]'>Persoonlijke informatie</p>
                    <ProfielLijstItem waardeNaam={"Voornaam"} waarde={data.voornaam}/>
                    <ProfielLijstItem waardeNaam={"Achternaam"} waarde={data.achternaam}/>
                    <ProfielLijstItem waardeNaam={"Email"} waarde={data.email}/>
                    <ProfielLijstItem waardeNaam={"BSN Nummer"} waarde={data.BSNNummer}/>
                    <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]'/>

                    <p className='text-[20px]'>Werk informatie</p>
                    <ProfielLijstItem waardeNaam={"Rol"} waarde={data.rol}/>
                    <ProfielLijstItem waardeNaam={"Afdeling"} waarde={data.afdeling}/>
                    <ProfielLijstItem waardeNaam={"In dienst sinds"} waarde={data.datumInDienst}/>
                    <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]'/>

                    <div className="flex flex-col mb-[30px]">
                    {id == jouwId ? 
                        <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px]'>Wachtwoord wijzigen</button> : <></>
                    }
                    {rol == "manager" ? 
                        <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px]'>gegevens wijzigen</button> : <></>
                    }
                    </div>


                </div>
            </div>
        </div>
    </>
  );
}
export default Profiel;
