import { useState } from 'react';

function WachtwoordVeranderenPopup({SetWachtwoordPopup}) {

    const [eersteInvoer, SetEersteInvoer] = useState("")
    const [tweedeInvoer, SetTweedeInvoer] = useState("")
    const [foutmelding, SetFoutmelding] = useState("")

    const UpdateWachtwoord = () => {
        //check of een invoerveld leeg is
        if(eersteInvoer == "" || tweedeInvoer == ""){
            SetFoutmelding("Invoervelden mogen niet leeg zijn.")
            return
        }
        //check of het herhaalde wachtwoord hetzelfde is als eerste invoer
        if(eersteInvoer != tweedeInvoer){
            SetFoutmelding("Wachtwoorden komen niet overeen.")
            return
        }

        if(
            eersteInvoer.length < 8 ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(eersteInvoer) ||
            !/\d/.test(eersteInvoer)
        ){
            SetFoutmelding("Nieuw wachtwoord moet minimaal:\n- 8 characters lang zijn\n- een nummer bevatten\n- en een speciaal character bevatten\n(@, !, #, etc)")
            return
        }
        
        //update wachtwoord
        // push data hier
        SetFoutmelding("")
        SetWachtwoordPopup(false)
    }

  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p className="text-[25px]">Wachtwoord veranderen</p>

                <div className="h-auto w-[70%] mt-[20px]">
                    <p>Nieuw wachtwoord</p>
                    <input className="h-[40px] w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" type="password" name='eersteInvoer' onChange={(e) => SetEersteInvoer(e.target.value)}/> 
                </div>
                
                <div className="h-auto w-[70%] mt-[20px]">
                    <p>Wachtwoord herhalen</p>
                    <input className="h-[40px] w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]" type="password" name='tweedeInvoer'  onChange={(e) => SetTweedeInvoer(e.target.value)}/> 
                </div>
                

                <p className='text-[#DF121B] whitespace-pre-line text-center'>{foutmelding}</p>

                <div className="w-full flex justify-between mt-[20px]">
                    <button className='h-[40px] max-w-[90%] w-[150px] bg-[#fff] border-1 border-solid border-[#D0D0D0] rounded-[15px] cursor-pointer' onClick={() => SetWachtwoordPopup(false)}>Annuleren</button>
                    <button className='h-[40px] max-w-[90%] w-[150px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => UpdateWachtwoord()}>Bevestigen</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default WachtwoordVeranderenPopup


