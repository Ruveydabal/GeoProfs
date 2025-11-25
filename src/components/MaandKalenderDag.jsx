import moment from 'moment';

function MaandKalenderDag({dag, index, rol, DagNietInMaand, DagIsWeekend, aanvragen}) {
    //tijdelijke variabelen
    // var mensenAfwezig = ["naam 1", "naam 2", "naam 3", "naam 4", "naam 5", "naam 6", "naam 7", "naam 8"]
    const mensenAfwezig = aanvragen
        ? aanvragen.filter(a => {
            if (!a.startDatum || !a.eindDatum) return false;
            // moment(dag) is tussen start en eind, inclusief beide dagen
            return moment(dag).isBetween(moment(a.startDatum), moment(a.eindDatum), 'day', '[]');
            })
        : [];

    // functie om gebruikers op te halen
    const fetchUser = async (userId) => {
        if (usersCache[userId]) return usersCache[userId]; // al in cache
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            setUsersCache(prev => ({ ...prev, [userId]: userData }));
            return userData;
        }
        return null;
    };

    //fetch hier verlof data van deze datum

  return (
    <div key={index} className={`overflow-auto flex h-full w-[calc(100%/7)] border-x-1 border-b-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#E5E5E5]' : 'bg-[#fff]'} ${DagIsWeekend(dag) ? 'text-[#DF121B]' : ''} `}>
        <div className='flex flex-col w-full h-full overflow-auto'>
            <div className='flex w-full max-h-[40px] h-[40%]'>
                <div className='flex h-full w-[40px] justify-center items-center'>{moment(dag).format("D")}</div>
                <div className='flex h-full flex-1 justify-center items-center'>{DagNietInMaand(index, dag) ? '' : mensenAfwezig.length == 0 ? '' : mensenAfwezig.length + ' Afwezig'}</div>
            </div>
            {rol == "manager" || rol == "ceo" || rol == "office manager" ? 
                <div className='w-full flex-1 overflow-auto'>
                   {!DagNietInMaand(index, dag) && mensenAfwezig.length > 0 &&
                            mensenAfwezig.map((aanvraag, idx) => (
                            <div key={aanvraag.id ?? idx} className={`capitalize flex items-center justify-center w-full h-[25px] border-t-1 border-solid border-[#D0D0D0] ${idx % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>
                                    <UserName userId={aanvraag.user_id} fetchUser={fetchUser} />
                                </div>
                        ))
                    }
                </div> : <></>
            }
        </div>
    </div>
  );
}

export default MaandKalenderDag


