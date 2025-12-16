import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import VerlofGeschiedenisOverzicht from "./VerlofGeschiedenisOverzicht.jsx";

function VerlofOverzichtContainer({AfkeurenPopupWeergeven, herladen}) {
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [ladenOfFaalText, setLadenOfFaalText] = useState("Aan het laden...");

    const FetchVerlofAanvraagData = async (filter) => {
        try {
            const verlofSnap = await getDocs(query(collection(db, "verlof"), where(filter)));

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

    const FetchUserData = async (filter) => {
        try {
            const userSnap = await getDocs(query(collection(db, "user"), where(filter)));

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

    const FetchVerlofStatusData = async (filter) => {
        try {
            const statusSnap = await getDocs(query(collection(db, "statusVerlof"), where(filter)));

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

    if(!verlofData || verlofData.length == 0 || !userData || userData.length == 0 || !verlofStatusData || verlofStatusData.length == 0){
        return(ladenOfFaalText)
    }
    return (
        <div className="flex w-full h-full divide-x divide-[#D0D0D0]">
            <VerlofGeschiedenisOverzicht 
                FetchVerlofAanvraagData={FetchVerlofAanvraagData}
                FetchUserData={FetchUserData}
                FetchVerlofStatusData={FetchVerlofStatusData}
                herladen={herladen}
                AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
            />
             {/* <VerlofOverzichtBalk 
                verlofData={verlofData.filter(x => x.user_id.id === momenteleUserId && (x.statusVerlof_id?.id == 3 || x.statusVerlof_id?.id == 4))}
                typeKaart="openAanvragen"
                userData={userData}
                verlofStatusData={verlofStatusData}
            />
            {
                localStorage.getItem("rol") != "medewerker" ?
                <VerlofOverzichtBalk 
                    verlofData={verlofData.filter(x => x.user_id.id != momenteleUserId && (x.statusVerlof_id?.id == 3 || x.statusVerlof_id?.id == 4) && new Set(userData.filter(x => x.afdeling == userData.filter(x => x.id === momenteleUserId)[0].afdeling).map(x => x.id)).has(x.user_id.id))}
                    typeKaart="manager"
                    userData={userData}
                    verlofStatusData={verlofStatusData}
                    AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                />
                : <></>
            } */}

        </div>
    );
}

export default VerlofOverzichtContainer;
