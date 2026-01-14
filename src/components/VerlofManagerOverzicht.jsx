import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, orderBy, doc } from "firebase/firestore";

function VerlofManagerOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen, VerlofAfkeurenPopupWeergeven, idsZichtbaar, verlofGoedkeuren, multiGeselecteerdeKaartIds, setMultiGeselecteerdeKaartIds, MassaGoedkeuren}) { 
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [infoText, setInfoText] = useState("Aan het laden...");

    const momenteleUserId = localStorage.getItem("userId");

    useEffect(() => {
        //fetch user data
        const userQ = query(collection(db, "user"));
        FetchUserData(setUserData, setInfoText, userQ);

        //fetch VerlofStatus data
        const verlofStatusQ = query(collection(db, "statusVerlof"));
        FetchVerlofStatusData(setVerlofStatusData, setInfoText, verlofStatusQ);
    }, [herladen, FetchUserData, FetchVerlofAanvraagData, FetchVerlofStatusData]);

    useEffect(() => {
        if (!userData || userData.length === 0) return;

        //array van alle users in dezelfde afdeling als de huidige user
        const usersInAfdeling = userData
            .filter(u => u.afdeling === userData.filter(x => x.id === momenteleUserId)[0].afdeling)
            .filter(u => u.id !== momenteleUserId)
            .map(u => doc(db, "user", u.id));

        //fetch verlof data voor users in dezelfde afdeling
        const verlofQ = query(
            collection(db, "verlof"),
            where("user_id", "in", usersInAfdeling),
            where("statusVerlof_id", "in", [doc(db, "statusVerlof", "3"), doc(db, "statusVerlof", "4")]),
            orderBy("createdAt", "desc")
        );
        FetchVerlofAanvraagData(setVerlofData, setInfoText, verlofQ, "U heeft geen verlof aanvragen voor u op dit moment.");
    }, [userData, herladen, FetchVerlofAanvraagData, momenteleUserId]);

    return (
            <div className="h-full flex-1 px-[10px] overflow-y-scroll ">
                <div className="w-full h-[60px]">
                    <button
                        onClick={MassaGoedkeuren}
                        disabled={multiGeselecteerdeKaartIds.length === 0}
                        className={`h-[40px] w-[150px] rounded-[15px] ${multiGeselecteerdeKaartIds.length === 0 ? "bg-[#166C16] cursor-not-allowed text-[#8E8E8E]" : "bg-[#00BC00] cursor-pointer text-white"}`}>
                    Alle goedkeuren</button>
                </div>
                { verlofData.length == 0 ? <p className="w-full text-center">{infoText}</p> :
                verlofData.map((verlof) => (
                    <VerlofKaart
                        key={verlof.id}
                        verlofData={verlof}
                        userData={userData.filter(u => u.id == verlof.user_id.id)[0]}
                        verlofStatusData={verlofStatusData}
                        typeKaart={"manager"}
                        idsZichtbaar={idsZichtbaar}
                        verlofGoedkeuren={verlofGoedkeuren}
                        VerlofAfkeurenPopupWeergeven={VerlofAfkeurenPopupWeergeven}
                        multiGeselecteerdeKaartIds={multiGeselecteerdeKaartIds}
                        setMultiGeselecteerdeKaartIds={setMultiGeselecteerdeKaartIds}
                    />
                ))}
            </div>
    );
}

export default VerlofManagerOverzicht;
