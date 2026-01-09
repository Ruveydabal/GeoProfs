import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, orderBy, doc } from "firebase/firestore";

function VerlofManagerOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen, VerlofAfkeurenPopupWeergeven}) { 
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [infoText, setInfoText] = useState("Aan het laden...");

    const momenteleUserId = localStorage.getItem("userId");

    useEffect(() => {
        const userQ = query(collection(db, "user"));
        FetchUserData(setUserData, setInfoText, userQ);

        const verlofStatusQ = query(collection(db, "statusVerlof"));
        FetchVerlofStatusData(setVerlofStatusData, setInfoText, verlofStatusQ);
    }, [herladen, FetchUserData, FetchVerlofAanvraagData, FetchVerlofStatusData]);

    useEffect(() => {
        if (!userData || userData.length === 0) return;

        const usersInAfdeling = userData
            .filter(u => u.afdeling === userData.filter(x => x.id === momenteleUserId)[0].afdeling)
            .map(u => doc(db, "user", u.id));

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
                { verlofData.length == 0 ? <p className="w-full text-center">{infoText}</p> :
                verlofData.map((verlof) => (
                    <VerlofKaart
                        key={verlof.id}
                        verlofData={verlof}
                        userData={userData.filter(u => u.id == verlof.user_id.id)[0]}
                        verlofStatusData={verlofStatusData}
                        typeKaart={"manager"}
                        VerlofAfkeurenPopupWeergeven={VerlofAfkeurenPopupWeergeven}
                    />
                ))}
            </div>
    );
}

export default VerlofManagerOverzicht;
