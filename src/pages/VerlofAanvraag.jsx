 import React, { useState, useEffect, use } from 'react';
  import Header from '../components/Header';
  import { db } from '../firebase';
  import { doc, setDoc, getDocs, getDoc, serverTimestamp, QuerySnapshot, collection } from "firebase/firestore";
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
    const haalVerlofTypesOp = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "typeVerlof"));
        const types = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlleVerlofTypes(types);
      } catch (error) {
        console.error("Fout bij ophalen verloftypes:", error);
      }
    };

    haalVerlofTypesOp();
  }, []);

  // Versturen  verlofaanvraag
  const handleVerzend = async () => {
    if (!verlofType) {
      alert("Kies een verloftype voordat je verzendt.");
      return;
    }

    setLoading(true);
    try {
      const verlofId = `verlof_${userId}_${Date.now()}`;
      await setDoc(doc(db, "verlof", verlofId), {
        userId: userId,
        typeVerlof_id: verlofType,
        startDatum: moment(verlofAanvraagDag, 'D-MM-YYYY').toDate(),
        eindDatum: moment(verlofAanvraagTotDag, 'D-MM-YYYY').toDate(),
        omschrijvingRedenVerlof: reden || "Geen reden opgegeven",
        createdAt: serverTimestamp(),
      });
      alert("Verlofaanvraag is verzonden!");
    } catch (error) {
      console.error("Fout bij verzenden verlofaanvraag:", error);
      alert("Er ging iets mis bij aanvragen van verlof.");
    } finally {
      setLoading(false);
    }
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

            {/* Datums */}
            <div className='h-[20%] w-[80%] flex flex-row items-center justify-between'>
              <div className='h-[80%] w-[45%] bg-white flex flex-col items-center justify-center rounded-[15px] text-lg font-bold'>
                <input
                  type="text"
                  value={verlofAanvraagDag}
                  readOnly
                  className="text-center"
                />
              </div>
              <div className='h-[80%] w-[45%] bg-white flex flex-col items-center justify-center rounded-[15px] text-lg font-bold'>
                <input
                  type="text"
                  value={verlofAanvraagTotDag}
                  readOnly
                  className="text-center"
                />
              </div>
            </div>

            {/* Verloftype dropdown */}
            <div className="bg-white w-[80%] h-[15%] text-lg font-bold text-black py-2 px-6 rounded-[15px] flex flex-col items-center justify-center">
              <select
                id="verlofType"
                className="border border-gray-300 rounded-lg p-2 h-[80%] w-[70%] text-center text-black bg-white"
                value={verlofType}
                onChange={(e) => setVerlofType(e.target.value)}>
                <option value="">-- Kies een verloftype --</option>
                {alleVerlofTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.naam}
                  </option>
                ))}
              </select>
            </div>

            {/* Reden */}
            <div className="bg-white w-[80%] h-[25%] text-lg font-bold text-black py-2 px-6 rounded-[15px] flex flex-col items-center justify-center transition-colors duration-300">
              <textarea
                id="reden"
                className="w-[90%] h-[60%] border border-gray-300 rounded-lg p-2 text-base font-normal"
                value={reden}
                onChange={(e) => setReden(e.target.value)}
                placeholder="Reden van verlof......"
              />
            </div>

            {/* Verzendknop */}
            <button
              onClick={handleVerzend}
              disabled={loading}
              className="bg-[#2AAFF2] w-[80%] h-[40px] hover:bg-[#1A8FD0] text-white font-bold py-2 px-6 rounded-[15px] flex items-center justify-center transition-colors duration-300">
              {loading ? "Bezig met verzenden..." : "Verzend"}
            </button>
          </div>
        </div>
      </div>
    </>
  );

}
export default VerlofAanvraag
