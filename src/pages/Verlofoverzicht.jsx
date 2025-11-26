import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import Header from "../components/Header.jsx";
import VerlofOverzichtContainer from "../components/VerlofOverzichtContainer.jsx"

function Verlofoverzicht() {
  const navigate = useNavigate();



  return (
    <>
      <Header />
      <div className="h-[90%] w-full">
        <div className='h-[120px] w-full flex items-center justify-between px-[50px]'>
          <button className='h-[40px] w-[100px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate("/voorpagina")}>Home</button>
          <button className='h-[40px] w-[200px] bg-[#2AAFF2] text-white rounded-[15px]' onClick={() => navigate("/")}>Verlof aanvragen</button>
        </div>
          <div className='flex h-[calc(100%-120px)] w-full'>
            <VerlofOverzichtContainer/>
          </div>
      </div>
    </>
  );
}

export default Verlofoverzicht;
