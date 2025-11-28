import { useState, useEffect } from 'react';
import VerlofKaart from "./VerlofKaart.jsx";

function VerlofOverzichtBalk({verlofData, userData, typeKaart, verlofStatusData, AfkeurenPopupWeergeven}) { 
    const [leegText, setLeegText] = useState("");

    useEffect(() => {
    const messages = {
        geschiedenis: "U heeft geen verleden verlof aanvragen.",
        openAanvragen: "U heeft geen open verlof aanvragen.",
        manager: "U heeft geen verlof aanvragen voor u op dit moment.",
    };

    setLeegText(messages[typeKaart] || "");
    }, [typeKaart]);

    return (
            <div className="h-full flex-1 px-[10px] overflow-y-scroll ">
                { verlofData.length == 0 ? <p className="w-full text-center">{leegText}</p> :
                verlofData.map((verlof) => (
                    <VerlofKaart
                        key={verlof.id}
                        verlofData={verlof}
                        typeKaart={typeKaart}
                        userData={userData.filter(x => x.id == verlof.user_id?.id)[0]}
                        verlofStatusData={verlofStatusData}
                        AfkeurenPopupWeergeven={AfkeurenPopupWeergeven}
                    />
                ))}
            </div>
    );
}

export default VerlofOverzichtBalk;
