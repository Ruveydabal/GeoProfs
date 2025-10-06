import moment from 'moment';

function MaandKalender({ maand, jaar}) {
    //https://ajshah7.medium.com/simple-calendar-using-reactjs-momentjs-861737c6cc8c

    //tijdelijke variabelen
    var managerRol = true;

    // var test =["naam 1", "naam 2", "naam 3", "naam 4", "naam 1", "naam 2", "naam 3", "naam 4"]
    var test = [];

    // checkt of een datum deel is van de geselecteerde maand. niet in maand = true
    const DagNietInMaand = (week, datum) => {
        if (week === 0 && datum > 10) {
            return true;
        }
        else if (week === 5 && datum < 10) {
            return true;
        }
        else if (week === 4 && datum < 10) {
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
            kalender.push(Array(7).fill(0).map(() => dag.add(1, "day").clone().format("DD")));
        }

        if (kalender.length > 0) {
            return (
                //map week arrays in kalender
                kalender.map((week, index) => (
                    <div key={week} className="flex w-full flex-1 overflow-auto">
                        {/* map dagen in week array */}
                        {week.map((dag) => (
                            <div key={dag} className={`overflow-auto flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#D0D0D0]' : 'bg-[#fff]'}`}>
                                <div className='flex flex-col w-full h-full overflow-auto'>
                                    <div className='flex w-full h-[40px]'>
                                        <div className='flex h-full w-[40px] justify-center items-center'>{dag}</div>
                                        <div className='flex h-full flex-1 justify-center items-center'>{/*fetch hier nummer aantal afwezig op een dag*/}</div>
                                    </div>
                                    {managerRol ? 
                                        <div className='w-full flex-1 overflow-auto'>
                                            {!DagNietInMaand(index, dag) ? 
                                                test.map((naam, index) => (
                                                    //fetch verlof data van deze datum
                                                    <div key={naam} className={` flex items-center w-full h-[30px] border-t-1 border-solid border-[#D0D0D0] ${index % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>{naam}</div>
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
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Maandag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Dinsdag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Woensdag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Donderdag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Vrijdag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Zaterdag</div>
                <div className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Zondag</div>
            </div>
            {DagenVanMaand(maand)}
        </div>
    );
}

export default MaandKalender


