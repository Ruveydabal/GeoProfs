import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, getDoc  } from "firebase/firestore";
import { db } from '../firebase'; 
import moment from 'moment';
import Header from '../components/Header'
import MaandKalender from '../components/MaandKalender'
import WeekKalender from '../components/WeekKalender'
import MaandNavigatie from '../components/MaandNavigatie'
import WeekNavigatie from '../components/WeekNavigatie'


function Voorpagina() {
  let navigate = useNavigate();
  const [MaandofWeekKalender, SetMaandofWeekKalender] = useState(false) //maand = false, week = true
  const [jaar, SetJaar] = useState(new Date().getFullYear()) //pakt het huidige jaar
  const [maand, SetMaand] = useState(new Date().getMonth()) //pakt de huidige maand in integer (0-11)
  const [week, SetWeek] = useState(moment().startOf('isoWeek').toDate()) //pakt de eerste dag van de huidige week (maandag)
  const [goedgekeurdeAanvragen, setGoedgekeurdeAanvragen] = useState([]);
  const [rolNaam, setRolNaam] = useState(null);
  const [afdelingUser, setAfdelingUser] = useState(null);
  const [gebruikerNaam, setGebruikerNaam] = useState(null);

  //tijdelijke variabelen
  var verlofSaldo = 50;

  //array met alle dagen van de geselecteerde week
  var weekDagen = []
  for(var i = 0; i < 7; i++ ){
    weekDagen.push(moment(week).add(i, 'days'));
  }

  //verhoogt de geselecteerde maand met 1 maand. met jaarsovergang wordt jaar ook verhoogd met 1 jaar.
  function MaandVerhogen(){
    if(maand == 11){
      SetJaar(jaar+1)
      SetMaand(0)
    }
    else{
      SetMaand(maand+1) 
    }
  }

  //verlaagd de geselecteerde maand met 1 maand. met jaarsovergang wordt jaar ook verlaagd met 1 jaar.
  function MaandVerlagen(){
    if(maand == 0){
      SetJaar(jaar-1)
      SetMaand(11)
    }
    else{
      SetMaand(maand-1) 
    }
  }

  //verhoogt de geselecteerde week met 1 week. met jaarsovergang wordt jaar ook verhoogd met 1 jaar.
  function WeekVerhogen(){
    var jaar1 = moment(week).year()
    var jaar2 = moment(moment(week).endOf('isoWeek').toDate()).year()

    if(jaar1 < jaar2){
      SetJaar(jaar+1)
      SetWeek(moment(week).add(7, 'days').startOf('isoWeek').toDate())
    }
    else{
      SetWeek(moment(week).add(7, 'days').startOf('isoWeek').toDate())
    }
  }

  //verlaagd de geselecteerde week met 1 week. met jaarsovergang wordt jaar ook verlaagd met 1 jaar.
  function WeekVerlagen(){
    var jaar1 = moment(week).year()
    var jaar2 = moment(moment(week).endOf('isoWeek').toDate()).year()

    if(jaar1 < jaar2){
      SetJaar(jaar-1)
      SetWeek(moment(week).subtract(7, 'days').startOf('isoWeek').toDate())
    }
    else{
      SetWeek(moment(week).subtract(7, 'days').startOf('isoWeek').toDate())
    }
  }

  useEffect(() => {
    const haalGoedgekeurdeAanvragenOp = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const rol = localStorage.getItem("rol");
        setRolNaam(rol);

        if (!userId) {
          console.log("Geen userId in localStorage → terug naar login");
          return;
        }

        // Haal user-data op
        const userSnap = await getDoc(doc(db, "user", userId));
        if (!userSnap.exists()) return;

        const userData = userSnap.data();
        const afdeling = userData.afdeling;
        setAfdelingUser(afdeling);

        // Firestore refs
        const aanvragenRef = collection(db, "verlof");
        const statusRef = doc(db, "statusVerlof", "1");
        const typePersoonlijk = doc(db, "typeVerlof", "2");
        const typeVakantie = doc(db, "typeVerlof", "3");

        const q = query(
          aanvragenRef,
          where("statusVerlof_id", "==", statusRef),
          where("typeVerlof_id", "in", [typePersoonlijk, typeVakantie])
        );

        const snapshot = await getDocs(q);

        // Bouw array
        let aanvragen = await Promise.all(
          snapshot.docs.map(async (d) => {
            const raw = d.data();

            let userDoc = raw.user_id ? await getDoc(raw.user_id) : null;
            let gebruikerData = userDoc?.data() ?? {};

            return {
              id: d.id,
              gebruikerAfdeling: gebruikerData.afdeling,
              gebruikerVoornaam: gebruikerData.voornaam ?? "Onbekend",
              userId: userDoc?.id ?? null,
              startDatum: raw.startDatum?.toDate() ?? null,
              eindDatum: raw.eindDatum?.toDate() ?? null,
            };
          })
        );
        // Filter op rol
        if (rolNaam !== "manager") {
            aanvragen = aanvragen.filter((item) => item.gebruikerAfdeling === afdeling);
        } else if (rolNaam === "manager") {
          
        }

        setGoedgekeurdeAanvragen(aanvragen);
      } catch (error) {
        console.error("Error ophalen:", error);
      }
    };

    haalGoedgekeurdeAanvragenOp();
  }, []);

  return (
    <>
      <div className='flex w-full h-full flex-col text-[1.7vh]'>
        {/* topbalk */}
        <div className='h-[120px] w-full flex'>
          <div className='flex h-[120px] w-[20%] justify-center items-center'>
            <button className='h-[40px] max-w-[90%] w-[250px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate('/verlofAanvraag')}>Verlof aanvragen</button>
          </div>
          <div className='flex h-full w-[80%] items-center'>
            {/* vorige/volgende week/maand selecteren */
              MaandofWeekKalender ?
              <WeekNavigatie WeekVerhogen={WeekVerhogen} WeekVerlagen={WeekVerlagen} week={week} jaar={jaar} />
              :
              <MaandNavigatie MaandVerhogen={MaandVerhogen} MaandVerlagen={MaandVerlagen} maand={maand} jaar={jaar}/>
            }
            {/* maand of week kalender selecteren */}
            <div className='h-[40px] w-[150px] ml-[40px] divide-solid'>
              <button className={`${MaandofWeekKalender ? 'bg-[#ffffff]' : 'bg-[#C9EDFF]'} w-[50%] h-full rounded-l-[15px] border border-solid ${MaandofWeekKalender ? 'border-[#D0D0D0]' : 'border-[#2AAFF2]'}`}
              onClick={() => SetMaandofWeekKalender(false)}
              >Maand</button>
              <button className={`${MaandofWeekKalender ? 'bg-[#C9EDFF]' : 'bg-[#ffffff]'} w-[50%] h-full rounded-r-[15px] border border-solid ${MaandofWeekKalender ? 'border-[#2AAFF2]' : 'border-[#D0D0D0]'}`}
              onClick={() => SetMaandofWeekKalender(true)}
              >Week</button>
            </div>

            {
              rolNaam === "manager" ?
              <button className='h-[40px] max-w-[90%] w-[200px] ml-[40px] bg-[#2AAFF2] text-white rounded-[15px]'>Gegevens exporteren</button>
              : <></>
              }


            <div className='flex-1'></div>
            <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] mr-[50px]' onClick={() => navigate('/verlofoverzicht')}>Aanvraag overzicht →</button>
          </div>
        </div>
        {/* zijbalk */}
        <div className='h-[calc(100%-120px)] w-full flex'>
          <div className='flex flex-col h-full w-[20%] items-center'>
            <button className='h-[40px] max-w-[90%] w-[250px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate('/ziekmelden')}>Ziek melden</button>
            {/* saldo vakje */
              typeof verlofSaldo !== 'undefined' ?
              <div className='flex flex-col h-auto max-w-[90%] w-[250px] bg-[#fff] rounded-[15px] mt-[40px] py-[5px] border border-solid border-[#D0D0D0]'>
                <div className='flex w-full flex-1 text-[20px] justify-center text-center'>U heeft</div>
                <div className='flex w-full flex-1 text-[25px] justify-center text-center'>{verlofSaldo}</div>
                <div className='flex w-full flex-1 text-[20px] justify-center text-center'>dagen verlof over</div>
              </div>
              :
              <></>
            }
          </div>
          {/* render de kalender */}
          <div className='h-[calc(100%-20px)] w-[calc(80%-50px)] bg-[#f0f0f0]'>
            {MaandofWeekKalender ?
              <WeekKalender week={week} weekDagen={weekDagen} rol={rolNaam} aanvragen={goedgekeurdeAanvragen} />
              :
              <MaandKalender weekDagen={weekDagen} maand={maand} jaar={jaar} rol={rolNaam} aanvragen={goedgekeurdeAanvragen} />}
              
          </div>
        </div>
      </div>

    </>
  )
}

export default Voorpagina
