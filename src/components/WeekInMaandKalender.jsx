import moment from 'moment';

function WeekInMaandKalender({WeekNummer, datum}) {
    var maand = moment(datum).month();
    
    const startOfWeek = moment().year(moment(datum).year()).isoWeek(WeekNummer).startOf('isoWeek');

    const dagen = [];
    for (let i = 0; i < 7; i++) {
        dagen.push(startOfWeek.clone().add(i, 'days'));
    }

    function IsDagInGeselecteerdeMaand(dag){
        if(moment(dag).month() === maand){
            return(true)
        }
        return(false)

    }

  return (
    <div className="flex h-[20%] w-full">
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[0]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[0].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[1]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[1].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[2]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[2].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[3]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[3].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[4]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[4].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[5]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[5].format("DD")}</div>
        <div className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${IsDagInGeselecteerdeMaand(dagen[6]) ? 'bg-[#fff]' : 'bg-[#D0D0D0]'}`}>{dagen[6].format("DD")}</div>
    </div>
  );
}

export default WeekInMaandKalender


