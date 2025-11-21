import {useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import VerlofAanvraag from "../components/VerlofAanvraag.jsx"

import moment from 'moment';

function Verlofoverzicht() {
      let navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="h-[90%] w-full">
            <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {navigate("/voorpagina")}}>Home</button>
                <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={{}}>Verlof aanvragen</button>
            </div>
            
            <div className='flex h-[calc(100%-120px)] w-full divide-x divide-[#D0D0D0] px-[40px]'>
              <div className="h-full flex-1 px-[10px]">

                <VerlofAanvraag typeKaart={"geschiedenis"} id={1} naam={"test"} reden={"test"} startDatum={moment()} eindDatum={moment()} status={"goedgekeurd"}/>
              </div>
              <div className="h-full flex-1 px-[10px]">
                <VerlofAanvraag typeKaart={"openAanvragen"} id={2} naam={"test"} reden={"test"} startDatum={moment()} eindDatum={moment()} status={"goedgekeurd"}/>
              </div>
              <div className="h-full flex-1 px-[10px]">
                <VerlofAanvraag typeKaart={"manager"} id={2} naam={"test"} reden={"test"} startDatum={moment()} eindDatum={moment()} status={"goedgekeurd"}/>
              </div>
            </div>
      </div>
    </>
    
  );
}

export default Verlofoverzicht;
