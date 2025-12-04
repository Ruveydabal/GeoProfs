import {useNavigate} from "react-router-dom";

import Header from "../components/Header"
import AuditTabel from "../components/AuditTabel"

function AuditOverzicht() {  
    let navigate = useNavigate();

    return (
        <>
        <div className="w-full h-full pl-[50px]">
            <div className='h-[120px] w-full flex items-center'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {navigate("/voorpagina")}}>Home</button>
            </div>
            <div className="w-full h-[calc(100%-120px)]">
                <AuditTabel/>
            </div>
        </div>
        </>
    );
}

export default AuditOverzicht;
