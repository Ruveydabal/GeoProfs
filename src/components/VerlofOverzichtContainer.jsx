import { getDocs } from "firebase/firestore";
import VerlofGeschiedenisOverzicht from "./VerlofGeschiedenisOverzicht.jsx";
import VerlofOpenOverzicht from "./VerlofOpenOverzicht.jsx";
import VerlofManagerOverzicht from "./VerlofManagerOverzicht.jsx";

function VerlofOverzichtContainer({AfkeurenPopupWeergeven, herladen, idsZichtbaar}) {

    const FetchVerlofAanvraagData = async (setVerlofData, setInfoText, q, leegText) => {
        try {
            const verlofSnap = await getDocs(q);

            const data = verlofSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (data.length === 0) {
                setInfoText(leegText);
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
                idsZichtbaar={idsZichtbaar}
            />
             <VerlofOpenOverzicht 
                FetchVerlofAanvraagData={FetchVerlofAanvraagData}
                FetchUserData={FetchUserData}
                FetchVerlofStatusData={FetchVerlofStatusData}
                herladen={herladen}
            />
            {
                localStorage.getItem("rol") != "medewerker" ?
                <VerlofManagerOverzicht 
                    FetchVerlofAanvraagData={FetchVerlofAanvraagData}
                    FetchUserData={FetchUserData}
                    FetchVerlofStatusData={FetchVerlofStatusData}
                    herladen={herladen}
                    AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                />
                : <></>
            }

        </div>
    );
}

export default VerlofOverzichtContainer;
