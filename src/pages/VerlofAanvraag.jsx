 import React, { useState, useEffect, use } from 'react';
  import Header from '../components/Header';
  import { db } from '../firebase';
  import { doc, setDoc, getDoc, serverTimestamp, QuerySnapshot, collection } from "firebase/firestore";
  import moment from 'moment';
  import 'moment/locale/nl';
  moment.locale('nl');

function VerlofAanvraag() {
    const [verlofAanvraagDag, setVerlofAanvraagDag ] = useState("");
    const [verlofAanvraagTotDag, setVerlofAanvraagTotDag] = useState("");
    const [verlofType, setVerlofType ] = useState(""); //ID van db 1, 2, 3, 4
    const [alleVerlofTypes, setAlleVerlofTypes] = useState([]); // lijst db
    const [reden, setReden] = useState(""); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = moment();
        const eind = moment();

        setVerlofAanvraagDag(moment(start).format('D-MM-YYYY'));
        setVerlofAanvraagTotDag(moment(eind).format('D-MM-YYYY'));
    }, []);

    useEffect(() => {
        const haalVerlofTypesOp = async() => {
            try {
                const QuerySnapshot = await getDocs(collection(db, "verloftype"));
                const types = QuerySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAlleVerlofTypes(types);
            }catch(error) {
                console.error("Fout bij ophalen verloftypes: ", error);
            }
        };

        haalVerlofTypesOp();
    }, []);

    const handelVerzend = async() => {
        if(!verlofType){
            alert("Kies verloftype");
            return;
        }
    }

    setLoading(true);
    try {
        const verlofId = `verlof_${userId}_${Date.now()}`;   
        await setDoc(doc(db, "verlof", verlofId), {
            userId: userId,
            typeverlof_id: verlofType,
            startDatum: moment()
        })
    }

  return (
    <>
        <Header />
        <div className="h-[90%] w-full bg-white-500 flex items-center justify-center">
          <div className='h-[90%] w-[70%] flex items-center justify-center'>
            <div className='h-[80%] w-[50%] bg-[#DDE7F1] flex flex-col justify-between items-center rounded-[15px] p-4'>
              <div className='h-[10%] w-[80%] flex flex-col items-center justify-start rounded-[15px] p-4 text-3xl font-bold'>
                Verlof aanvragen
              </div>
              <div className='h-[20%] w-[80%] flex flex-row items-center justify-between'>
                <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-lg font-bold'>
                  datum
                </div>
                <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-lg font-bold'>
                  datum
                </div>
              </div>
              <div className="bg-white w-[80%] h-[15%] text-lg font-bold text-black py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
                Verloftype
              </div>
              <div className="bg-white w-[80%] h-[25%] text-lg font-bold text-black py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
                Reden verlof aanvraag
              </div>
              <button 
                
                className="bg-[#2AAFF2] w-[80%] h-[40px] hover:bg-[#1A8FD0] text-white font-bold py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
               Verzend
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }


export default VerlofAanvraag
