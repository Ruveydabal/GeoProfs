import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { db } from "../firebase";
import { doc, getDoc, updateDoc, Timestamp, collection, query, where, getDocs} from "firebase/firestore";

import ProfielLijstItem from '../components/ProfielLijstItem.jsx';
import WachtwoordVeranderenPopup from '../components/WachtwoordVeranderenPopup.jsx';

function Profiel({ setTrigger }) {
    const { userId: id } = useParams();
    const navigate = useNavigate();

    const jouwId = localStorage.getItem("userId");
    const gebruikersRol = localStorage.getItem("rol");

    const [aanHetWijzigen, setAanHetWijzigen] = useState(false);
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [email, setEmail] = useState("");
    const [BSNNummer, setBSNNummer] = useState("");

    const [rol, setRol] = useState("");
    const [afdeling, setAfdeling] = useState("");
    const [inDienst, setInDienst] = useState(null);
    const [verlofSaldo, setVerlofSaldo] = useState(0);

    const [wachtwoordPopup, setWachtwoordPopup] = useState(false);

    // Ophalen gebruiker
    useEffect(() => {
        const fetchGebruiker = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("Geen userId in localStorage gevonden.");
                    return;
                }

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
                setBSNNummer(data.bsnNummer || "");
                setAfdeling(data.afdeling || "");
                setVerlofSaldo(data.verlofSaldo || 0);

                // Rol ophalen
                if (data.rol_id) {
                    const rolSnap = await getDoc(data.rol_id);
                    if (rolSnap.exists()) {
                        setRol(rolSnap.data().rolNaam);
                    }
                }
                
                if (data.inDienst instanceof Timestamp) {
                    setInDienst(moment(data.inDienst.toDate()));
                }

            } catch (err) {
                console.error("Fout bij ophalen gebruiker:", err);
            }
        };
        fetchGebruiker();
    }, []);

    // Opslaan van wijzigingen
    const updateData = async () => {
        if (aanHetWijzigen) {
            try {
                const userId = localStorage.getItem("userId");
                const gebruikerRef = doc(db, "user", userId);

                // RolID ophalen vanuit rol collectie
                const rolQuery = query(
                    collection(db, "rol"),
                    where("rolNaam", "==", rol)
                );
                const rolSnapshot = await getDocs(rolQuery);

                let rolRef = null;
                if (!rolSnapshot.empty) {
                    rolRef = rolSnapshot.docs[0].ref;
                }

                await updateDoc(gebruikerRef, {
                    voornaam,
                    achternaam,
                    email,
                    bsnNummer: BSNNummer,
                    rol_id: rolRef,
                    afdeling,
                    inDienst: inDienst ? Timestamp.fromDate(inDienst.toDate()) : null,
                    verlofSaldo: Number(verlofSaldo)
                });

                // Header direct updaten
                setTrigger(prev => prev + 1);

            } catch (err) {
                console.error("Fout bij opslaan:", err);
            }
        }
        setAanHetWijzigen(!aanHetWijzigen);
    };

    return (
        <>
            <div className='h-[90%] w-full'>
                <div className='h-[120px] w-full flex items-center'>
                    <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] ml-[50px] cursor-pointer'
                        onClick={() => navigate(`/${rol?.toLowerCase().replaceAll(" ", "")}/voorpagina`)}>Home</button>
                </div>
                <div className='flex h-[calc(100%-120px)] flex-1 ml-[50px]'>
                    <div className='h-full w-[300px]'>
                        <img src="" alt="Profiel Foto" className='h-[300px] aspect-square bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0]' />
                    </div>
                    <div className='flex h-full flex-1 ml-[50px] overflow-y-auto'>
                        <div className='h-full w-auto'>
                            <p className='text-[20px]'>Persoonlijke informatie</p>
                            <ProfielLijstItem waardeNaam="Voornaam" SetWaarde={setVoornaam} waarde={voornaam} aanHetWijzigen={aanHetWijzigen} />
                            <ProfielLijstItem waardeNaam="Achternaam" SetWaarde={setAchternaam} waarde={achternaam} aanHetWijzigen={aanHetWijzigen} />
                            <ProfielLijstItem waardeNaam="Email" SetWaarde={setEmail} waarde={email} aanHetWijzigen={aanHetWijzigen} />
                            <ProfielLijstItem waardeNaam="BSN Nummer" SetWaarde={setBSNNummer} waarde={BSNNummer} aanHetWijzigen={aanHetWijzigen} />
                            <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]' />

                            <p className='text-[20px]'>Werk informatie</p>

                            {/* Rol */}
                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>Rol:</div>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    {aanHetWijzigen ? (
                                        <select
                                            className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]"
                                            value={rol}
                                            onChange={(e) => setRol(e.target.value)} >
                                            <option value="Office Manager">Office Manager</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Medewerker">Medewerker</option>
                                        </select>
                                    ) : (
                                        <p>{rol}</p>
                                    )}
                                </div>
                            </div>

                            {/* Afdeling */}
                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>Afdeling:</div>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    {aanHetWijzigen ? (
                                        <select
                                            className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]"
                                            value={afdeling}
                                            onChange={(e) => setAfdeling(e.target.value)} >

                                            <option>Office management</option>
                                            <option>Relation management</option>
                                            <option>Geo-ICT</option>
                                            <option>Geodesy</option>
                                            <option>Finance</option>
                                            <option>HRM</option>
                                            <option>ICT</option>

                                        </select>
                                    ) : (
                                        <p>{afdeling}</p>
                                    )}
                                </div>
                            </div>

                            {/* In dienst */}
                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>In dienst sinds:</div>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    {aanHetWijzigen ? (
                                        <input
                                            type="date"
                                            value={inDienst ? inDienst.format("YYYY-MM-DD") : ""}
                                            onChange={(e) => setInDienst(moment(e.target.value))} />
                                    ) : (
                                        <p>{inDienst ? inDienst.format("DD-MM-YYYY") : "Laden..."}</p>
                                    )}
                                </div>
                            </div>

                            {/* Verlof saldo */}
                            <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                                <div className='w-[200px] h-[40px] items-center flex'>Verlof saldo:</div>
                                <div className='w-[200px] h-[40px] items-center flex'>
                                    {aanHetWijzigen ? (
                                        <input
                                            type="number"
                                            min="0"
                                            value={verlofSaldo}
                                            onChange={(e) => setVerlofSaldo(e.target.value)}
                                            className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]"
                                        />
                                    ) : (
                                        <p>{verlofSaldo}</p>
                                    )}
                                </div>
                            </div>

                            <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]' />

                            {/* Knoppen */}
                            <div className="flex flex-col mb-[30px]">
                                {id === jouwId && !aanHetWijzigen && (
                                    <button
                                        className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px] cursor-pointer'
                                        onClick={() => setWachtwoordPopup(true)} >
                                        Wachtwoord wijzigen
                                    </button>
                                )}
                                {gebruikersRol === "manager" && (
                                    <button
                                        className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px] cursor-pointer'
                                        onClick={updateData} >
                                        {aanHetWijzigen ? "Opslaan" : "Gegevens wijzigen"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {wachtwoordPopup && <WachtwoordVeranderenPopup SetWachtwoordPopup={setWachtwoordPopup} />}
        </>
    );
}

export default Profiel;