import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import Header from "../components/Header.jsx";
import VerlofKaart from "../components/VerlofKaart.jsx";

function Verlofoverzicht() {
  const navigate = useNavigate();

  const [verlofData, setVerlofData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [verlofStatusData, setVerlofStatusData] = useState([]);
  const [ladenOfFaalText, setLadenOfFaalText] = useState("Aan het laden...");

  const momenteleUserId = localStorage.getItem("userId");

  useEffect(() => {
    const FetchVerlofAanvragen = async () => {
      try {
        const verlofSnap = await getDocs(query(collection(db, "verlof")));

        if (verlofSnap.empty) {
          setLadenOfFaalText("Er is geen verlof gevonden.");
          setVerlofData([]);
          return;
        }

        setVerlofData(verlofSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));

      } catch (err) {
        console.error("Fout bij het ophalen van verlof aanvragen:", err);
        setLadenOfFaalText("Er is iets misgegaan bij het ophalen van de verlof aanvragen.");
      }
    };

    const FetchUsers = async () => {
      try {
        const userSnap = await getDocs(query(collection(db, "user")));

        if (userSnap.empty) {
          setLadenOfFaalText("Er zijn geen users gevonden.");
          setUserData([]);
          return;
        }

        setUserData(userSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));

      } catch (err) {
        console.error("Fout bij het ophalen van users:", err);
        setLadenOfFaalText("Er is iets misgegaan bij het ophalen van de users.");
      }
    };

    const FetchVerlofStatus = async () => {
      try {
        const statusSnap = await getDocs(query(collection(db, "statusVerlof")));

        if (statusSnap.empty) {
          setLadenOfFaalText("Er zijn geen verlof statusen gevonden.");
          setVerlofStatusData([]);
          return;
        }

        setVerlofStatusData(statusSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));

      } catch (err) {
        console.error("Fout bij ophalen verlof status:", err);
        setLadenOfFaalText("Er is iets misgegaan bij ophalen van de verlof statusen.");
      }
    };

    FetchVerlofAanvragen();
    FetchUsers();
    FetchVerlofStatus();
  }, []);

  const filteredVerlof = verlofData.filter(
    x => x.user_id.id === momenteleUserId &&
         (x.statusVerlof_id.id === 1 || x.statusVerlof_id.id === 2)
  );

  return (
    <>
      <Header />
      <div className="h-[90%] w-full">
        <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
          <button className='h-[40px] w-[100px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate("/voorpagina")}>Home</button>
          <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate("/")}>Verlof aanvragen</button>
        </div>

        {
          (!verlofData.length || !userData.length || !verlofStatusData.length)
            ? ladenOfFaalText
            :
            <div className='flex h-[calc(100%-120px)] w-full divide-x divide-[#D0D0D0] px-[40px]'>

              <div className="h-full flex-1 px-[10px] overflow-y-scroll">
                {filteredVerlof.map((verlof) => (
                  <VerlofKaart key={verlof.id} verlofData={verlof} typeKaart="geschiedenis" userData={""}/>
                ))}
              </div>

              <div className="h-full flex-1 px-[10px] overflow-y-scroll" />
              <div className="h-full flex-1 px-[10px] overflow-y-scroll" />

            </div>
        }

      </div>
    </>
  );
}

export default Verlofoverzicht;
