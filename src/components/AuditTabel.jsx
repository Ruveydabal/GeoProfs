import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

function AuditTabel() {

    const [auditTrailData, SetAuditTrailData] = useState([])
    const [auditActionData, SetAuditActionData] = useState([])
    const [usersData, SetUserData] = useState([])

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

            //fetchActions
            var auditActions = await getDocs(
                query(collection(db, "auditActie"))
            );
            if (auditActions.empty) 
                throw new Error("2 niet gevonden.");

            const auditActionsdata = auditActions.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            SetAuditActionData(auditActionsdata);

            //fetch users
            var users = await getDocs(
                query(collection(db, "user"))
            );
            if (users.empty) 
                throw new Error("3 niet gevonden.");

            const usersData = users.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            SetUserData(usersData);
        }
        FetchLogs()
    }, []);

    function PakVoornaamEnAchternaam(audit){
        var user = usersData.filter(x => x.id == audit.uitgevoerdDoorUserId.id)

        console.log(usersData)
        return (user[0]?.naam + " " + user[0]?.achternaam)
    }

    if(!auditTrailData || !auditActionData || !usersData){
        return("loading")
    }
    if(usersData.length == 0){
        return ("users not found")
    }
  return (
    <div className="flex w-full h-auto overflow-auto">
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
                                <p>
                                    {PakVoornaamEnAchternaam(audit)}
                                </p>
                            </td>
                            <td className="min-w-[300px] border border-[#D0D0D0]">
                                <p></p>
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


