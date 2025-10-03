import moment from 'moment';

function MaandKalender({ maand, jaar}) {
    //https://ajshah7.medium.com/simple-calendar-using-reactjs-momentjs-861737c6cc8c

    //tijdelijke variabelen
    var managerRol = true;

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
                    <tr key={week} className="flex w-full flex-1">
                        {/* map dagen in week array */}
                        {week.map((dag) => (
                            <td key={dag} className={`flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#D0D0D0]' : 'bg-[#fff]'}`}>
                                <div className='w-full h-full'>
                                    <div className='flex w-full h-[40px]'>
                                        <div className='flex h-full w-[40px] justify-center items-center'>{dag}</div>
                                        <div className='flex h-full flex-1 justify-center items-center'>{/*fetch hier nummer aantal afwezig op een dag*/}</div>
                                    </div>
                                    {managerRol ? 
                                        <div className='w-full'></div>
                                        :
                                        <></>
                                    }
                                </div>
        </td>))}</tr>)))}
    }

    return (
        <table className="flex w-full h-full flex-col">
            <tbody className='flex w-full h-full flex-col'>
                <tr className='flex w-full h-[50px]'>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Maandag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Dinsdag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Woensdag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Donderdag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Vrijdag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Zaterdag</th>
                    <th className="flex h-full w-[calc(100%/7)] border-1 border-solid border-[#D0D0D0] justify-center items-center bg-[#fff] text-[20px] font-normal">Zondag</th>
                </tr>
                {DagenVanMaand(maand)}
            </tbody>
        </table>
    );
}

export default MaandKalender


