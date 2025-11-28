import { useState } from 'react';

function VerlofAfkeurenPopup({SetPopupWeergeven, verlofData}) {

  const [afkeurReden, setAfkeurReden] = useState(null); 

  function verlofAfkeurOpsturen(){
    console.log(afkeurReden)
    //do stuff
    SetPopupWeergeven(false);
  }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p>{verlofData.id}</p>
                <textarea name="" id=""
                  value={afkeurReden}
                  onChange={e => {setAfkeurReden(e.target.value), console.log(afkeurReden)}}
                ></textarea>
                
            </div>
        </div>
    </div>
  );
}

export default VerlofAfkeurenPopup


