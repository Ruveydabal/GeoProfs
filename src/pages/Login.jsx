import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AchtergrondLogin from "../media/AchtergrondLogin.jpg";
import GeoprofsLogo from "../media/GeoprofsLogo.png";

function Login({ setTrigger }) {
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
      // Zoek gebruiker op e-mail
      const gebruikersSnap = await getDocs(
        query(collection(db, "user"), where("email", "==", email))
      );

      if (gebruikersSnap.empty) throw new Error("Gebruiker niet gevonden.");

      const gebruikerDoc = gebruikersSnap.docs[0];
      const gebruikerData = gebruikerDoc.data();
      const gebruikerId = gebruikerDoc.id;

      const wachtwoordenSnap = await getDocs(
        query(collection(db, "userPassword"), where("user_id", "==", gebruikerDoc.ref))
      );

      if (wachtwoordenSnap.empty) throw new Error("Geen wachtwoord gevonden.");

      const juistWachtwoord = wachtwoordenSnap.docs[0].data().wachtwoord;

      if (juistWachtwoord !== wachtwoord)
        throw new Error("Onjuist wachtwoord.");

      const rolId = gebruikerData.rol_id.id;
      let rol = "";
      if (rolId === "1") rol = "officemanager";
      else if (rolId === "2") rol = "manager";
      else if (rolId === "3") rol = "medewerker";
      else throw new Error("Onbekende rol.");

      localStorage.setItem("userId", gebruikerId);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("rol", rol);

      setTrigger(prev => prev + 1);

      navigate(`/${rol}/voorpagina`);

    } catch (fout) {
      setFoutmelding(fout.message);
    } finally {
      setLaden(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${AchtergrondLogin})` }}>
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
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px] px-4 mb-4 focus:outline-none" />

          <input
            type="password"
            placeholder="Wachtwoord..."
            aria-label="wachtwoord"
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px] px-4 mb-6 focus:outline-none" />

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