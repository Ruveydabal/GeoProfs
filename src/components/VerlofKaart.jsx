import moment from 'moment';
import Checkbox from './basis-components/CheckBox';
import { useState } from 'react';

function VerlofAanvraag({verlofData, typeKaart, userData, verlofStatusData}) {
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
                    <p>{verlofStatusData.filter(x => x.id == verlofData.statusVerlof_id?.id)[0].omschrijving}</p>
                }
            </div>
        </div>
    );
}
export default VerlofAanvraag;
