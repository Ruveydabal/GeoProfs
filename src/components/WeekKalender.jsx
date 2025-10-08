import moment from 'moment';

function WeekKalender({weekDagen}) {

    var mensenAfwezig = ["naam 1", "naam 2", "naam 3", "naam 4", "naam 5", "naam 6", "naam 7", "naam 8"]
    // var mensenAfwezig = [];

  return (
    <div className="flex flex-row bg-[#ff0000] flex-col w-full h-full">
        {weekDagen.map((dag, index) => (
            //fetch hier verlof data van deze datum
            <div key={index} className='flex flex-col w-full h-full border-1 border-solid border-[#D0D0D0]'>
                <div className="flex w-full flex-col h-auto flex-1 justify-center items-center bg-[#fff] border-b-1 border-solid border-[#D0D0D0] capitalize">
                    <div className='flex h-auto w-full justify-center align-baseline text-[20px] text-center'>{moment(dag).format('D MMMM')}</div>
                    <div className='flex h-auto w-full justify-center align-top text-[15px] text-center'>{moment(dag).format('dddd')}</div>
                </div>
                {mensenAfwezig.length == 0 ? <></> : 
                    <div className='flex w-full h-[50px] justify-center items-center bg-[#fff] border-b-1 border-solid border-[#D0D0D0]'>{mensenAfwezig.length} Afwezig</div>
                }
                <div className="flex flex-col w-full h-full w-[calc(100%/7)] bg-[#fff] overflow-auto">
                {
                    mensenAfwezig.map((naam, index) => (
                        <div key={naam} className={`flex justify-center items-center w-full min-h-[40px] border-b-1 border-solid border-[#D0D0D0] capitalize ${index % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>{naam}</div>
                    ))
                }
                </div>
            </div>
        ))}
    </div>
  );
}

export default WeekKalender


