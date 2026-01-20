import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, documentId, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function GebruikerLijst() {
    const [userData, setUserData ] = useState([]);
    const [rolData, setRolData ] = useState([]);
    let navigate = useNavigate();

    const momenteleUserId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // user query maken
                const userQ = query(collection(db, "user"));

                // data fetchen
                const userSnap = await getDocs(userQ);

                // als er geen data is, weergeef deze waarschuwingstekst
                if (userSnap.empty) {
                    setUserData([]);
                    return;
                }

                // document id toevoegen aan data
                var tempUserData = userSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // momenteleUserAfdeling ophalen
                const momenteleUser = tempUserData.find(user => user.id === momenteleUserId);
                const afdeling = momenteleUser?.afdeling || null;
                
                tempUserData = tempUserData.filter(user => user.afdeling === afdeling);

                setUserData(tempUserData);

                // rollen ophalen
                const rolQ = query(collection(db, "rol"));

                // data fetchen
                const rolSnap = await getDocs(rolQ);

                // als er geen data is, weergeef deze waarschuwingstekst
                if (rolSnap.empty) {
                    setUserData([]);
                    return;
                }

                // document id toevoegen aan data
                var tempRolData = rolSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRolData(tempRolData)

            } catch (error) {
                console.error("Fout bij het ophalen van users:", error);
            }
        }

        fetchData();
    }, []);


  return (
    <div className='h-auto w-[90%] overflow-y-scroll'>
        { userData.length > 0 ? 
            userData.map((user) =>
            <div key={user.id} className='flex w-full h-auto bg-[#fff] mb-[20px] rounded-[15px] border-1 border-[#D0D0D0] p-[10px]'>
                <div className='w-auto h-full mr-[10px]'>
                    <img src="" alt="Profiel Foto" className='w-[75px] h-[75px] rounded-full bg-[#D0D0D0]'/>
                </div>
                <div className='flex-1 h-full'>
                    <div className='w-full h-auto'>
                        <p>{user.voornaam + " " + user.achternaam}</p>
                        <p>{rolData.filter(x => x.id == user.rol_id.id)[0]?.rolNaam}</p>
                    </div>
                    <div className='flex w-full justify-end'>
                        <button className='px-[20px] h-[40px] w-auto bg-[#2AAFF2] rounded-[15px] text-white' onClick={() => navigate(`/profiel/${user.id}`)}>Profiel Bezoeken</button>
                    </div>
                </div>
            </div>
        ) : <></>}
    </div>

  );
}

export default GebruikerLijst;