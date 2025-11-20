import {useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";

function Verlofoverzicht() {
      let navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="h-[90%] w-full px-[50px]">
            <div className='h-[120px] w-full flex items-center justify-between'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {navigate("/voorpagina")}}>Home</button>
                <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={{}}>Verlof aanvragen</button>
            </div>
            <div className='flex h-[calc(100%-120px)] w-full bg-[#ff0000]'>

            </div>
      </div>
    </>
    
  );
}

export default Verlofoverzicht;
