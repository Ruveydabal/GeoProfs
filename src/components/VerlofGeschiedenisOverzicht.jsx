import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';
import { documentId } from "firebase/firestore";

function VerlofGeschiedenisOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen, AfkeurenPopupWeergeven}) { 
        const [verlofData, setVerlofData] = useState([]);
        const [userData, setUserData] = useState([]);
        const [verlofStatusData, setVerlofStatusData] = useState([]);
        const [infoText, setInfoText] = useState("Aan het laden...");

        const momenteleUserId = localStorage.getItem("userId");

        useEffect(() => {
            FetchVerlofAanvraagData(setVerlofData, setInfoText, []).then();
            FetchUserData(setUserData, setInfoText, [documentId(), "==", "7"]).then();
            FetchVerlofStatusData(setVerlofStatusData, setInfoText).then();
        }, [herladen]);



        useEffect(() => {
            console.log(momenteleUserId)
            console.log(userData)
        }, [userData]);

    return (
            <div className="h-full flex-1 px-[10px] overflow-y-scroll ">
                { verlofData.length == 0 ? <p className="w-full text-center">{infoText}</p> :
                verlofData.map((verlof) => (
                    <div>{verlof.id}</div>
                    // <VerlofKaart
                    //     key={verlof.id}
                    //     verlofData={verlof}
                    //     userData={userData}
                    //     verlofStatusData={verlofStatusData}
                    //     typeKaart={"geschiedenis"}
                    //     AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                    // />
                ))}
            </div>
    );
}

export default VerlofGeschiedenisOverzicht;
