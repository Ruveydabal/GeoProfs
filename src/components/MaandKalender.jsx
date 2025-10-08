import moment from 'moment';
import MaandKalenderDag from './MaandKalenderDag';


function MaandKalender({weekDagen, maand, jaar}) {
    //tijdelijke variabelen
    var managerRol = true;

    // checkt of een datum in het weekend valt. weekend = true
    const DagIsWeekend = (datum) => {
        if(moment(datum).day() == 6){
            return true;
        }
        if(moment(datum).day() == 0){
            return true;
        }
        return false;
    }

    // checkt of een datum deel is van de geselecteerde maand. niet in maand = true
    const DagNietInMaand = (week, datum) => {
        if(DagIsWeekend(datum)){
            return true;
        }
        if (week === 0 && moment(datum).format("D") > 10) {
            return true;
        }
        else if (week === 5 && moment(datum).format("D") < 10) {
            return true;
        }
        else if (week === 4 && moment(datum).format("D") < 10) {
            return true;
        }
        else {
            return false;
        }
    };

    //zet en print een array van meerdere 'week' arrays,  met daarin alle dagen van die week.
    const DagenVanMaand = (maand) => {
        var kalender = [];
        const startDatum = moment([jaar, maand]).clone().startOf("month").startOf("isoweek");
        const einddatum = moment([jaar, maand]).clone().endOf("month");
        const dag = startDatum.clone().subtract(1, "day");

        //zet een array van een week in de 'kalender' array
        while (dag.isBefore(einddatum, "day")) {
            kalender.push(Array(7).fill(0).map(() => dag.add(1, "day").clone()));
        }

        if (kalender.length > 0) {
            return (
                //map week arrays in kalender
                kalender.map((week, index) => (
                    <div key={week} className="flex w-full flex-1 overflow-auto">
                        {/* map dagen in week array */}
                        {week.map((dag) => (
                            <MaandKalenderDag key={dag} dag={dag} index={index} managerRol={managerRol} DagNietInMaand={DagNietInMaand} DagIsWeekend={DagIsWeekend}/>
                        ))}
                    </div>
                ))
            )
        }
    }

    return (
        <div className='flex w-full h-full flex-col overflow-auto'>
            <div className='flex w-full h-[50px]'>
                {weekDagen.map((dag, index) => (
                    <div key={index} className="capitalize flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">{moment(dag).format('dddd')}</div>              
                ))}
            </div>
            {DagenVanMaand(maand)}
        </div>
    );
}

export default MaandKalender


