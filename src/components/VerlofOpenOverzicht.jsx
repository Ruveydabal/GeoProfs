import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, documentId, doc } from "firebase/firestore";

function VerlofOpenOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen}) { 
    const [verlofData, setVerlofData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [verlofStatusData, setVerlofStatusData] = useState([]);
    const [infoText, setInfoText] = useState("Aan het laden...");

    const momenteleUserId = localStorage.getItem("userId");

    useEffect(() => {
        //user query maken
        let userQ = collection(db, "user");
        userQ = query(userQ, where(documentId(), "==", momenteleUserId));
        //data fetchen
        FetchUserData(setUserData, setInfoText, userQ).then();

        //VerlofStatus query maken
        let verlofStatusQ = collection(db, "statusVerlof");
        verlofStatusQ = query(verlofStatusQ);
        //data fetchen
        FetchVerlofStatusData(setVerlofStatusData, setInfoText, verlofStatusQ).then();

        //verlof query maken
        let verlofQ = collection(db, "verlof");
        verlofQ = query(verlofQ,
            where("user_id", "==", doc(db, "user", momenteleUserId)),
            where("statusVerlof_id", "in", [doc(db, "statusVerlof", "3"), doc(db, "statusVerlof", "4")])
        );
        //data fetchen
        FetchVerlofAanvraagData(setVerlofData, setInfoText, verlofQ, "U heeft geen open verlof aanvragen.").then();
    }, [herladen, FetchUserData, FetchVerlofAanvraagData, FetchVerlofStatusData, momenteleUserId]);

    return (
            <div className="h-full flex-1 px-[10px] overflow-y-scroll ">
                { verlofData.length == 0 ? <p className="w-full text-center">{infoText}</p> :
                verlofData.map((verlof) => (
                    <VerlofKaart
                        key={verlof.id}
                        verlofData={verlof}
                        userData={userData[0]}
                        verlofStatusData={verlofStatusData}
                        typeKaart={"openAanvragen"}
                    />
                ))}
            </div>
    );
}

export default VerlofOpenOverzicht;
