import moment from 'moment';
import Checkbox from './basis-components/CheckBox';
import { useState } from 'react';

function VerlofAanvraag({verlofData, typeKaart, userData, verlofStatusData, AfkeurenPopupWeergeven}) {
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
                    typeKaart == "openAanvragen" && verlofData.statusVerlof_id.id == 3 ? 
                    <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer'>Annuleer Verzoek</button>
                    
                    
                    :

                    typeKaart == "manager" && (verlofData.statusVerlof_id.id == 3 || verlofData.statusVerlof_id.id == 4) ? 
                    <button className='h-[40px] w-[100px] bg-[#DF121B] text-white rounded-[15px] cursor-pointer' onClick={() => AfkeurenPopupWeergeven(verlofData)}>Afkeuren</button> :

                    <p className='mb-[5px] text-[18px]'>{verlofStatusData.filter(x => x.id == verlofData.statusVerlof_id?.id)[0].omschrijving}</p>
                }
                {
                     verlofData.statusVerlof_id.id == 2 ? <p>Reden van afkeur: {verlofData.afkeurReden}</p> : <></>
                }
            </div>
        </div>
    );
}
export default VerlofAanvraag;
