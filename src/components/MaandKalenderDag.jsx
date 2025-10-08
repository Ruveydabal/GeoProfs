import moment from 'moment';
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function MaandKalenderDag({dag, index, managerRol, DagNietInMaand, DagIsWeekend}) {

    var mensenAfwezig = fetch(dag);

    function fetchVerlofData(dag) {
        var data = [];
        const seededRandom = (seed) => (Math.sin(seed) * 10000) % 1;
        // Function to generate random number from a Moment date
        const randomNumberFromDate = (dag) => {
            const seed = moment(dag).unix(); // convert to Unix timestamp
            return Math.floor(seededRandom(seed) * 100) + 1; // 1-100
        };
        const number = randomNumberFromDate(dag);

        //fetch hier verlof data van deze datum
        if(number % 2 == 0){
            data = ["naam 1", "naam 2", "naam 3", "naam 4", "naam 5", "naam 6", "naam 7", "naam 8"]
        }
        return(data)
    }

    const fetch = async (dag) => {
        try {
            var timestamp = moment(dag).unix();

            const verlof = await getDocs(
                query(collection(db, "Verlof"), where("startdate", "<=", timestamp), where("enddate", ">=", timestamp))
            );

            console.log(verlof)
        }
        catch {
        console.error("nope");
        }
    }




















  return (
    <div key={index} className={`overflow-auto flex h-full w-[calc(100%/7)] border-x-1 border-b-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#E5E5E5]' : 'bg-[#fff]'} ${DagIsWeekend(dag) ? 'text-[#DF121B]' : ''} `}>
        <div className='flex flex-col w-full h-full overflow-auto'>
            <div className='flex w-full max-h-[40px] h-[40%]'>
                <div className='flex h-full w-[40px] justify-center items-center'>{moment(dag).format("D")}</div>
                <div className='flex h-full flex-1 justify-center items-center'>{DagNietInMaand(index, dag) ? '' : mensenAfwezig.length == 0 ? '' : mensenAfwezig.length + ' Afwezig'}</div>
            </div>
            {managerRol ? 
                <div className='w-full flex-1 overflow-auto'>
                    {!DagNietInMaand(index, dag) ? 
                        mensenAfwezig.map((naam, index) => (
                            <div key={naam} className={`capitalize flex items-center justify-center w-full h-[25px] border-t-1 border-solid border-[#D0D0D0] ${index % 2 ? 'bg-[#fff]' : 'bg-[#DDE7F1]'}`}>{naam}</div>
                        ))
                        : <></>
                    }
                </div> : <></>
            }
        </div>
    </div>
  );
}

export default MaandKalenderDag


