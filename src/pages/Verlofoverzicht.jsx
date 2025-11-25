import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import Header from "../components/Header.jsx";
import VerlofAanvraag from "../components/VerlofKaart.jsx"

import moment from 'moment';

function Verlofoverzicht() {
  let navigate = useNavigate();

  const [verlofData, SetVerlofData] = useState([])
  const [userData, SetUserData] = useState([])
  const [verlofStatusData, SetVerlofStatusData] = useState([])
  const [ladenOfFaalText, SetLadenOfFaalText] = useState("Aan het laden...")

  var momenteleUserId = localStorage.getItem("userId");

  useEffect(() => {
    const FetchVerlofAanvragen = async () => {
      try {
      const verlofSnap = await getDocs(
        query(collection(db, "verlof"))
      );

      if (verlofSnap.empty) {
        SetLadenOfFaalText("Er is geen verlof gevonden.");
        SetVerlofData([]);
        return;
      }

      const verlofData = verlofSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      SetVerlofData(verlofData);
      } catch (err) {
        console.error("Fout bij het ophalen van verlof aanvragen:", err);
        SetLadenOfFaalText("Er is iets misgegaan bij het ophalen van de verlof aanvragen.");
      }
    };

      const FetchUsers = async () => {
      try {
      const userSnap = await getDocs(
        query(collection(db, "user"))
      );

      if (userSnap.empty) {
        SetLadenOfFaalText("Er zijn geen users gevonden.");
        SetUserData([]);
        return;
      }

      const userData = userSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      SetUserData(userData);
      } catch (err) {
        console.error("Fout bij het ophalen van users:", err);
        SetLadenOfFaalText("Er is iets misgegaan bij het ophalen van de users.");
      }
    };

      const FetchVerlofStatus = async () => {
      try {
      const verlofStatusSnap = await getDocs(
        query(collection(db, "statusVerlof"))
      );

      if (verlofStatusSnap.empty) {
        SetLadenOfFaalText("Er zijn geen verlof statusen gevonden.");
        SetVerlofStatusData([]);
        return;
      }

      const verlofStatusData = verlofStatusSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      SetUserData(verlofStatusData);
      } catch (err) {
        console.error("Fout bij het ophalen van verlof statusen:", err);
        SetLadenOfFaalText("Er is iets misgegaan bij het ophalen van de verlof statusen.");
      }
    };

    FetchVerlofAanvragen();
    FetchUsers();
    FetchVerlofStatus();
  }, [verlofData, userData, verlofStatusData]);
    
  return (
    <>
      <Header />
      <div className="h-[90%] w-full">
        <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
          <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {navigate("/voorpagina")}}>Home</button>
          <button className='h-[40px] max-w-[90%] w-[200px] bg-[#2AAFF2] text-white rounded-[15px] cursor-pointer' onClick={() => {navigate("/")}}>Verlof aanvragen</button>
        </div>
        {
          !verlofData || verlofData.length == 0 || !userData || userData.length == 0 || !verlofStatusData || verlofStatusData.length == 0 ? 
            ladenOfFaalText :
          <div className='flex h-[calc(100%-120px)] w-full divide-x divide-[#D0D0D0] px-[40px]'>
            <div className="h-full flex-1 px-[10px] overflow-y-scroll">
              {
                // verlofData.filter(x => x.user_id.id == momenteleUserId, x.statusVerlof_id.id == 1 || x.statusVerlof_id.id == 2)
                // .map((verlof) => (
                //   <VerlofKaart verlofData={verlof} typeKaart={geschiedenis} userData={""}/>
                // ))
              }
            </div>
            <div className="h-full flex-1 px-[10px] overflow-y-scroll">
            </div>
            <div className="h-full flex-1 px-[10px] overflow-y-scroll">
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Verlofoverzicht;
