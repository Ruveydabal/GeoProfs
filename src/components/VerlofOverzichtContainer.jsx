import { getDocs } from "firebase/firestore";
import VerlofGeschiedenisOverzicht from "./VerlofGeschiedenisOverzicht.jsx";
import VerlofOpenOverzicht from "./VerlofOpenOverzicht.jsx";
import VerlofManagerOverzicht from "./VerlofManagerOverzicht.jsx";

function VerlofOverzichtContainer({VerlofAfkeurenPopupWeergeven, VerlofAnnulerenPopupWeergeven, herladen, idsZichtbaar}) {

    const FetchVerlofAanvraagData = async (setVerlofData, setInfoText, query, leegText) => {
        try {
            const verlofSnap = await getDocs(query);

            //document id toevoegen aan data
            const data = verlofSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            //als er geen data is, weergeef meegegeven waarshuwingstekst
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

    const FetchUserData = async (setUserData, setInfoText, query) => {
        try {
            const userSnap = await getDocs(query);

            //als er geen data is, weergeef deze waarshuwingstekst
            if (userSnap.empty) {
                setInfoText("Er zijn geen users gevonden.");
                setUserData([]);
                return;
            }

            //document id toevoegen aan data
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

    const FetchVerlofStatusData = async (setVerlofStatusData, setInfoText, query) => {
        try {
            const statusSnap = await getDocs(query);

            //als er geen data is, weergeef deze waarshuwingstekst
            if (statusSnap.empty) {
                setInfoText("Er zijn geen users gevonden.");
                setVerlofStatusData([]);
                return;
            }

            //document id toevoegen aan data
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
                VerlofAnnulerenPopupWeergeven={VerlofAnnulerenPopupWeergeven}
                idsZichtbaar={idsZichtbaar}
            />
            {
                localStorage.getItem("rol") != "medewerker" ?
                <VerlofManagerOverzicht 
                    FetchVerlofAanvraagData={FetchVerlofAanvraagData}
                    FetchUserData={FetchUserData}
                    FetchVerlofStatusData={FetchVerlofStatusData}
                    herladen={herladen}
                    VerlofAfkeurenPopupWeergeven={VerlofAfkeurenPopupWeergeven}
                    idsZichtbaar={idsZichtbaar}
                />
                : <></>
            }

        </div>
    );
}

export default VerlofOverzichtContainer;
