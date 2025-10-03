import moment from 'moment';

function MaandKalender({datum}) {

    


  return (
    <div className="flex bg-[#ff0000] flex-col w-full h-full">
        <div className="flex h-[50px] w-full">
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Maandag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Dinsdag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Woendag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Donderdag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Vrijdag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Zaterdag</div>
            <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px]">Zondag</div>
        </div>
        <div className="flex flex-1 w-full flex-col">
            {/* <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[0]}/>
            <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[1]}/>
            <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[2]}/>
            <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[3]}/>
            {weekNummersInMaand.length == 5 ? <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[4]}/> : <></>}
            {weekNummersInMaand.length == 6 ? <WeekInMaandKalender datum={datum} WeekNummer={weekNummersInMaand[5]}/> : <></>} */}
        </div>
    </div>
  );
}

export default MaandKalender


