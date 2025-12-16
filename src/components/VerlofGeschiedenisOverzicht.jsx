import VerlofKaart from "./VerlofKaart.jsx";
import { useState, useEffect } from 'react';

function VerlofGeschiedenisOverzicht({FetchVerlofAanvraagData, FetchUserData, FetchVerlofStatusData, herladen, AfkeurenPopupWeergeven}) { 
        const [verlofData, setVerlofData] = useState([]);
        const [userData, setUserData] = useState([]);
        const [verlofStatusData, setVerlofStatusData] = useState([]);

        const momenteleUserId = localStorage.getItem("userId");

        useEffect(() => {
            FetchVerlofAanvraagData().then(data => setVerlofData(data));
            FetchUserData().then(data => setUserData(data));
            FetchVerlofStatusData().then(data => setVerlofStatusData(data));
        }, [herladen]);

    return (
            <div className="h-full flex-1 px-[10px] overflow-y-scroll ">
                { verlofData.length == 0 ? <p className="w-full text-center">"U heeft geen verleden verlof aanvragen."</p> :
                verlofData.map((verlof) => (
                    <VerlofKaart
                        key={verlof.id}
                        verlofData={verlof}
                        userData={userData}
                        verlofStatusData={verlofStatusData}
                        typeKaart={"geschiedenis"}
                        AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                    />
                ))}
            </div>
    );
}

export default VerlofGeschiedenisOverzicht;
