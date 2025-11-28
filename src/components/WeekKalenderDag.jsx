import moment from 'moment';

//Fiter aanvragen op juiste dag
function WeekKalenderDag({dag, index, rol, DagIsWeekend, aanvragen }) {
    const mensenAfwezig = (aanvragen ?? [])
    .filter((a) => {
        if (!a.startDatum || !a.eindDatum) return false;

        const d = moment(dag).startOf("day");
        const start = moment(a.startDatum).startOf("day");
        const eind = moment(a.eindDatum).startOf("day");
        //Check zit dag tussen start en eid datum
        return d.isSameOrAfter(start) && d.isSameOrBefore(eind);
    })
    .map(a => a.gebruikerVoornaam);

  return (
    <div key={index} className='flex flex-col w-full h-full border-1 border-solid border-[#D0D0D0]'>
        <div className="flex w-full flex-col h-auto flex-1 justify-center items-center bg-[#fff] border-b-1 border-solid border-[#D0D0D0] capitalize">
            <div className='flex h-auto w-full justify-center align-baseline text-center text-[2.5vh]'>{moment(dag).format('D MMMM')}</div>
            <div className={`flex h-auto w-full justify-center align-top text-center text-[2vh] ${DagIsWeekend(dag) ? 'text-[#DF121B]' : ''}`}>{moment(dag).format('dddd')}</div>
        </div>
        {!DagIsWeekend(dag) && mensenAfwezig.length > 0 && (
            <div className='flex w-full h-[50px] justify-center items-center bg-[#fff] border-b-1 border-solid border-[#D0D0D0]'>
            {mensenAfwezig.length} Afwezig
            </div>
        )}
        <div className={`flex flex-col w-full h-full w-[calc(100%/7)] overflow-auto ${DagIsWeekend(dag) ? 'bg-[#E5E5E5]' : 'bg-[#fff]'}`}>
         {(!DagIsWeekend(dag) && (rol === "manager" || rol === "ceo" || rol === "office manager")) &&
          mensenAfwezig.map((naam, i) => (
            <div 
              key={i} 
              className={`flex justify-center items-center w-full min-h-[40px] border-b-1 border-solid border-[#D0D0D0] capitalize ${
                i % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'
              }`}
            >
              {naam}
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default WeekKalenderDag;


