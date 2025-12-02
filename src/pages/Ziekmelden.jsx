  import React, { useState, useEffect } from 'react';
  import Header from '../components/Header';
  import { db } from '../firebase';
  import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
  import { useNavigate } from "react-router-dom";
  import moment from 'moment';

  function Ziekmelden({ userId }) {  
    const [vandaag, setVandaag] = useState(""); 
    const [volgendeDag, setVolgendeDag] = useState("");
    const [verlofType, setVerlofType] = useState("Ziek");
    const [loading, setLoading] = useState(false);
    const [userIdState, setUserIdState] = useState(userId || null);
    const navigate = useNavigate();

    useEffect(() => {
      //voor UI: vandaag en volgende dag
      const vandaagDatum = moment();
      const volgendeDatum = moment(vandaagDatum).add(1, "days");

      setVandaag(moment(vandaagDatum).format('D-MM-YYYY'));
      setVolgendeDag(moment(volgendeDatum).format('D-MM-YYYY'));

      //haal verloftype uit DB
      const haalVerlofTypeOp = async () => {
          try {
              const docRef = doc(db, "verloftype", "1");
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  setVerlofType(docSnap.data().naam);
              } else {
                  console.log("Verloftype niet gevonden");
              }
          } catch (error) {
              console.error("Fout bij ophalen verloftype:", error);
          }
      };

      haalVerlofTypeOp();

      //haal userId uit localStorage (alleen als niet gezet)
      if (!userIdState) {
          const opgeslagenUserId = localStorage.getItem("userId");
          if (opgeslagenUserId) {
              setUserIdState(opgeslagenUserId);
          } else {
              console.warn("Geen userId gevonden in localStorage. Gebruiker niet ingelogd.");
          }
      }
  }, []);

  const behandelZiekmelding = async () => {
    setLoading(true);
    try {
      if (!userIdState) {
      alert("Geen gebruiker gevonden. Log opnieuw in.");
      return;
      }

      const vandaagDatum = moment(); // vandaag
      const volgendeDatum = moment().add(1, "days"); // morgen

      const verlofId = `verlof_${userIdState}_${Date.now()}`;
      await setDoc(doc(db, "verlof", verlofId), {
        user_id: doc(db, "user", userIdState),
        typeVerlof_id: doc(db, "typeVerlof", "1"),
        startDatum: vandaagDatum.toDate(),
        eindDatum: volgendeDatum.toDate(),
        statusVerlof_id: doc(db, "statusVerlof", "3"),
        omschrijvingRedenVerlof: "Ziekmelding gemaakt",
        createdAt: serverTimestamp(),
      });

      alert("Ziekmelding is verstuurd!");

       const rol = localStorage.getItem("rol");
      if (rol) {
        navigate(`/${rol}/voorpagina`);
        } else {
        navigate("/"); //geen rol gevonden
        }

    } catch (error) {
      console.error("Fout bij ziekmelding: ", error);
      alert("Er ging iets mis bij het ziekmelden.");
    } finally {
      setLoading(false);
    }
  };


    return (
      <>
        <div className="h-full w-full bg-white-500 flex items-center justify-center">
          <div className='h-[90%] w-[70%] flex items-center justify-center'>
            <div className='h-[80%] w-[50%] bg-[#DDE7F1] flex flex-col justify-between items-center rounded-[15px] p-4'>
              <div className='h-[10%] w-[80%] flex flex-col items-center justify-start rounded-[15px] p-4 text-3xl font-bold'>
                Ziekmelden
              </div>
              <div className='h-[20%] w-[80%] flex flex-row items-center justify-between'>
                <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-lg font-bold'>
                  <input className='h-[45%] w-[75%]'
                    type='text'
                    value={vandaag}
                    readOnly
                  />
                </div>
                <div className='h-[80%] w-[45%] bg-white flex flex-row items-center justify-center rounded-[15px] text-lg font-bold'>
                  <input className='h-[45%] w-[75%]'
                    type='text'
                    value={volgendeDag}
                    readOnly
                  />
                </div>
              </div>
              <div className="bg-white w-[80%] h-[15%] text-lg font-bold text-black py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
                <input className='h-[45%] w-[12%]'
                  type="text"
                  value={verlofType}
                  readOnly
                />
              </div>
              <button 
                onClick={behandelZiekmelding}
                disabled={loading}
                className="bg-[#2AAFF2] w-[80%] h-[40px] hover:bg-[#1A8FD0] text-white font-bold py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300"
              >
                {loading ? "Bezig met ziekmelden..." : "Ziekmelden"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Ziekmelden;
