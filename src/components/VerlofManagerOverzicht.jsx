import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, orderBy, doc } from "firebase/firestore";

function VerlofManagerOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen, AfkeurenPopupWeergeven}) { 
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [infoText, setInfoText] = useState("Aan het laden...");

    const momenteleUserId = localStorage.getItem("userId");

    useEffect(() => {
        let userQ = collection(db, "user");
        userQ = query(userQ);
        FetchUserData(setUserData, setInfoText, userQ);

        let verlofStatusQ = collection(db, "statusVerlof");
        verlofStatusQ = query(verlofStatusQ);
        FetchVerlofStatusData(setVerlofStatusData, setInfoText, verlofStatusQ);

        let verlofQ = collection(db, "verlof");
        verlofQ = query(verlofQ, 
            where("user_id", "!=", doc(db, "user", momenteleUserId)),
            where("statusVerlof_id", "in", [doc(db, "statusVerlof", "3"), doc(db, "statusVerlof", "4")]),
            orderBy('createdAt', 'desc')
        );
        FetchVerlofAanvraagData(setVerlofData, setInfoText, verlofQ, "U heeft geen verlof aanvragen voor u op dit moment.");
    }, [herladen]);

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
                        AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                    />
                ))}
            </div>
    );
}

export default VerlofManagerOverzicht;
