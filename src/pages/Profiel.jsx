import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Header from '../components/Header.jsx'
import ProfielLijstItem from '../components/ProfielLijstItem.jsx'
import WachtwoordVeranderenPopup from '../components/WachtwoordVeranderenPopup.jsx'

function Profiel() {
    const { userId: id } = useParams();
    const navigate = useNavigate();

    const jouwId = localStorage.getItem("userId");
    const gebruikersRol = localStorage.getItem("rol");

    const [aanHetWijzigen, setAanHetWijzigen] = useState(false)
    const [voornaam, setVoornaam] = useState("")
    const [achternaam, setAchternaam] = useState("")
    const [email, setEmail] = useState("")
    const [BSNNummer, setBSNNummer] = useState(0)

    const [rol, setRol] = useState("");
    const [afdeling, setAfdeling] = useState("");
    const [inDienst, setInDienst] = useState(null);

    const [wachtwoordPopup, setWachtwoordPopup] = useState(false)

    useEffect(() => {
        const fetchGebruiker = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("Geen userId in localStorage gevonden.");
                    return;
                }

                // Ophalen Firestore document
                const gebruikerRef = doc(db, "user", userId); 
                const gebruikerSnap = await getDoc(gebruikerRef);

                if (!gebruikerSnap.exists()) {
                    console.error("Gebruiker niet gevonden in Firestore.");
                    return;
                }

                const data = gebruikerSnap.data();

                setVoornaam(data.voornaam || "");
                setAchternaam(data.achternaam || "");
                setEmail(data.email || "");
                setBSNNummer(data.bsn || "");

                if (data.rol_id) {
                    const rolSnap = await getDoc(data.rol_id);
                    if (rolSnap.exists()) {
                        setRol(rolSnap.data().rolNaam || "Onbekende rol");
                    }
                } else {
                    setRol("Onbekende rol");
                }

                setAfdeling(data.afdeling || "");
                
                if (data.inDienst) {
                    setInDienst(moment(data.inDienst.toDate()));
                } else {
                    setInDienst(null);
                }

            } catch (err) {
                console.error("Fout bij ophalen gebruiker:", err);
            }
        };

        fetchGebruiker();
    }, []);


    const updateData = () => {
        if(aanHetWijzigen){
            //hier naar DB pushen
            setAanHetWijzigen(!aanHetWijzigen)
        }
        else{
            setAanHetWijzigen(!aanHetWijzigen)
        }
    }

  return (
    <>
        <div className='h-full w-full'>
            <div className='h-[120px] w-full flex items-center'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] ml-[50px] cursor-pointer' onClick={() => navigate(`/${rol?.toLowerCase()}/voorpagina`)}>Home</button>
            </div>
            <div className='flex h-[calc(100%-120px)] flex-1 ml-[50px]'>
                <div className='h-full w-[300px]'>
                    <img src="" alt="Profiel Foto" className='h-[300px] aspect-square bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0]'/>
                </div>
                <div className='flex h-full flex-1 ml-[50px] overflow-y-auto'>
                    <div className='h-full w-auto'>
                        <p className='text-[20px]'>Persoonlijke informatie</p>
                        <ProfielLijstItem waardeNaam={"Voornaam"} SetWaarde={setVoornaam} waarde={voornaam} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"Achternaam"} SetWaarde={setAchternaam} waarde={achternaam} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"Email"} SetWaarde={setEmail} waarde={email} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"BSN Nummer"} SetWaarde={setBSNNummer} waarde={BSNNummer} aanHetWijzigen={aanHetWijzigen}/>
                        <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]'/>

                        <p className='text-[20px]'>Werk informatie</p>
                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    <div>Rol: </div>
                                </div>
                                {aanHetWijzigen ? 
                                <div className='w-[200px] h-[40px] items-center flex'>
                                <select className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" name="rollen" id="rollen">
                                    <option value="medewerker">Medewerker</option>
                                    <option value="manager">Manager</option>
                                    <option value="officeManager">Office manager</option>
                                </select>
                                </div>
                                :
                                <div className='w-auto h-[40px] items-center flex'>
                                    <p>{rol}</p>
                                </div>
                            }
                            </div>

                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    <div>Afdeling: </div>
                                </div>
                                {aanHetWijzigen ? 
                                <div className='w-[200px] h-[40px] items-center flex'>
                                <select className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" name="Afdelingen" id="Afdelingen">
                                    <option value="filler">filler</option>

                                </select>
                                </div>
                                :
                                <div className='w-auto h-[40px] items-center flex'>
                                    <p>{afdeling}</p>
                                </div>
                            }
                            </div>

                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    <div>In dienst sinds: </div>
                                </div>
                                {aanHetWijzigen ? 
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    <input
                                        type="date"
                                        value={inDienst ? inDienst.format("YYYY-MM-DD") : ""}
                                        onChange={(e) => setInDienst(moment(e.target.value))} />
                                </div>
                                :
                                <div className='w-auto h-[40px] items-center flex'>
                                    <p>{inDienst ? inDienst.format("DD-MM-YYYY") : "Laden..."}</p>
                                </div>
                            }
                            </div>

                        <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]'/>

                        <div className="flex flex-col mb-[30px]">
                        {id == jouwId && !aanHetWijzigen ? 
                            <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px] cursor-pointer' onClick={() => setWachtwoordPopup(true)}>Wachtwoord wijzigen</button> : <></>
                        }
                        {gebruikersRol == "Manager" ? 
                            <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px] cursor-pointer' onClick={() => updateData()}>{aanHetWijzigen ? "Opslaan" : "Gegevens wijzigen"}</button> : <></>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {wachtwoordPopup ? <WachtwoordVeranderenPopup SetWachtwoordPopup={setWachtwoordPopup}/> : <></>}
    </>
  );
}
export default Profiel;