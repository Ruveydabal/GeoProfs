import { getDocs } from "firebase/firestore";
import VerlofGeschiedenisOverzicht from "./VerlofGeschiedenisOverzicht.jsx";

function VerlofOverzichtContainer({AfkeurenPopupWeergeven, herladen}) {

    const FetchVerlofAanvraagData = async (setVerlofData, setInfoText, q) => {
        try {
            const verlofSnap = await getDocs(q);

            const data = verlofSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (data.length === 0) {
                setInfoText("U heeft geen verleden verlof aanvragen.");
                return;
            }

            setVerlofData(data);
            setInfoText("");

        } catch (err) {
            console.error("Fout bij het ophalen van verlof aanvragen:", err);
            setInfoText("Er is iets misgegaan bij het ophalen van de verlof aanvragen.");
        }
    };

    const FetchUserData = async (setUserData, setInfoText, q) => {
        try {
            const userSnap = await getDocs(q);

            if (userSnap.empty) {
                setInfoText("Er zijn geen users gevonden.");
                setUserData([]);
                return;
            }

            const data = userSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setUserData(data);
            setInfoText("");
        } catch (err) {
            console.error("Fout bij het ophalen van users:", err);
            setInfoText("Er is iets misgegaan bij het ophalen van de users.");
        }
    };

    const FetchVerlofStatusData = async (setVerlofStatusData, setInfoText, q) => {
        try {
            const statusSnap = await getDocs(q);

            if (statusSnap.empty) {
                setInfoText("Er zijn geen users gevonden.");
                setVerlofStatusData([]);
                return;
            }

            const data = statusSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setVerlofStatusData(data);
            setInfoText("");
        } catch (err) {
            console.error("Fout bij ophalen verlof status:", err);
            setInfoText("Er is iets misgegaan bij ophalen van de verlof statusen.");
        }
    };

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
