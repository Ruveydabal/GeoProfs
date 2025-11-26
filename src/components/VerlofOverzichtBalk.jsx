import VerlofKaart from "./VerlofKaart.jsx";

function VerlofOverzichtBalk({verlofData, userData, typeKaart, verlofStatusData}) { 
    return (
        <div className="h-full flex-1 px-[10px] overflow-y-scroll">
            {verlofData.map((verlof) => (
                <VerlofKaart key={verlof.id} verlofData={verlof} typeKaart={typeKaart} userData={userData.filter(x => x.id == verlof.user_id?.id)[0]} verlofStatusData={verlofStatusData}/>
            ))}
        </div>
    );
}

export default VerlofOverzichtBalk;
