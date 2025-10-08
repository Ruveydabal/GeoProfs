import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AchtergrondLogin from "../media/AchtergrondLogin.jpg";
import GeoprofsLogo from "../media/GeoprofsLogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [laden, setLaden] = useState(false);
  const [foutmelding, setFoutmelding] = useState(""); 
  
  const navigate = useNavigate();

  const inloggen = async () => {
    setFoutmelding(""); // reset foutmelding
    if (!email || !wachtwoord) {
      setFoutmelding("Vul zowel e-mailadres als wachtwoord in.");
      return;
    }

    setLaden(true);

    try {
      // Zoekt gebruiker op e-mailadres
      const gebruikers = await getDocs(
        query(collection(db, "user"), where("email", "==", email))
      );

      // Error message voor als de gebruiker niet gevonden
      if (gebruikers.empty) throw new Error("Gebruiker niet gevonden.");

      const gebruiker = gebruikers.docs[0];
      const gebruikerData = gebruiker.data();
      const gebruikerRef = gebruiker.ref;

      // Zoek wachtwoord dat bij de gebruiker hoort in 
      const wachtwoorden = await getDocs(
        query(collection(db, "userPassword"), where("user_id", "==", gebruikerRef))
      );

      // Error message bij geen gevonden wachtwoord bij user_id
      if (wachtwoorden.empty) throw new Error("Geen wachtwoord gevonden.");

      // Controleer wachtwoord
      const juistWachtwoord = wachtwoorden.docs[0].data().wachtwoord;

      // Error message bij onjuist wachtwoord
      if (juistWachtwoord !== wachtwoord) throw new Error("Onjuist wachtwoord.");

      // Login gelukt, nu navigeren op basis van de rol
      const navigatieRol = gebruikerData.rol_id?.path || "";

      // Hier word je doorgestuurd naar de pagina's bij de bijbehorende rol
      if (navigatieRol.includes("1")) navigate("/office-manager"); 
      else if (navigatieRol.includes("2")) navigate("/manager");
      else if (navigatieRol.includes("3")) navigate("/medewerker");
      else navigate("/"); //als er iemand inlogd die geen rol 1/2/3 heeft gaat ie terug naar login pagina

    } catch (fout) {
      setFoutmelding(fout.message);
    } finally {
      setLaden(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${AchtergrondLogin})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white w-[90%] max-w-[400px] rounded-[15px] shadow-lg p-6 flex flex-col items-center">
          <img src={GeoprofsLogo} alt="Logo" className="w-40 h-auto mb-6" />

          {/* Foutmelding worden boven e-mailveld getoond */}
          {foutmelding && (
            <div className="text-red-500 text-sm mb-3 text-center">
              {foutmelding}
            </div>
          )}

          <input
            type="email"
            placeholder="E-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px] px-4 mb-4 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Wachtwoord..."
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px] px-4 mb-6 focus:outline-none"
          />

          <button
            onClick={inloggen}
            disabled={laden}
            className={`w-full h-[40px] text-white rounded-[15px] font-semibold transition ${
              laden
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1DA1F2] hover:bg-[#0d8ddb]"
            }`}
          >
            {laden ? "Even geduld..." : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;