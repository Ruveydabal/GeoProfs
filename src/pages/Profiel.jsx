import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import moment from 'moment';

import Header from '../components/Header.jsx'
import ProfielLijstItem from '../components/ProfielLijstItem.jsx'

function Profiel() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [aanHetWijzigen, SetAanHetWijzigen] = useState(false)
    const [voornaam, SetVoornaam] = useState("")
    const [achternaam, SetAchternaam] = useState("")
    const [email, SetEmail] = useState("")
    const [BSNNummer, SetBSNNummer] = useState(0)

    const [rol, SetRol] = useState("");
    const [afdeling, SetAfdeling] = useState("");
    const [datumInDienst, SetDatumInDienst] = useState(null);

    //temp variable
    var gebruikersRol = "manager";
    const jouwId = 1;

    useEffect(() => {
        const fetch = async () => {
            //temp data
            SetVoornaam("John");
            SetAchternaam("Doe");
            SetEmail("johndoe@geoprofs.com");
            SetBSNNummer(123456789);
            SetRol("Medewerker");
            SetAfdeling("Geo-ICT");
            SetDatumInDienst(moment("2015/10/10"));
        };

        fetch();
    }, []);

    const updateData = () => {
        if(aanHetWijzigen){
            //hier naar DB pushen
            console.log([voornaam, achternaam, email, BSNNummer]);
            SetAanHetWijzigen(!aanHetWijzigen)
        }
        else{
            SetAanHetWijzigen(!aanHetWijzigen)
        }

    }

    //naar voorpagina als je niet manager bent of je eigen profiel bekijkt.
    useEffect(() => {
        if(id != jouwId && gebruikersRol != "manager"){
            navigate("/voorpagina");
            return
        }
    }, []);
    if(id != jouwId && gebruikersRol != "manager"){
        navigate("/voorpagina");
        return
    }

  return (
    <>
        <Header/>
        <div className='h-[90%] w-full'>
            <div className='h-[120px] w-full flex items-center'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] ml-[50px] cursor-pointer' onClick={() => {navigate("/voorpagina")}}>Home</button>
            </div>
            <div className='flex h-[calc(100%-120px)] flex-1 ml-[50px]'>
                <div className='h-full w-[300px]'>
                    <img src="" alt="Profiel Foto" className='h-[300px] aspect-square bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0]'/>
                </div>
                <div className='flex h-full flex-1 ml-[50px] overflow-y-auto'>
                    <div className='h-full w-auto'>
                        <p className='text-[20px]'>Persoonlijke informatie</p>
                        <ProfielLijstItem waardeNaam={"Voornaam"} SetWaarde={SetVoornaam} waarde={voornaam} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"Achternaam"} SetWaarde={SetAchternaam} waarde={achternaam} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"Email"} SetWaarde={SetEmail} waarde={email} aanHetWijzigen={aanHetWijzigen}/>
                        <ProfielLijstItem waardeNaam={"BSN Nummer"} SetWaarde={SetBSNNummer} waarde={BSNNummer} aanHetWijzigen={aanHetWijzigen}/>
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
                                    <option value="ceo">CEO</option>
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
                                        className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]"
                                        
                                        type="date"
                                        value={moment(datumInDienst).format("yyyy-MM-DD")}
                                        onChange={(e) => SetDatumInDienst(moment(e.target.value).format("yyyy-MM-DD"))}
                                    />
                                </div>
                                :
                                <div className='w-auto h-[40px] items-center flex'>
                                    <p>{moment(datumInDienst).format("DD-MM-YYYY")}</p>
                                </div>
                            }
                            </div>




                        <div className='w-full h-0 mb-[20px] border-b-1 border-solid border-[#D0D0D0]'/>

                        <div className="flex flex-col mb-[30px]">
                        {id == jouwId ? 
                            <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px]'>Wachtwoord wijzigen</button> : <></>
                        }
                        {gebruikersRol == "manager" ? 
                            <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mb-[20px]' onClick={() => updateData()}>{aanHetWijzigen ? "Opslaan" : "Gegevens wijzigen"}</button> : <></>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
export default Profiel;