import moment from 'moment';
import Checkbox from './basis-components/CheckBox';
import { useState } from 'react';

function VerlofAanvraag({typeKaart, id, naam, reden, startDatum, eindDatum, status}) {
        const [multiselectGechecked, SetMultiselectGechecked] = useState(false)

  return (
    <div className="w-full h-auto border-1 border-solid border-[#D0D0D0] p-[20px] divide-y divide-[#D0D0D0]">
        <div className="w-full h-auto pb-[20px]">
            <p className='text-xl'>{naam}</p>
            <p className='my-[5px]'>{reden}</p>
            <p>{`Van ${moment(startDatum).format("DD-MM-YYYY")}, tot ${moment(eindDatum).format("DD-MM-YYYY")}`}</p>
        </div>
        <div className="w-full h-auto pt-[20px]">
            {
                typeKaart == "geschiedenis" ?
                    <p>{status}</p> :
                typeKaart == "openAanvragen" ?
                    <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {}}>Aanvraag annuleren</button> :
                typeKaart == "manager" ? 
                    <div className=''>
                        <>
                            <button className='h-[40px] max-w-[90%] w-[120px] bg-[#00BC00] text-white rounded-[15px] cursor-pointer mr-[20px]' onClick={() => {}}>Goedkeuren</button>
                            <button className='h-[40px] max-w-[90%] w-[120px] bg-[#DF121B] text-white rounded-[15px] cursor-pointer' onClick={() => {}}>Afkeuren</button>
                        </>

                        <Checkbox id={id} onChange={(e) => SetMultiselectGechecked(e.target.checked)}/>

                        
                        {/* <input type="checkbox" className='appearance-none cursor-pointer w-[20px] h-[20px] border-1 border-solid border-[#D0D0D0] rounded-[5px]' /> */}
                    </div> : 
                "kaart kon niet laden"
                
            }
        </div>
    </div>
  );
}
export default VerlofAanvraag;
