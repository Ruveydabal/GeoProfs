import { db } from "../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from 'react';
import moment from 'moment';

function AuditTabel() {
    const [auditTrailData, SetAuditTrailData] = useState([])
    const [ladenOfFaalText, SetLadenOfFaalText] = useState("Aan het laden...")

    useEffect(() => {
    const FetchAudits = async () => {
        try {
        const auditTrailsSnap = await getDocs(
            query(collection(db, "auditTrail"), orderBy('laatstGeupdate', 'desc'))
        );

        if (auditTrailsSnap.empty) {
            SetLadenOfFaalText("Er zijn geen audits gevonden.");
            SetAuditTrailData([]);
            return;
        }

        const auditTrailsData = auditTrailsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        SetAuditTrailData(auditTrailsData);
        } catch (err) {
        console.error("Fout bij het ophalen van audits:", err);
        SetLadenOfFaalText("Er is iets misgegaan bij het ophalen van de audits.");
        }
    };

    FetchAudits();
    }, []);

    if(!auditTrailData || auditTrailData.length == 0){
        return(ladenOfFaalText)
    }
    return (
        <div className="flex w-full h-auto overflow-auto">
            <table className="h-auto border-collapse">
                <thead className="h-[120px]">
                    <tr>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Actie</p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Uitgevoerd op tabel</p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Uitgevoerd door</p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Uitgevoerd op</p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="flex justify-center items-center w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Type uitvoering</p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] bg-[#F4F4F4] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-center items-center h-[40px] border border-[#D0D0D0]">
                                <p>Datum en tijd</p>
                            </div>
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {
                        auditTrailData.map((audit, i) => (
                            <tr key={i} className={`h-[40px] ${i % 2 == 0 ? 'bg-[#DDE7F1]' : 'bg-[#fff]'}`}>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            audit?.actie && audit?.actie.titel ?
                                            audit?.actie.titel :
                                            ""
                                        }
                                    </p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            audit?.tabel && audit?.tabel.tabelNaam ?
                                            audit?.tabel.tabelNaam :
                                            ""
                                        }
                                    </p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            audit?.uitgevoerdDoorUser && audit?.uitgevoerdDoorUser.naam && audit?.uitgevoerdDoorUser.achternaam ?
                                            audit?.uitgevoerdDoorUser.naam + " " + audit?.uitgevoerdDoorUser.achternaam :
                                            ""
                                        }
                                    </p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            //check of veld bestaat
                                            !audit?.uitgevoerdOp ? 
                                            "" :

                                            //check of tabel user is, dan gebruik naam
                                            audit?.uitgevoerdOp.tabel.tabelNaam == "user" ?
                                            audit?.uitgevoerdOp.naam :

                                            //anders gebruik tabel en id
                                            audit?.uitgevoerdOp.tabel.tabelNaam + " id: " + audit?.uitgevoerdOp.id
                                        }
                                    </p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            !audit?.typeUitvoering ?
                                            "" : audit?.typeUitvoering.titel
                                        }
                                    </p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p className="pl-[10px]">
                                        {
                                            !audit?.laatstGeupdate ?
                                            "" :                                    
                                            moment(audit?.laatstGeupdate.toDate()).format("DD-MM-YYYY HH:mm:ss")
                                        }
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AuditTabel


