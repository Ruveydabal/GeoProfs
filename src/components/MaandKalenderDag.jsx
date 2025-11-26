import React, { useMemo } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';

function MaandKalenderDag({dag, index, rol, DagNietInMaand, DagIsWeekend, aanvragen}) {
    
    const extractUserId = (verlofId) => {
        if (!verlofId) return "Onbekend";
        const parts = verlofId.split("_");
        return parts.length >= 3 ? parts[1] : "Onbekend";
    };

    const mensenAfwezig = useMemo(() => {
        if (!aanvragen) return [];
        return aanvragen.filter(a => {
            if (!a.startDatum || !a.eindDatum) return false;
            return moment(dag).isBetween(moment(a.startDatum), moment(a.eindDatum), 'day', '[]');
        });
    }, [aanvragen, dag]);

  return (
    <div key={index} className={`overflow-auto flex h-full w-[calc(100%/7)] border-x-1 border-b-1 border-solid border-[#D0D0D0] ${DagNietInMaand(index, dag) ? 'bg-[#E5E5E5]' : 'bg-[#fff]'} ${DagIsWeekend(dag) ? 'text-[#DF121B]' : ''} `}>
        <div className='flex flex-col w-full h-full overflow-auto'>
            <div className='flex w-full max-h-[40px] h-[40%]'>
                <div className='flex h-full w-[40px] justify-center items-center'>{moment(dag).format("D")}</div>
                <div className='flex h-full flex-1 justify-center items-center'>{DagNietInMaand(index, dag) ? '' : mensenAfwezig.length == 0 ? '' : mensenAfwezig.length + ' Afwezig'}</div>
            </div>
            {rol == "manager" || rol == "ceo" || rol == "office manager" ? 
                <div className='w-full flex-1 overflow-auto'>
                   {!DagNietInMaand(index, dag) &&
                        mensenAfwezig.map((aanvraag) => (
                            <div key={aanvraag.id}>
                                {aanvraag.userNaam} 
                            </div>
                        ))
                    }
                </div> : <></>
            }
        </div>
    </div>
  );
}

export default MaandKalenderDag


