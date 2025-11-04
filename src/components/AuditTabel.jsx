import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

function AuditTabel() {

    const [auditTrailData, SetAuditTrailData] = useState([])
    const [auditActionsData, SetAuditActionsData] = useState([])

    useEffect(() => {
        const FetchLogs = async () => {
            //fetch Audits
            var auditTrails = await getDocs(
                query(collection(db, "auditTrail"))
            );
            if (auditTrails.empty) 
                throw new Error("1 niet gevonden.");

            const data = auditTrails.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            SetAuditTrailData(data);

            //fetchActions
            var auditActions = await getDocs(
                query(collection(db, "auditActie"))
            );
            if (auditActions.empty) 
                throw new Error("2 niet gevonden.");

            SetAuditActionsData(auditActions);



        }
        FetchLogs()
    }, []);



    console.log(auditTrailData)

  return (
    <div className="flex w-full h-auto overflow-auto">
        {
            auditTrailData.length == 0 ?
            <div className="flex w-full h-full justify-center items-center border-1 border-solid border-[#D0D0D0]">
                <p>no Logs Found</p>
            </div>
            : 
            <table className="h-auto border-collapse">
                <thead className="h-[120px]">
                    <tr>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="h-[40px] border border-[#D0D0D0]">
                                <p></p>
                            </div>
                        </td>
                        <td className="min-w-[300px] h-full">
                            <div className="h-[80px]">
                                <input
                                    className="w-[250px] h-[40px] rounded-[15px] border border-[#D0D0D0]"
                                    type="text"
                                />
                            </div>
                            <div className="h-[40px] border border-[#D0D0D0]">
                                <p></p>
                            </div>
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {
                        auditTrailData.map(audit => (
                            <tr className={`h-[40px] ${audit.id % 2 == 0 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p></p>
                                </td>
                                <td className="min-w-[300px] border border-[#D0D0D0]">
                                    <p></p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
    </div>
  );
}

export default AuditTabel


