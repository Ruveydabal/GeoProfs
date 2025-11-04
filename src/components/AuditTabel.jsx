import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import moment from 'moment';

function AuditTabel() {

    const [auditTrailData, SetAuditTrailData] = useState([])

    useEffect(() => {
        const FetchLogs = async () => {
            //fetch Audits
            var auditTrails = await getDocs(
                query(collection(db, "auditTrail"))
            );
            if (auditTrails.empty) 
                throw new Error("1 niet gevonden.");

            const auditTrailsdata = auditTrails.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            SetAuditTrailData(auditTrailsdata);
        }
        FetchLogs()
    }, []);

    if(!auditTrailData || auditTrailData.length == 0){
        return("loading")
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
                    auditTrailData.map(audit => (
                        <tr key={audit.id} className={`h-[40px] ${audit.id % 2 == 0 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>
                            {console.log(audit)}
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">
                                    {audit?.actie.titel}
                                </p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">{audit?.tabel.tabelNaam}</p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">{audit?.uitgevoerdDoorUser.naam + " " + audit?.uitgevoerdDoorUser.achternaam}</p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">{
                                    audit?.uitgevoerdOp.tabel.tabelNaam == "user" ?
                                    audit?.uitgevoerdOp.naam :
                                    audit?.uitgevoerdOp.tabel.tabelNaam == "verlof" ?
                                    "verlof id: " + audit?.uitgevoerdOp.id :
                                    ""
                                    }</p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">
                                    {audit?.typeUitvoering == undefined ?
                                    "" : audit?.typeUitvoering.titel}
                                </p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p className="pl-[10px]">{moment(audit?.laatstGeupdate.toDate()).format("DD-MM-YYYY HH:mm:ss")}</p>
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


