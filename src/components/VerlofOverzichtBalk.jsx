import VerlofKaart from "./VerlofKaart.jsx";

function VerlofOverzichtBalk(verlofData) {  
    return (
        <div className="h-full flex-1 px-[10px] overflow-y-scroll">
            {verlofData.map((verlof) => (
                <VerlofKaart key={verlof.id} verlofData={verlof} typeKaart="geschiedenis" userData={userData.filter(x => x.user_id.id === momenteleUserId)[0]}/>
            ))}
        </div>
    );
}

export default VerlofOverzichtBalk;
