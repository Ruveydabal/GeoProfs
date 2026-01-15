import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, documentId, getDocs } from "firebase/firestore";

function GebruikerLijst() {
    const [userData, setUserData ] = useState("");

    const momenteleUserId = localStorage.getItem("userId");
    var momenteleUserAfdeling;

    const FetchUserData = async (setUserData, query) => {
        try {

        } catch (err) {
            console.error("Fout bij het ophalen van users:", err);
            setInfoText("Er is iets misgegaan bij het ophalen van de users.");
        }
    };

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
                var data = userSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // momenteleUserAfdeling ophalen
                const momenteleUser = data.find(user => user.id === momenteleUserId);
                const afdeling = momenteleUser?.afdeling || null;
                
                data = data.filter(user => user.afdeling === afdeling);

                setUserData(data);
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
            
            <div className='w-full h-[100px] bg-[#ff0000] mb-[20px] rounded-[15px]'></div>
        
        ) : <></>}
    </div>

  );
}

export default GebruikerLijst;