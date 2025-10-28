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

      // Zoekt wachtwoord dat hoort bij gebruiker
      const wachtwoorden = await getDocs(
        query(collection(db, "userPassword"), where("user_id", "==", gebruikerRef))
      );

      // Error message bij geen gevonden wachtwoord bij user_id
      if (wachtwoorden.empty) throw new Error("Geen wachtwoord gevonden.");

      // Controleer wachtwoord
      const juistWachtwoord = wachtwoorden.docs[0].data().wachtwoord;

      // Error message bij onjuist wachtwoord
      if (juistWachtwoord !== wachtwoord) throw new Error("Onjuist wachtwoord.");

      // Login geslaagd → loginstatus + rol opslaan
      const navigatieRol = gebruikerData.rol_id?.path || "";
      let rol = "";

      if (navigatieRol.includes("1")) rol = "office-manager";
      else if (navigatieRol.includes("2")) rol = "manager";
      else if (navigatieRol.includes("3")) rol = "medewerker";
      else throw new Error("Onbekende rol. Neem contact op met de beheerder.");

      // Sla inlogstatus en rol op in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("rol", rol);

      // Navigeer naar de juiste pagina
      navigate(`/${rol}/voorpagina`);
      
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
            {laden ? "Bezig met inloggen..." : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;