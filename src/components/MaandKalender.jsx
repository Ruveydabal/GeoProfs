import moment from 'moment';

function MaandKalender({weekDagen, maand, jaar}) {
    //https://ajshah7.medium.com/simple-calendar-using-reactjs-momentjs-861737c6cc8c

    //tijdelijke variabelen
    var managerRol = true;

    var mensenAfwezig = ["naam 1", "naam 2", "naam 3", "naam 4", "naam 5", "naam 6", "naam 7", "naam 8"]
    // var mensenAfwezig = [];

    // checkt of een datum deel is van de geselecteerde maand. niet in maand = true
    const DagIsWeekend = (datum) => {
        if(moment(datum).day() == 6){
            return true;
        }
        if(moment(datum).day() == 0){
            return true;
        }
        return false;
    }


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
                            //fetch verlof data van deze datum
                            <div key={dag} className={`overflow-auto flex h-full w-[calc(100%/7)] border-x-1 border-b-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#E5E5E5]' : 'bg-[#fff]'} ${DagIsWeekend(dag) ? 'text-[#DF121B]' : ''} `}>
                                <div className='flex flex-col w-full h-full overflow-auto'>
                                    <div className='flex w-full max-h-[40px] h-[40%]'>
                                        <div className='flex h-full w-[40px] justify-center items-center'>{moment(dag).format("D")}</div>
                                        <div className='flex h-full flex-1 justify-center items-center'>{DagNietInMaand(index, dag) ? '' : mensenAfwezig.length == 0 ? '' : mensenAfwezig.length + ' Afwezig'}</div>
                                    </div>
                                    {managerRol ? 
                                        <div className='w-full flex-1 overflow-auto '>
                                            {!DagNietInMaand(index, dag) ? 
                                                mensenAfwezig.map((naam, index) => (
                                                    <div key={naam} className={`capitalize flex items-center w-full h-[30px] border-t-1 border-solid border-[#D0D0D0] ${index % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>{naam}</div>
                                                ))
                                                : <></>
                                            }
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
        </div>))}</div>)))
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


