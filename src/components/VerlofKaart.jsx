import moment from 'moment';
import Checkbox from './basis-components/CheckBox';
import { useState } from 'react';

function VerlofAanvraag({verlofData, typeKaart, userData}) {
    const [multiselectGechecked, SetMultiselectGechecked] = useState(false)

    if (!verlofData || !typeKaart){
        "kaart kon niet laden."
        return
    }

    return (
        <div className="w-full h-auto border-1 border-solid border-[#D0D0D0] p-[20px] divide-y divide-[#D0D0D0] mb-[20px]">
            <div className="w-full h-auto pb-[20px]">
                <p className='text-xl'>{`${userData.voornaam} ${userData.achternaam}`}</p>
                <p className='my-[5px]'>{verlofData.omschrijvingRedenVerlof}</p>
                <p>{`Van ${moment(verlofData.startDatum.toDate()).format("DD-MM-YYYY")}, tot ${moment(verlofData.eindDatum.toDate()).format("DD-MM-YYYY")}`}</p>
            </div>
            <div className="w-full h-auto pt-[20px]">
                {
                    typeKaart == "geschiedenis" ?
                        <p>{status}</p> :
                    typeKaart == "openAanvragen" ?
                        <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {}}>Aanvraag annuleren</button> :
                    typeKaart == "manager" ? 
                        <div className='flex w-full justify-between'>
                            <div className='w-auto'>
                                <button className='h-[40px] max-w-[90%] w-[120px] bg-[#00BC00] text-white rounded-[15px] cursor-pointer mr-[20px]' onClick={() => {}}>Goedkeuren</button>
                                <button className='h-[40px] max-w-[90%] w-[120px] bg-[#DF121B] text-white rounded-[15px] cursor-pointer' onClick={() => {}}>Afkeuren</button>
                            </div>

                            <Checkbox id={id} onChange={(e) => SetMultiselectGechecked(e.target.checked)}/>
                        </div> : 
                    "kaart kon niet laden"
                    
                }
            </div>
        </div>
    );
}
export default VerlofAanvraag;
