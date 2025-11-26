import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import VerlofOverzichtBalk from "./VerlofOverzichtBalk.jsx";

function VerlofOverzichtContainer() {
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [ladenOfFaalText, setLadenOfFaalText] = useState("Aan het laden...");

    const momenteleUserId = localStorage.getItem("userId");
    // const momenteleUserId = "medewerker1";
    useEffect(() => {
        const FetchVerlofAanvragen = async () => {
        try {
            const verlofSnap = await getDocs(query(collection(db, "verlof")));

            if (verlofSnap.empty) {
            setLadenOfFaalText("Er is geen verlof gevonden.");
            setVerlofData([]);
            return;
            }

            setVerlofData(verlofSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            })));

        } catch (err) {
            console.error("Fout bij het ophalen van verlof aanvragen:", err);
            setLadenOfFaalText("Er is iets misgegaan bij het ophalen van de verlof aanvragen.");
        }
        };

        const FetchUsers = async () => {
        try {
            const userSnap = await getDocs(query(collection(db, "user")));

            if (userSnap.empty) {
            setLadenOfFaalText("Er zijn geen users gevonden.");
            setUserData([]);
            return;
            }

            setUserData(userSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            })));

        } catch (err) {
            console.error("Fout bij het ophalen van users:", err);
            setLadenOfFaalText("Er is iets misgegaan bij het ophalen van de users.");
        }
        };

        const FetchVerlofStatus = async () => {
        try {
            const statusSnap = await getDocs(query(collection(db, "statusVerlof")));

            if (statusSnap.empty) {
            setLadenOfFaalText("Er zijn geen verlof statusen gevonden.");
            setVerlofStatusData([]);
            return;
            }

            setVerlofStatusData(statusSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            })));

        } catch (err) {
            console.error("Fout bij ophalen verlof status:", err);
            setLadenOfFaalText("Er is iets misgegaan bij ophalen van de verlof statusen.");
        }
        };

        FetchVerlofAanvragen(),
        FetchUsers(),
        FetchVerlofStatus()
    }, []);

    if(!verlofData || verlofData.length == 0 || !userData || userData.length == 0 || !verlofStatusData || verlofStatusData.length == 0){
        return(ladenOfFaalText)
    }
    return (
        <div className="flex w-full h-full divide-x divide-[#D0D0D0]">
            <VerlofOverzichtBalk 
                verlofData={verlofData.filter(x => x.user_id.id === momenteleUserId && (x.statusVerlof_id?.id == 1 || x.statusVerlof_id?.id == 2))}
                typeKaart="geschiedenis"
                userData={userData}
                verlofStatusData={verlofStatusData}
            />
             <VerlofOverzichtBalk 
                verlofData={verlofData.filter(x => x.user_id.id === momenteleUserId && (x.statusVerlof_id?.id == 3 || x.statusVerlof_id?.id == 4))}
                typeKaart="openAanvragen"
                userData={userData}
                verlofStatusData={verlofStatusData}
            />
            {
                localStorage.getItem("rol") != "medewerker" ?
                <VerlofOverzichtBalk 
                    verlofData={verlofData.filter(x => x.user_id.id != momenteleUserId && (x.statusVerlof_id?.id == 3 || x.statusVerlof_id?.id == 4))}
                    typeKaart="manager"
                    userData={userData}
                    verlofStatusData={verlofStatusData}
                />
                : <></>
            }

        </div>
    );
}

export default VerlofOverzichtContainer;
